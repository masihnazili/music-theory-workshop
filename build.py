#!/usr/bin/env python3
"""Assemble index.html from src/ (template + style.css + app.js + practice.js)."""
import pathlib, sys, subprocess, tempfile, os
root = pathlib.Path(__file__).resolve().parent
src = root / "src"
read = lambda n: (src / n).read_text(encoding="utf-8")
app = read("app.js")
marker = "/*@@PRACTICE@@*/"
if app.count(marker) != 1:
    sys.exit("app.js must contain exactly one %s marker" % marker)
app = app.replace(marker, read("practice.js").rstrip("\n"))
tmp = pathlib.Path(tempfile.mkdtemp())
(tmp / "in.js").write_text(app, encoding="utf-8")
env = dict(os.environ)
env["NODE_PATH"] = os.pathsep.join(filter(None, [str(root / "node_modules"), env.get("NODE_PATH", ""), "/opt/node-tools/node_modules"]))
subprocess.run(["node", str(root / "i18n" / "tool.js"), "apply", str(tmp / "in.js"), str(tmp / "out.js"), str(root)], check=True, env=env)
app = (tmp / "out.js").read_text(encoding="utf-8")
html = read("template.html").replace("{{STYLE}}", read("style.css").rstrip("\n")).replace("{{APP}}", app.rstrip("\n"))
(root / "index.html").write_text(html, encoding="utf-8")
print("index.html written: %d KB" % (len(html.encode("utf-8")) // 1024))
