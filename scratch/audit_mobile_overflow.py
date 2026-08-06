import os
import glob
import re

tools_dir = r"c:\Users\LOQ\toolflux\components\tools"
issues = []

for root, dirs, files in os.walk(tools_dir):
    for f in files:
        if f.endswith(".tsx"):
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
                content = file.read()
                # Check for flex rows with 3+ buttons or inputs that lack flex-wrap or grid
                if ("flex items-center gap-" in content or "flex gap-" in content) and not ("flex-wrap" in content or "grid" in content or "overflow" in content):
                    # Check if file has action buttons or copy buttons
                    if "Button" in content or "Copy" in content:
                        issues.append((filepath, "Potential flex row without wrap"))

print(f"Total files checked. Potential candidates: {len(issues)}")
for path, desc in issues[:20]:
    print(f"- {os.path.basename(path)}: {desc}")
