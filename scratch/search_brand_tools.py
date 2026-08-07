with open(r"c:\Users\LOQ\toolflux\data\tools.ts", "r", encoding="utf-8") as f:
    content = f.read()

keywords = ["roblox", "mobile legends", "instagram", "tiktok", "discord", "free fire", "twitch", "gaming"]

for line in content.splitlines():
    if any(kw in line.lower() for kw in keywords):
        print(line.strip())
