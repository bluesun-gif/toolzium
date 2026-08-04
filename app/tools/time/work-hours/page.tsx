import JsonLd from "@/components/seo/json-ld";
import { WorkHoursClient } from "@/components/tools/time/work-hours-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work Hours & Overtime Calculator | Toolzium",
  description: "Calculate daily and weekly work hours including break deductions and overtime.",
  path: "/tools/time/work-hours",
  keywords: ["work hours", "overtime calculator", "timesheet", "time tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/work-hours";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Work Hours & Overtime Calculator", url: toolUrl, description: "Calculate daily and weekly work hours.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Work Hours Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use this?", acceptedAnswer: { "@type": "Answer", text: "Enter your work times for the week." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><WorkHoursClient /></div>);
}
