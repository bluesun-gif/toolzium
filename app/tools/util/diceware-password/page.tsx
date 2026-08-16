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
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><DicewarePasswordClient />
      <RelatedTools currentToolUrl="/tools/util/diceware-password" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Diceware Wordlist Passphrase Generator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Diceware Wordlist Passphrase Generator runs instantly in your browser. Generate ultra-secure, human-memorable Diceware passphrases (e.g. correct-horse-battery-staple) with entropy bits calculations. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Diceware Wordlist Passphrase Generator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Diceware Wordlist Passphrase Generator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Diceware Wordlist Passphrase Generator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><DicewarePasswordClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
