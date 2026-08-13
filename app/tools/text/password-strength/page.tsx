import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PasswordStrengthClient from "@/components/tools/text/password-strength-client";

export const metadata = buildMetadata({
  title: "Password Strength Checker",
  description: "Check password strength and security score. Analyze password entropy, detect weak passwords, and get suggestions for creating strong, secure passwords. Free password strength tester.",
  path: "/tools/text/password-strength",
  keywords: ["strength", "suggestions", "passwords", "password", "check", "score", "security", "detect", "weak", "entropy", "analyze"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Password Strength Checker",
    description: "Check password strength and security score. Analyze password entropy, detect weak passwords, and get suggestions for creating strong, secure passwords. Free password strength tester.",
    path: "/tools/text/password-strength",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PasswordStrengthClient />
    </div>
  );
}
