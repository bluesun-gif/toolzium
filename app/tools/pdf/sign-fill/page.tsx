import { Metadata } from "next";
import PdfSignFillClient from "@/components/tools/pdf/pdf-sign-fill-client";

export const metadata: Metadata = {
  title: "Sign & Fill PDF Studio | Toolzium",
  description:
    "Add digital text signatures and date stamps to contracts, agreements, and forms. 100% client-side.",
};

export default function PdfSignFillPage() {
  return <PdfSignFillClient />;
}
