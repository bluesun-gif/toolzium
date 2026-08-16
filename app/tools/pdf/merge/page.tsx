import { Metadata } from "next";
import PdfMergeClient from "@/components/tools/pdf/pdf-merge-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "PDF Merge Studio | Free Online PDF Combiner | Toolzium",
  description:
    "Combine multiple PDF files into one organized document. 100% free, browser-based, secure PDF merger tool.",
};

export default function PdfMergePage() {
  return (
    <><PdfMergeClient />
      <RelatedTools currentToolUrl="/tools/pdf/merge" />
    </>
  );
}
