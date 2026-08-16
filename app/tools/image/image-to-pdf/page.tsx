import { Metadata } from "next";
import ClientComponent from "@/components/tools/image/image-to-pdf-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = generateSEOMetadata({
  title: "Image to PDF Converter — JPG PNG to PDF Free",
  description: "Convert images to PDF online for free. JPG, PNG, WebP to PDF. Multiple images, drag-and-drop reordering, page size selection. Client-side PDF generation.",
  path: "/tools/image/image-to-pdf",
});

export default function ImageToPdfPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What image formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support popular formats like JPG, PNG, and WebP for conversion to PDF.",
        }
      },
      {
        "@type": "Question",
        name: "Can I choose the page size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can choose from standard sizes like A4, Letter, Legal, or set custom dimensions.",
        }
      },
      {
        "@type": "Question",
        name: "Are my files uploaded to your servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all PDF generation happens locally in your browser. Your images remain private and secure.",
        }
      }
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <ClientComponent />
    
      <RelatedTools currentToolUrl="/tools/image/image-to-pdf" />
</>
  );
}
