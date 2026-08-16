import JsonLd from "@/components/seo/json-ld";
import { PhoneticPasswordClient } from "@/components/tools/util/phonetic-password-nato-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Phonetic Password Generator & NATO Guide | Toolzium",
  description: "Generate secure passwords with NATO phonetic spelling breakdowns to easily communicate them.",
  path: "/tools/util/phonetic-password-nato",
  keywords: ["password generator", "nato phonetic alphabet", "secure password", "communicate password"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/util/phonetic-password-nato";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Phonetic Password Generator", url: toolUrl, description: "Generate secure passwords with NATO phonetic spelling.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Utilities", item: siteURL + "/tools#cat-utilities" }, { "@type": "ListItem", position: 3, name: "Phonetic Password Generator", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Phonetic Password Generator & NATO Guide work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Phonetic Password Generator & NATO Guide runs instantly in your browser. Generate secure passwords with NATO phonetic spelling breakdowns to easily communicate them. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Phonetic Password Generator & NATO Guide 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Phonetic Password Generator & NATO Guide is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Phonetic Password Generator & NATO Guide?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PhoneticPasswordClient />
    
      <RelatedTools currentToolUrl="/tools/util/phonetic-password-nato" />
</div>
  );
}
