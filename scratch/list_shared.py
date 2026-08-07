import os

shared_dir = r"c:\Users\LOQ\toolflux\components\shared"

print("Shared components:")
for f in os.listdir(shared_dir):
    print(" -", f)
