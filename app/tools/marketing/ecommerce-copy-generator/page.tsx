import { Metadata } from "next";
import EcommerceCopyGeneratorClient from "@/components/tools/marketing/ecommerce-copy-generator-client";

export const metadata: Metadata = {
  title: "Shopify & Amazon Product Listing AI Copy Generator | Toolzium",
  description:
    "Generate high-converting Amazon product bullet points, Shopify descriptions, and high-search SEO product titles with live AI.",
};

export default function EcommerceCopyGeneratorPage() {
  return <EcommerceCopyGeneratorClient />;
}
