import JsonLd from "@/components/seo/json-ld";
import MyIpClient from "@/components/tools/network/my-ip-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "What is My IP Address - Check Your Public IP",
  description: "Find out your public IPv4 and IPv6 address instantly. Get detailed information about your location, ISP, and network connection.",
  path: "/tools/network/my-ip",
  keywords: ["what is my ip", "my ip address", "ip lookup", "find ip address", "public ip", "IPv4", "IPv6", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/my-ip`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "What is My IP Address — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Find out your public IPv4 and IPv6 address instantly. Get detailed information about your location, ISP, and network connection.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Detect IPv4", "Detect IPv6", "IP Geolocation", "ISP Information"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "What is My IP Address", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between IPv4 and IPv6?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IPv4 uses a 32-bit numeric address format (e.g., 192.168.1.1) and supports 4.3 billion unique addresses. IPv6 uses a 128-bit hexadecimal format (e.g., 2001:0db8:85a3::8a2e:0370:7334) providing an almost infinite number of addresses along with native security and auto-configuration enhancements.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is the geolocation data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IP geolocation maps public IP registry assignments. It is extremely reliable at the country and region level (95%+ accuracy) and city level (80%+ accuracy), but it cannot pinpoint a street address, phone number, or exact household location due to privacy constraints.",
        },
      },
      {
        "@type": "Question",
        name: "Does Toolzium store my IP address?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Toolzium prioritizes user privacy. All IP detection and geolocation queries are executed client-side in your browser. We never log, store, or track your IP address, history, or metadata.",
        },
      },
      {
        "@type": "Question",
        name: "Why does my IP address change periodically?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most ISPs assign dynamic IP addresses that recycle over time. Your IP address can change whenever your router restarts, after a connection drop, or when the DHCP lease time set by your ISP expires.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between public and private IP addresses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A public IP address is unique worldwide and is used to identify your device or network interface on the open internet. A private IP address (such as 10.x.x.x or 192.168.x.x) is only valid within your local network (LAN) behind a router and is hidden from the public web via NAT.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MyIpClient />
    </div>
  );
}
