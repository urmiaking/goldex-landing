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

IMAGE = "reg.goldexsoft.ir/qirato"
COMPOSE = "/home/user/docker/qirato/docker-compose.yaml"
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
                and path.suffix in {".html", ".css", ".js", ".png", ".webmanifest", ".xml", ".txt"}
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
    if b"https://qirato.ir/" not in homepage:
        raise ValueError("Archive is not the Qirato website")
    return revision, hashlib.sha256(homepage).hexdigest()


def run(*args, capture=False):
    result = subprocess.run(args, check=True, timeout=300, text=True,
                            stdout=subprocess.PIPE if capture else None)
    return result.stdout.strip() if capture else None


def restart():
    run("docker", "compose", "-f", COMPOSE, "up", "-d", "--no-deps",
        "--no-build", "--pull", "never", "qirato")


def main():
    import fcntl
    with open("/run/lock/qirato-landing-deploy.lock", "w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        payload = sys.stdin.buffer.read(MAX_UPLOAD + 1)
        with tempfile.TemporaryDirectory(prefix="qirato-landing-") as folder:
            root = pathlib.Path(folder)
            revision, digest = unpack(payload, root)
            # Never execute a Dockerfile, script or Compose file supplied by SSH.
            (root / "nginx.conf").write_text('server {\n    listen 8080 default_server;\n    listen 80;\n    server_name _;\n\n    root /usr/share/nginx/html;\n    index index.html;\n\n    charset utf-8;\n\n    gzip on;\n    gzip_vary on;\n    gzip_min_length 1024;\n    gzip_comp_level 6;\n    gzip_proxied any;\n    gzip_types\n        text/plain\n        text/css\n        text/xml\n        text/javascript\n        application/javascript\n        application/x-javascript\n        application/json\n        application/xml\n        application/rss+xml\n        image/svg+xml;\n\n    add_header X-Frame-Options "SAMEORIGIN" always;\n    add_header X-Content-Type-Options "nosniff" always;\n    add_header X-XSS-Protection "1; mode=block" always;\n    add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;\n\n    location = /healthz {\n        access_log off;\n        default_type text/plain;\n        return 200 \'OK\';\n    }\n\n    # CSS and JS: Force revalidation on every load (ETag/304 check), never stale\n    location ~* \\.(?:css|js)$ {\n        expires -1;\n        add_header Cache-Control "no-cache, must-revalidate" always;\n        add_header Pragma "no-cache" always;\n        add_header X-Content-Type-Options "nosniff" always;\n        access_log off;\n    }\n\n    # Media, images and fonts can be cached long-term\n    location ~* \\.(?:jpg|jpeg|gif|png|ico|svg|webp|woff|woff2|ttf|eot)$ {\n        expires 30d;\n        add_header Cache-Control "public, no-transform" always;\n        access_log off;\n    }\n\n    location ~* \\.(?:manifest|webmanifest|xml|json)$ {\n        expires -1;\n        add_header Cache-Control "no-cache, must-revalidate" always;\n    }\n\n    # HTML files: Never cache on disk, always fetch latest HTML document\n    location ~* \\.html$ {\n        expires -1;\n        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;\n        add_header Pragma "no-cache" always;\n    }\n\n    location / {\n        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;\n        add_header Pragma "no-cache" always;\n        try_files $uri $uri/ /index.html =404;\n    }\n\n    location ~ /\\. {\n        deny all;\n        access_log off;\n        log_not_found off;\n    }\n}\n', encoding="utf-8")
            (root / "Dockerfile").write_text(
                "FROM nginx:1.27-alpine\nCOPY nginx.conf /etc/nginx/conf.d/default.conf\nCOPY wwwroot /usr/share/nginx/html\n"
                'EXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]\n')
            tag = IMAGE + ":master-" + revision
            old = run("docker", "inspect", "qirato", "--format", "{{.Image}}", capture=True)
            run("docker", "build", "-t", tag, str(root))
            run("docker", "run", "--rm", tag, "nginx", "-t")
            run("docker", "push", tag)
            run("docker", "tag", old, IMAGE + ":rollback-before-" + revision[:12])
            try:
                run("docker", "tag", tag, IMAGE + ":latest")
                restart()
                for attempt in range(5):
                    try:
                        served = run("docker", "exec", "qirato", "sha256sum",
                                     "/usr/share/nginx/html/index.html", capture=True)
                        if served.split()[0] != digest:
                            raise ValueError("Deployed HTML digest mismatch")
                        run("docker", "exec", "qirato", "wget", "-q", "-O", "/dev/null",
                            "http://127.0.0.1:8080/healthz")
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
