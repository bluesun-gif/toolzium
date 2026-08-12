# TOOLZIUM.COM — MASTER PROJECT BRAIN & STRATEGIC CONTEXT
# Primary AI Assistant Context File for Toolzium Management

---

## 1. PROJECT IDENTITY & ESSENTIALS
- **Website Domain**: https://toolzium.com
- **Repository**: `https://github.com/bluesun-gif/toolzium.git` (Branch: `main`)
- **Primary Workspace Path**: `c:\Users\LOQ\Downloads\My AI Company\toolzium`
- **Owner**: Tanvir Ahmed Sohan (UTC+6)
- **Target Goal**: 10 Million Monthly Organic Visitors
- **Core Philosophy**: QUALITY OVER QUANTITY. Every tool on Toolzium must be the absolute best version available on the web.

---

## 2. SYSTEM ARCHITECTURE & FILE MAP

```
toolzium/
├── app/
│   ├── (marketing)/
│   │   ├── sponsor/page.tsx               # Sponsor page & pricing plans
│   │   └── about/
│   ├── api/
│   │   ├── ai/generate/route.ts          # Centralized AI Gateway (Groq -> OpenRouter -> Gemini)
│   │   └── ...
│   ├── tools/
│   │   ├── [category]/
│   │   │   └── [tool-slug]/
│   │   │       └── page.tsx               # Next.js Server Component page wrapper
│   └── layout.tsx                         # Global layout wrapped with PremiumProvider
├── components/
│   ├── providers/
│   │   └── premium-provider.tsx           # Global premium state context (localStorage)
│   ├── shared/
│   │   ├── tool-page-header.tsx           # Header (H1 + subtitle + trust badges)
│   │   ├── tool-how-it-works.tsx          # 3-step visual guide component
│   │   ├── tool-feature-guides.tsx        # Feature cards + 500-1000w SEO editorial container
│   │   ├── tool-faq-accordion.tsx         # Accessible FAQ accordion (JSON-LD ready)
│   │   ├── related-tools.tsx              # Dynamic cross-linking grid
│   │   ├── premium-modal.tsx              # Subscription modal ($4.99/mo, $2.99/yr, $29/life)
│   │   └── ad-slot.tsx                    # Auto-rotating developer ad slot (hidden for premium)
│   ├── tools/
│   │   └── [category]/
│   │       └── [tool-slug]-client.tsx     # Client UI component containing interactive tool logic
│   └── ui/                                # shadcn/ui components (Card, Button, Input, etc.)
├── data/
│   └── tools.ts                           # Master Tool Registry (547 tools with category, slug, metadata)
├── lib/
│   ├── ai/                                # AI gateway logic & fallbacks
│   └── utils/                             # Utility functions (encoders, parsers, calculators)
└── prisma/
    └── schema.prisma                      # PostgreSQL database schema (User, Session, Account)
```

---

## 3. TECH STACK & DEPENDENCIES
- **Framework**: Next.js 16 (App Router)
- **Runtime & UI**: React 19, TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Icons & Notifications**: `lucide-react`, `react-hot-toast`
- **Database**: Neon Cloud PostgreSQL (`prisma`)
- **AI Backend Multi-Tier Gateway**:
  1. Groq API (`GROQ_API_KEYS`) — High speed primary
  2. OpenRouter API (`OPENROUTER_KEY_1` to `OPENROUTER_KEY_39`) — Multi-model fallback
  3. Gemini API (`GEMINI_API_KEY_1` to `GEMINI_API_KEY_33`) — 33-key rotation pool

---

## 4. THE PREMIUM 5-SECTION LAYOUT STANDARD (NON-NEGOTIABLE)

Every tool page on Toolzium MUST contain the exact 5-section hierarchy:

1. **Tool Page Header**: `ToolPageHeader` (Title, Subtitle, Trust Badges)
2. **Tool Workspace**: Clean interactive card with sample loaders, action buttons, live outputs, and copy/download controls
3. **How It Works**: `ToolHowItWorks` (3 visual steps with `step: "01"`, `"02"`, `"03"`, icons, and badges)
4. **Feature Highlights & SEO Content**: `ToolFeatureGuides` (3-6 feature cards + 500-1000 word deep-dive SEO article with comparison tables, benchmarks, and guides)
5. **FAQ Accordion & Related Tools**: `ToolFaqAccordion` (3-5 structured FAQs) + `RelatedTools` cross-linking grid + 3 JSON-LD schemas (`WebApplication`, `FAQPage`, `BreadcrumbList`)

---

## 5. COMPONENT API CHEATSHEET

### Default Exports:
```tsx
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
```

### Named Exports:
```tsx
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton } from "@/components/shared/action-buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

### Important Component Rules:
- `ToolHowItWorks`: Steps array MUST have `step: "01"`, `"02"`, `"03"`. Pass icon reference `icon: Upload` (NOT JSX `<Upload />`).
- `ToolFeatureGuides`: Deep prose should be inside `children` prop wrapped in `prose prose-sm dark:prose-invert`.
- TypeScript verification: Always run `npx tsc --noEmit` before committing code.

---

## 6. ROADMAP & PROGRESS METRICS
- **Total Tools Catalog**: 547 Tools registered in `data/tools.ts`
- **Upgraded to 5-Section Premium Layout**: 85 Tools
- **Remaining Tools to Upgrade**: 462 Tools
- **Phase Status**:
  - Phase 0 (Purge duplicates & 301 redirects): ✅ DONE
  - Phase 1 (Top 10 Goldmine Tools Upgrade): ✅ DONE
  - Phase 2 (High-ROI Image/Network/Office Tools): ✅ DONE
  - Phase 4 (Growth, Monetization, Premium System, Ad Slots): ✅ DONE
  - Phase F (Functional Audit & PDF WASM/AI fixes): ✅ DONE
  - Phase 5 (Systematic 10-Tool Batch Upgrades): IN PROGRESS

---

## 7. VERIFIED WORKFLOW FOR CONTROLLING THE WEBSITE

When the user asks to **add a tool**, **modify a tool**, **fix a bug**, or **upgrade layout**:
1. Check `data/tools.ts` to locate or register the tool slug and category.
2. Edit or create the client component at `components/tools/[category]/[slug]-client.tsx`.
3. Create/update the page wrapper at `app/tools/[category]/[slug]/page.tsx`.
4. Run `npx tsc --noEmit` to guarantee 0 TypeScript compilation errors.
5. Deploy changes:
   ```bash
   git add .
   git commit -m "feat/fix: upgrade tool name"
   git push origin main
   npx vercel --prod --yes
   ```
