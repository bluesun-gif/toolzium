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
  
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><ResumeBuilderClient />
      <RelatedTools currentToolUrl="/tools/text/resume-builder" />
</div>);
}
