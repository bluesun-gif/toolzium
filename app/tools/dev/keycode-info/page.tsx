import JsonLd from "@/components/seo/json-ld";
import KeycodeInfoClient from "@/components/tools/dev/keycode-info-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Keycode & Keyboard Event Viewer | Toolzium",
  description: "Inspect JavaScript keyboard event properties.",
  path: "/tools/dev/keycode-info",
  keywords: ["keycode", "keyboard event", "javascript", "developer tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/keycode-info";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Keycode Info", url: toolUrl, description: "Inspect keyboard events.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "Keycode Info", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a keycode?", acceptedAnswer: { "@type": "Answer", text: "A keycode is a numerical code representing a key." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><KeycodeInfoClient />
      <RelatedTools currentToolUrl="/tools/dev/keycode-info" />
</div>);
}
