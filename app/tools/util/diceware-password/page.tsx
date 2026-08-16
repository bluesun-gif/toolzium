import JsonLd from "@/components/seo/json-ld";
import { DicewarePasswordClient } from "@/components/tools/util/diceware-password-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Diceware Wordlist Passphrase Generator | Toolzium",
  description: "Generate ultra-secure, human-memorable Diceware passphrases.",
  path: "/tools/util/diceware-password",
  keywords: ["diceware", "passphrase generator", "password generator", "security", "utilities"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/util/diceware-password";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Diceware Wordlist Passphrase Generator", url: toolUrl, description: "Generate ultra-secure, human-memorable Diceware passphrases.", applicationCategory: "UtilitiesApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Utilities", item: siteURL + "/tools#cat-utilities" }, { "@type": "ListItem", position: 3, name: "Diceware Passphrase Generator", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><DicewarePasswordClient />
      <RelatedTools currentToolUrl="/tools/util/diceware-password" />
</div>);
}
