with open(r"c:\Users\LOQ\toolflux\scratch\existing_routes.txt", "r") as f:
    routes = [line.strip() for line in f]

candidates = [
    "startup-name", # AI Startup Name & Brand Generator
    "social-bio", # AI Social Media Bio & Creator Tagline Generator
    "mesh-gradient", # CSS Mesh & Fluid Gradient Studio
    "json-to-typescript", # JSON to TypeScript Interface & Type Generator
]

for c in candidates:
    matches = [r for r in routes if c in r or c.replace("-", "") in r.replace("-", "")]
    print(f"Candidate '{c}': Matches in routes -> {matches}")
