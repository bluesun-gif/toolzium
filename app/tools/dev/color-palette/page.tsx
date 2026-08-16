import JsonLd from "@/components/seo/json-ld";
export const metadata: Metadata = generateSEOMetadata({
  title: "Color Palette Generator — Create Color Schemes Free",
  description: "Generate beautiful color palettes online. Complementary, analogous, triadic, monochromatic schemes. Extract colors from images. Export CSS, HEX, RGB, HSL.",
  path: "/tools/dev/color-palette",
  keywords: ["beautiful", "generate", "monochromatic", "create", "triadic", "palettes", "online", "free", "color", "complementary", "analogous", "schemes"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes and schemes online for free. Create complementary, analogous, triadic, and monochromatic palettes. Extract colors from images. Export as CSS variables, HEX, RGB, or HSL.",
    path: "/tools/dev/color-palette",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ClientComponent />
    
      <RelatedTools currentToolUrl="/tools/dev/color-palette" />
</>
  );
}
