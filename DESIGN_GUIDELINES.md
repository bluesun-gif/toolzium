# TOOLZIUM.COM — BRAND & DESIGN SYSTEM GUIDELINES
# Award-Winning UI/UX Specification for Toolzium Utility Web Application

---

## 1. DESIGN PHILOSOPHY & BRAND VISION
Toolzium is a modern, high-performance developer and professional utility platform.
Every tool page must feel like a **hand-crafted, premium software product**, eliminating all generic "AI-generated" template aesthetic. The design language inherits the original **Toolflux dark-mode grid aesthetic**:
- **Cohesive Dark Grid Surfaces**: Deep background with subtle SVG grid lines and soft radial purple glows.
- **Rich Control Flexibility**: Plentiful intuitive dropdowns, sliders, format selectors, and preset pills so users discover massive value.
- **Polished Micro-Interactions**: Hover glows, animated shiny badges, smooth accordion transitions, and tactile button states.
- **World-Class 5-Section Layout**: Universal section rhythm across all 547 tool pages.

---

## 2. COLOR PALETTE & DESIGN TOKENS

### Color Tokens (Tailwind HSL System):
| Token | Dark Value | Visual Role |
|---|---|---|
| `--background` | `hsl(240 10% 3.9%)` (`#09090b`) | Primary dark canvas |
| `--card` / `--popover` | `hsl(240 10% 3.9% / 0.7)` | Glassmorphism card surface with `backdrop-blur-md` |
| `--primary` | `hsl(263.4 70% 50.4%)` (`#8B5CF6`) | Brand Violet Accent — active states, primary buttons, glows |
| `--primary-foreground` | `hsl(0 0% 100%)` | Pure white text on primary buttons |
| `--muted` | `hsl(240 3.7% 15.9%)` | Input backgrounds, hover pill backgrounds |
| `--muted-foreground` | `hsl(240 5% 64.9%)` | Subtitles, secondary text, descriptions |
| `--border` | `hsl(240 3.7% 15.9% / 0.8)` | Subtle dark card borders |

### Surface Styling Rules:
- **Dark Glass Cards**: `bg-card/70 backdrop-blur-md border border-border/80 rounded-2xl shadow-lg`
- **Hover Glow**: `hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300`
- **Background Grid**: `<GridPattern className="stroke-border [mask-image:linear-gradient(to_bottom,white,transparent)]" />`
- **Radial Glow Ambient Light**: `bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-3xl`

---

## 3. TYPOGRAPHY & ANIMATED BADGES

### Typography Hierarchy:
- **Tool H1**: `text-2xl md:text-3xl font-extrabold tracking-tight text-foreground`
- **Section Headers (H2)**: `text-xl md:text-2xl font-bold tracking-tight text-foreground`
- **Card Subheaders (H3)**: `text-base font-semibold text-foreground`
- **Body & Editorial Prose**: `text-sm text-muted-foreground leading-relaxed`

### Animated Shiny Badge Standard:
Every tool header and key highlight section MUST include the **Animated Shiny Text Badge**:
```tsx
<div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-neutral-900 px-4 py-1 text-xs text-white">
  <AnimatedShinyText>
    <span>✨ Fast • Free • Privacy-Friendly</span>
  </AnimatedShinyText>
</div>
```

---

## 4. THE 5-SECTION PREMIUM LAYOUT ARCHITECTURE

Every tool page on Toolzium MUST implement these 5 sections in sequence:

### Section 1: Header (`ToolPageHeader`)
- Animated Shiny Text badge (`✨ Fast • Free • Privacy-Friendly` or tool-specific badge)
- Icon badge in glowing rounded container (`p-2.5 bg-primary/10 border border-primary/20 text-primary rounded-2xl`)
- H1 Title + 1-sentence subtitle + trust badges (`100% Free`, `Privacy-First`, `No Registration`)

### Section 2: Interactive Workspace Card
- **Layout Architecture**:
  - **Desktop (≥ 1280px)**: 2-column or 3-column layout.
    - **Left Control Panel**: Option dropdowns (Model, Persona, Format, Language), Sliders (Depth, Temperature, Quality), Output Modifiers (Toggles/Switches), Quick Preset Pills.
    - **Right Main Workspace**: Input Textarea / File Uploader + Primary Action Button + Output Display + Copy/Download Controls + Local History Drawer.
  - **Mobile (< 1024px)**: Stacked 1-column layout. Control panel stacks neatly above workspace with touch-friendly 44px minimum targets.

### Section 3: How It Works (`ToolHowItWorks`)
- 3 visual step cards with step numbers `01`, `02`, `03`
- Icon container with subtle rotation on hover (`group-hover:scale-110 group-hover:rotate-3`)
- Trust badges pill container at bottom (`100% Free`, `Instant`, `No Uploads Required`)

### Section 4: Feature Highlights & Editorial Content (`ToolFeatureGuides`)
- 3-6 Feature cards with glowing icon containers
- Deep SEO editorial container with markdown prose (500-1000 words, comparison tables, benchmarks, pro tips)

### Section 5: FAQ Accordion & Related Tools Grid
- **`ToolFaqAccordion`**: 3-5 structured FAQs using dark glass cards. Active item highlighted with purple left border accent (`border-l-4 border-l-primary`), glowing icon box, and smooth Chevron rotation.
- **`RelatedTools`**: 3-column grid of dark glass cards with purple hover titles, descriptions, and `Try it out ->` action links.

---

## 5. MOBILE RESPONSIVENESS & ERGONOMICS
- All cards use `px-4 py-5 sm:px-6 sm:py-6` responsive padding.
- Dropdown select triggers and buttons have minimum `h-10 sm:h-11` touch targets.
- Textareas and code output blocks scroll smoothly without causing viewport horizontal overflow (`max-w-full overflow-hidden`).
- Sidebars collapse or stack seamlessly on mobile.

---

## 6. QUALITY GATE & VERIFICATION
Before any tool page is considered complete:
1. `npx tsc --noEmit` must pass with 0 errors.
2. Form controls (dropdowns, sliders, switches, presets) must dynamically alter the tool logic.
3. Dark grid background + Animated Shiny Badge + Left accent FAQ accordion must be rendered.
4. Test on mobile view to confirm zero overflow and touch accessibility.
