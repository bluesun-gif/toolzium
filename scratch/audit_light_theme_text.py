import os
import re

tools_dir = r"c:\Users\LOQ\toolflux\components\tools"
code_block_files = []

for root, dirs, files in os.walk(tools_dir):
    for f in files:
        if f.endswith(".tsx"):
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
                content = file.read()
                filename = os.path.basename(filepath)
                
                if "bg-slate-950" in content or "bg-slate-900" in content or "bg-zinc-900" in content or "bg-black" in content:
                    code_block_files.append((filepath, filename))

print(f"Found {len(code_block_files)} files using dark code block backgrounds:")
for f in code_block_files[:40]:
    print(" -", f[1])
