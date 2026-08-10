import JsonLd from "@/components/seo/json-ld";
import { BinaryTextClient } from "@/components/tools/text/binary-text-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Binary & Hex Text Converter — Free Online Tool | Toolzium",
  description: "Convert text to Binary, Hexadecimal, Octal, and Decimal formats. Encode and decode text instantly with our free online tool.",
  path: "/tools/text/binary-text",
  keywords: [
    "binary to text", "text to binary", "hex to text", "text to hex",
    "octal to text", "text to octal", "decimal to text", "text to decimal",
    "binary converter", "hex converter", "string to binary", "binary string converter",
    "ascii to binary", "unicode to binary", "ascii to hex", "hex to ascii",
    "binary code translator", "hex code translator", "text decoder", "text encoder",
    "free binary tool", "online hex tool", "byte converter", "developer tools",
    "toolzium binary text"
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/binary-text`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Binary & Hex Text Converter",
    "url": toolUrl,
    "description": "Convert text to Binary, Hexadecimal, Octal, and Decimal formats. Encode and decode text instantly.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteURL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${siteURL}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Text",
        "item": `${siteURL}/tools#cat-text`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Binary Text Converter",
        "item": toolUrl
      }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert text to binary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply type or paste your text into the input box, set the output format to Binary, and the tool will instantly convert your text to its binary equivalent."
        }
      },
      {
        "@type": "Question",
        "name": "Can this tool convert binary back to text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our tool supports decoding. Just set the input format to Binary or use Auto-detect, paste your binary code, and select Text as the output format."
        }
      },
      {
        "@type": "Question",
        "name": "Does it support UTF-8 Unicode characters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Unlike basic converters that only support ASCII, our tool fully supports UTF-8, allowing you to convert emojis, special symbols, and characters from any language."
        }
      },
      {
        "@type": "Question",
        "name": "What are the supported number bases?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This tool supports conversion between Text (UTF-8), Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16)."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. All conversions happen entirely in your browser locally. No data is sent to our servers, ensuring your text remains completely private."
        }
      }
    ]
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <BinaryTextClient />
    </div>
  );
}
