import os

app_dir = r"c:\Users\LOQ\toolflux\app"
print("Top-level directories in app/:")
for item in os.listdir(app_dir):
    full = os.path.join(app_dir, item)
    if os.path.isdir(full):
        print(" -", item)
