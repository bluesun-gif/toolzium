import os

downloads_dir = r"C:\Users\LOQ\Downloads"
print("Files in Downloads folder matching Recording:")
for f in os.listdir(downloads_dir):
    if "Recording" in f:
        print(" -", f, f"({os.path.getsize(os.path.join(downloads_dir, f))} bytes)")
