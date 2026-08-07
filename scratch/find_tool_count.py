import os
import re

toolflux_dir = r"c:\Users\LOQ\toolflux"
matches = []

for root, dirs, files in os.walk(toolflux_dir):
    if ".next" in root or "node_modules" in root or ".git" in root:
        continue
    for f in files:
        if f.endswith((".ts", ".tsx", ".json", ".md")):
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
                content = file.read()
                if "464" in content or "463" in content or "450" in content:
                    lines = content.splitlines()
                    for idx, line in enumerate(lines):
                        if any(num in line for num in ["464", "463", "450"]):
                            matches.append((os.path.relpath(filepath, toolflux_dir), idx + 1, line.strip()))

print("Found occurrences of tool count:")
for m in matches:
    print(f"{m[0]}:{m[1]} -> {m[2]}")
