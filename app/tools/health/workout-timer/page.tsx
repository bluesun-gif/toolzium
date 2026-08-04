import JsonLd from "@/components/seo/json-ld";
import { WorkoutTimerClient } from "@/components/tools/health/workout-timer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Workout Timer | Toolzium",
  description: "Interval training timer for Tabata, HIIT, and EMOM workouts. Customizable work and rest durations.",
  path: "/tools/health/workout-timer",
  keywords: ["workout timer", "interval timer", "tabata timer", "hiit timer"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/workout-timer`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Workout Timer", url: toolUrl, description: "Interval training timer.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Workout Timer", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><WorkoutTimerClient /></div>);
}
