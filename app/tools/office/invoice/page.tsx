import JsonLd from "@/components/seo/json-ld";
import SimpleInvoiceClient from "@/components/tools/office/simple-invoice-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Simple Invoice Generator — Create & Download Free PDFs",
  description:
    "Create professional invoices instantly online. Add items, compute taxes, discounts, shipping fees, and track balance due. Export print-ready invoices to PDF or CSV.",
  path: "/tools/office/invoice",
  keywords: [
    "invoice generator",
    "simple invoice",
    "create invoice",
    "free invoice template",
    "invoice maker online",
    "invoice PDF generator",
    "invoice CSV export",
    "online billing tool",
    "tax and discount invoice",
    "shipping costs invoice",
    "multi-currency invoice",
    "autosave invoice",
    "freelancer invoice",
    "Toolzium",
    "online tools",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/invoice`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simple Invoice Generator — Toolzium",
    url: toolUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description:
      "Quickly create and download invoices with line items, discounts, taxes, shipping, and payment status. Export to PDF or CSV.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Add, edit, clone, or remove unlimited line items",
      "Apply discounts and multiple tax rates",
      "Add shipping and handling charges",
      "Mark invoices as paid and calculate balance due",
      "Customizable invoice number and dates",
      "Print-friendly layout for physical copies",
      "Autosave drafts to local storage",
      "Privacy-first: runs locally in your browser",
    ],
    creator: {
      "@type": "Organization",
      name: "Toolzium",
      url: "https://toolzium.com",
    },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Office", item: `${siteURL}/tools#cat-office` },
      { "@type": "ListItem", position: 3, name: "Simple Invoice", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I download my invoice as a PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fill out all required sender, client, and item details. Once completed, click the 'Print / PDF' button at the top. In your system's print preview dialog, select 'Save as PDF' as the destination and click Save.",
        },
      },
      {
        "@type": "Question",
        name: "Is my financial and business data secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Toolzium values your privacy. All invoice calculations, details, and exports are processed locally on your device within your browser. No data is sent to our servers or stored in any remote database.",
        },
      },
      {
        "@type": "Question",
        name: "How does local autosave work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool automatically caches your progress to your browser's local storage as you type. If you close the tab or refresh the page, your invoice draft will be restored automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the currency symbol?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can toggle between 'ISO Code' (e.g., USD, BDT, EUR) and 'Symbol' (e.g., $, ৳, €) mode under the details panel. You can also type in custom three-character codes or symbols.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between an invoice and a receipt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An invoice is a billing document issued by a vendor to a client requesting payment for services or goods rendered, usually containing payment terms. A receipt is an acknowledgment document issued after the payment has been successfully completed, showing the balance paid.",
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SimpleInvoiceClient />
    
      <RelatedTools currentToolUrl="/tools/office/invoice" />
</div>
  );
}
