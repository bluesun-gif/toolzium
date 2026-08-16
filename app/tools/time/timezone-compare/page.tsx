import JsonLd from "@/components/seo/json-ld";
import { TimezoneCompareClient } from "@/components/tools/time/timezone-compare-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Compare Time Zones — Free World Clock & Timezone Converter (2026) | Toolzium",
  description: "Compare local time across multiple time zones side by side. Easily schedule meetings between EST, PST, GMT, UTC, IST, and CET with instant DST awareness.",
  path: "/tools/time/timezone-compare",
  keywords: [
    "compare time zones",
    "timezone comparison",
    "compare timezone",
    "time zone compare",
    "time zone comparison tool",
    "world clock converter",
    "meeting timezone planner"
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/timezone-compare`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Time Zone Comparison",
    url: toolUrl,
    description: "Compare local time across multiple time zones side by side.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Time Tools", item: `${siteURL}/tools/time` },
      { "@type": "ListItem", position: 3, name: "Time Zone Comparison", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I compare time zones for international meetings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Select your primary city or time zone, then add secondary cities (e.g., New York EST, London GMT, Tokyo JST). The side-by-side comparison slider displays overlapping business hours in real time."
        }
      },
      {
        "@type": "Question",
        name: "Does this time zone converter adjust for Daylight Saving Time (DST)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Toolzium automatically detects active Daylight Saving Time shifts for all global regions based on the current date."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TimezoneCompareClient />
    
      <RelatedTools currentToolUrl="/tools/time/timezone-compare" />
</div>
  );
}
