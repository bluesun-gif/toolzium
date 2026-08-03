import JsonLd from "@/components/seo/json-ld";
import { GradientGeneratorClient } from "@/components/tools/dev/gradient-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Gradient Generator | Toolzium",
  description: "Create beautiful CSS gradients visually. Support for linear and radial gradients with adjustable angles and multiple color stops.",
  path: "/tools/dev/gradient-generator",
  keywords: ["gradient generator", "css gradient", "tailwind gradient", "color gradient"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/gradient-generator`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Gradient Generator", url: toolUrl, description: "Create beautiful CSS gradients visually. Support for linear and radial gradients with adjustable angles and multiple color stops.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "Color Gradient Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to create a CSS gradient?", acceptedAnswer: { "@type": "Answer", text: "Use our Color Gradient Generator tool to visually design your gradient and copy the generated CSS code." } }, { "@type": "Question", name: "Can I generate Tailwind CSS gradients?", acceptedAnswer: { "@type": "Answer", text: "Yes, our tool provides both standard CSS and Tailwind CSS syntax for your custom gradients." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <GradientGeneratorClient />
    </div>
  );
}
