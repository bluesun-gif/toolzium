import JsonLd from "@/components/seo/json-ld";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
const title = "Background Remover — Remove Image Background Free Online";
const description =
  "Remove background from any image instantly using AI in your browser. Get a transparent PNG in seconds. Free, private, no upload to servers — no signup required.";
const toolUrl = `${siteURL}/tools/image/bg-remove`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
=======
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BgRemoveClient from "@/components/tools/image/bg-remove-client";

export const metadata = buildMetadata({
  title: "Background Remover",
  description: "Remove background from images instantly using AI. Get transparent PNG backgrounds for free online. Client-side processing with before/after comparison. No signup, no upload to servers.",
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/image/bg-remove" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
