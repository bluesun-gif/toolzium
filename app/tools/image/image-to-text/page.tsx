import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageToTextClient from "@/components/tools/image/image-to-text-client";

export const metadata = buildMetadata({
  title: "Image to Text (OCR)",
  description: "Extract text from images using OCR. Upload PNG, JPG, or WEBP images and convert to editable text. Browser-based optical character recognition — no upload to server.",
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
    </div>
  );
}
