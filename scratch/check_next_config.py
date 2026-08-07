import os

toolflux_dir = r"c:\Users\LOQ\toolflux"
for f in os.listdir(toolflux_dir):
    if "next.config" in f:
        print("Found config file:", f)
        with open(os.path.join(toolflux_dir, f), "r") as file:
            print(file.read())
