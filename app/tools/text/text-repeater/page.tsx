import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import TextRepeaterClient from "@/components/tools/text/text-repeater-client";
export const metadata = buildMetadata({
  title: "Text Repeater — Repeat Text Online Free | Toolzium",
  description: "Repeat any text multiple times with custom separators. Copy paste flood text, multiply strings, add line numbers. Free text repeater tool — no signup required.",
  path: "/tools/text/text-repeater",
  keywords: ["text repeater", "repeat text", "text multiplier", "copy paste flood", "repeat word", "text repeat online", "repeat string", "duplicate text", "multiply text", "Toolzium"],
});

export default function Page() {
  return (
    <>
      <TextRepeaterClient />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Text Repeater",
          description: "Repeat any text multiple times with custom separators.",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
    
      <RelatedTools currentToolUrl="/tools/text/text-repeater" />
</>
  );
}
