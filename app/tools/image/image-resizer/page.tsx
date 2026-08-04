import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import ImageResizerClient from "@/components/tools/image/image-resizer-client";

const TITLE = "Image Resizer — Resize Images Online in KB / Pixels | Toolzium";
const DESCRIPTION = "Free online image resizer. Resize single or bulk images by pixels or percentage, maintain aspect ratio, adjust quality, and target file size in KB. Instant 100% browser-based photo resizer.";
const PATH = "/tools/image/image-resizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "image resizer", "resize image", "resize photo", "img resizer", "resize png", "resize jpg", 
    "change image size in kb", "bulk image resizer", "photo resizer", "reduce image size", 
    "online image resizer", "picture resizer", "Toolzium"
  ],
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Image Resizer",
      description: DESCRIPTION,
      url: siteURL + PATH,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
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
          name: "Image Resizer",
          item: siteURL + PATH,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <ImageResizerClient />
    </>
  );
}
