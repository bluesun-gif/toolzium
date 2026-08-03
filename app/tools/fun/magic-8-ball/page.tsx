import JsonLd from "@/components/seo/json-ld";
import { Magic8BallClient } from "@/components/tools/fun/magic-8-ball-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Magic 8 Ball | Toolzium",
  description: "Ask the Magic 8 Ball a question and discover your fate.",
  path: "/tools/fun/magic-8-ball",
  keywords: ["magic 8 ball", "fortune teller", "yes or no", "oracle"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/magic-8-ball`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Magic 8 Ball", url: toolUrl, description: "Ask the Magic 8 Ball a question and discover your fate.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Magic 8 Ball", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does the Magic 8 Ball work?", acceptedAnswer: { "@type": "Answer", text: "Think of a yes or no question, type it in, and the 8 Ball will reveal an answer." } }, { "@type": "Question", name: "Are the answers real?", acceptedAnswer: { "@type": "Answer", text: "The Magic 8 Ball is for entertainment purposes only." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <Magic8BallClient />
    </div>
  );
}
