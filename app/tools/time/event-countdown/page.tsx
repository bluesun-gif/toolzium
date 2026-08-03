import JsonLd from "@/components/seo/json-ld";
import { EventCountdownClient } from "@/components/tools/time/event-countdown-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Event Countdown | Toolzium",
  description: "Create and track custom countdowns to your important events. Set timers for New Year, birthdays, holidays, and more.",
  path: "/tools/time/event-countdown",
  keywords: ["event countdown", "countdown timer", "time tracker", "date tools", "holiday countdown"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/event-countdown`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Event Countdown",
    url: toolUrl,
    description: "Create custom event countdowns with live tracking of days, hours, minutes, and seconds.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteURL}/tools#cat-time` },
      { "@type": "ListItem", position: 3, name: "Event Countdown", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I save my countdowns?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, all your active and past countdowns are saved automatically to your browser storage." }
      },
      {
        "@type": "Question",
        name: "What happens when an event passes?",
        acceptedAnswer: { "@type": "Answer", text: "The timer will show that the event has passed and tell you how long ago it occurred." }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EventCountdownClient />
    </div>
  );
}
