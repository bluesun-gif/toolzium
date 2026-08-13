import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MemeGeneratorClient from "@/components/tools/image/meme-generator-client";

export const metadata = buildMetadata({
  title: "Meme Generator",
  description: "Create custom memes online for free. Upload your own image or choose a template, customize text position, font size, and color. Download instant memes to share.",
  path: "/tools/image/meme-generator",
  keywords: ["your", "text", "create", "upload", "online", "free", "template", "customize", "custom", "memes", "choose", "image"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meme Generator",
    description: "Create custom memes online for free. Upload your own image or choose a template, customize text position, font size, and color. Download instant memes to share.",
    path: "/tools/image/meme-generator",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MemeGeneratorClient />
    </div>
  );
}
