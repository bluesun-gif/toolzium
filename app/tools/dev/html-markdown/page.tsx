import JsonLd from "@/components/seo/json-ld";
import { HtmlMarkdownClient } from "@/components/tools/dev/html-markdown-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "HTML to Markdown Converter — Free Online Tool | Toolzium",
  description: "Free online HTML to Markdown converter and vice versa. Instantly convert code with live preview, preserving formatting, tables, lists, and images.",
  path: "/tools/dev/html-markdown",
  keywords: [
    "html to markdown",
    "markdown to html",
    "html to md",
    "md to html converter",
    "online markdown editor",
    "html markdown converter",
    "convert html code to markdown",
    "markdown generator",
    "html parser",
    "markdown previewer",
    "web developer tools",
    "html converter",
    "markdown tools",
    "free online html tools",
    "html text to md",
    "html tags to markdown",
    "markdown syntax converter",
    "html elements to markdown",
    "markdown renderer",
    "html to markdown tool"
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/html-markdown`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HTML to Markdown Converter",
    url: toolUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description: "Free online tool to convert HTML to Markdown and Markdown to HTML bidirectionally with live preview.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
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
        name: "Developer",
        item: `${siteURL}/tools#cat-developer`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "HTML to Markdown",
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
        name: "How do I convert HTML to Markdown?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply paste your HTML code into the input area. The tool will automatically parse the HTML tags and convert them to the equivalent Markdown syntax instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Can this tool convert Markdown back to HTML?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the tool is bidirectional. Click the swap button (arrows) between the HTML and Markdown labels to switch modes, then paste your Markdown to get HTML.",
        },
      },
      {
        "@type": "Question",
        name: "Are nested elements like lists inside blockquotes supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the HTML to Markdown converter uses a DOM parser to traverse and convert nested HTML elements like lists, formatting tags, and blockquotes properly.",
        },
      },
      {
        "@type": "Question",
        name: "Is this HTML to Markdown converter free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All tools on Toolzium, including this HTML to Markdown converter, are completely free to use with no limits or registration required.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data sent to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all conversion happens locally in your browser. None of your HTML or Markdown data is sent to our servers.",
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HtmlMarkdownClient />
    
      <RelatedTools currentToolUrl="/tools/dev/html-markdown" />
</div>
  );
}
