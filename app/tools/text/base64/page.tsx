import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Base64Client from "@/components/tools/text/base64-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Base64 Encoder/Decoder",
  description: "Encode and decode Base64 strings and files online. Convert text, images, or any file to Base64 encoding. Free Base64 converter with support for UTF-8, ASCII, and binary data.",
  path: "/tools/text/base64",
  keywords: ["encoding", "convert", "files", "encode", "strings", "online", "free", "decode", "converter", "images", "file", "text"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings and files online. Convert text, images, or any file to Base64 encoding. Free Base64 converter with support for UTF-8, ASCII, and binary data.",
    path: "/tools/text/base64",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <Base64Client />
    
      <RelatedTools currentToolUrl="/tools/text/base64" />
</div>
  );
}
