import os

toolflux_dir = r"c:\Users\LOQ\toolflux"
auth_files = []

for root, dirs, files in os.walk(toolflux_dir):
    if ".next" in root or "node_modules" in root or ".git" in root:
        continue
    for f in files:
        if "auth" in f.lower() or "google" in f.lower() or "db" in f.lower() or "user" in f.lower():
            auth_files.append(os.path.relpath(os.path.join(root, f), toolflux_dir))

print("Auth related files:")
for f in sorted(auth_files)[:30]:
    print(" -", f)
