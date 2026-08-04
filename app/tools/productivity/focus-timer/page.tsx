import JsonLd from "@/components/seo/json-ld";
import { FocusTimerClient } from "@/components/tools/productivity/focus-timer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Focus Timer | Toolzium",
  description: "Distraction-free focus timer with customizable sessions.",
  path: "/tools/productivity/focus-timer",
  keywords: ["focus timer", "pomodoro", "productivity", "time management"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/focus-timer`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Focus Timer", url: toolUrl, description: "Distraction-free focus timer with customizable sessions.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Focus Timer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use?", acceptedAnswer: { "@type": "Answer", text: "Select a mode and start." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><FocusTimerClient /></div>);
}
