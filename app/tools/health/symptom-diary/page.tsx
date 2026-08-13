import JsonLd from "@/components/seo/json-ld";
import { SymptomDiaryClient } from "@/components/tools/health/symptom-diary-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Symptom Diary | Toolzium",
  description: "Track your daily symptoms with severity, categories, and trends. Save data locally.",
  path: "/tools/health/symptom-diary",
  keywords: ["symptom tracker", "health diary", "symptom log", "health tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/symptom-diary`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Symptom Diary", url: toolUrl, description: "Track your daily symptoms with severity and categories.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Symptom Diary", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Symptom Diary work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Symptom Diary runs instantly in your browser. Daily symptom tracking with severity (1-10), categories, time of day. Calendar view, trend analysis, export. Consult a healthcare provider. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Symptom Diary 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Symptom Diary is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Symptom Diary?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><SymptomDiaryClient /></div>);
}
