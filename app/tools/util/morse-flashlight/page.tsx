import JsonLd from "@/components/seo/json-ld";
import { MorseFlashlightClient } from "@/components/tools/util/morse-flashlight-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

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
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><MorseFlashlightClient /></div>);
}
