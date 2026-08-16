import JsonLd from "@/components/seo/json-ld";
import { DateFormatterClient } from "@/components/tools/time/date-formatter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Date Formatter & Converter | Toolzium",
  description: "Convert dates between different formats like ISO 8601, RFC 2822, Unix timestamps, and locale-specific strings.",
  path: "/tools/time/date-formatter",
  keywords: ["date formatter", "date converter", "timestamp converter", "ISO 8601"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/date-formatter`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Date Formatter", url: toolUrl, description: "Convert dates between different formats.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Date Formatter", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Date Formatter work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Date Formatter runs instantly in your browser. Convert any date to 15+ formats including ISO 8601, RFC 2822, Unix timestamp, and locale-specific formats (US, UK, Japan). Shows day of week, week number, and day of year. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Date Formatter 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Date Formatter is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Date Formatter?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <DateFormatterClient />
    
      <RelatedTools currentToolUrl="/tools/time/date-formatter" />
</div>
  );
}
