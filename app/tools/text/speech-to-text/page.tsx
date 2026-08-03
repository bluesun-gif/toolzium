import { Metadata } from "next";
import SpeechToTextClient from "@/components/tools/text/speech-to-text-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Speech to Text Transcriber — Free Voice Typing Online",
  description:
    "Free online Speech to Text voice typing tool. Dictate, transcribe speech, and convert voice to text in real-time. Choose from multiple languages, copy, edit, or download your transcriptions.",
  path: "/tools/text/speech-to-text",
});

export default function SpeechToTextPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I use Speech to Text?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Select your transcription language, click the 'Start Listening' microphone button, grant your browser permission to access your microphone, and begin speaking. Your words will be transcribed on-screen in real-time.",
        },
      },
      {
        "@type": "Question",
        name: "Is my voice data private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Web Speech API processes audio locally or via browser-secure services without saving audio files or text data to third-party databases. We do not store or monitor any of your transcriptions.",
        },
      },
      {
        "@type": "Question",
        name: "Does it support punctuation formatting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can dictate punctuation naturally by saying words like 'period', 'comma', 'question mark', or 'new paragraph' (supported in English and various other languages).",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <SpeechToTextClient />
    </>
  );
}
