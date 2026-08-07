with open(r"c:\Users\LOQ\toolflux\data\tools.ts", "r", encoding="utf-8") as f:
    content = f.read()

for line in content.splitlines():
    if any(k in line.lower() for k in ["gold", "metal", "silver", "platinum"]):
        print(line)
