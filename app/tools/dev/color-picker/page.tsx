import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorPickerClient from "@/components/tools/dev/color-picker-client";
const title = "Color Picker — HEX, RGB, HSL Color Chooser | Toolzium";
const description = "Pick any color and get HEX, RGB, HSL codes instantly. Free online color picker with color name detection, complementary colors, and recent color history.";
const url = siteURL + "/tools/dev/color-picker";

export const metadata = buildMetadata({
  title: "Color Picker & Palette Generator",
  description: "Pick any color and get HEX, RGB, HSL codes instantly. Free online color picker with color name detection, complementary colors, and recent color history.",
  path: "/tools/dev/color-picker",
  keywords: ["with", "detection", "online", "free", "picker", "color", "codes", "instantly", "name", "pick"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Picker & Palette Generator",
    description: "Pick any color and get HEX, RGB, HSL codes instantly. Free online color picker with color name detection, complementary colors, and recent color history.",
    path: "/tools/dev/color-picker",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ColorPickerClient />
    
      <RelatedTools currentToolUrl="/tools/dev/color-picker" />
</div>
  );
}
