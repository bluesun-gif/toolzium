import ProductDescriptionClient from "@/components/tools/ai/product-description-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI E-Commerce Product Description Generator - Create SEO Titles & Copy",
  description:
    "Free AI product description generator. Instantly create high-converting SEO product titles, Amazon bullet points, benefit hooks, and meta tags for Shopify, Amazon, Etsy, and WooCommerce.",
  keywords: [
    "AI product description generator",
    "Shopify product description writer",
    "Amazon bullet points generator",
    "E-commerce copy generator",
    "SEO product title generator",
    "Etsy listing description tool",
  ],
};

export default function ProductDescriptionPage() {
  return <ProductDescriptionClient />;
}
