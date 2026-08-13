import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BgRemoveClient from "@/components/tools/image/bg-remove-client";

export const metadata = buildMetadata({
  title: "Background Remover",
  description: "Remove background from images instantly using AI. Get transparent PNG backgrounds for free online. Client-side processing with before/after comparison. No signup, no upload to servers.",
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
    </div>
  );
}
