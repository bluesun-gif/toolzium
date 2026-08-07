import os

tools_dir = r"c:\Users\LOQ\toolflux\components\tools"

count = 0
for root, dirs, files in os.walk(tools_dir):
    for f in files:
        if f.endswith(".tsx"):
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
                content = file.read()
            
            modified = False
            if "bg-slate-950" in content:
                content = content.replace("bg-slate-950", "bg-[#0f172a] text-[#f8fafc]")
                modified = True
            if "bg-slate-900" in content and "dark:bg-slate-900" not in content:
                content = content.replace("bg-slate-900", "bg-[#0f172a] text-[#f8fafc]")
                modified = True
                
            if modified:
                with open(filepath, "w", encoding="utf-8") as file:
                    file.write(content)
                count += 1
                print(f"Patched contrast styling in {os.path.basename(filepath)}")

print(f"Total files updated for Light/Dark Mode Code Contrast: {count}")
