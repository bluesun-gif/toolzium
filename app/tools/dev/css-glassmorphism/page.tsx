import JsonLd from "@/components/seo/json-ld";
import { CssGlassmorphismClient } from "@/components/tools/dev/css-glassmorphism-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Glassmorphism & Backdrop Filter Generator | Toolzium",
  description: "Visual CSS Glassmorphism generator. Controls for blur, transparency, saturation, border width, and shadow.",
  path: "/tools/dev/css-glassmorphism",
  keywords: ["glassmorphism generator", "css glass", "backdrop filter generator", "css blur generator", "glass ui generator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-glassmorphism";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Glassmorphism & Backdrop Filter Generator", url: toolUrl, description: "Visual CSS Glassmorphism generator.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Glassmorphism Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CSS Glassmorphism?", acceptedAnswer: { "@type": "Answer", text: "Glassmorphism is a UI design trend that emphasizes light or dark objects placed on top of colorful backgrounds, with a background blur applied." } }, { "@type": "Question", name: "Which CSS property is used?", acceptedAnswer: { "@type": "Answer", text: "The primary CSS property is backdrop-filter: blur() combined with a semi-transparent background-color." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CssGlassmorphismClient /></div>);
}
