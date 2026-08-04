import PlaceholderImageClient from "@/components/tools/image/placeholder-image-client";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Placeholder Image Generator — Create Dummy Images",
  description: "Generate placeholder images with custom dimensions, colors, and text. Create dummy images for mockups, wireframes, and development. Free online tool.",
  path: "/tools/image/placeholder-image",
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Placeholder Image Generator",
      description: "Generate placeholder images with custom dimensions, colors, and text. Create dummy images for mockups, wireframes, and development. Free online tool.",
      url: siteURL + "/tools/image/placeholder-image",
      applicationCategory: "DesignApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a placeholder image?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A temporary image used during development to represent where real images will go.",
          },
        },
        {
          "@type": "Question",
          name: "Can I customize the colors?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, choose any background and text color.",
          },
        },
        {
          "@type": "Question",
          name: "What formats can I download?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PNG format at your specified dimensions.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteURL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Image Tools",
          item: siteURL + "/tools/image",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Placeholder Image Generator",
          item: siteURL + "/tools/image/placeholder-image",
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <PlaceholderImageClient />
    </>
  );
}
