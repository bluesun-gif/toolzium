import JsonLd from "@/components/seo/json-ld";
import { SubnetCalculatorClient } from "@/components/tools/network/subnet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Subnet Calculator | Toolzium",
  description: "Calculate subnet details from an IP address and CIDR notation.",
  path: "/tools/network/subnet",
  keywords: ["subnet calculator", "cidr", "ip address", "network tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/subnet`;
  
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Subnet Calculator", 
    url: toolUrl, 
    description: "Calculate subnet details from an IP address and CIDR notation.", 
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
      { "@type": "ListItem", position: 3, name: "Subnet Calculator", item: toolUrl }
    ] 
  };
  
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "What is a subnet mask?", acceptedAnswer: { "@type": "Answer", text: "A subnet mask is a 32-bit number that masks an IP address and divides the IP address into network address and host address." } }, 
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SubnetCalculatorClient />
    </div>
  );
}
