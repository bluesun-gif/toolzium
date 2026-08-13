import JsonLd from "@/components/seo/json-ld";
import { PixelArtClient } from "@/components/tools/image/pixel-art-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pixel Art Creator | Toolzium",
  description: "Draw and create your own pixel art online. Export high-quality PNGs with custom palettes and grid sizes.",
  path: "/tools/image/pixel-art",
  keywords: ["pixel art", "sprite editor", "pixel drawing", "8bit art creator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/pixel-art`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pixel Art Creator",
    url: toolUrl,
    description: "Draw and create your own pixel art online. Export high-quality PNGs with custom palettes and grid sizes.",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "Pixel Art Creator", item: toolUrl }
    ]
  };


  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Pixel Art Creator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Pixel Art Creator runs instantly in your browser. Simple pixel art drawing tool. Grid sizes 8x8 to 32x32. Color picker, pencil, eraser, fill tools. Undo/redo. Download as PNG. Preset color palettes. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Pixel Art Creator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Pixel Art Creator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Pixel Art Creator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PixelArtClient />
    </div>
  );
}
