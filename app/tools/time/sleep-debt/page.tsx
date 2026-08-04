import JsonLd from "@/components/seo/json-ld";
import { SleepDebtClient } from "@/components/tools/time/sleep-debt-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sleep Debt & Recovery Calculator | Toolzium",
  description: "Calculate accumulated sleep debt over a 7-day week and recovery plan.",
  path: "/tools/time/sleep-debt",
  keywords: ["sleep debt calculator", "sleep recovery", "sleep deficit", "time tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/sleep-debt";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sleep Debt & Recovery Calculator",
    url: toolUrl,
    description: "Calculate accumulated sleep debt over a 7-day week and recovery plan.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" },
      { "@type": "ListItem", position: 3, name: "Sleep Debt Calculator", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is sleep debt?", acceptedAnswer: { "@type": "Answer", text: "Sleep debt is the difference between the amount of sleep you should be getting and the amount you actually get." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SleepDebtClient />
    </div>
  );
}
