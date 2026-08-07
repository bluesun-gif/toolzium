import os

files_to_update = [
    r"c:\Users\LOQ\toolflux\app\about\page.tsx",
    r"c:\Users\LOQ\toolflux\app\layout.tsx",
    r"c:\Users\LOQ\toolflux\app\page.tsx",
    r"c:\Users\LOQ\toolflux\app\tools\page.tsx",
    r"c:\Users\LOQ\toolflux\components\shared\navbar.tsx",
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        updated = content.replace("464+", "470+").replace("464", "470").replace("Explore All 450+ Tools", "Explore All 470+ Tools")
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(updated)
        print(f"Updated {os.path.basename(filepath)}")

print("All tool counts updated to 470+!")
