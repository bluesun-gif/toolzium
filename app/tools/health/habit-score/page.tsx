import JsonLd from "@/components/seo/json-ld";
import { HabitScoreClient } from "@/components/tools/health/habit-score-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Habit Score Calculator | Toolzium",
  description: "Rate your daily habits and get a wellness score.",
  path: "/tools/health/habit-score",
  keywords: ["habit tracker", "wellness score", "health calculator", "daily habits"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/habit-score`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Habit Score Calculator", url: toolUrl, description: "Rate your daily habits and get a wellness score", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Habit Score Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is the score calculated?", acceptedAnswer: { "@type": "Answer", text: "Score is based on sleep, nutrition, exercise, mental, and social habits." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><HabitScoreClient />
      <RelatedTools currentToolUrl="/tools/health/habit-score" />
</div>);
}
