import { Metadata } from "next";
import PdfCompressClient from "@/components/tools/pdf/pdf-compress-client";

export const metadata: Metadata = {
  title: "PDF Compress Studio | Reduce PDF Size | Toolzium",
  description:
    "Reduce PDF file size for email attachments and web uploads. 100% client-side, fast & confidential.",
};

export default function PdfCompressPage() {
  return <PdfCompressClient />;
}
