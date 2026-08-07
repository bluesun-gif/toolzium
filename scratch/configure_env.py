import os

env_local_path = r"C:\Users\LOQ\.hermes\hermes-web\.env.local"
search_env_path = r"C:\Users\LOQ\.hermes\profiles\search\.env"

groq_keys = set()
openrouter_keys = set()

def extract_from_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            if not val:
                continue
            if "GROQ" in key:
                groq_keys.add(val)
            elif "OPENROUTER" in key:
                openrouter_keys.add(val)

extract_from_file(env_local_path)
extract_from_file(search_env_path)

groq_str = ",".join(list(groq_keys))
openrouter_str = ",".join(list(openrouter_keys))

target_env = r"c:\Users\LOQ\toolflux\.env"
existing_content = ""
if os.path.exists(target_env):
    with open(target_env, "r", encoding="utf-8") as f:
        existing_content = f.read()

new_lines = []
for line in existing_content.splitlines():
    if not line.startswith("GROQ_API_KEYS") and not line.startswith("OPENROUTER_API_KEYS"):
        new_lines.append(line)

new_lines.append(f"GROQ_API_KEYS=\"{groq_str}\"")
new_lines.append(f"OPENROUTER_API_KEYS=\"{openrouter_str}\"")

with open(target_env, "w", encoding="utf-8") as f:
    f.write("\n".join(new_lines) + "\n")

print(f"Successfully configured {target_env} with {len(groq_keys)} Groq keys and {len(openrouter_keys)} OpenRouter keys!")
