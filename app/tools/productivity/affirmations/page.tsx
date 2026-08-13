import JsonLd from "@/components/seo/json-ld";
import { AffirmationsClient } from "@/components/tools/productivity/affirmations-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Daily Affirmations Generator | Toolzium",
  description: "Generate positive daily affirmations for self-worth, career, health, relationships, and growth.",
  path: "/tools/productivity/affirmations",
  keywords: ["affirmations", "daily affirmations", "positive quotes", "motivation", "self-care"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/affirmations`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Daily Affirmations", url: toolUrl, description: "Generate positive daily affirmations.", applicationCategory: "LifestyleApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Daily Affirmations", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Daily Affirmations work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Daily Affirmations runs instantly in your browser. 200 positive affirmations across 6 categories. Daily selection based on date. Morning/Evening modes. Custom affirmations. Favorites. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Daily Affirmations 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Daily Affirmations is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Daily Affirmations?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><AffirmationsClient /></div>);
}
