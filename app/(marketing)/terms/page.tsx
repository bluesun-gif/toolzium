import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSEOMetadata } from "@/lib/seo-config";

export const metadata = generateSEOMetadata({
  title: "Terms of Service",
  description:
    "Terms of service, acceptable use policy, disclaimers, limitation of liability, and legal information for Toolzium - the free online tools platform.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <p className="text-lg text-muted-foreground">
          By accessing or using Toolzium, you agree to comply with these terms and security
          standards. Last updated: <strong>September 2, 2026</strong>.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              By accessing or using Toolzium (&quot;the Service&quot;), you agree to be bound by
              these Terms of Service. If you do not agree with any part of these terms, you may not
              access the Service. We reserve the right to update these terms at any time; continued
              use after changes constitutes acceptance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Toolzium provides 570+ free online tools including calculators, text utilities, image
              converters, PDF tools, SEO tools, developer utilities, URL shorteners, QR code
              generators, and security/lookup tools. Most tools run entirely in your browser with no
              server processing required.
            </p>
            <p>
              Some features (URL shortener, user accounts) require optional account registration.
              Core tools are always free and require no account.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acceptable Use &amp; OSINT Intelligence Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• All tools, lookups, and security utilities must be used strictly for lawful, authorized purposes.</p>
            <p>• <strong>Prohibited Activities:</strong> You may not use Toolzium for doxxing, stalking, harassment, credential stuffing, carding, automated denial-of-service, or exfiltrating non-public sensitive personal information (PII).</p>
            <p>• <strong>Rate Limits &amp; Automated Scraping:</strong> Automated bots that bypass rate limits or attempt to degrade service availability will be permanently blocked.</p>
            <p>• You may not use the service to violate any applicable local, national, or international law or regulation.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disclaimer of Warranties &amp; Intelligence Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Tools and intelligence data (including risk scores, WHOIS records, IP geolocation, and carrier reports) are provided &quot;as is&quot; and &quot;as available&quot; for informational and threat assessment purposes.</p>
            <p>• Toolzium makes no warranty that the service will be uninterrupted, error-free, or that results will be accurate, complete, or reliable.</p>
            <p>• Toolzium does not guarantee 100% real-time accuracy of third-party public registries or carrier routing allocations.</p>
            <p>• You are responsible for exercising independent judgment before taking security or legal action based on lookup reports.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              To the fullest extent permitted by applicable law, Toolzium and its operators shall
              not be liable for any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of data, revenue, profits, or goodwill,
              arising out of or in connection with your use of the Service.
            </p>
            <p>
              In jurisdictions that do not allow the exclusion of certain warranties or limitation
              of liability, our liability will be limited to the maximum extent permitted by law.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property &amp; Open-Source Software</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• The Toolzium platform and custom tool adapters are released under open-source licenses where specified.</p>
            <p>• Third-party brand names, software titles, and trademarks referenced in our Alternatives and Prompts directories (e.g. Adobe, Notion, Canva) remain the exclusive property of their respective trademark holders. Reference to them does not imply sponsorship or affiliation.</p>
            <p>• You may not copy, reproduce, distribute, or create derivative works from Toolzium content without prior written permission.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advertising</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Toolzium displays advertisements through Google AdSense and other advertising networks
              to sustain the free service. By using Toolzium, you acknowledge that advertisements
              will be displayed. You may use ad-blocking software, though doing so may affect your
              experience and limits our ability to provide free tools.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              These Terms of Service shall be governed by and construed in accordance with
              applicable laws. Any disputes arising from your use of the Service shall be resolved
              through good-faith negotiation wherever possible.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact &amp; Legal Inquiries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              For legal questions, abuse reports, or DMCA notices, please contact our administrative
              team at:{" "}
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
