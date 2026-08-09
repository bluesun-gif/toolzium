import JsonLd from "@/components/seo/json-ld";
import HashGeneratorClient from "@/components/tools/dev/hash-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hash Generator",
  description:
    "Generate cryptographic hashes like MD5, SHA1, SHA256, SHA512, and more. Supports text, files, HMAC keys, and batch processing. Free, fast, secure.",
  path: "/tools/dev/hash-generator",
  keywords: [
    "hash generator",
    "MD5 generator",
    "SHA1 generator",
    "SHA256 generator",
    "SHA512 generator",
    "hash online",
    "hash function",
    "hash string",
    "hash file",
    "calculate checksum",
    "file hash",
    "verify file checksum",
    "MD5 checksum",
    "SHA256 checksum",
    "hash file integrity",
    "download verification",
    "HMAC generator",
    "hash with secret",
    "bcrypt",
    "argon2",
    "PBKDF2",
    "crypto hash",
    "password hash",
    "developer tools",
    "Toolzium",
    "online tools",
    "Bangladesh",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/hash-generator`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hash Generator — Toolzium",
    url: toolUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en", "bn"],
    description:
      "Generate hashes like MD5, SHA1, SHA256, and more. Paste text, upload files, or compute HMACs with secrets. Validate file integrity and export results instantly.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Generate MD5, SHA1, SHA224, SHA256, SHA384, SHA512",
      "Support for text and file hashing",
      "HMAC generation with custom secret",
      "Batch process multiple inputs",
      "Copy or export hash results (CSV, JSON, TXT)",
      "Drag & drop file upload with instant hash output",
      "Compare expected vs generated hash for verification",
      "Large file support (tens of MBs+)",
      "Privacy-first: all processing in your browser",
      "Mobile-friendly and responsive design",
      "Dark mode, keyboard shortcuts",
    ],
    creator: {
      "@type": "Person",
      name: "Toolzium",
      url: "https://toolzium.com",
    },
    potentialAction: {
      "@type": "CreateAction",
      target: toolUrl,
      name: "Generate a hash from text or file",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Supported algorithms",
        value: "MD5, SHA1, SHA224, SHA256, SHA384, SHA512, HMAC",
      },
      { "@type": "PropertyValue", name: "Inputs", value: "Plain text, files, or batch entries" },
    ],
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Developer",
        item: `${siteURL}/tools#cat-developer`,
      },
      { "@type": "ListItem", position: 3, name: "Hash Generator", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a cryptographic hash?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A cryptographic hash is a one-way mathematical function that converts input data of any size into a fixed-size string of characters, usually represented in hexadecimal or Base64.",
        },
      },
      {
        "@type": "Question",
        name: "Is hashing the same as encryption?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Hashing is a one-way process designed to be irreversible, whereas encryption is a two-way process designed to be decrypted using a secret key.",
        },
      },
      {
        "@type": "Question",
        name: "What is an HMAC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An HMAC (Hash-based Message Authentication Code) is a specific type of message authentication code involving a cryptographic hash function and a secret cryptographic key, ensuring both data integrity and authenticity.",
        },
      },
      {
        "@type": "Question",
        name: "How does salting work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Salting involves adding a random string of characters (a salt) to an input before hashing it. This prevents attackers from using precomputed rainbow tables to crack the hash.",
        },
      },
      {
        "@type": "Question",
        name: "Are MD5 and SHA-1 secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Both MD5 and SHA-1 have known cryptographic vulnerabilities and collisions, making them unsafe for security-critical applications like password hashing or digital signatures. Use SHA-256 or SHA-512 instead.",
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />

      <HashGeneratorClient />
    </div>
  );
}
