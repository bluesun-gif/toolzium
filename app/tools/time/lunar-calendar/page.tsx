import JsonLd from "@/components/seo/json-ld";
import { LunarCalendarClient } from "@/components/tools/time/lunar-calendar-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Lunar Calendar | Toolzium",
  description: "View moon phases for any month and year.",
  path: "/tools/time/lunar-calendar",
  keywords: ["lunar", "calendar", "moon phase"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/lunar-calendar";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Lunar Calendar", url: toolUrl, description: "View moon phases.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Lunar Calendar", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Lunar Calendar work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Lunar Calendar runs instantly in your browser. Moon phases for any month/year. Synodic period calculation. Moon emojis. Next full/new moon dates. Monthly calendar grid view. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Lunar Calendar 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Lunar Calendar is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Lunar Calendar?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <LunarCalendarClient />
    
      <RelatedTools currentToolUrl="/tools/time/lunar-calendar" />
</div>
  );
}
