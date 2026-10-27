import io
import json
import pathlib
import tarfile
import tempfile
import unittest

from deploy_goldex import MAX_UPLOAD, unpack


def archive(extra=None, revision="a" * 40):
    output = io.BytesIO()
    with tarfile.open(fileobj=output, mode="w:gz") as target:
        files = {"release.json": json.dumps({"revision": revision}).encode(),
                 "wwwroot/index.html": b'<link href="https://goldexsoft.ir/">',
                 "wwwroot/pricing.html": b"pricing"}
        for name, data in files.items():
            entry = tarfile.TarInfo(name)
            entry.size = len(data)
            target.addfile(entry, io.BytesIO(data))
        if extra:
            target.addfile(extra, io.BytesIO(b"x" * extra.size) if extra.isfile() else None)
    return output.getvalue()


class StaticArchiveTests(unittest.TestCase):
    def check_archive(self, payload):
        with tempfile.TemporaryDirectory() as folder:
            return unpack(payload, pathlib.Path(folder))

    def test_accepts_only_site_files_and_valid_revision(self):
        revision, digest = self.check_archive(archive())
        self.assertEqual(revision, "a" * 40)
        self.assertEqual(len(digest), 64)

    def test_rejects_paths_outside_webroot(self):
        for name in ("../escape.js", "/tmp/escape.js", "wwwroot/../../escape.js",
                     "Dockerfile", "wwwroot/.env", "deployment/execute.py", "wwwroot/evil\\path.js"):
            with self.subTest(name=name), self.assertRaises(ValueError):
                self.check_archive(archive(tarfile.TarInfo(name)))

    def test_rejects_links_and_special_files(self):
        for kind in (tarfile.SYMTYPE, tarfile.LNKTYPE, tarfile.FIFOTYPE):
            entry = tarfile.TarInfo("wwwroot/link.js")
            entry.type, entry.linkname = kind, "/etc/passwd"
            with self.subTest(kind=kind), self.assertRaises(ValueError):
                self.check_archive(archive(entry))

    def test_rejects_duplicate_paths(self):
        for name in ("wwwroot/index.html", "wwwroot//index.html"):
            with self.subTest(name=name), self.assertRaises(ValueError):
                self.check_archive(archive(tarfile.TarInfo(name)))

    def test_rejects_command_in_revision(self):
        with self.assertRaises(ValueError):
            self.check_archive(archive(revision="main; echo unsafe"))

    def test_rejects_oversized_upload_before_opening_archive(self):
        with self.assertRaises(ValueError):
            self.check_archive(b"x" * (MAX_UPLOAD + 1))


if __name__ == "__main__":
    unittest.main()
