import JsonLd from "@/components/seo/json-ld";
import { FlexboxPlaygroundClient } from "@/components/tools/dev/flexbox-playground-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "CSS Flexbox Playground | Toolzium",
  description: "Interactive CSS Flexbox layout builder. Visually create flexbox layouts and generate CSS code.",
  path: "/tools/dev/flexbox-playground",
  keywords: ["css", "flexbox", "generator", "playground", "developer", "layout builder"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/flexbox-playground`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Flexbox Playground", url: toolUrl, description: "Interactive CSS Flexbox layout builder.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "CSS Flexbox Playground", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CSS Flexbox?", acceptedAnswer: { "@type": "Answer", text: "CSS Flexbox is a layout model that allows responsive elements within a container to be automatically arranged depending on screen size (or device)." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FlexboxPlaygroundClient />
    
      <RelatedTools currentToolUrl="/tools/dev/flexbox-playground" />
</div>
  );
}
