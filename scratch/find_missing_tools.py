with open(r"c:\Users\LOQ\toolflux\scratch\existing_routes.txt", "r") as f:
    routes = [line.strip() for line in f]

candidates = [
    "ambient-noise", # Ambient Noise & Brown/White Noise Focus Sound Generator
    "youtube-script", # AI YouTube Video Script & Hook Generator
    "gradient-generator", # CSS Mesh & Linear Gradient Studio
    "markdown-studio", # Real-time Markdown Editor & PDF/HTML Exporter
    "sql-formatter", # SQL Query Formatter & Beautifier Studio
    "social-bio", # AI Social Media Bio & Creator Tagline Generator
]

for c in candidates:
    matches = [r for r in routes if c in r or c.replace("-", "") in r.replace("-", "")]
    print(f"Candidate '{c}': Matches in routes -> {matches}")
