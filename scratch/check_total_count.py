import re

tools_file = r"c:\Users\LOQ\toolflux\data\tools.ts"

with open(tools_file, "r", encoding="utf-8") as f:
    content = f.read()

urls = re.findall(r'url:\s*"([^"]+)"', content)
actual_tools = [u for u in urls if u != "/tools" and not u.endswith("/tools") and u.count("/") > 2]
unique_tools = set(actual_tools)

print(f"Total unique tool URLs in data/tools.ts: {len(unique_tools)}")
