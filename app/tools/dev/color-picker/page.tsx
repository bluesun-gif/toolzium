import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorPickerClient from "@/components/tools/dev/color-picker-client";

const TITLE = "Color Picker & Palette Generator";
const DESCRIPTION = "Pick any color and get HEX, RGB, HSL codes instantly. Free online color picker with color name detection, complementary colors, and recent color history.";
const PATH = "/tools/dev/color-picker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Picker & Palette Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorPickerClient />
    </>
  );
}
