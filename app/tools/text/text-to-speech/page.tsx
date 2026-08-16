import { Metadata } from "next";
import TextToSpeechClient from "@/components/tools/text/text-to-speech-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";
export const metadata: Metadata = generateSEOMetadata({
  title: "Text to Speech (TTS) Reader — Online Natural Voices",
  description:
    "Free online Text to Speech (TTS) converter tool. Turn text into clear, natural-sounding audio voice narration. Adjust speech rate, pitch, and choose from multiple languages and browser voices.",
  path: "/tools/text/text-to-speech",
});

export default function TextToSpeechPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the Text to Speech tool work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It utilizes the SpeechSynthesis interface of the Web Speech API built natively into modern browsers. Your text is synthesized directly in the browser and read out loud using system voice engines without sending data to any server.",
        },
      },
      {
        "@type": "Question",
        name: "Is this Text to Speech tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, it is 100% free and has no character limit, paid paywalls, or API usage restrictions.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the voices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can choose from various system-installed voices (including Microsoft, Google, or Apple voices depending on your OS), and adjust speed and pitch sliders to customize narration.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <TextToSpeechClient />
    
      <RelatedTools currentToolUrl="/tools/text/text-to-speech" />
</>
  );
}
