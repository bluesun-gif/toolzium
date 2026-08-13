import JsonLd from "@/components/seo/json-ld";
import { EmergencyGoalCalcClient } from "@/components/tools/finance/emergency-goal-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Emergency Savings Goal Calculator | Toolzium",
  description: "Calculate how much you need to save to reach your emergency savings goal. Track interest and milestones.",
  path: "/tools/finance/emergency-goal-calc",
  keywords: ["emergency fund", "savings calculator", "finance tool", "goal planner"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/emergency-goal-calc";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Emergency Savings Goal Calculator",
    url: toolUrl,
    description: "Calculate how much you need to save to reach your emergency savings goal. Track interest and milestones.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" },
      { "@type": "ListItem", position: 3, name: "Emergency Savings Goal Calculator", item: toolUrl }
    ]
  };


  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Emergency Savings Goal Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Emergency Savings Goal Calculator runs instantly in your browser. Calculate monthly or weekly savings required to reach your emergency savings goal with high-yield APY interest accumulation. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Emergency Savings Goal Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Emergency Savings Goal Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Emergency Savings Goal Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EmergencyGoalCalcClient />
    </div>
  );
}
