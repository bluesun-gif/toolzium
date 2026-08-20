import os
import re

TOOLS_DIR = r"c:\Users\LOQ\toolflux\components\tools"

found_issues = []

for root, dirs, files in os.walk(TOOLS_DIR):
    for f in files:
        if f.endsWith(".tsx") if hasattr(f, 'endsWith') else f.endswith(".tsx"):
            full_path = os.path.join(root, f)
            content = open(full_path, "r", encoding="utf-8", errors="replace").read()
            
            # Pattern: <Button without variant= but with text-primary in className
            # e.g. <Button ... className="...text-primary..."
            matches = re.finditer(r'<Button\b(?![^>]*\bvariant=)[^>]*className=["\'][^"\']*\btext-primary\b[^"\']*["\']', content)
            for m in matches:
                found_issues.append({
                    "file": os.path.relpath(full_path, TOOLS_DIR),
                    "snippet": m.group(0)
                })

print(f"Found {len(found_issues)} button contrast bugs:")
for item in found_issues:
    print(f"  {item['file']}: {item['snippet']}")
