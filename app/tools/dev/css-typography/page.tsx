import JsonLd from "@/components/seo/json-ld";
import { CssTypographyClient } from "@/components/tools/dev/css-typography-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Typography & Text Effect Generator | Toolzium",
  description: "Visually generate and preview CSS typography and text effects. Customize text shadows, gradients, strokes, and more with live CSS code output.",
  path: "/tools/dev/css-typography",
  keywords: ["CSS typography generator", "CSS text effects", "text shadow generator", "CSS text gradient", "web typography tool", "developer tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-typography";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSS Typography & Text Effect Generator",
    url: toolUrl,
    description: "Visually generate and preview CSS typography and text effects.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" },
      { "@type": "ListItem", position: 3, name: "CSS Typography Generator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I generate a CSS text gradient?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Select the 'Text Gradient' option in our generator, pick your start and end colors, and the tool will generate the background-clip text CSS snippet for you.",
        },
      },
      {
        "@type": "Question",
        name: "What is webkit-text-stroke?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is a CSS property that applies a stroke (outline) to the text. It's supported by most modern browsers.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssTypographyClient />
    </div>
  );
}
