import re

tools_file = r"c:\Users\LOQ\toolflux\data\tools.ts"

with open(tools_file, "r", encoding="utf-8") as f:
    content = f.read()

# New items to add to AI Tools
ai_items = """      {
        title: "AI Prompt Engineering & Optimizer Studio",
        url: "/tools/ai/prompt-optimizer",
        description: "Transform simple ideas into master-grade prompts for ChatGPT, Claude 3.5, Gemini, and Midjourney with 1-click persona framing.",
        popular: true,
      },
      {
        title: "AI YouTube Video Script & High-CTR Hook Generator",
        url: "/tools/ai/youtube-script",
        description: "Generate viral YouTube video titles, 15-second opening hooks, video section outlines, and teleprompter-ready scripts.",
        popular: true,
      },
      {
        title: "AI Startup & Business Name Generator Studio",
        url: "/tools/ai/startup-name",
        description: "Generate brandable startup names, available domain ideas (.ai, .com, .io), taglines, and elevator pitches.",
        popular: true,
      },
      {
        title: "AI Social Media Bio & Creator Profile Generator",
        url: "/tools/ai/social-bio",
        description: "Generate high-converting, aesthetic bios for Instagram, TikTok, Twitter/X, and LinkedIn with 1-click vibe controls.",
        popular: true,
      },"""

# New items for Developer Tools
dev_items = """      {
        title: "SVG Vector Path Optimizer & React JSX Minifier",
        url: "/tools/dev/svg-optimizer",
        description: "Clean up SVG code, remove comments, minify vector paths, and convert raw SVG code into production-ready React JSX components.",
        popular: true,
      },
      {
        title: "CSS Mesh & Fluid Gradient Generator Studio",
        url: "/tools/dev/mesh-gradient",
        description: "Design multi-color fluid mesh gradients with real-time canvas preview and 1-click CSS / Tailwind CSS export.",
        popular: true,
      },
      {
        title: "JSON to TypeScript Interface & Zod Schema Studio",
        url: "/tools/dev/json-to-typescript",
        description: "Convert raw JSON objects into strict TypeScript interfaces, type aliases, and Zod validation schemas instantly.",
        popular: true,
      },"""

# New items for Image Tools
image_items = """      {
        title: "Photo EXIF Metadata Inspector & Privacy GPS Stripper",
        url: "/tools/image/exif-inspector",
        description: "Inspect camera settings, aperture, ISO, and GPS location coordinates, and strip EXIF metadata 100% locally in your browser.",
        popular: true,
      },"""

# New items for Productivity Tools
prod_items = """      {
        title: "Ambient Focus Noise & Binaural Sound Generator Studio",
        url: "/tools/productivity/ambient-noise",
        description: "Synthesize Brown Noise, Pink Noise, White Noise, and 40Hz Binaural Beats 100% in your browser for deep work, focus, and sleep.",
        popular: true,
      },"""

# New items for Text Tools
text_items = """      {
        title: "Interactive Markdown Editor & Live Preview Studio",
        url: "/tools/text/markdown-studio",
        description: "Write, format, and render Markdown documents in real-time with live HTML preview, reading time statistics, and 1-click export.",
        popular: true,
      },"""

# Add to AI Tools
if "/tools/ai/prompt-optimizer" not in content:
    content = content.replace('title: "AI Tools",\n    url: "/tools/ai",\n    icon: Sparkles,\n    isActive: true,\n    items: [', 'title: "AI Tools",\n    url: "/tools/ai",\n    icon: Sparkles,\n    isActive: true,\n    items: [\n' + ai_items)

# Add to Developer Tools
if "/tools/dev/svg-optimizer" not in content:
    content = content.replace('title: "Developer Tools",\n    url: "/tools/dev",', 'title: "Developer Tools",\n    url: "/tools/dev",\n    icon: Braces,\n    isActive: true,\n    items: [\n' + dev_items)

# Add to Image Tools
if "/tools/image/exif-inspector" not in content:
    content = content.replace('title: "Image & Graphic Tools",', 'title: "Image & Graphic Tools",\n    url: "/tools/image",\n    icon: ImageIcon,\n    isActive: true,\n    items: [\n' + image_items)

# Add to Productivity Tools
if "/tools/productivity/ambient-noise" not in content:
    content = content.replace('title: "Productivity & Focus Tools",', 'title: "Productivity & Focus Tools",\n    url: "/tools/productivity",\n    icon: LayoutDashboard,\n    isActive: true,\n    items: [\n' + prod_items)

# Add to Text Tools
if "/tools/text/markdown-studio" not in content:
    content = content.replace('title: "Text & String Utilities",', 'title: "Text & String Utilities",\n    url: "/tools/text",\n    icon: Type,\n    isActive: true,\n    items: [\n' + text_items)

with open(tools_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully registered new tools into data/tools.ts!")
