import JsonLd from "@/components/seo/json-ld";
import { PronunciationClient } from "@/components/tools/text/pronunciation-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pronunciation Guide | Toolzium",
  description: "Learn how to pronounce commonly mispronounced English words.",
  path: "/tools/text/pronunciation",
  keywords: ["pronunciation", "english words", "phonetic spelling"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/pronunciation`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Pronunciation Guide", url: toolUrl, description: "Learn how to pronounce commonly mispronounced English words", applicationCategory: "EducationalApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` }, { "@type": "ListItem", position: 3, name: "Pronunciation Guide", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "A guide for commonly mispronounced words." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><PronunciationClient /></div>);
}
