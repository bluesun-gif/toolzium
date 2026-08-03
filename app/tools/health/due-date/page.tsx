import JsonLd from "@/components/seo/json-ld";
import { DueDateClient } from "@/components/tools/health/due-date-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pregnancy Due Date Calculator | Toolzium",
  description: "Calculate your estimated pregnancy due date based on your last menstrual period.",
  path: "/tools/health/due-date",
  keywords: ["due date calculator", "pregnancy calculator", "lmp calculator", "health tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/due-date`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Pregnancy Due Date Calculator", url: toolUrl, description: "Calculate your estimated pregnancy due date based on your last menstrual period.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Pregnancy Due Date Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is due date calculated?", acceptedAnswer: { "@type": "Answer", text: "Due date is typically calculated by adding 280 days to the first day of your last menstrual period (Naegele's rule)." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <DueDateClient />
    </div>
  );
}
