import JsonLd from "@/components/seo/json-ld";
import { HabitTrackerClient } from "@/components/tools/productivity/habit-tracker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Habit Tracker — Build Good Habits Daily | Toolzium",
  description: "Track your daily habits, build streaks, and stay motivated with our interactive habit tracker. Completely free and runs in your browser.",
  path: "/tools/productivity/habit-tracker",
  keywords: ["habit tracker", "daily habits", "build streaks", "productivity tool", "habit calendar", "habit builder", "habit tracker online"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/habit-tracker`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Habit Tracker",
    "url": toolUrl,
    "description": "Track your daily habits, build streaks, and stay motivated with our interactive habit tracker.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteURL },
      { "@type": "ListItem", "position": 2, "name": "Productivity", "item": `${siteURL}/tools#cat-productivity` },
      { "@type": "ListItem", "position": 3, "name": "Habit Tracker", "item": toolUrl }
    ]
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the habit tracker work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply add your habits and click to mark them complete each day. The tracker will automatically calculate your streaks and show your progress on a calendar heatmap."
        }
      },
      {
        "@type": "Question",
        "name": "Is my habit data saved?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all your habit data is securely saved in your browser's local storage. We do not track or store any of your personal data on our servers."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HabitTrackerClient />
    </div>
  );
}
