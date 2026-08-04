import JsonLd from "@/components/seo/json-ld";
import { SqlFormatterClient } from "@/components/tools/dev/sql-formatter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SQL Formatter | Toolzium",
  description: "Format and beautify your SQL queries online.",
  path: "/tools/dev/sql-formatter",
  keywords: ["sql", "formatter", "beautifier", "developer tools", "sql format"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/sql-formatter";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "SQL Formatter", url: toolUrl, description: "Format and beautify your SQL queries online.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "SQL Formatter", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I format SQL?", acceptedAnswer: { "@type": "Answer", text: "Paste your raw SQL query into the input field and choose your formatting preferences to beautify it." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SqlFormatterClient /></div>);
}
