import JsonLd from "@/components/seo/json-ld";
import { OkrPlannerClient } from "@/components/tools/productivity/okr-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "OKR (Objectives & Key Results) Planner | Toolzium",
  description: "Set and track your goals with this structured OKR planning tool. Monitor progress for objectives and key results.",
  path: "/tools/productivity/okr-planner",
  keywords: ["okr", "planner", "goals", "productivity", "tracker", "objectives", "key results"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/okr-planner";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "OKR Planner", 
    url: toolUrl, 
    description: "Track your Objectives and Key Results.", 
    applicationCategory: "BusinessApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, 
      { "@type": "ListItem", position: 3, name: "OKR Planner", item: toolUrl }
    ] 
  };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the OKR Goals & Key Results Planner work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's OKR Goals & Key Results Planner runs instantly in your browser. Structured OKR goal tracking framework. Objectives, key result progress bars, target values, deadlines, Markdown report export. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the OKR Goals & Key Results Planner 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the OKR Goals & Key Results Planner is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the OKR Goals & Key Results Planner?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <OkrPlannerClient />
    </div>
  );
}
