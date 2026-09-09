import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SvgToPngClient from "@/components/tools/image/svg-to-png-client";

const TITLE = "SVG to PNG Converter [Free] — No Upload, Custom Size & Quality";
const DESCRIPTION =
  "✅ 100% free • Client-side conversion • Files never leave your device • Export crisp PNGs at 1x–8x scale with transparent or custom backgrounds.";
const PATH = "/tools/image/svg-to-png";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "svg to png",
    "svg converter",
    "svg to png free",
    "vector to raster",
    "transparent png",
  ],
});

const FAQS = [
  { question: "Is this SVG to PNG converter really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited conversions." },
  { question: "Do you store my SVG files?",
    answer: "No. Conversion happens entirely in your browser via canvas rendering — your files never leave your device." },
  { question: "What export options are available?",
    answer: "Custom width/height, 1x to 8x scaling for retina exports, transparent or solid background colors, and direct download as PNG." },
  { question: "How accurate and fast are the results?",
    answer: "Instant conversion using native browser SVG rendering, which matches design-tool output without server-side re-encoding." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SVG to PNG Converter",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SvgToPngClient />
    </>
  );
}
