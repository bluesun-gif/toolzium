import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FaviconGeneratorClient from "@/components/tools/image/favicon-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Favicon & App Icon Generator — Convert Image to Favicon.ico | Toolzium",
  description: "Generate website favicons, Apple Touch icons, Android PWA icons, and multi-resolution favicon.ico files online. Download ready-to-use icon zip packages with HTML head code.",
  path: "/tools/image/favicon-generator",
  keywords: ["android", "website", "apple", "generate", "favicon", "files", "resolution", "touch", "favicons", "multi", "icons"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Favicon & App Icon Generator — Convert Image to Favicon.ico",
    description: "Generate website favicons, Apple Touch icons, Android PWA icons, and multi-resolution favicon.ico files online. Download ready-to-use icon zip packages with HTML head code.",
    path: "/tools/image/favicon-generator",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <FaviconGeneratorClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/image/favicon-generator" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
