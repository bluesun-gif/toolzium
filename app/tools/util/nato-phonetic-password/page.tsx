import JsonLd from "@/components/seo/json-ld";
import { NatoPhoneticPasswordClient } from "@/components/tools/util/nato-phonetic-password-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "NATO Phonetic Password Generator | Toolzium",
  description: "Generate secure passwords with NATO phonetic spelling soundout.",
  path: "/tools/util/nato-phonetic-password",
  keywords: ["password", "generator", "nato", "phonetic", "security"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/util/nato-phonetic-password";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "NATO Phonetic Password Generator", url: toolUrl, description: "Generate secure passwords with NATO phonetic spelling soundout.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Utilities", item: siteURL + "/tools#cat-utilities" }, { "@type": "ListItem", position: 3, name: "NATO Phonetic Password Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is NATO phonetic spelling?", acceptedAnswer: { "@type": "Answer", text: "It uses words like Alpha, Bravo to represent letters clearly." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><NatoPhoneticPasswordClient /></div>);
}
