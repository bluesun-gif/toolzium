import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfMergeClient from "@/components/tools/util/pdf-merge-client";
<<<<<<< HEAD
const title = "PDF Merge — Combine PDF Files Online Free | Toolzium";
const description = "Merge multiple PDF files into one document. Drag and drop, reorder pages, and download the combined PDF. Free online PDF merger — no signup, no upload to server.";
const url = `${siteURL}/tools/util/pdf-merge`;
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "PDF Merge & Combine",
  description: "Merge multiple PDF files into a single document. Reorder pages, drag and drop PDFs, and combine online for free. 100% private client-side processing.",
  path: "/tools/util/pdf-merge",
  keywords: ["combine", "pages", "into", "document", "reorder", "files", "merge", "multiple", "drag", "pdfs", "drop", "single"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Merge & Combine",
    description: "Merge multiple PDF files into a single document. Reorder pages, drag and drop PDFs, and combine online for free. 100% private client-side processing.",
    path: "/tools/util/pdf-merge",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfMergeClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/util/pdf-merge" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
