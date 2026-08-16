import JsonLd from "@/components/seo/json-ld";
import { ShiftSchedulerClient } from "@/components/tools/time/shift-scheduler-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Work Shift Scheduler | Toolzium",
  description: "Schedule employee work shifts.",
  path: "/tools/time/shift-scheduler",
  keywords: ["shift scheduler", "work schedule", "employee schedule"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/shift-scheduler";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Work Shift Scheduler", url: toolUrl, description: "Schedule employee work shifts", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Work Shift Scheduler", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use this?", acceptedAnswer: { "@type": "Answer", text: "Add employees and assign shifts per day." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ShiftSchedulerClient />
      <RelatedTools currentToolUrl="/tools/time/shift-scheduler" />
</div>);
}
