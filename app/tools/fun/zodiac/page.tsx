import JsonLd from "@/components/seo/json-ld";
import ZodiacClient from "@/components/tools/fun/zodiac-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Zodiac Sign Finder | Toolzium",
  description: "Enter your birth date to find your Western zodiac sign and Chinese zodiac animal, along with personality traits and lucky numbers.",
  path: "/tools/fun/zodiac",
  keywords: ["zodiac sign finder", "western zodiac", "chinese zodiac", "astrology", "horoscope sign"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/zodiac`;
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Zodiac Sign Finder", 
    url: toolUrl, 
    description: "Find your Western and Chinese zodiac signs.", 
    applicationCategory: "EntertainmentApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, 
      { "@type": "ListItem", position: 3, name: "Zodiac Sign Finder", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "How is the zodiac sign determined?", acceptedAnswer: { "@type": "Answer", text: "The Western zodiac is based on the month and day of your birth, while the Chinese zodiac is based primarily on your birth year." } }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ZodiacClient />
    
      <RelatedTools currentToolUrl="/tools/fun/zodiac" />
</div>
  );
}
