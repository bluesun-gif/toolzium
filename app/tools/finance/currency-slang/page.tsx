import JsonLd from "@/components/seo/json-ld";
import { CurrencySlangClient } from "@/components/tools/finance/currency-slang-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Currency Slang Dictionary | Toolzium",
  description: "Dictionary of money and currency slang terms worldwide. Learn terms from the US, UK, Crypto, and more.",
  path: "/tools/finance/currency-slang",
  keywords: ["currency slang", "money slang", "slang dictionary", "financial terms", "crypto slang"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/currency-slang`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Currency Slang Dictionary", url: toolUrl, description: "Dictionary of money slang terms.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Currency Slang Dictionary", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Currency Slang Dictionary work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Currency Slang Dictionary runs instantly in your browser. Dictionary of money and currency slang terms worldwide. Learn terms from the US, UK, Crypto, and more. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Currency Slang Dictionary 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Currency Slang Dictionary is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Currency Slang Dictionary?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CurrencySlangClient />
    
      <RelatedTools currentToolUrl="/tools/finance/currency-slang" />
</div>
  );
}
