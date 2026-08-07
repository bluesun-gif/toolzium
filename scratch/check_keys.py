import os
import re

env_file = r"c:\Users\LOQ\toolflux\.env"
if os.path.exists(env_file):
    with open(env_file, "r") as f:
        print(".env contents:")
        for line in f:
            if "KEY" in line or "GROQ" in line or "AI" in line or "DATABASE" in line:
                key_name = line.split("=")[0] if "=" in line else line
                print(" -", key_name.strip())
