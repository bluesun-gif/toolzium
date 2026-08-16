import { Metadata } from "next";
import ClientComponent from "@/components/tools/dev/color-palette-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";
export const metadata: Metadata = generateSEOMetadata({
  title: "Color Palette Generator — Create Color Schemes Free",
  description: "Generate beautiful color palettes online. Complementary, analogous, triadic, monochromatic schemes. Extract colors from images. Export CSS, HEX, RGB, HSL.",
  path: "/tools/dev/color-palette",
});

export default function ColorPalettePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is color theory and how does this tool use it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Color theory is a set of guidelines for creating harmonious color combinations. This tool uses color theory principles to generate complementary, analogous, triadic, tetradic, and monochromatic color schemes based on a base color you select.",
        },
      },
      {
        "@type": "Question",
        name: "What formats can I export my color palette in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can easily export your generated color palette as CSS Variables, a JSON array, or a Tailwind CSS configuration, making it ready to use in your next web development project.",
        },
      },
      {
        "@type": "Question",
        name: "Can I extract colors from an image?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our Color Palette Generator includes a feature that lets you upload any image and automatically extracts the 5 most dominant colors using color quantization techniques.",
        },
      }
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <ClientComponent />
    
      <RelatedTools currentToolUrl="/tools/dev/color-palette" />
</>
  );
}
