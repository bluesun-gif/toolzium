import JsonLd from "@/components/seo/json-ld";
import { PhoneticPasswordClient } from "@/components/tools/util/phonetic-password-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phonetic Pronunciation Password Generator | Toolzium",
  description: "Generate strong, memorable passwords with NATO phonetic pronunciation guides.",
  path: "/tools/util/phonetic-password",
  keywords: ["password generator", "phonetic password", "nato alphabet", "secure password"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/util/phonetic-password";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Phonetic Pronunciation Password Generator",
    url: toolUrl,
    description: "Generate strong, memorable passwords with NATO phonetic pronunciation guides.",
    applicationCategory: "SecurityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Utilities", item: siteURL + "/tools#cat-utilities" },
      { "@type": "ListItem", position: 3, name: "Phonetic Password", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a phonetic password guide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It translates each character of your password into a word from the NATO phonetic alphabet (e.g. A = Alpha), making it easier to read out loud securely.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PhoneticPasswordClient />
    </div>
  );
}
