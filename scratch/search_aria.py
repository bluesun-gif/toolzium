import os

search_roots = [
    r"C:\Users\LOQ",
    r"C:\Users\LOQ\Downloads",
    r"C:\Users\LOQ\Desktop",
    r"C:\Users\LOQ\.gemini",
    r"C:\Users\LOQ\.hermes",
    r"C:\Users\LOQ\toolflux"
]

print("Searching for files containing 'aria':")
found_files = []

for root_dir in search_roots:
    if not os.path.exists(root_dir):
        continue
    for root, dirs, files in os.walk(root_dir):
        # Skip node_modules and .git to speed up
        if "node_modules" in root or ".git" in root or ".next" in root:
            continue
        for f in files:
            if "aria" in f.lower():
                full_path = os.path.join(root, f)
                found_files.append(full_path)
                print(" -", full_path)

print(f"\nTotal 'aria' files found: {len(found_files)}")
