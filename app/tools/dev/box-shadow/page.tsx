import JsonLd from "@/components/seo/json-ld";
import { BoxShadowClient } from "@/components/tools/dev/box-shadow-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "CSS Box Shadow Generator | Toolzium",
  description: "Generate CSS box shadow rules visually with support for multiple layers, colors, and Tailwind CSS output.",
  path: "/tools/dev/box-shadow",
  keywords: ["css box shadow generator", "tailwind shadow generator", "css shadow", "visual css editor"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/box-shadow`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Box Shadow Generator", url: toolUrl, description: "Generate CSS box shadow rules visually with support for multiple layers, colors, and Tailwind CSS output.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "CSS Box Shadow Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CSS box-shadow?", acceptedAnswer: { "@type": "Answer", text: "The box-shadow CSS property adds shadow effects around an element's frame. You can set multiple effects separated by commas." } }, { "@type": "Question", name: "How do I use this generator?", acceptedAnswer: { "@type": "Answer", text: "Use the sliders to adjust horizontal and vertical offset, blur and spread radius. You can also pick a shadow color and toggle the inset option." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <BoxShadowClient />
    
      <RelatedTools currentToolUrl="/tools/dev/box-shadow" />
</div>
  );
}
