import os
import re

TOOLS_DIR = r"c:\Users\LOQ\toolflux\components\tools"

findings = []

for root, dirs, files in os.walk(TOOLS_DIR):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            content = open(path, "r", encoding="utf-8", errors="replace").read()

            # Find all <div className="...flex...gap..."> containing multiple <Button> elements
            matches = re.finditer(r'<div\s+className=["\']([^"\']*\bflex\b(?!.*flex-col)[^"\']*)["\']>([\s\S]*?)(?:</div>\s*</div>|</div>)', content)
            for m in matches:
                cls = m.group(1)
                inner = m.group(2)
                button_count = len(re.findall(r'<Button\b', inner))
                # If there are 2 or more buttons in a horizontal flex without sm:flex-row or flex-col
                if button_count >= 2 and "flex-col" not in cls and "flex-wrap" not in cls and "grid" not in cls:
                    # Check button text lengths
                    btn_texts = re.findall(r'>([^<]{12,})</Button>|>([^<]{12,})</span>', inner)
                    long_texts = [t[0] or t[1] for t in btn_texts if (t[0] or t[1]).strip()]
                    if long_texts:
                        findings.append({
                            "file": os.path.relpath(path, TOOLS_DIR),
                            "class": cls,
                            "buttons": long_texts,
                            "snippet": m.group(0)[:180]
                        })

print(f"Found {len(findings)} potential button cutoff rows:")
for item in findings:
    print(f"\n📁 {item['file']}")
    print(f"   Class: {item['class']}")
    print(f"   Long Buttons: {item['buttons']}")
