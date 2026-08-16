import JsonLd from "@/components/seo/json-ld";
import { WorkoutTimerClient } from "@/components/tools/health/workout-timer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

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
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><WorkoutTimerClient />
      <RelatedTools currentToolUrl="/tools/health/workout-timer" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Workout Timer work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Workout Timer runs instantly in your browser. Interval training timer with audio cues. Set work/rest durations and rounds. Presets for Tabata, HIIT, EMOM. Visual progress bar. Pause/Resume. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Workout Timer 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Workout Timer is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Workout Timer?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><WorkoutTimerClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
