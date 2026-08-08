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
        name: "How many PDF files can I merge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There is no hard limit on the number of PDF files you can merge. However, the performance and limit depend on your computer's RAM and browser memory since all processing runs client-side.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All PDF merging is executed locally in your browser using JavaScript. Your documents never leave your device, ensuring complete privacy.",
        },
      },
      {
        "@type": "Question",
        name: "Can I reorder the pages or files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can easily change the order of the uploaded PDF files using the up and down arrow buttons next to each file name before clicking the Merge button.",
        },
      },
      {
        "@type": "Question",
        name: "Does merging PDFs lose document quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The merging process copies the vector graphics, text formatting, layout, and images from the source PDFs directly, retaining 100% of the original document quality.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if my PDF fails to merge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ensure the files are not password-protected, encrypted, or corrupted. Protected PDFs must be decrypted before they can be merged. Try uploading them again.",
        },
      },
    ],
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF Merge",
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    featureList: [
      "Merge multiple PDF files locally",
      "Client-side processing for privacy",
      "No file size limitations",
      "Reorder PDF files before merging"
    ],
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
