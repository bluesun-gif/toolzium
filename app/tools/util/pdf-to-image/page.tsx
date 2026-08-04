import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import PdfToImageClient from "@/components/tools/util/pdf-to-image-client";

export const metadata = buildMetadata({
  title: "PDF to Image — Convert PDF to JPG/PNG Online | Toolzium",
  description: "Convert PDF pages to high-quality JPG or PNG images. Choose DPI, preview pages, and download individually or as ZIP. Free online PDF to image converter.",
  path: "/tools/util/pdf-to-image",
});

export default function Page() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What image formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PNG and JPG.",
        },
      },
      {
        "@type": "Question",
        name: "Can I choose the image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, select 72, 150, or 300 DPI.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files uploaded?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all conversion happens in your browser.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert specific pages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, preview all pages and download the ones you need.",
        },
      },
    ],
  };

  const breadcrumbs = {
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
        name: "Utilities",
        item: `${siteURL}/tools/util`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "PDF to Image",
        item: `${siteURL}/tools/util/pdf-to-image`,
      },
    ],
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF to Image Converter",
    description: "Convert PDF pages to high-quality JPG or PNG images. Choose DPI, preview pages, and download individually or as ZIP.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={softwareApp} />
      <PdfToImageClient />
    </>
  );
}
