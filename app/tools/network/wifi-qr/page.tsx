import JsonLd from "@/components/seo/json-ld";
import { WifiQrClient } from "@/components/tools/network/wifi-qr-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "WiFi QR Code Generator | Toolzium",
  description: "Generate a QR code to share your WiFi network easily. Scan to connect instantly without typing passwords.",
  path: "/tools/network/wifi-qr",
  keywords: ["wifi qr code", "share wifi", "network qr generator", "wifi scan to connect"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/wifi-qr`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WiFi QR Code Generator",
    url: toolUrl,
    description: "Generate a QR code to easily share your WiFi network.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Network & Security Tools", item: `${siteURL}/tools#cat-network` },
      { "@type": "ListItem", position: 3, name: "WiFi QR Code Generator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the WiFi QR code work?",
        acceptedAnswer: { "@type": "Answer", text: "It creates a standardized string containing your network name and password. Most modern smartphones recognize this when scanned and will prompt you to connect to the network automatically." }
      },
      {
        "@type": "Question",
        name: "Is my WiFi password safe?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, the QR code generation happens entirely in your browser. Your password is never sent to our servers." }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WifiQrClient />
    
      <RelatedTools currentToolUrl="/tools/network/wifi-qr" />
</div>
  );
}
