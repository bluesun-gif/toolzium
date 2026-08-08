import { Metadata } from "next";
import PdfSplitClient from "@/components/tools/pdf/pdf-split-client";

export const metadata: Metadata = {
  title: "PDF Split & Extract Studio | Toolzium",
  description:
    "Extract specific pages or page ranges from any PDF document. 100% client-side, private & secure.",
};

export default function PdfSplitPage() {
  return <PdfSplitClient />;
}
