import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSEOMetadata } from "@/lib/seo-config";

export const metadata = generateSEOMetadata({
  title: "Terms of Service",
  description:
    "Terms and acceptable use for Toolzium. Read our terms of service, security compliance, and acceptable use policy.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Terms of Service & Compliance
        </h1>
        <p className="text-lg text-muted-foreground">
          By accessing or using Toolzium, you agree to comply with these terms and security standards.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Acceptable Use & OSINT Intelligence Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• All tools, lookups, and security utilities must be used strictly for lawful, authorized purposes.</p>
            <p>• Prohibited Activities: You may not use Toolzium for doxxing, stalking, harassment, credential stuffing, carding, automated denial-of-service, or exfiltrating non-public sensitive personal information (PII).</p>
            <p>• Rate Limits & Automated Scraping: Automated bots that bypass rate limits or attempt to degrade service availability will be permanently blocked.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disclaimer of Warranties & Intelligence Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Tools and intelligence data (including risk scores, WHOIS records, IP geolocation, and carrier reports) are provided &quot;as is&quot; and &quot;as available&quot; for informational and threat assessment purposes.</p>
            <p>• Toolzium does not guarantee 100% real-time accuracy of third-party public registries or carrier routing allocations.</p>
            <p>• You are responsible for exercising independent judgment before taking security or legal action based on lookup reports.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property & Open-Source Software</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• The Toolzium platform and custom tool adapters are released under open-source licenses where specified.</p>
            <p>• Third-party brand names, software titles, and trademarks referenced in our Alternatives and Prompts directories (e.g. Adobe, Notion, Canva) remain the exclusive property of their respective trademark holders. Reference to them does not imply sponsorship or affiliation.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact & Legal Inquiries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              For legal questions or abuse reports, please contact our administrative team at:{" "}
              <a className="underline font-semibold text-foreground" href="mailto:contact@toolzium.com">
                contact@toolzium.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
