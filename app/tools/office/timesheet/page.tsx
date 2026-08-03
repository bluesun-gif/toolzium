import JsonLd from "@/components/seo/json-ld";
import { TimesheetClient } from "@/components/tools/office/timesheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Timesheet Calculator | Toolzium",
  description: "Calculate weekly work hours, track overtime, and estimate gross pay with our free online timesheet calculator.",
  path: "/tools/office/timesheet",
  keywords: ["timesheet calculator", "work hours calculator", "overtime calculator", "payroll tool", "office tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/timesheet`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Timesheet Calculator", url: toolUrl, description: "Calculate weekly work hours, track overtime, and estimate gross pay.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "Timesheet Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I calculate my work hours?", acceptedAnswer: { "@type": "Answer", text: "Simply enter your start time, end time, and any break duration for each day of the week. The tool will automatically calculate your daily and weekly hours." } }, { "@type": "Question", name: "Does it calculate overtime?", acceptedAnswer: { "@type": "Answer", text: "Yes, it automatically calculates overtime for any hours worked over 40 hours in a week." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><TimesheetClient /></div>);
}
