import JsonLd from "@/components/seo/json-ld";
import { TextStatsClient } from "@/components/tools/text/text-stats-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Text Statistics & Analyzer | Toolzium",
  description: "Advanced text analysis tool for word count, readability score, reading time, and lexical density.",
  path: "/tools/text/text-stats",
  keywords: ["text stats", "word count", "readability checker", "text analyzer", "lexical density"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/text-stats`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Text Statistics Analyzer", url: toolUrl, description: "Advanced text analysis tool.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` }, { "@type": "ListItem", position: 3, name: "Text Statistics", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Text Statistics work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Text Statistics runs instantly in your browser. Advanced text analysis: word/sentence/paragraph count, avg word length, reading level (Flesch-Kincaid), lexical density, most frequent words, and more. Real-time. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Text Statistics 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Text Statistics is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Text Statistics?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TextStatsClient />
    
      <RelatedTools currentToolUrl="/tools/text/text-stats" />
</div>
  );
}
