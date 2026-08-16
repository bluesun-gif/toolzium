import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TypingChallengeClient from "@/components/tools/fun/typing-challenge-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Speed Typing Challenge",
  description: "Interactive speed typing test and WPM meter. 15s-120s tests, general English, code, quotes. Accuracy %, WPM score rating.",
  path: "/tools/fun/typing-challenge",
  keywords: ["meter", "interactive", "english", "score", "general", "quotes", "typing", "test", "speed", "tests", "code", "accuracy"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/typing-challenge";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Speed Typing Challenge", url: toolUrl, description: "Interactive speed typing test", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Speed Typing Challenge", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I improve my WPM?", acceptedAnswer: { "@type": "Answer", text: "Practice regularly with our typing challenge!" } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><TypingChallengeClient />
      <RelatedTools currentToolUrl="/tools/fun/typing-challenge" />
</div>);
}
