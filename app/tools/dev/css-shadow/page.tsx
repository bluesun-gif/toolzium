import JsonLd from "@/components/seo/json-ld";
import CssShadowClient from "@/components/tools/dev/css-shadow-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Box-Shadow & Text-Shadow Generator | Toolzium",
  description: "Visual generator for CSS box-shadow and text-shadow with multiple layers, inset shadows, and presets.",
  path: "/tools/dev/css-shadow",
  keywords: ["css shadow generator", "box shadow generator", "text shadow generator", "css tools", "web design tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-shadow";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Shadow Generator", url: toolUrl, description: "Visual generator for CSS box-shadow and text-shadow.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Shadow Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the difference between box-shadow and text-shadow?", acceptedAnswer: { "@type": "Answer", text: "Box-shadow applies a shadow to the element's box (container), while text-shadow applies it to the text itself." } }] };
  
  return (
    <div className={"space-y-4"}>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssShadowClient />
    </div>
  );
}
