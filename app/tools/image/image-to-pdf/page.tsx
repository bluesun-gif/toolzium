import JsonLd from "@/components/seo/json-ld";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image to PDF",
  description: "Convert images to PDF online for free. Support JPG, PNG, WebP to PDF conversion. Multiple image upload, drag-and-drop reordering, page size selection, and margin control. Client-side PDF generation.",
  path: "/tools/image/image-to-pdf",
  keywords: ["webp", "convert", "image", "upload", "online", "free", "drag", "images", "drop", "conversion", "support", "multiple"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image to PDF",
    description: "Convert images to PDF online for free. Support JPG, PNG, WebP to PDF conversion. Multiple image upload, drag-and-drop reordering, page size selection, and margin control. Client-side PDF generation.",
    path: "/tools/image/image-to-pdf",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ClientComponent />
    
      <RelatedTools currentToolUrl="/tools/image/image-to-pdf" />
</>
  );
}
