import JsonLd from "@/components/seo/json-ld";
import { PregnancyTrackerClient } from "@/components/tools/health/pregnancy-tracker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pregnancy Tracker | Toolzium",
  description: "Track pregnancy milestones, due date, and baby size.",
  path: "/tools/health/pregnancy-tracker",
  keywords: ["pregnancy tracker", "due date calculator", "pregnancy milestones", "health tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/pregnancy-tracker";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Pregnancy Tracker", url: toolUrl, description: "Track pregnancy milestones, due date, and baby size.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Pregnancy Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is the due date calculated?", acceptedAnswer: { "@type": "Answer", text: "The due date is typically calculated by adding 280 days to the first day of your last menstrual period (LMP)." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><PregnancyTrackerClient /></div>);
}
