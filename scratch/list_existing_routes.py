import os

app_tools_dir = r"c:\Users\LOQ\toolflux\app\tools"
existing_routes = []

for root, dirs, files in os.walk(app_tools_dir):
    if "page.tsx" in files:
        rel_path = os.path.relpath(root, app_tools_dir)
        route_path = rel_path.replace("\\", "/")
        if route_path != ".":
            existing_routes.append(route_path)

print(f"Total existing tool routes: {len(existing_routes)}")
print("Sample existing routes:", sorted(existing_routes)[:30])

with open(r"c:\Users\LOQ\toolflux\scratch\existing_routes.txt", "w") as f:
    for r in sorted(existing_routes):
        f.write(r + "\n")
