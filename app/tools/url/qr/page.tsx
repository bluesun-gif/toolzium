import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import QRClient from "@/components/tools/url/qr-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "QR Code Generator",
  description: "Create custom QR codes from URLs, text, contact info, WiFi credentials, and more. Download as PNG, SVG, or PDF. Customize colors, add logos, and generate high-resolution QR codes for free.",
  path: "/tools/url/qr",
  keywords: ["download", "from", "info", "contact", "create", "more", "codes", "credentials", "custom", "urls", "text", "wifi"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "QR Code Generator",
    description: "Create custom QR codes from URLs, text, contact info, WiFi credentials, and more. Download as PNG, SVG, or PDF. Customize colors, add logos, and generate high-resolution QR codes for free.",
    path: "/tools/url/qr",
    categoryName: "Url",
    categoryPath: "/tools/url",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <QRClient />
    
      <RelatedTools currentToolUrl="/tools/url/qr" />
</div>
  );
}
