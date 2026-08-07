with open(r"c:\Users\LOQ\toolflux\data\tools.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, l in enumerate(lines):
    if "finance" in l.lower() and "category" in l.lower() or "title:" in l and "finance" in l.lower():
        print(f"Line {idx+1}: {l.strip()}")
