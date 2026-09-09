import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LinkExpandClient from "@/components/tools/url/link-expand-client";

const TITLE = "Link Unshortener [Free] — Expand & Preview Any Short URL Safely";
const DESCRIPTION =
  "✅ 100% free • Anonymous • No signup • Unshorten Bit.ly, t.co, TinyURL & 100+ services, preview the real destination, and spot scams before clicking.";
const PATH = "/tools/url/expand";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "url expander",
    "unshorten link",
    "bitly expander",
    "link preview",
    "tinyurl unshorten",
  ],
});

const FAQS = [
  { question: "Is this link unshortener really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited link expansion." },
  { question: "Is it safe to paste suspicious links here?",
    answer: "Yes. Links are resolved without opening them in your browser session — you see the true destination before ever clicking." },
  { question: "Which shorteners does it support?",
    answer: "Bit.ly, t.co, TinyURL, ow.ly, buff.ly, goo.gl, is.gd, rebrandly, and any service using standard HTTP redirects." },
  { question: "How fast is expansion?",
    answer: "Typically under a second. Chained redirects (up to 10 hops) are followed automatically and displayed step-by-step." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "URL Expander & Link Unshortener",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LinkExpandClient />
    </>
  );
}
