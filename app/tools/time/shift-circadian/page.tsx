import JsonLd from "@/components/seo/json-ld";
import { ShiftCircadianClient } from "@/components/tools/time/shift-circadian-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Shift Work Sleep Schedule & Circadian Calculator | Toolzium",
  description: "Calculate optimal sleep and wake cycles for shift workers.",
  path: "/tools/time/shift-circadian",
  keywords: ["shift work", "sleep schedule", "circadian rhythm", "time tools", "health"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/shift-circadian";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shift Work Sleep Schedule & Circadian Calculator",
    url: toolUrl,
    description: "Calculate optimal sleep and wake cycles for shift workers.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" },
      { "@type": "ListItem", position: 3, name: "Shift Sleep Calculator", item: toolUrl }
    ]
  };


  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Shift Work Sleep Schedule & Circadian Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Shift Work Sleep Schedule & Circadian Calculator runs instantly in your browser. Calculate optimal sleep and wake cycles for shift workers. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Shift Work Sleep Schedule & Circadian Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Shift Work Sleep Schedule & Circadian Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Shift Work Sleep Schedule & Circadian Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ShiftCircadianClient />
    
      <RelatedTools currentToolUrl="/tools/time/shift-circadian" />
</div>
  );
}
