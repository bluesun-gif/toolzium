import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FancyTextClient from "@/components/tools/text/fancy-text-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Fancy Text Generator",
  description: "Generate fancy Unicode text styles — bold, italic, script, fraktur, double-struck, circled, squared, upside-down, strikethrough, underline, and more. Copy stylish text for social media bios, usernames, and posts.",
  path: "/tools/text/fancy-text",
  keywords: ["fraktur", "italic", "generate", "unicode", "double", "struck", "bold", "styles", "script", "text", "fancy", "circled"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Fancy Text Generator",
    description: "Generate fancy Unicode text styles — bold, italic, script, fraktur, double-struck, circled, squared, upside-down, strikethrough, underline, and more. Copy stylish text for social media bios, usernames, and posts.",
    path: "/tools/text/fancy-text",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <FancyTextClient />
    
      <RelatedTools currentToolUrl="/tools/text/fancy-text" />
</div>
  );
}
