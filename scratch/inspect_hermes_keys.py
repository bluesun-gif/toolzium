import os

env_paths = [
    r"C:\Users\LOQ\.hermes\hermes-office\.env",
    r"C:\Users\LOQ\.hermes\hermes-web\.env.local",
    r"C:\Users\LOQ\.hermes\profiles\search\.env",
    r"C:\Users\LOQ\.hermes\state-snapshots\20260725-072337-pre-update\.env"
]

groq_keys = []
openrouter_keys = []
openai_keys = []

for path in env_paths:
    if os.path.exists(path):
        print(f"Reading {path}:")
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    print(f" - Found key name: {key}")
                    if "GROQ" in key and val:
                        groq_keys.append(val)
                    elif "OPENROUTER" in key and val:
                        openrouter_keys.append(val)
                    elif "OPENAI" in key and val:
                        openai_keys.append(val)

print(f"\nExtracted {len(groq_keys)} Groq keys, {len(openrouter_keys)} OpenRouter keys, {len(openai_keys)} OpenAI keys.")
