import { Metadata } from "next";
import PdfChatClient from "@/components/tools/ai/pdf-chat-client";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
const TITLE = "AI Document Intelligence & Interactive PDF Chat — Free Document Tool | Toolzium";
const DESCRIPTION =
  "Upload any PDF, Word document, or text file to extract bullet summaries, action items, and chat directly with your document in real-time.";
const PATH = "/tools/ai/pdf-chat";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "AI PDF chat",
    "chat with PDF online",
    "document summarizer AI",
    "PDF AI assistant",
    "Word document analyzer",
    "free PDF Q&A tool",
  ],
});

export default function PdfChatPage() {
  const jsonLdData = buildToolJsonLd({
    name: "AI Document Intelligence & PDF Chat",
    description: DESCRIPTION,
    path: PATH,
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "Which file formats are supported for document chat?",
        answer:
          "Supports PDF (.pdf), Word (.docx), Plain Text (.txt), Markdown (.md), JSON (.json), and CSV (.csv) files.",
      },
      {
        question: "Can I ask custom questions about my document?",
        answer:
          "Yes! You can ask any question regarding your uploaded document content and get direct answers in an interactive chat assistant.",
      },
      {
        question: "Are my documents saved or kept private?",
        answer:
          "Your uploaded files are processed locally in your browser and are never uploaded or saved on external servers.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLdData as any} />
      <PdfChatClient />
    
      <RelatedTools currentToolUrl="/tools/ai/pdf-chat" />
</>
  );
}
