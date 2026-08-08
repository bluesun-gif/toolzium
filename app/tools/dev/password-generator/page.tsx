import JsonLd from "@/components/seo/json-ld";
import PasswordGeneratorClient from "@/components/tools/dev/password-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Strong Password Generator & Entropy Checker | Toolzium",
  description:
    "Generate cryptographically secure random passwords and passphrases. Calculate live entropy bits, exclude ambiguous characters, and export batch passwords.",
  path: "/tools/dev/password-generator",
  keywords: [
    "password generator",
    "strong password generator",
    "secure random password",
    "password entropy calculator",
    "batch password generator",
    "crypto random password",
    "exclude ambiguous characters password",
    "Toolzium",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/password-generator`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Strong Password Generator & Entropy Checker — Toolzium",
    url: toolUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    description:
      "Generate cryptographically secure, random passwords and passphrases with custom character sets, entropy calculation, and zero server logging.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Cryptographically secure (crypto.getRandomValues)",
      "Live mathematical entropy calculation (bits)",
      "Exclude ambiguous characters (0/O, 1/l/I)",
      "Batch password generation (up to 100)",
      "1-click copy & export to text file",
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
      { "@type": "ListItem", position: 3, name: "Password Generator", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes a password cryptographically secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A secure password relies on high randomness and length. Standard Math.random() in JavaScript is pseudo-random and predictable. Toolzium uses crypto.getRandomValues(), an industry-standard Cryptographically Secure Pseudorandom Number Generator (CSPRNG).",
        },
      },
      {
        "@type": "Question",
        name: "What is password entropy and how many bits do I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entropy measures how unpredictable a password is in bits. Passwords under 40 bits are weak. 60–80 bits are strong for everyday accounts. 90+ bits (like a 16-character mixed password) require billions of years to crack via modern GPU brute force.",
        },
      },
      {
        "@type": "Question",
        name: "Are generated passwords logged or saved anywhere?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Never. All generation happens strictly inside your computer's RAM using local JavaScript. Nothing is transmitted over the network or saved anywhere.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I exclude ambiguous characters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Characters like capital 'O' and zero '0', lowercase 'l' and number '1', or uppercase 'I' look identical in many fonts. Excluding ambiguous characters prevents typing mistakes when logging in on mobile devices.",
        },
      },
      {
        "@type": "Question",
        name: "How long should my passwords be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend a minimum of 16 characters with mixed uppercase, lowercase, numbers, and symbols. For master passwords or passphrases, 20+ characters offer maximum long-term security.",
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />

      <PasswordGeneratorClient />
    </div>
  );
}
