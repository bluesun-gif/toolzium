import os

tools_dir = r"c:\Users\LOQ\toolflux\components\tools"

print("Searching for glassmorphism client component:")
for root, dirs, files in os.walk(tools_dir):
    for f in files:
        if "glass" in f.lower():
            print(" -", os.path.join(root, f))
