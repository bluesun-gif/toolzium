import ProductDescriptionClient from "@/components/tools/ai/product-description-client";
import { Metadata } from "next";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
const TITLE = "AI E-Commerce Product Description Generator — Shopify & Amazon Copy | Toolzium";
const DESCRIPTION =
  "Free AI product description generator. Instantly create high-converting SEO product titles, Amazon bullet points, benefit hooks, and meta tags for Shopify, Amazon, Etsy, and WooCommerce.";
const PATH = "/tools/ai/product-description";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "AI product description generator",
    "Shopify product description writer",
    "Amazon bullet points generator",
    "E-commerce copy generator",
    "SEO product title generator",
    "Etsy listing description tool",
    "WooCommerce product copy writer",
  ],
});

export default function ProductDescriptionPage() {
  const jsonLdData = buildToolJsonLd({
    name: "AI E-Commerce Product Description Generator",
    description: DESCRIPTION,
    path: PATH,
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "Which marketplaces are supported by the AI Product Description Generator?",
        answer:
          "Supports Shopify stores, Amazon listings, Etsy shops, WooCommerce products, and social media ad copy.",
      },
      {
        question: "Does it generate SEO Meta Tags and Keywords?",
        answer:
          "Yes! It generates high-converting listing titles, benefit hooks, Amazon bullet points, SEO meta titles, meta descriptions, and search hashtags.",
      },
      {
        question: "Is this tool free to use?",
        answer:
          "Yes, 100% free with zero registration required.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLdData as any} />
      <ProductDescriptionClient />
    
      <RelatedTools currentToolUrl="/tools/ai/product-description" />
</>
  );
}
