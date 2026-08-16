import JsonLd from "@/components/seo/json-ld";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
const title = "Image to Text (OCR) — Extract Text from Images | Toolzium";
const description =
  "Extract text from images using optical character recognition (OCR). Upload PNG, JPG, WEBP, or BMP files and convert them to editable text. Free, instant, and private.";
const toolUrl = `${siteURL}/tools/image/image-to-text`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
=======
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageToTextClient from "@/components/tools/image/image-to-text-client";

export const metadata = buildMetadata({
  title: "Image to Text (OCR)",
  description: "Extract text from images using OCR. Upload PNG, JPG, or WEBP images and convert to editable text. Browser-based optical character recognition — no upload to server.",
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/image/image-to-text" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
