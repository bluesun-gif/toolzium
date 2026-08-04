// app/tools/image/image-to-text/page.tsx
import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import ImageToTextClient from "@/components/tools/image/image-to-text-client";

export const metadata = buildMetadata({
  title: "Image to Text (OCR) — Extract Text from Images | Toolzium",
  description: "Extract text from images using OCR. Upload PNG, JPG, or WEBP images and convert to editable text. Free online image to text converter.",
  path: "/tools/image/image-to-text",
});

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Image to Text (OCR) Tool",
        "url": siteURL + "/tools/image/image-to-text",
        "description": "Extract text from images using OCR. Upload PNG, JPG, or WEBP images and convert to editable text. Free online image to text converter.",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteURL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Image Tools",
            "item": siteURL + "/tools/image"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Image to Text",
            "item": siteURL + "/tools/image/image-to-text"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is OCR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Optical Character Recognition (OCR) converts text in images into editable digital text."
            }
          },
          {
            "@type": "Question",
            "name": "What image formats are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PNG, JPG, WEBP, and BMP."
            }
          },
          {
            "@type": "Question",
            "name": "Is my image uploaded to a server?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, all processing happens in your browser."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImageToTextClient />
    </>
  );
}
