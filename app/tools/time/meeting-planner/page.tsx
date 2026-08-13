import JsonLd from "@/components/seo/json-ld";
import { MeetingPlannerClient } from "@/components/tools/time/meeting-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Time Zone Meeting Planner | Toolzium",
  description: "Find the best meeting time across different time zones. Compare availability and schedule international meetings easily.",
  path: "/tools/time/meeting-planner",
  keywords: ["time zone converter", "meeting planner", "international meeting time", "timezone scheduler"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/meeting-planner`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Time Zone Meeting Planner", url: toolUrl, description: "Find the best meeting time across different time zones.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Meeting Planner", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Meeting Planner work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Meeting Planner runs instantly in your browser. Find the best meeting time across time zones. Visual 24-hour grid with working hours highlighted. Overlap detection. Copy invite text with converted times. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Meeting Planner 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Meeting Planner is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Meeting Planner?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><MeetingPlannerClient /></div>);
}
