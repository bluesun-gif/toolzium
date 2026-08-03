import { Metadata } from "next";
import ClientComponent from "@/components/tools/image/image-compress-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Image Compressor — Reduce Image Size Online Free",
  description: "Compress and reduce image file size online for free. Adjust quality for JPEG, PNG, WebP. Batch compression with before/after comparison. 100% client-side.",
  path: "/tools/image/compress",
});

export default function ImageCompressorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the image compressor work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our image compressor uses browser-side processing to reduce the file size of your images by adjusting the quality and format, ensuring your files never leave your device.",
        }
      },
      {
        "@type": "Question",
        name: "Will I lose image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You have control over the compression quality. You can choose a balance between file size and visual quality that suits your needs. Some quality reduction is normal for significant file size savings.",
        }
      },
      {
        "@type": "Question",
        name: "Is my privacy protected?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100%. All processing happens in your browser. Your images are never uploaded to our servers, ensuring complete privacy.",
        }
      }
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <ClientComponent />
    </>
  );
}
