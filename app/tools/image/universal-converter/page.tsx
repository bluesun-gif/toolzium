import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UniversalConverterClient from "@/components/tools/image/universal-converter-client";

const TITLE = "Free Universal Image Converter - Convert PNG, JPG, WebP, BMP & ICO Online";
const DESCRIPTION =
  "Convert images between PNG, JPG, WebP, BMP, SVG, and ICO formats in batch. 100% free in-browser converter with quality controls, dimension resizing, and ZIP downloads.";
const PATH = "/tools/image/universal-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "image converter",
    "png to jpg",
    "jpg to png",
    "webp to png",
    "heic to jpg",
    "convert image online",
    "batch image converter",
    "free image converter",
    "png to webp",
    "convert to ico",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Universal Batch Image Converter Studio",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <UniversalConverterClient />
    </>
  );
}
