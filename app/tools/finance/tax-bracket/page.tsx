import JsonLd from "@/components/seo/json-ld";
import { TaxBracketClient } from "@/components/tools/finance/tax-bracket-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Tax Bracket Calculator | Toolzium",
  description: "Calculate income tax by brackets for various countries. Estimate total tax, effective tax rate, and take-home pay.",
  path: "/tools/finance/tax-bracket",
  keywords: ["tax bracket", "income tax calculator", "effective tax rate", "take-home pay"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/tax-bracket`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tax Bracket Calculator", url: toolUrl, description: "Calculate income tax by brackets.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Tax Bracket Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an effective tax rate?", acceptedAnswer: { "@type": "Answer", text: "It is the average rate at which your earned income is taxed." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><TaxBracketClient />
      <RelatedTools currentToolUrl="/tools/finance/tax-bracket" />
</div>);
}
