import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JwtDecoderClient from "@/components/tools/dev/jwt-decoder-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "JWT Decoder",
  description: "Decode and inspect JWT (JSON Web Tokens) safely in your browser. View header, payload, and signature of JWT tokens. Validate token structure and debug authentication issues without sending data to servers.",
  path: "/tools/dev/jwt-decode",
  keywords: ["safely", "your", "payload", "inspect", "tokens", "browser", "header", "decode", "view", "signature", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "JWT Decoder",
    description: "Decode and inspect JWT (JSON Web Tokens) safely in your browser. View header, payload, and signature of JWT tokens. Validate token structure and debug authentication issues without sending data to servers.",
    path: "/tools/dev/jwt-decode",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <JwtDecoderClient />
    
      <RelatedTools currentToolUrl="/tools/dev/jwt-decode" />
</div>
  );
}
