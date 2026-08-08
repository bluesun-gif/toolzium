import { Metadata } from "next";
import ImagePdfClient from "@/components/tools/pdf/image-pdf-client";

export const metadata: Metadata = {
  title: "Image to PDF Converter | Toolzium",
  description:
    "Convert JPG, PNG, and WebP images into a single PDF document. 100% client-side, fast & free.",
};

export default function ImagePdfPage() {
  return <ImagePdfClient />;
}
