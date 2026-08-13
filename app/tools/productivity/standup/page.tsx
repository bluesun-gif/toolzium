import JsonLd from "@/components/seo/json-ld";
import { StandupClient } from "@/components/tools/productivity/standup-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Daily Standup Generator | Toolzium",
  description: "Generate and format your daily standup reports easily. Organize your tasks, blockers, and achievements for team meetings.",
  path: "/tools/productivity/standup",
  keywords: ["daily standup", "standup generator", "agile meeting report", "slack standup formatter"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/standup`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Daily Standup Generator",
    url: toolUrl,
    description: "Generate and format your daily standup reports easily.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` },
      { "@type": "ListItem", position: 3, name: "Daily Standup Generator", item: toolUrl }
    ]
  };


  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Daily Standup Generator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Daily Standup Generator runs instantly in your browser. Generate daily standup reports. Yesterday, Today, Blockers sections. Slack formatting. Save history by date. Quick templates. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Daily Standup Generator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Daily Standup Generator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Daily Standup Generator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <StandupClient />
    </div>
  );
}
