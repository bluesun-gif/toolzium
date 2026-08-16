import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PasswordGeneratorClient from "@/components/tools/dev/password-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Password Generator",
  description: "Generate strong, random passwords with custom length and character sets. Secure password generator with uppercase, lowercase, numbers, and special characters. Create cryptographically secure passwords.",
  path: "/tools/dev/password-generator",
  keywords: ["character", "sets", "passwords", "with", "random", "generate", "length", "password", "generator", "secure", "custom", "strong"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Password Generator",
    description: "Generate strong, random passwords with custom length and character sets. Secure password generator with uppercase, lowercase, numbers, and special characters. Create cryptographically secure passwords.",
    path: "/tools/dev/password-generator",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PasswordGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/dev/password-generator" />
</div>
  );
}
