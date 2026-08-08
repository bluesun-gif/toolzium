import { Metadata } from "next";
import PdfRotateClient from "@/components/tools/pdf/pdf-rotate-client";

export const metadata: Metadata = {
  title: "PDF Page Rotate Studio | Toolzium",
  description:
    "Rotate PDF pages 90°, 180°, or 270° clockwise or counter-clockwise. 100% client-side.",
};

export default function PdfRotatePage() {
  return <PdfRotateClient />;
}
