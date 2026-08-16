import { Metadata } from "next";
import WhiteboardClient from "@/components/tools/productivity/whiteboard-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = generateSEOMetadata({
  title: "Online Whiteboard — Free Drawing Tool",
  description: "Free online whiteboard and drawing tool. Freehand drawing, shapes, colors, brush sizes, undo/redo, export as PNG. Perfect for brainstorming and diagrams.",
  path: "/tools/productivity/whiteboard",
});

export default function WhiteboardPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I save my whiteboard drawing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can save your drawing by clicking the 'Export PNG' button in the toolbar. This will download your current canvas as a high-quality PNG image file directly to your device.",
        },
      },
      {
        "@type": "Question",
        name: "Does the whiteboard work on mobile devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our whiteboard fully supports touch input, allowing you to draw with your finger or a stylus on smartphones and tablets.",
        },
      },
      {
        "@type": "Question",
        name: "What drawing tools are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The whiteboard currently features a freehand pen, straight line tool, rectangles, circles, and an eraser. You can also customize your brush size and choose from various colors.",
        },
      }
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <WhiteboardClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/whiteboard" />
</>
  );
}
