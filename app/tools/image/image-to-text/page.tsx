import { Metadata } from "next";
import ImageToTextClient from "@/components/tools/image/image-to-text-client";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";

const title = "Image to Text (OCR) — Extract Text from Images | Toolzium";
const description =
  "Extract text from images using optical character recognition (OCR). Upload PNG, JPG, WEBP, or BMP files and convert them to editable text. Free, instant, and private.";
const toolUrl = `${siteURL}/tools/image/image-to-text`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools/image/image-to-text",
  keywords: [
    "image to text",
    "ocr online free",
    "extract text from image",
    "photo to text converter",
    "jpg to text ocr",
    "convert image to editable text",
    "picture reader",
    "copy text from image",
    "scan image to text",
    "tesseract ocr online",
    "client-side ocr converter",
  ],
});

export default function Page() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image to Text (OCR) — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description:
      "Extract text from images using local optical character recognition (OCR) in your browser. Supports multiple image formats with zero file uploads.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Extract editable text from images with OCR",
      "Client-side processing using Tesseract.js",
      "No image files uploaded to servers",
      "Supports PNG, JPG, WEBP, and BMP formats",
      "One-click copy and reset actions",
    ],
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Image", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "Image to Text", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Tesseract.js OCR extract text?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tesseract.js loads compiled WebAssembly binaries of the Google Tesseract OCR engine directly into your browser. When you load an image, it analyzes patterns of dark and light pixels, identifies characters based on pre-trained language models, and outputs them as digital text.",
        },
      },
      {
        "@type": "Question",
        name: "Which image formats are supported for OCR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool supports PNG, JPG, JPEG, WEBP, and BMP. High-contrast images with clean borders process best.",
        },
      },
      {
        "@type": "Question",
        name: "Are my images uploaded to external servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all OCR computations happen entirely inside your browser tab on your device. We do not transmit or store your images or extracted text on any server, keeping your sensitive documents completely private.",
        },
      },
      {
        "@type": "Question",
        name: "What languages can the OCR engine read?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This version is optimized for English, but the core Tesseract.js library supports over 100 languages. Keep the text clean, well-lit, and in high resolution for maximum character recognition accuracy.",
        },
      },
      {
        "@type": "Question",
        name: "Why is some text extracted incorrectly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "OCR accuracy depends highly on image quality. Low resolution, fuzzy text, complex cursive fonts, and dark shadows can interfere with the engine's ability to map characters. Ensure your image has good lighting and high contrast for best results.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ImageToTextClient />
    </>
  );
}
