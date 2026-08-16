import JsonLd from "@/components/seo/json-ld";
import { ReceiptScannerClient } from "@/components/tools/office/receipt-scanner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Receipt Tracker | Toolzium",
  description: "Track your receipts, categorize expenses, and export to CSV easily.",
  path: "/tools/office/receipt-scanner",
  keywords: ["receipt tracker", "expense tracker", "receipt scanner", "finance tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/receipt-scanner`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Receipt Tracker",
    url: toolUrl,
    description: "Track your receipts, categorize expenses, and export to CSV easily.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` },
      { "@type": "ListItem", position: 3, name: "Receipt Tracker", item: toolUrl }
    ]
  };


  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Receipt Tracker work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Receipt Tracker runs instantly in your browser. Manual receipt entry and tracking. Add store, date, amount, category, payment method. Filter and export as CSV. Total spending dashboard. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Receipt Tracker 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Receipt Tracker is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Receipt Tracker?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ReceiptScannerClient />
    
      <RelatedTools currentToolUrl="/tools/office/receipt-scanner" />
</div>
  );
}
