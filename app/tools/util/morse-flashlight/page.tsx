import JsonLd from "@/components/seo/json-ld";
import { MorseFlashlightClient } from "@/components/tools/util/morse-flashlight-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Morse Code Flashlight | Toolzium",
  description: "Convert text to Morse code and play it visually as screen flashes or audio beeps.",
  path: "/tools/util/morse-flashlight",
  keywords: ["morse code", "flashlight", "morse audio", "utility tools", "sos"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/morse-flashlight`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Morse Code Flashlight", url: toolUrl, description: "Convert text to Morse code and play it.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Utility Tools", item: `${siteURL}/tools#cat-util` }, { "@type": "ListItem", position: 3, name: "Morse Code Flashlight", item: toolUrl }] };
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><MorseFlashlightClient />
      <RelatedTools currentToolUrl="/tools/util/morse-flashlight" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Morse Code Flashlight work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Morse Code Flashlight runs instantly in your browser. Convert text to Morse code and play it visually as screen flashes or audio beeps. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Morse Code Flashlight 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Morse Code Flashlight is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Morse Code Flashlight?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><MorseFlashlightClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
