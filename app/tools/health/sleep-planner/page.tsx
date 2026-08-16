import JsonLd from "@/components/seo/json-ld";
import { SleepPlannerClient } from "@/components/tools/health/sleep-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sleep Cycle & Bedtime Calculator | Toolzium",
  description: "Calculate optimal bedtime or wake-up times based on 90-minute REM sleep cycles.",
  path: "/tools/health/sleep-planner",
  keywords: ["sleep cycle calculator", "bedtime calculator", "wake up time", "REM sleep", "health tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/sleep-planner";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sleep Cycle & Bedtime Calculator",
    url: toolUrl,
    description: "Calculate optimal bedtime or wake-up times based on 90-minute REM sleep cycles.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" },
      { "@type": "ListItem", position: 3, name: "Sleep Cycle Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Sleep Cycle & Bedtime Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Sleep Cycle & Bedtime Calculator runs instantly in your browser. Calculate optimal bedtime or wake-up times based on 90-minute REM sleep cycles. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Sleep Cycle & Bedtime Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Sleep Cycle & Bedtime Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Sleep Cycle & Bedtime Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SleepPlannerClient />
    
      <RelatedTools currentToolUrl="/tools/health/sleep-planner" />
</div>
  );
}
