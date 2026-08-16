import JsonLd from "@/components/seo/json-ld";
import { GratitudeClient } from "@/components/tools/productivity/gratitude-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Gratitude Journal | Toolzium",
  description: "Track your daily gratitude, build a streak, and reflect on what matters.",
  path: "/tools/productivity/gratitude",
  keywords: ["gratitude journal", "daily reflection", "productivity", "mindfulness"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/gratitude`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Gratitude Journal", url: toolUrl, description: "Daily gratitude journal.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Gratitude Journal", item: toolUrl }] };
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><GratitudeClient />
      <RelatedTools currentToolUrl="/tools/productivity/gratitude" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Gratitude Journal work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Gratitude Journal runs instantly in your browser. Daily gratitude entries. Write 3 things you are grateful for. Streak counter, inspirational prompts, monthly calendar view. Saved locally. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Gratitude Journal 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Gratitude Journal is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Gratitude Journal?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><GratitudeClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
