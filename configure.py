import os
import subprocess

THIS_DIR = os.path.abspath(os.path.dirname(__file__))

if __name__ == "__main__":
    docsy_dir = os.path.join(THIS_DIR, "themes", "docsy")

    # apply patch
    subprocess.check_call(
        ["git", "submodule", "update", "--init", "--recursive", docsy_dir]
    )
    subprocess.check_call(["git", "reset", "--hard"], cwd=docsy_dir)
    subprocess.check_call(
        [
            "git",
            "apply",
            "--ignore-whitespace",
            "--verbose",
            os.path.join(THIS_DIR, "themes", "docsy.patch"),
        ],
        cwd=docsy_dir,
    )
    subprocess.check_call(
        [
            "git",
            "update-index",
            "--assume-unchanged",
            ".",
        ],
        cwd=docsy_dir,
    )
