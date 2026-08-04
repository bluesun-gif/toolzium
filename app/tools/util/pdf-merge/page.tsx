import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import PdfMergeClient from "@/components/tools/util/pdf-merge-client";

const title = "PDF Merge — Combine PDF Files Online Free | Toolzium";
const description = "Merge multiple PDF files into one document. Drag and drop, reorder pages, and download the combined PDF. Free online PDF merger — no signup, no upload to server.";
const url = `${siteURL}/tools/util/pdf-merge`;

export const metadata = buildMetadata({
  title,
  description,
  path: "/tools/util/pdf-merge",
});

export default function Page() {
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
        name: "PDF Merge",
        item: url,
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many PDFs can I merge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There is no hard limit. You can merge as many PDF files as your browser can handle.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all merging happens in your browser. Your files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "Can I reorder the PDFs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, use the up/down arrows to change the merge order.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a file size limit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on your browser's memory, but most files up to 100MB work fine.",
        },
      },
    ],
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "UtilitiesApplication",
    name: "PDF Merge",
    description,
    url,
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
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faq} />
      <JsonLd data={toolSchema} />
      <PdfMergeClient />
    </>
  );
}
