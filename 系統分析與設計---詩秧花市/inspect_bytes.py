from pathlib import Path
text = Path(r"public/scripts/app.js").read_text(encoding="utf-8")
line = [ln for ln in text.splitlines() if "redirect" in ln and "alert" in ln][0]
print(list(line.encode("utf-8")))
print(list("        alert('�n�J���\\�I');`r`nif (redirect) { window.location.href = redirect; return; }".encode("utf-8")))
