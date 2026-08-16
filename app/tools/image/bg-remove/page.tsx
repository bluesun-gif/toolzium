import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";
const title = "Background Remover — Remove Image Background Free Online";
const description =
  "Remove background from any image instantly using AI in your browser. Get a transparent PNG in seconds. Free, private, no upload to servers — no signup required.";
const toolUrl = `${siteURL}/tools/image/bg-remove`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools/image/bg-remove",
  keywords: ["client", "from", "background", "transparent", "online", "free", "side", "remove", "instantly", "images", "using", "backgrounds"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Background Remover",
    description: "Remove background from images instantly using AI. Get transparent PNG backgrounds for free online. Client-side processing with before/after comparison. No signup, no upload to servers.",
    path: "/tools/image/bg-remove",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <BgRemoveClient />
    
      <RelatedTools currentToolUrl="/tools/image/bg-remove" />
</>
  );
}
