import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ShortenerClient from "@/components/tools/url/shortener-client";

export const metadata = buildMetadata({
  title: "URL Shortener",
  description: "Create short, custom URLs with analytics. Free link shortener with QR codes, click tracking, and custom slugs. Perfect for social media, marketing campaigns, and link management.",
  path: "/tools/url/shortener",
  keywords: ["link", "with", "create", "analytics", "shortener", "free", "short", "codes", "custom", "urls", "click"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "URL Shortener",
    description: "Create short, custom URLs with analytics. Free link shortener with QR codes, click tracking, and custom slugs. Perfect for social media, marketing campaigns, and link management.",
    path: "/tools/url/shortener",
    categoryName: "Url",
    categoryPath: "/tools/url",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ShortenerClient />
    </div>
  );
}
