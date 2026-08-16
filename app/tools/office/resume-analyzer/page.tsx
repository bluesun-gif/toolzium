import JsonLd from "@/components/seo/json-ld";
import { ResumeAnalyzerClient } from "@/components/tools/office/resume-analyzer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Resume Word Counter & Analyzer | Toolzium",
  description: "Analyze your resume or CV for word count, keywords, readability, and weak words.",
  path: "/tools/office/resume-analyzer",
  keywords: ["resume analyzer", "cv checker", "word count", "resume tips"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/resume-analyzer`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Resume Analyzer", url: toolUrl, description: "Analyze resume text.", applicationCategory: "BusinessApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "Resume Analyzer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an ideal resume word count?", acceptedAnswer: { "@type": "Answer", text: "Generally 400-700 words for a 1-page resume." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ResumeAnalyzerClient />
      <RelatedTools currentToolUrl="/tools/office/resume-analyzer" />
</div>);
}
