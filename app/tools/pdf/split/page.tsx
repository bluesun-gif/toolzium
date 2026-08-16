import { Metadata } from "next";
import PdfSplitClient from "@/components/tools/pdf/pdf-split-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "PDF Split & Extract Studio | Toolzium",
  description:
    "Extract specific pages or page ranges from any PDF document. 100% client-side, private & secure.",
};

export default function PdfSplitPage() {
  return (
    <><PdfSplitClient />
      <RelatedTools currentToolUrl="/tools/pdf/split" />
    </>
  );
}
