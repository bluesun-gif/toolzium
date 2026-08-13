import JsonLd from "@/components/seo/json-ld";
import { HolidaysClient } from "@/components/tools/time/holidays-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Holiday Calendar | Toolzium",
  description: "View and filter public holidays by country and year. See upcoming holidays and count downs.",
  path: "/tools/time/holidays",
  keywords: ["holiday calendar", "public holidays", "national holidays", "calendar tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/holidays`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Holiday Calendar", url: toolUrl, description: "View public holidays worldwide.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Holiday Calendar", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Holiday Calendar work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Holiday Calendar runs instantly in your browser. Public holidays for 10 countries. Filter by month and year. Countdown to next holiday. Mark favorites. Copy holiday list. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Holiday Calendar 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Holiday Calendar is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Holiday Calendar?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HolidaysClient />
    </div>
  );
}
