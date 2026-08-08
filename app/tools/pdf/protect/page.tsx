import { Metadata } from "next";
import PdfProtectClient from "@/components/tools/pdf/pdf-protect-client";

export const metadata: Metadata = {
  title: "Protect & Lock PDF Studio | Toolzium",
  description:
    "Encrypt and add password protection to sensitive PDF documents. 100% client-side, private & secure.",
};

export default function PdfProtectPage() {
  return <PdfProtectClient />;
}
