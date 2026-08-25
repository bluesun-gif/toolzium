import re

with open(r"C:\Users\LOQ\.gemini\antigravity\brain\397966db-1b49-47f0-aa9e-4416e24823ff\.system_generated\steps\7284\content.md", "r", encoding="utf-8") as f:
    data = f.read()

matches = re.findall(r'text:(".*?")(?=,time|,id|})', data)

with open(r"C:\Users\LOQ\toolflux\public\marketing\opencode_session_summary.txt", "w", encoding="utf-8") as out:
    out.write(f"Total text blocks: {len(matches)}\n\n")
    for i, m in enumerate(matches):
        clean = m.encode('utf-8').decode('unicode_escape', errors='ignore')
        out.write(f"================ MATCH {i+1} ================\n")
        out.write(clean + "\n\n")

print("Saved to public/marketing/opencode_session_summary.txt")
