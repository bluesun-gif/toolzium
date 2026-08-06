import os
import re

tools_dir = r"c:\Users\LOQ\toolflux\components\tools"
grid_issues = []
button_issues = []

for root, dirs, files in os.walk(tools_dir):
    for f in files:
        if f.endswith(".tsx"):
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
                content = file.read()
                filename = os.path.basename(filepath)
                
                # Check for grid-cols-2 that forces 2 columns on mobile
                if re.search(r'grid-cols-2(?!\s+sm:)', content) or "grid-cols-2 gap" in content:
                    grid_issues.append(filename)
                
                # Check for flex containers missing min-w-0
                if "flex-1" in content and "min-w-0" not in content:
                    button_issues.append(filename)

print("Grid cols 2 candidates (needs sm:grid-cols-2):", set(grid_issues))
