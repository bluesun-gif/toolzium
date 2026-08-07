import os

search_paths = [
    r"C:\Users\LOQ",
    r"C:\Users\LOQ\Desktop",
    r"C:\Users\LOQ\Documents",
    r"C:\Users\LOQ\Downloads",
    r"C:\Users\LOQ\.gemini",
    r"C:\Users\LOQ\.hermes",
    r"C:\Users\LOQ\.config"
]

print("Searching for key/credentials/aria files...")
found_files = []

for base_dir in search_paths:
    if not os.path.exists(base_dir):
        continue
    for root, dirs, files in os.walk(base_dir):
        if any(skip in root for skip in ["node_modules", ".git", ".next", "AppData", "AppData\\Local"]):
            continue
        for f in files:
            f_lower = f.lower()
            if any(term in f_lower for term in ["aria", "groq", "openrouter", "key", "cred", "secret", "env"]):
                full_path = os.path.join(root, f)
                found_files.append(full_path)
                print(" -", full_path)

print(f"\nTotal potential credential files found: {len(found_files)}")
