import JsonLd from "@/components/seo/json-ld";
import TypingTestClient from "@/components/tools/util/typing-test-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Typing Speed Test Tool — Free WPM Keyboard Test",
  description:
    "Test and improve your keyboard typing speed and accuracy with our free online WPM test. Multiple difficulties, code tests, and real-time statistics.",
  path: "/tools/util/typing-test",
  keywords: [
    "typing speed test",
    "wpm test",
    "typing test online",
    "words per minute",
    "keyboard speed test",
    "improve typing speed",
    "typing accuracy test",
    "developer typing test",
    "Toolzium",
    "online tools",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/typing-test`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Typing Speed Test — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description:
      "Test and improve your typing speed and accuracy with real-time feedback and WPM calculation.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "WPM calculation",
      "Accuracy tracking",
      "Multiple difficulty levels (easy, medium, hard)",
      "Developer/programmer typing syntax test",
      "Real-time character-by-character highlighting",
    ],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Utilities", item: `${siteURL}/tools#cat-util` },
      { "@type": "ListItem", position: 3, name: "Typing Speed Test", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is typing speed (WPM) calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Words Per Minute (WPM) is calculated using the standard formula: (Total Characters typed / 5) / Time taken in minutes. A 'word' is defined as exactly 5 characters, including spaces, numbers, and punctuation.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good typing speed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The average typing speed is around 40 WPM. Professional typists, copywriters, and developers generally range from 60 to 80 WPM, while competitive typists can reach speeds exceeding 120 WPM with practice.",
        },
      },
      {
        "@type": "Question",
        name: "Why does accuracy matter in a typing test?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Accuracy reflects your overall efficiency. While raw speed is interesting, Net WPM subtracts errors from your total, which is more representative of real-world productivity where correcting mistakes consumes extra time.",
        },
      },
      {
        "@type": "Question",
        name: "Can I test my coding typing speed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our tool offers a 'Hard' difficulty mode loaded with real-world programming code snippets (HTML, CSS, JS, Python, SQL). This is perfect for developers who want to practice typing complex brackets, colons, and syntax.",
        },
      },
      {
        "@type": "Question",
        name: "How can I improve my typing speed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Practice touch typing by placing your fingers on the 'home row' (ASDF for left hand, JKL; for right hand). Focus entirely on accuracy first, as speed will naturally develop as your muscle memory improves.",
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TypingTestClient />
    </div>
  );
}
