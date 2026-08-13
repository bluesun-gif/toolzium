import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Rot13Client from "@/components/tools/text/rot13-client";

export const metadata = buildMetadata({
  title: "ROT13 / Caesar Cipher",
  description: "Encode and decode ROT13 text instantly. Apply any Caesar cipher shift from 1 to 25. Brute-force mode shows all possible shifts. Free online ROT13 encoder and decoder.",
  path: "/tools/text/rot13",
  keywords: ["mode", "from", "encode", "shift", "decode", "instantly", "brute", "force", "caesar", "text", "cipher", "apply"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "ROT13 / Caesar Cipher",
    description: "Encode and decode ROT13 text instantly. Apply any Caesar cipher shift from 1 to 25. Brute-force mode shows all possible shifts. Free online ROT13 encoder and decoder.",
    path: "/tools/text/rot13",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <Rot13Client />
    </div>
  );
}
