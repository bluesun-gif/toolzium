import JsonLd from "@/components/seo/json-ld";
import NumberWordsClient from "@/components/tools/calc/number-words-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Number to Words Converter | Toolzium",
  description: "Convert numbers to words and words to numbers easily.",
  path: "/tools/calc/number-words",
  keywords: ["number to words", "words to number", "spell out number", "currency words"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/calc/number-words`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Number to Words Converter", url: toolUrl, description: "Convert numbers to words and words to numbers easily.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteURL}/tools#cat-calc` }, { "@type": "ListItem", position: 3, name: "Number to Words Converter", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can I convert words to numbers?", acceptedAnswer: { "@type": "Answer", text: "Yes, this tool supports converting both numbers to words and words to numbers." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><NumberWordsClient /></div>);
}
