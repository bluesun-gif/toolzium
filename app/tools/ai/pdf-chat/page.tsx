import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfChatClient from "@/components/tools/ai/pdf-chat-client";

const TITLE = "AI Document Intelligence & Interactive PDF Chat — Free Document Tool | Toolzium";
const DESCRIPTION = "Upload any PDF, Word document, or text file to extract bullet summaries, action items, and chat directly with your document in real-time.";
const PATH = "/tools/ai/pdf-chat";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Document Intelligence & Interactive PDF Chat",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfChatClient />
    </>
  );
}
