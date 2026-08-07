import os

toolflux_dir = r"c:\Users\LOQ\toolflux"
admin_files = []
logo_files = []

for root, dirs, files in os.walk(toolflux_dir):
    if ".next" in root or "node_modules" in root or ".git" in root:
        continue
    for f in files:
        rel_path = os.path.relpath(os.path.join(root, f), toolflux_dir)
        if "admin" in f.lower() or "admin" in root.lower():
            admin_files.append(rel_path)
        if "logo" in f.lower() or "brand" in f.lower() or "navbar" in f.lower():
            logo_files.append(rel_path)

print(f"Admin files found ({len(admin_files)}):")
for a in admin_files:
    print(" -", a)

print(f"\nLogo/Navbar files found ({len(logo_files)}):")
for l in logo_files:
    print(" -", l)
