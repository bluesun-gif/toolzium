import JsonLd from "@/components/seo/json-ld";
<<<<<<< HEAD
import RelatedTools from "@/components/shared/related-tools";
=======
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ClientComponent from "@/components/tools/image/image-to-pdf-client";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/image/image-to-pdf" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
