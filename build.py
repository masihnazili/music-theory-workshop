#!/usr/bin/env python3
"""Assemble index.html from src/ (template + style.css + app.js + practice.js)."""
import pathlib, sys
root = pathlib.Path(__file__).resolve().parent
src = root / "src"
read = lambda n: (src / n).read_text(encoding="utf-8")
app = read("app.js")
marker = "/*@@PRACTICE@@*/"
if app.count(marker) != 1:
    sys.exit("app.js must contain exactly one %s marker" % marker)
app = app.replace(marker, read("practice.js").rstrip("\n"))
html = read("template.html").replace("{{STYLE}}", read("style.css").rstrip("\n")).replace("{{APP}}", app.rstrip("\n"))
(root / "index.html").write_text(html, encoding="utf-8")
print("index.html written: %d KB" % (len(html.encode("utf-8")) // 1024))
