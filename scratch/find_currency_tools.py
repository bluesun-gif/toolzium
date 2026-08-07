import os

tools_dir = r"c:\Users\LOQ\toolflux\components\tools"

print("Searching for currency, finance, and metal tools:")
for root, dirs, files in os.walk(tools_dir):
    for f in files:
        if any(kw in f.lower() for kw in ["currency", "crypto", "gold", "metal", "exchange", "price"]):
            print(" -", os.path.join(root, f))
