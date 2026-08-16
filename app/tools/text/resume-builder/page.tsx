import JsonLd from "@/components/seo/json-ld";
import { ResumeBuilderClient } from "@/components/tools/text/resume-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Markdown Resume Builder | Toolzium",
  description: "Build a professional resume in markdown format with live preview and download options.",
  path: "/tools/text/resume-builder",
  keywords: ["resume builder", "markdown resume", "cv maker"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/resume-builder`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Markdown Resume Builder", url: toolUrl, description: "Build a professional resume in markdown format with live preview and download options.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` }, { "@type": "ListItem", position: 3, name: "Markdown Resume Builder", item: toolUrl }] };
  
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><ResumeBuilderClient />
      <RelatedTools currentToolUrl="/tools/text/resume-builder" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Resume Builder work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Resume Builder runs instantly in your browser. Build a resume in markdown format. Sections for contact, summary, experience, education, skills. Live preview. Copy markdown or download as .md file. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Resume Builder 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Resume Builder is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Resume Builder?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><ResumeBuilderClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
