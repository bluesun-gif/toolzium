import { getVoteScore } from "@/lib/storage/expansion-db";

export interface AlternativeItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  license: "Open Source" | "Free / Freemium" | "Self-Hosted" | "Affordable";
  platforms: string[];
  pros: string[];
  cons: string[];
  stars: number;
  initialScore: number;
  isEditorChoice?: boolean;
}

export interface SoftwareAlternativeEntry {
  slug: string; // e.g. "photoshop"
  name: string; // e.g. "Adobe Photoshop"
  category: string; // e.g. "Graphic Design & Photo Editing"
  originalPrice: string; // e.g. "$22.99 / mo ($275.88 / yr)"
  description: string;
  icon: string;
  alternatives: AlternativeItem[];
}

export const ALTERNATIVES_DATABASE: SoftwareAlternativeEntry[] = [
  {
    slug: "photoshop",
    name: "Adobe Photoshop",
    category: "Graphic Design & Photo Editing",
    originalPrice: "$22.99/mo (Subscription)",
    description: "Industry-standard raster graphics editor, notorious for its expensive recurring Creative Cloud subscription.",
    icon: "🎨",
    alternatives: [
      {
        id: "photopea",
        name: "Photopea",
        tagline: "Free in-browser Photoshop clone with full PSD/AI/RAW support",
        description: "Runs 100% in your web browser with a nearly identical UI to Photoshop. Supports layers, smart objects, filters, layer masks, and export to PSD.",
        url: "https://www.photopea.com",
        license: "Free / Freemium",
        platforms: ["Web", "Windows", "Mac", "Linux"],
        pros: ["Zero installation needed", "Identical keyboard shortcuts to Photoshop", "Full PSD compatibility"],
        cons: ["Small banner ad on sidebar (free version)", "Requires internet to load initially"],
        stars: 4.9,
        initialScore: 420,
        isEditorChoice: true,
      },
      {
        id: "gimp",
        name: "GIMP",
        tagline: "The GNU Image Manipulation Program (100% Free & Open Source)",
        description: "Decades-proven open-source powerhouse for photo retouching, image composition, and graphic authoring.",
        url: "https://www.gimp.org",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["Completely free forever (GPLv3)", "Huge plugin and brush ecosystem", "Full offline power"],
        cons: ["Slightly steeper learning curve", "Different default keyboard shortcuts"],
        stars: 4.6,
        initialScore: 310,
      },
      {
        id: "krita",
        name: "Krita",
        tagline: "Professional free and open-source painting and illustration program",
        description: "Made by artists for artists. Incredible brush engines, stabilization, vector tools, and seamless textures.",
        url: "https://krita.org",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux", "Android"],
        pros: ["Unmatched brush engines and color management", "Non-destructive layer masks", "No subscriptions"],
        cons: ["Geared slightly more toward digital art than photo retouching"],
        stars: 4.8,
        initialScore: 280,
      },
    ],
  },
  {
    slug: "canva",
    name: "Canva",
    category: "Design & Social Graphics",
    originalPrice: "$12.99/mo ($119.99/yr)",
    description: "Cloud-based visual graphics platform popular for social media templates and presentations.",
    icon: "✨",
    alternatives: [
      {
        id: "penpot",
        name: "Penpot",
        tagline: "Open-source, web-based design and prototyping platform",
        description: "Uses native web standards (SVG and CSS Grid/Flexbox) so designers and developers build on the exact same code foundation.",
        url: "https://penpot.app",
        license: "Open Source",
        platforms: ["Web", "Self-Hosted"],
        pros: ["100% SVG based", "Self-hostable for full privacy", "Unlimited team collaborators free"],
        cons: ["Fewer pre-made stock templates than Canva"],
        stars: 4.8,
        initialScore: 245,
        isEditorChoice: true,
      },
      {
        id: "polotno",
        name: "Polotno Studio",
        tagline: "Clean, free canvas editor with zero login and no paywalls",
        description: "Instant in-browser design creator for social posts, flyers, banners, and YouTube thumbnails.",
        url: "https://studio.polotno.com",
        license: "Free / Freemium",
        platforms: ["Web"],
        pros: ["No account or signup required", "Export in PNG/PDF/JSON", "Fast and lightweight"],
        cons: ["Simpler feature set than full Canva suite"],
        stars: 4.5,
        initialScore: 190,
      },
    ],
  },
  {
    slug: "notion",
    name: "Notion",
    category: "Productivity & Note Taking",
    originalPrice: "$10.00/user/mo",
    description: "All-in-one workspace for notes, databases, and project management that locks your data in the cloud.",
    icon: "📓",
    alternatives: [
      {
        id: "obsidian",
        name: "Obsidian",
        tagline: "A second brain for you, forever — 100% local Markdown files",
        description: "Your notes live on your device as plain-text Markdown files. Massive community plugin ecosystem with interactive knowledge graph.",
        url: "https://obsidian.md",
        license: "Free / Freemium",
        platforms: ["Windows", "macOS", "Linux", "iOS", "Android"],
        pros: ["Complete data ownership (plain Markdown)", "Works 100% offline", "1,500+ free community plugins"],
        cons: ["Official mobile sync is a paid add-on (or free via iCloud/Git)"],
        stars: 4.9,
        initialScore: 520,
        isEditorChoice: true,
      },
      {
        id: "appflowy",
        name: "AppFlowy",
        tagline: "Open-source Notion alternative with complete data security",
        description: "Built with Flutter and Rust for blazing performance. Offers Kanban boards, grid tables, document trees, and offline storage.",
        url: "https://www.appflowy.io",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux", "iOS", "Android", "Self-Hosted"],
        pros: ["Open-source AGPL-3.0", "Fast native performance (Rust backend)", "Self-hostable"],
        cons: ["Newer ecosystem with evolving features"],
        stars: 4.7,
        initialScore: 340,
      },
    ],
  },
  {
    slug: "microsoft-office",
    name: "Microsoft 365 / Office",
    category: "Office & Document Suite",
    originalPrice: "$69.99 - $99.99/yr",
    description: "Proprietary productivity suite comprising Word, Excel, PowerPoint, and Outlook.",
    icon: "📄",
    alternatives: [
      {
        id: "libreoffice",
        name: "LibreOffice",
        tagline: "The world's most popular free and open-source office suite",
        description: "Complete desktop office suite: Writer (Word), Calc (Excel), Impress (PowerPoint), Draw, and Math with full DOCX and XLSX compatibility.",
        url: "https://www.libreoffice.org",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["Full offline suite with no subscriptions", "Compatible with all MS Office formats", "No tracking or telemetry"],
        cons: ["Traditional UI aesthetic"],
        stars: 4.7,
        initialScore: 410,
        isEditorChoice: true,
      },
      {
        id: "onlyoffice",
        name: "ONLYOFFICE",
        tagline: "Modern web and desktop office suite with real-time co-authoring",
        description: "Offers high compatibility with MS formats, modern ribbon interface, and self-hosted cloud collaboration.",
        url: "https://www.onlyoffice.com",
        license: "Open Source",
        platforms: ["Web", "Windows", "macOS", "Linux", "Self-Hosted"],
        pros: ["Near-identical UI to Microsoft 365", "Excellent collaborative editing", "Strong format fidelity"],
        cons: ["Community edition has concurrent connection limits for self-hosting"],
        stars: 4.6,
        initialScore: 290,
      },
    ],
  },
  {
    slug: "premiere-pro",
    name: "Adobe Premiere Pro",
    category: "Video Editing",
    originalPrice: "$22.99/mo ($275.88/yr)",
    description: "Industry timeline video editing application tied to Adobe Creative Cloud.",
    icon: "🎬",
    alternatives: [
      {
        id: "davinci-resolve",
        name: "DaVinci Resolve (Free)",
        tagline: "Hollywood-grade color grading, editing, VFX, and audio post-production",
        description: "The free edition of DaVinci Resolve is more powerful than most paid NLEs. Includes multi-cam editing, Fusion VFX, Fairlight audio, and industry color wheels.",
        url: "https://www.blackmagicdesign.com/products/davinciresolve",
        license: "Free / Freemium",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["No watermarks or time limits in free version", "Industry-best color grading", "Full GPU acceleration"],
        cons: ["Requires decent GPU hardware to run smoothly"],
        stars: 4.9,
        initialScore: 480,
        isEditorChoice: true,
      },
      {
        id: "kdenlive",
        name: "Kdenlive",
        tagline: "Free and open-source multi-track video editor by KDE",
        description: "Lightweight, powerful multi-track timeline video editor with audio/video effects, color correction, and proxy clip rendering.",
        url: "https://kdenlive.org",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["100% free and open source", "Lightweight on CPU/RAM", "Supports virtually all video formats via FFmpeg"],
        cons: ["Less advanced motion graphics tools than Resolve"],
        stars: 4.5,
        initialScore: 210,
      },
    ],
  },
  {
    slug: "illustrator",
    name: "Adobe Illustrator",
    category: "Vector Illustration",
    originalPrice: "$22.99/mo ($275.88/yr)",
    description: "Industry vector illustration tool with subscription-only licensing.",
    icon: "✒️",
    alternatives: [
      {
        id: "inkscape",
        name: "Inkscape",
        tagline: "Professional quality vector graphics software (100% Free & Open Source)",
        description: "Full-featured vector editor supporting SVG, Bezier curves, text-on-path, node editing, boolean operations, and bitmap tracing.",
        url: "https://inkscape.org",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["Native standard SVG file format", "Advanced node editing and path manipulation", "Active open-source community"],
        cons: ["Complex multi-page document handling in older versions"],
        stars: 4.7,
        initialScore: 360,
        isEditorChoice: true,
      },
      {
        id: "vectr",
        name: "Vectr",
        tagline: "Simple yet powerful free web vector graphics editor",
        description: "Intuitive browser-based vector editor for quick logos, social icons, and mockups.",
        url: "https://vectr.com",
        license: "Free / Freemium",
        platforms: ["Web"],
        pros: ["Easy for beginners", "Real-time sharing via URL", "Zero setup"],
        cons: ["Requires active internet connection"],
        stars: 4.3,
        initialScore: 160,
      },
    ],
  },
  {
    slug: "figma",
    name: "Figma",
    category: "UI/UX & Collaborative Design",
    originalPrice: "$12 - $75/editor/mo",
    description: "Cloud-based collaborative interface design and prototyping tool.",
    icon: "📐",
    alternatives: [
      {
        id: "penpot",
        name: "Penpot",
        tagline: "Open-source, web-based design and prototyping platform built on SVG",
        description: "Direct open-source rival to Figma. Supports multi-player collaborative canvas, components, auto-layout (Flexbox & CSS Grid), and interactive prototyping.",
        url: "https://penpot.app",
        license: "Open Source",
        platforms: ["Web", "Self-Hosted"],
        pros: ["100% SVG and open web standards", "No limits on team editors in self-hosted mode", "Native CSS Grid layout engine"],
        cons: ["Smaller third-party plugin ecosystem than Figma"],
        stars: 4.9,
        initialScore: 490,
        isEditorChoice: true,
      },
      {
        id: "lunacy",
        name: "Lunacy (Icons8)",
        tagline: "Free offline-first graphic design software with built-in AI tools",
        description: "Native cross-platform vector design application with built-in icons, illustrations, photos, and AI background removal.",
        url: "https://icons8.com/lunacy",
        license: "Free / Freemium",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["Works 100% offline", "Extremely fast native performance (C# / Swift)", "Opens and saves Sketch files"],
        cons: ["Cloud collaboration requires internet connection"],
        stars: 4.6,
        initialScore: 310,
      },
    ],
  },
  {
    slug: "after-effects",
    name: "Adobe After Effects",
    category: "Motion Graphics & VFX",
    originalPrice: "$22.99/mo ($275.88/yr)",
    description: "Digital visual effects, motion graphics, and compositing application.",
    icon: "✨",
    alternatives: [
      {
        id: "blender",
        name: "Blender",
        tagline: "Free and open-source 3D and 2D VFX creation suite",
        description: "Massive open-source powerhouse supporting 3D modeling, rigging, animation, simulation, rendering, compositing, and 2D Grease Pencil animation.",
        url: "https://www.blender.org",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["Completely free forever (GPL)", "World-class 2D/3D compositing & VFX pipeline", "Massive global tutorial ecosystem"],
        cons: ["Steeper learning curve for pure 2D motion graphics"],
        stars: 4.9,
        initialScore: 530,
        isEditorChoice: true,
      },
      {
        id: "natron",
        name: "Natron",
        tagline: "Open-source node-based compositing software for VFX and motion graphics",
        description: "Node-based digital compositor modeled after industry standards like Nuke and After Effects. Supports OpenFX plugins and rotoscoping.",
        url: "https://natrongithub.github.io",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["Node-based architecture for complex compositing", "OpenFX plugin standard support", "Lightweight on system resources"],
        cons: ["Less active recent core UI development"],
        stars: 4.4,
        initialScore: 210,
      },
    ],
  },
  {
    slug: "slack",
    name: "Slack",
    category: "Team Messaging & Communication",
    originalPrice: "$7.25 - $12.50/user/mo",
    description: "Enterprise communication platform with 90-day message history lock on free tier.",
    icon: "💬",
    alternatives: [
      {
        id: "mattermost",
        name: "Mattermost",
        tagline: "Open-source, self-hosted collaboration platform for high-security teams",
        description: "Drop-in open-source Slack alternative with channels, threads, boards, voice calling, and infinite searchable message history.",
        url: "https://mattermost.com",
        license: "Open Source",
        platforms: ["Web", "Windows", "macOS", "Linux", "iOS", "Android", "Self-Hosted"],
        pros: ["Full self-hosted data ownership", "Unlimited message search history", "Enterprise compliance & security"],
        cons: ["Self-hosting requires server maintenance"],
        stars: 4.8,
        initialScore: 420,
        isEditorChoice: true,
      },
      {
        id: "zulip",
        name: "Zulip",
        tagline: "Organized team chat with email-style threading",
        description: "Unique topic-based threading keeps team communication organized so you never lose context in fast-moving channels.",
        url: "https://zulip.com",
        license: "Open Source",
        platforms: ["Web", "Windows", "macOS", "Linux", "iOS", "Android"],
        pros: ["Best threading model in the industry", "100% open source", "Extremely low server memory usage"],
        cons: ["Requires minor shift in communication mindset from Slack"],
        stars: 4.7,
        initialScore: 310,
      },
    ],
  },
  {
    slug: "zoom",
    name: "Zoom Workplace",
    category: "Video Conferencing",
    originalPrice: "$13.32 - $20.82/user/mo",
    description: "Video meeting platform with 40-minute limit on free tier group calls.",
    icon: "📹",
    alternatives: [
      {
        id: "jitsi-meet",
        name: "Jitsi Meet",
        tagline: "100% Open Source, fully encrypted video conferencing with zero accounts required",
        description: "Instant video conferencing directly in the browser. No download, no account creation, no time limits, and end-to-end encryption support.",
        url: "https://meet.jit.si",
        license: "Open Source",
        platforms: ["Web", "iOS", "Android", "Self-Hosted"],
        pros: ["No account registration needed to start or join", "No 40-minute meeting time limits", "End-to-end encryption available"],
        cons: ["Requires high server bandwidth for 50+ participants on self-hosted instances"],
        stars: 4.8,
        initialScore: 450,
        isEditorChoice: true,
      },
    ],
  },
  {
    slug: "lightroom",
    name: "Adobe Lightroom",
    category: "Photo Management & RAW Processing",
    originalPrice: "$9.99 - $19.99/mo",
    description: "Cloud-based RAW photo editing and non-destructive image asset management.",
    icon: "📷",
    alternatives: [
      {
        id: "darktable",
        name: "Darktable",
        tagline: "Open-source photography workflow application and RAW developer",
        description: "Virtual lighttable and darkroom for photographers. Non-destructive RAW development, color grading, tone curves, and lens correction.",
        url: "https://www.darktable.org",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["Non-destructive 32-bit floating point pipeline", "Extensive color science and masking modules", "Zero subscriptions"],
        cons: ["Steep initial learning curve"],
        stars: 4.7,
        initialScore: 390,
        isEditorChoice: true,
      },
      {
        id: "rawtherapee",
        name: "RawTherapee",
        tagline: "Powerful, cross-platform raw photo processing system",
        description: "Advanced demosaicing, state-of-the-art color correction, wavelet processing, and batch RAW processing engine.",
        url: "https://www.rawtherapee.com",
        license: "Open Source",
        platforms: ["Windows", "macOS", "Linux"],
        pros: ["Unrivaled detail extraction from RAW sensor data", "Fast batch image processing", "100% free"],
        cons: ["Asset management/cataloging is basic compared to Darktable"],
        stars: 4.6,
        initialScore: 280,
      },
    ],
  },
];

export function getSoftwareAlternative(slug: string): SoftwareAlternativeEntry | null {
  const clean = slug.trim().toLowerCase();
  const found = ALTERNATIVES_DATABASE.find((s) => s.slug === clean);
  if (!found) return null;

  // Enrich with dynamic community votes from database
  const enrichedAlternatives = found.alternatives.map((alt) => {
    const voteKey = `alt:${found.slug}:${alt.id}`;
    const { score } = getVoteScore(voteKey);
    return {
      ...alt,
      stars: Number(Math.min(5, Math.max(3.5, alt.stars + (score > 0 ? 0.1 : 0))).toFixed(1)),
      initialScore: alt.initialScore + score,
    };
  });

  return {
    ...found,
    alternatives: enrichedAlternatives.sort((a, b) => b.initialScore - a.initialScore),
  };
}

export function getAllSoftwareSlugs(): string[] {
  return ALTERNATIVES_DATABASE.map((s) => s.slug);
}
