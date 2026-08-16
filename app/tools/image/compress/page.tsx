import { Metadata } from "next";
import ImageCompressClient from "@/components/tools/image/image-compress-client";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";
import RelatedTools from "@/components/shared/related-tools";

const title = "Image Compressor — Reduce Image Size Online Free";
const description =
  "Compress and reduce image file size online for free. Adjust quality settings for JPEG, PNG, and WebP formats. Batch compression with real-time before/after comparison. 100% private and client-side.";
const toolUrl = `${siteURL}/tools/image/compress`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools/image/compress",
  keywords: [
    "image compressor",
    "reduce image size",
    "compress jpeg online",
    "compress png free",
    "compress webp",
    "reduce photo size in kb",
    "batch image compressor",
    "client-side image compression",
    "no upload image compressor",
    "image optimization for web",
    "free image compression tool",
    "website image optimizer",
  ],
});

export default function ImageCompressorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image Compressor — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description:
      "Compress and reduce image file size online for free. Adjust quality settings for JPEG, PNG, and WebP formats with local client-side processing.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Compress JPEG, PNG, and WebP files",
      "Adjustable quality slider (1-100%)",
      "100% client-side — no files uploaded to servers",
      "Batch compression support",
      "Real-time original vs compressed file size info",
      "Quick download for compressed images",
      "Completely free with no watermarks",
    ],
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Image", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "Image Compressor", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does local image compression work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool loads your image into a local HTML5 canvas, then encodes it back into your chosen format at a lower quality setting using native browser encoders. Because everything happens in WebAssembly and Javascript on your device, it is fast and private.",
        },
      },
      {
        "@type": "Question",
        name: "Will compressing an image reduce its dimensions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, this compressor only adjusts the quality setting and compression parameters to reduce file size without altering the physical width or height of the image.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best format for compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WebP is generally the most efficient format for web compression, offering significant size savings while keeping transparency support. JPEG is excellent for standard photographs. PNG works best for screenshots or text graphics.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a file size limit or cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool is 100% free with no watermark or limits. The file size limit depends entirely on your device's memory. In general, images up to 50MB process easily.",
        },
      },
      {
        "@type": "Question",
        name: "Are my private photos uploaded to any server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Your images are processed entirely inside your browser. We never upload, save, or transmit your images to any server, making this tool perfectly secure for sensitive documents.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ImageCompressClient />
    
      <RelatedTools currentToolUrl="/tools/image/compress" />
</>
  );
}
