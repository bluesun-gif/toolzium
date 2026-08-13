import JsonLd from "@/components/seo/json-ld";
import { CryptoProfitClient } from "@/components/tools/finance/crypto-profit-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crypto Profit Calculator | Toolzium",
  description: "Calculate your cryptocurrency trading profit, loss, and ROI including exchange fees.",
  path: "/tools/finance/crypto-profit",
  keywords: ["crypto calculator", "profit calculator", "crypto roi", "trade calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/crypto-profit";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Crypto Profit Calculator",
    url: toolUrl,
    description: "Calculate your cryptocurrency trading profit and loss.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" },
      { "@type": "ListItem", position: 3, name: "Crypto Profit Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Crypto Profit Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Crypto Profit Calculator runs instantly in your browser. Calculate profit/loss from crypto trades. Buy/sell price, fees, ROI %. Popular coin presets. Visual profit cards. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Crypto Profit Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Crypto Profit Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Crypto Profit Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CryptoProfitClient />
    </div>
  );
}
