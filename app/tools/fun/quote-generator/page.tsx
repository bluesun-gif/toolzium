import JsonLd from "@/components/seo/json-ld";
import QuoteGeneratorClient from "@/components/tools/fun/quote-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Random Quote Generator — Get Inspired | Toolzium",
  description: "Generate random inspirational, funny, motivational, philosophical, and life quotes. Discover new perspectives and share your favorite quotes with our free tool.",
  path: "/tools/fun/quote-generator",
  keywords: [
    "random quote generator",
    "inspirational quotes",
    "motivational quotes",
    "funny quotes",
    "philosophical quotes",
    "life quotes",
    "daily quotes",
    "quote maker",
    "quote of the day"
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/quote-generator`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Random Quote Generator",
    "url": toolUrl,
    "description": "Generate random inspirational, funny, motivational, philosophical, and life quotes.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteURL },
      { "@type": "ListItem", "position": 2, "name": "Fun Tools", "item": `${siteURL}/tools#cat-fun` },
      { "@type": "ListItem", "position": 3, "name": "Random Quote Generator", "item": toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many quotes are in the generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our generator features a curated list of over 50 unique quotes across various categories including inspirational, funny, philosophical, motivational, and life."
        }
      },
      {
        "@type": "Question",
        "name": "Can I filter quotes by category?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can easily filter quotes by clicking on the category chips to show only motivational, funny, or philosophical quotes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I save my favorite quotes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can click the heart icon on any quote you like. It will be saved to your favorites list, which is stored locally in your browser."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <QuoteGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/fun/quote-generator" />
</div>
  );
}
