import JsonLd from "@/components/seo/json-ld";
import DiceRollerClient from "@/components/tools/util/dice-roller-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Dice Roller — Toolzium",
  description: "Roll virtual dice online. Support for up to 6 dice, statistics, and roll history. Fair random number generation.",
  path: "/tools/util/dice-roller",
  keywords: ["dice roller", "roll a dice", "virtual dice", "random numbers", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/dice-roller`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Dice Roller — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Roll virtual dice online with statistics and history tracking.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Roll up to 6 dice", "Visual dice representation", "Roll history log", "Roll statistics and distribution"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Utilities", item: `${siteURL}/tools#cat-utilities` },
      { "@type": "ListItem", position: 3, name: "Dice Roller", item: toolUrl },
    ],
  };
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <DiceRollerClient />
    
      <RelatedTools currentToolUrl="/tools/util/dice-roller" />
</div>
  );
}
