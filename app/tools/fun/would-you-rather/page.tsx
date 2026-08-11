import JsonLd from "@/components/seo/json-ld";
import WouldYouRatherClient from "@/components/tools/fun/would-you-rather-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Would You Rather Generator | Toolzium",
  description: "Generate fun and challenging Would You Rather dilemmas.",
  path: "/tools/fun/would-you-rather",
  keywords: ["would you rather", "dilemma generator", "fun game", "icebreaker questions"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/would-you-rather`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Would You Rather Generator", url: toolUrl, description: "Generate fun and challenging Would You Rather dilemmas.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Would You Rather Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a Would You Rather game?", acceptedAnswer: { "@type": "Answer", text: "It's a conversation starter game where you are presented with two difficult choices and must pick one." } }, { "@type": "Question", name: "Are these questions safe for work?", acceptedAnswer: { "@type": "Answer", text: "Yes, our dilemmas are curated to be fun and engaging for everyone." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WouldYouRatherClient />
    </div>
  );
}
