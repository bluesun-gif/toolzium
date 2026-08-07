import os

components_dir = r"c:\Users\LOQ\toolflux\components"

print("Searching for sidebar component files:")
for root, dirs, files in os.walk(components_dir):
    for f in files:
        if "sidebar" in f.lower() or "nav" in f.lower():
            print(" -", os.path.join(root, f))
