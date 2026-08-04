import JsonLd from "@/components/seo/json-ld";
import { SvgToPngClient } from "@/components/tools/image/svg-to-png-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SVG to PNG Converter | Toolzium",
  description: "Convert SVG images or code to high-quality PNG images. Supports custom dimensions, transparent backgrounds, and scaling.",
  path: "/tools/image/svg-to-png",
  keywords: ["svg to png", "convert svg", "image converter", "svg to image", "png converter"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/svg-to-png`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SVG to PNG Converter",
    url: toolUrl,
    description: "Convert SVG files to PNG images with customizable dimensions and backgrounds.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "SVG to PNG", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I convert SVG code directly to PNG?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can paste raw SVG code directly into the tool to convert it to a PNG image."
        }
      },
      {
        "@type": "Question",
        name: "Does it support transparent backgrounds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, by default the generated PNG will have a transparent background, but you can also choose a custom background color."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SvgToPngClient />
    </div>
  );
}
