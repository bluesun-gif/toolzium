import JsonLd from "@/components/seo/json-ld";
import { NatoPasswordReaderClient } from "@/components/tools/util/nato-password-reader-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "NATO Password Generator & Phonetic Reader | Toolzium",
  description: "Generate secure passwords with NATO phonetic spelling guides for easy reading.",
  path: "/tools/util/nato-password-reader",
  keywords: ["password generator", "NATO phonetic", "password reader", "secure password", "utilities"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/util/nato-password-reader";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NATO Password Generator",
    url: toolUrl,
    description: "Generate secure passwords with NATO phonetic spelling guides.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Utilities", item: siteURL + "/tools#cat-utilities" },
      { "@type": "ListItem", position: 3, name: "NATO Password Generator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the NATO phonetic alphabet?",
        acceptedAnswer: { "@type": "Answer", text: "It uses words to represent letters, such as Alpha for A." },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <NatoPasswordReaderClient />
    </div>
  );
}
