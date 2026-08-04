import JsonLd from "@/components/seo/json-ld";
import { PasswordEntropyClient } from "@/components/tools/util/password-entropy-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Password Strength & Entropy Calculator | Toolzium",
  description: "Analyze password security, information entropy (bits), and estimated crack time.",
  path: "/tools/util/password-entropy",
  keywords: ["password strength", "password entropy", "entropy calculator", "crack time calculator", "utilities"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/util/password-entropy";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Password Entropy", url: toolUrl, description: "Analyze password security, information entropy (bits), and estimated crack time.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Utilities", item: siteURL + "/tools#cat-utilities" }, { "@type": "ListItem", position: 3, name: "Password Entropy", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is password entropy?", acceptedAnswer: { "@type": "Answer", text: "Password entropy measures how unpredictable a password is, calculated in bits based on length and character set size." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PasswordEntropyClient />
    </div>
  );
}
