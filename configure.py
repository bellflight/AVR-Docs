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
    subprocess.check_call(["git", "clean", "-f"], cwd=docsy_dir)
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

    # assume unchanged on patched files
    filenames = [
        os.path.join("layouts", "partials", "head-css.html"),
        os.path.join("layouts", "partials", "page-meta-lastmod.html"),
        os.path.join("layouts", "partials", "page-meta-links.html"),
        os.path.join("layouts", "shortcodes", "alert.html"),
        os.path.join("assets", "scss", "main.scss"),
    ]
    for filename in filenames:
        subprocess.check_call(
            [
                "git",
                "update-index",
                "--assume-unchanged",
                filename,
            ],
            cwd=docsy_dir,
        )

    # ignore new file
    with open(
        os.path.join(THIS_DIR, ".git", "modules", "themes", "docsy", "info", "exclude"),
        "w",
    ) as fp:
        fp.write("assets/scss/_theme_colors.scss\n")
