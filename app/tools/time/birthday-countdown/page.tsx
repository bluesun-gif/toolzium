import JsonLd from "@/components/seo/json-ld";
import { BirthdayCountdownClient } from "@/components/tools/time/birthday-countdown-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Birthday Countdown | Toolzium",
  description: "Live countdown to your next birthday with fun facts and age calculator.",
  path: "/tools/time/birthday-countdown",
  keywords: ["birthday countdown", "age calculator", "zodiac sign", "birth stone"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/birthday-countdown`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Birthday Countdown", url: toolUrl, description: "Live countdown to your next birthday with fun facts and age calculator.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Birthday Countdown", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Does this save my birthday?", acceptedAnswer: { "@type": "Answer", text: "Yes, it saves it locally in your browser." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><BirthdayCountdownClient />
      <RelatedTools currentToolUrl="/tools/time/birthday-countdown" />
</div>);
}
