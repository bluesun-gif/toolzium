import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import MarkdownEditorClient from "@/components/tools/dev/markdown-editor-client";

export const metadata = buildMetadata({
  title: "Markdown Editor — Live Preview & Export | Toolzium",
  description: "Write and preview Markdown in real time. Free online Markdown editor with live HTML preview, toolbar, word count, and export to .md file. No signup required.",
  path: "/tools/dev/markdown-editor",
});

export default function Page() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Markdown?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Markdown is a lightweight markup language for formatting text using simple syntax like # for headings and ** for bold.",
        },
      },
      {
        "@type": "Question",
        name: "Does the editor support live preview?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, see your formatted output in real time as you type.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export my work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, download as a .md file or copy the rendered HTML.",
        },
      },
      {
        "@type": "Question",
        name: "Does it support code blocks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, use triple backticks for fenced code blocks.",
        },
      },
    ],
  };

  const breadcrumbData = {
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
        name: "Developer Tools",
        item: siteURL + "/tools/dev",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Markdown Editor",
        item: siteURL + "/tools/dev/markdown-editor",
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Markdown Editor",
    description: "Write and preview Markdown in real time. Free online Markdown editor with live HTML preview, toolbar, word count, and export to .md file. No signup required.",
    applicationCategory: "DeveloperApplication",
    url: siteURL + "/tools/dev/markdown-editor",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <JsonLd data={faqData} />
      <JsonLd data={breadcrumbData} />
      <JsonLd data={webAppSchema} />
      <MarkdownEditorClient />
    </>
  );
}
