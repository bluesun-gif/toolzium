# Hermes Design Judge — Homepage Design DNA Spec (the STANDARD)

Tool pages must replicate these homepage patterns EXACTLY:

## 1. Background Grid (DONE)
- `<GridPattern />` visible (homepage default styling, no mask/opacity)
- Root container `relative`

## 2. Buttons (DONE)
- All buttons use shared `<Button>` (ui/button) with variants:
  default = bg-primary text-primary-foreground
  outline = border + hover:bg-accent
  ghost = hover:bg-accent
  secondary / destructive / link
- sizes: sm / default / lg / icon

## 3. Cards
- Use `<GlassCard>` (ui/glass-card) or `<Card>` (ui/card) — homepage uses both
- GlassCard: glassmorphism (bg-card/70 backdrop-blur-md rounded-2xl border)
- Consistent rounded-2xl, border-border/80, shadow

## 4. Typography (global, inherited)
- Inter (sans), Space Grotesk (display), JetBrains Mono (mono)
- Headings: font-bold tracking-tight

## 5. Section structure (per tool)
- ToolPageHeader (icon + title + description + actions)
- Input Card (GlassCard)
- Result Card (GlassCard)
- ToolHowItWorks (3 steps)
- ToolFeatureGuides
- ToolFaqAccordion
- RelatedTools

## 6. Badges
- Homepage uses `<Badge>` (ui/badge) for tags — tools should too

## 7. Spacing/Layout
- max-w-6xl mx-auto, space-y-8, px-2 sm:px-4
- Consistent with homepage container

JUDGE RULE: A tool PASSES when it has GridPattern + ToolPageHeader +
GlassCard/Card + Button (shared) + all 4 sections + consistent spacing.
FAILS when any element uses raw <button>, raw <div> card without styling,
or diverges from the above tokens.
