import JsonLd from "@/components/seo/json-ld";
import QRClient from "@/components/tools/url/qr-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free QR Code Generator with Custom Logo & Colors | Toolzium",
  description:
    "Generate custom QR codes for URLs, Wi-Fi, vCards, WhatsApp, and SMS. Add brand logos, pick custom colors, set error correction, and export SVG or high-res PNG.",
  path: "/tools/url/qr",
  keywords: [
    "QR code generator",
    "free QR code maker",
    "QR code generator with logo",
    "custom QR code",
    "wifi QR code generator",
    "vCard QR code generator",
    "WhatsApp QR code",
    "vector SVG QR code",
    "high resolution QR code PNG",
    "Toolzium",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/url/qr`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free QR Code Generator with Custom Logo — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    description:
      "Generate static QR codes for URLs, text, Wi-Fi, vCards, Email, SMS, and WhatsApp. Customize colors, add center logos, and export vector SVG or PNG.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "URL, Text, Wi-Fi, vCard, Email, SMS, WhatsApp QR codes",
      "Custom brand colors & quiet zone padding",
      "Center brand logo overlay with error correction",
      "High-res PNG (up to 6x) and SVG vector export",
      "100% Client-Side Privacy: zero server logging",
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
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteURL}` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 3, name: "QR Code Generator", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which content types can I encode in a QR code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can generate QR codes for URLs, Plain Text, Wi-Fi Network auto-connect, vCard contact business cards, Email messages, SMS text messages, and WhatsApp direct chat links.",
        },
      },
      {
        "@type": "Question",
        name: "Will my QR code expire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No! All QR codes generated on Toolzium are static QR codes containing the direct raw payload. They work forever and never expire.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I use higher Error Correction (Q or H) with a logo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Placing a logo over the center covers some QR data blocks. Using High (30%) or Quality (25%) Error Correction ensures camera scanners can recover the obscured data and scan reliably.",
        },
      },
      {
        "@type": "Question",
        name: "Is my Wi-Fi password or private data sent to your server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Never. Toolzium generates QR codes client-side in your browser using JavaScript. Your network credentials and private data never leave your computer.",
        },
      },
      {
        "@type": "Question",
        name: "What format should I use for printing on banners or business cards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use SVG vector format for print production or high-resolution PNG with Export Scale set to 4x or 6x to ensure crisp lines on printed materials.",
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />

      <QRClient />
    </div>
  );
}
