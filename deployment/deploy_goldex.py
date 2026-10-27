#!/usr/bin/env python3
"""Root-owned forced SSH command; accepts only a bounded static-site archive."""
import hashlib
import io
import json
import pathlib
import re
import subprocess
import sys
import tarfile
import tempfile
import time

IMAGE = "reg.goldexsoft.ir/goldex-landing"
COMPOSE = "/home/user/goldex-landing/docker-compose.yaml"
MAX_UPLOAD = 32 * 1024 * 1024


def unpack(payload, destination):
    if len(payload) > MAX_UPLOAD:
        raise ValueError("Upload exceeds limit")
    seen, total = set(), 0
    with tarfile.open(fileobj=io.BytesIO(payload), mode="r:gz") as archive:
        members = archive.getmembers()
        if len(members) > 200:
            raise ValueError("Too many archive members")
        for member in members:
            name = member.name.removeprefix("./").rstrip("/")
            path = pathlib.PurePosixPath(name)
            name = path.as_posix()
            if path.is_absolute() or ".." in path.parts or "\\" in name or name in seen:
                raise ValueError("Invalid archive path")
            seen.add(name)
            if member.isdir() and path.parts and path.parts[0] == "wwwroot":
                continue
            if not member.isfile():
                raise ValueError("Only regular files are accepted")
            if name != "release.json" and not (
                len(path.parts) > 1 and path.parts[0] == "wwwroot"
                and path.suffix in {".html", ".css", ".js", ".png"}
            ):
                raise ValueError("File outside the static-site allowlist")
            total += member.size
            if total > 100 * 1024 * 1024:
                raise ValueError("Expanded archive exceeds limit")
            target = destination.joinpath(*path.parts)
            target.parent.mkdir(parents=True, exist_ok=True)
            with archive.extractfile(member) as source, target.open("wb") as output:
                output.write(source.read())
    revision = json.loads((destination / "release.json").read_text())["revision"]
    if not isinstance(revision, str) or not re.fullmatch(r"[a-f0-9]{40}", revision):
        raise ValueError("Invalid Git revision")
    homepage = (destination / "wwwroot/index.html").read_bytes()
    if b"https://goldexsoft.ir/" not in homepage:
        raise ValueError("Archive is not the GoldEx website")
    if not (destination / "wwwroot/pricing.html").is_file():
        raise ValueError("Missing pricing page")
    return revision, hashlib.sha256(homepage).hexdigest()


def run(*args, capture=False):
    result = subprocess.run(args, check=True, timeout=300, text=True,
                            stdout=subprocess.PIPE if capture else None)
    return result.stdout.strip() if capture else None


def restart():
    run("docker", "compose", "-f", COMPOSE, "up", "-d", "--no-deps",
        "--no-build", "--pull", "never", "goldex-landing")


def main():
    import fcntl
    with open("/run/lock/goldex-landing-deploy.lock", "w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        payload = sys.stdin.buffer.read(MAX_UPLOAD + 1)
        with tempfile.TemporaryDirectory(prefix="goldex-landing-") as folder:
            root = pathlib.Path(folder)
            revision, digest = unpack(payload, root)
            # Never execute a Dockerfile, script or Compose file supplied by SSH.
            (root / "Dockerfile").write_text(
                "FROM nginx:alpine\nCOPY wwwroot /usr/share/nginx/html\n"
                'EXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]\n')
            tag = IMAGE + ":main-" + revision
            old = run("docker", "inspect", "goldex-landing", "--format", "{{.Image}}", capture=True)
            run("docker", "build", "-t", tag, str(root))
            run("docker", "run", "--rm", tag, "nginx", "-t")
            run("docker", "push", tag)
            run("docker", "tag", old, IMAGE + ":rollback-before-" + revision[:12])
            try:
                run("docker", "tag", tag, IMAGE + ":latest")
                restart()
                for attempt in range(5):
                    try:
                        served = run("docker", "exec", "goldex-landing", "sha256sum",
                                     "/usr/share/nginx/html/index.html", capture=True)
                        if served.split()[0] != digest:
                            raise ValueError("Deployed HTML digest mismatch")
                        run("docker", "exec", "goldex-landing", "wget", "-q", "-O", "/dev/null",
                            "http://127.0.0.1/")
                        break
                    except subprocess.CalledProcessError:
                        if attempt == 4:
                            raise
                        time.sleep(2)
                run("docker", "push", IMAGE + ":latest")
            except Exception:
                run("docker", "tag", old, IMAGE + ":latest")
                restart()
                raise
            print(json.dumps({"revision": revision, "htmlSha256": digest, "status": "deployed"}))


if __name__ == "__main__":
    main()
