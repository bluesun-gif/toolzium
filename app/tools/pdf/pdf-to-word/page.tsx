import { Metadata } from "next";
import PdfToWordClient from "@/components/tools/pdf/pdf-to-word-client";

export const metadata: Metadata = {
  title: "PDF to Word & Text Converter | Toolzium",
  description:
    "Extract text content and headings from PDF documents into editable text and Word format. 100% client-side.",
};

export default function PdfToWordPage() {
  return <PdfToWordClient />;
}
