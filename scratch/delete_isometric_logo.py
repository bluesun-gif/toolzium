import os

filepath = r"c:\Users\LOQ\toolflux\components\shared\isometric-cube-logo.tsx"
if os.path.exists(filepath):
    os.remove(filepath)
    print("Deleted isometric-cube-logo.tsx successfully.")
