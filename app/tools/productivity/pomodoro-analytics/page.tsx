import JsonLd from "@/components/seo/json-ld";
import { PomodoroAnalyticsClient } from "@/components/tools/productivity/pomodoro-analytics-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Pomodoro Tracker & Log | Toolzium",
  description: "Advanced Pomodoro timer with daily productivity logging, task tagging, and focus analytics.",
  path: "/tools/productivity/pomodoro-analytics",
  keywords: ["pomodoro", "focus timer", "productivity tracker", "time management"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/pomodoro-analytics";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Pomodoro Tracker", url: toolUrl, description: "Advanced Pomodoro timer with daily productivity logging.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Pomodoro Tracker & Log", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is Pomodoro technique?", acceptedAnswer: { "@type": "Answer", text: "A time management method that uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PomodoroAnalyticsClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/pomodoro-analytics" />
</div>
  );
}
