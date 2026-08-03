import { Metadata } from "next";
import MemeGeneratorClient from "@/components/tools/image/meme-generator-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Meme Generator Online — Create Custom Memes Free",
  description:
    "Free online Meme Generator tool. Upload your own image or choose a template, add custom top and bottom text, customize styling, colors, and font size, and download your finished meme instantly.",
  path: "/tools/image/meme-generator",
});

export default function MemeGeneratorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I create a custom meme?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upload your image or pick a starter template, type in the desired Top and Bottom texts, adjust settings like font sizes, border thickness, text colors, and then click 'Download Meme' to export.",
        },
      },
      {
        "@type": "Question",
        name: "Do you add watermarks to the memes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Our Meme Generator is completely clean and will never add logos or watermarks to your generated images.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded photos secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All image processing occurs entirely client-side using HTML5 Canvas inside your browser. No files are uploaded to servers, ensuring 100% privacy.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <MemeGeneratorClient />
    </>
  );
}
