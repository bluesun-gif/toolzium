import JsonLd from "@/components/seo/json-ld";
import { EmailSignatureClient } from "@/components/tools/office/email-signature-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Email Signature Generator | Toolzium",
  description: "Create professional HTML email signatures with social links, custom colors, and templates.",
  path: "/tools/office/email-signature",
  keywords: ["email signature", "signature generator", "html signature", "email signature templates"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/email-signature`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Email Signature Generator", url: toolUrl, description: "Create professional HTML email signatures with social links, custom colors, and templates.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "Email Signature Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can I use this signature in Outlook or Gmail?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can copy the generated HTML or visually copy the signature directly into your email client settings." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EmailSignatureClient />
    </div>
  );
}
