import os

log_path = r"C:\Users\LOQ\.gemini\antigravity\brain\78a88fc0-00f4-4eef-918c-35c3ec82723e\.system_generated\tasks\task-1838.log"
if os.path.exists(log_path):
    with open(log_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
        lines = [line for line in content.split("\n") if "admin" in line.lower()]
        print("Found admin lines in build log:", len(lines))
        for line in lines[:20]:
            print(" -", line)
