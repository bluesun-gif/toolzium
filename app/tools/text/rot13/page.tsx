import JsonLd from "@/components/seo/json-ld";
import { Rot13Client } from "@/components/tools/text/rot13-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ROT13 & Caesar Cipher Decoder/Encoder — Free Online Tool | Toolzium",
  description: "Free online ROT13 and Caesar cipher tool. Encode, decode, and brute-force crack shift ciphers. Includes character frequency analysis. Works entirely in your browser.",
  path: "/tools/text/rot13",
  keywords: [
    "ROT13 encoder",
    "ROT13 decoder",
    "Caesar cipher",
    "shift cipher",
    "brute force cipher",
    "crack caesar cipher",
    "text cipher tool",
    "ROT13 translator",
    "Caesar shift calculator",
    "cryptography tool",
    "simple substitution cipher",
    "letter shift tool",
    "online decoder",
    "online encoder",
    "frequency analysis",
    "character frequency",
    "ROT-13",
    "ROT-N",
    "Caesar code",
    "decode text",
    "secret message encoder",
    "Toolzium"
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/rot13`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ROT13 & Caesar Cipher Tool",
    description: "Free online ROT13 and Caesar cipher tool. Encode, decode, and brute-force crack shift ciphers.",
    url: toolUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Toolzium",
      url: siteURL,
    },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteURL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteURL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Text",
        item: `${siteURL}/tools#cat-text`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "ROT13 & Caesar Cipher",
        item: toolUrl,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is ROT13?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ROT13 is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet. It is a special case of the Caesar cipher where the shift is 13. Because the alphabet has 26 letters, applying ROT13 twice restores the original text.",
        },
      },
      {
        "@type": "Question",
        name: "What is a Caesar cipher?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Caesar cipher is one of the simplest and most widely known encryption techniques. It is a substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.",
        },
      },
      {
        "@type": "Question",
        name: "How do I crack a Caesar cipher if I don't know the shift?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can use the 'Brute Force' mode in our tool to test all 25 possible shift variations instantly. Simply look through the results until you find the readable text.",
        },
      },
      {
        "@type": "Question",
        name: "What happens to numbers and punctuation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our ROT13 and Caesar cipher tool only shifts alphabetic characters (A-Z and a-z). Numbers, punctuation marks, spaces, and other symbols are left completely unchanged.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data sent to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all encoding, decoding, and frequency analysis happens entirely in your web browser. Your text is never sent to any server, ensuring complete privacy.",
        },
      }
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <Rot13Client />
    </div>
  );
}
