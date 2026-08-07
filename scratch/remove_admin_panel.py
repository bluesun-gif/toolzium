import os
import shutil

paths_to_remove = [
    r"c:\Users\LOQ\toolflux\app\admin",
    r"c:\Users\LOQ\toolflux\app\api\admin",
    r"c:\Users\LOQ\toolflux\components\admin",
]

for p in paths_to_remove:
    if os.path.exists(p):
        if os.path.isdir(p):
            shutil.rmtree(p)
            print(f"Removed directory: {p}")
        else:
            os.remove(p)
            print(f"Removed file: {p}")
