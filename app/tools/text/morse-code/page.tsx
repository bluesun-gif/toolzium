import JsonLd from "@/components/seo/json-ld";
import { MorseCodeClient } from "@/components/tools/text/morse-code-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Morse Code Translator — Text to Morse Audio | Toolzium",
  description: "Free online morse code translator. Convert text to morse code or morse to text automatically. Play morse code audio with adjustable WPM speed.",
  path: "/tools/text/morse-code",
  keywords: [
    "morse code translator",
    "text to morse code",
    "morse to text",
    "morse code audio player",
    "morse code generator",
    "morse code decoder",
    "play morse code",
    "wpm morse code",
    "morse code sounds",
    "online morse code tool",
    "translate morse code",
    "morse code learning tool",
    "morse code practice",
    "dots and dashes translator",
    "telegraph code generator",
    "morse code alphabet",
    "free morse code app",
    "morse code to english",
    "english to morse code",
    "morse code converter"
  ]
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/morse-code`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Morse Code Translator",
    "url": toolUrl,
    "description": "Free online morse code translator. Convert text to morse code or morse to text automatically. Play morse code audio with adjustable WPM speed.",
    "applicationCategory": "UtilitiesApplication",
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
        "name": "Text Tools",
        "item": `${siteURL}/tools#cat-text`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Morse Code Translator",
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
        "name": "How does the Morse Code Translator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply type your text or paste your Morse code into the input box. The tool automatically detects whether you've entered standard text or Morse code (using dots and dashes) and instantly translates it in the other direction."
        }
      },
      {
        "@type": "Question",
        "name": "Can I listen to the Morse code translation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Once you have translated text into Morse code, you can click the Play button to hear the audio representation (beeps) of your message. You can even adjust the playback speed in Words Per Minute (WPM)."
        }
      },
      {
        "@type": "Question",
        "name": "What is WPM in Morse code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WPM stands for Words Per Minute. It is a standard measurement for how fast Morse code is transmitted. A lower WPM setting plays the dots and dashes slower, which is great for beginners learning the code."
        }
      },
      {
        "@type": "Question",
        "name": "Which characters are supported by this translator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tool supports the standard international Morse code alphabet (A-Z), numbers (0-9), and common punctuation marks such as periods, commas, question marks, and slashes."
        }
      },
      {
        "@type": "Question",
        "name": "Is this tool free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! The Toolzium Morse Code Translator is completely free to use online, entirely client-side, ensuring your data remains private and secure."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MorseCodeClient />
    </div>
  );
}
