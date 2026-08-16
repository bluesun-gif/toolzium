import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";
const title = "Image to Text (OCR) — Extract Text from Images | Toolzium";
const description =
  "Extract text from images using optical character recognition (OCR). Upload PNG, JPG, WEBP, or BMP files and convert them to editable text. Free, instant, and private.";
const toolUrl = `${siteURL}/tools/image/image-to-text`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools/image/image-to-text",
  keywords: ["from", "webp", "convert", "editable", "upload", "browser", "extract", "images", "using", "text"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image to Text (OCR)",
    description: "Extract text from images using OCR. Upload PNG, JPG, or WEBP images and convert to editable text. Browser-based optical character recognition — no upload to server.",
    path: "/tools/image/image-to-text",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ImageToTextClient />
    
      <RelatedTools currentToolUrl="/tools/image/image-to-text" />
</>
  );
}
