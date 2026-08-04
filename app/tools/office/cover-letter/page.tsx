import JsonLd from "@/components/seo/json-ld";
import { CoverLetterClient } from "@/components/tools/office/cover-letter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cover Letter Builder | Toolzium",
  description: "Build professional cover letters with templates and live preview.",
  path: "/tools/office/cover-letter",
  keywords: ["cover letter", "resume", "job application", "office tools", "letter builder"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/cover-letter`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cover Letter Builder",
    url: toolUrl,
    description: "Build professional cover letters with templates and live preview.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` },
      { "@type": "ListItem", position: 3, name: "Cover Letter Builder", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the Cover Letter Builder work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter your personal details, company information, and section contents. The tool will automatically format and generate a cover letter based on your selected template."
        }
      },
      {
        "@type": "Question",
        name: "Can I download my cover letter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can copy the text or download it as a .txt file."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CoverLetterClient />
    </div>
  );
}
