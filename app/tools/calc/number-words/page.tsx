import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NumberWordsClient from "@/components/tools/calc/number-words-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Number to Words",
  description: "Convert numbers to words and back. Supports up to 999 billion. Currency mode (USD, EUR, GBP, INR). Ordinal numbers. Copy results.",
  path: "/tools/calc/number-words",
  keywords: ["mode", "numbers", "ordinal", "results", "convert", "billion", "copy", "currency", "words", "supports", "back"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = `${siteURL}/tools/calc/number-words`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Number to Words Converter", url: toolUrl, description: "Convert numbers to words and words to numbers easily.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteURL}/tools#cat-calc` }, { "@type": "ListItem", position: 3, name: "Number to Words Converter", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can I convert words to numbers?", acceptedAnswer: { "@type": "Answer", text: "Yes, this tool supports converting both numbers to words and words to numbers." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><NumberWordsClient />
      <RelatedTools currentToolUrl="/tools/calc/number-words" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Number to Words",
    description: "Convert numbers to words and back. Supports up to 999 billion. Currency mode (USD, EUR, GBP, INR). Ordinal numbers. Copy results.",
    path: "/tools/calc/number-words",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <NumberWordsClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
