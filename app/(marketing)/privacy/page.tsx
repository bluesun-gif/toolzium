import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSEOMetadata } from "@/lib/seo-config";

export const metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description:
    "Our commitment to privacy, data protection, and ad network compliance at Toolzium. Learn how we safeguard your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy & Compliance
        </h1>
        <p className="text-lg text-muted-foreground">
          Toolzium is built on strict privacy-first principles. Most tools execute 100% locally in your web browser.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Browser-First Execution & Zero Plaintext Logging</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Client-Side Processing: Image converters, hash generators, code formatters, and regex utilities process data in your local browser memory.</p>
            <p>• Password Breach Queries: We utilize the mathematical k-anonymity model. Only the first 5 characters of your SHA-1 hash are queried; your full plaintext password never touches our servers or external networks.</p>
            <p>• Lookup Intelligence: Reverse phone, WHOIS, IP, and username queries are performed via public RDAP, ASN, and telemetry endpoints without logging personal identity records.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies, Advertising & Third-Party Vendors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• We partner with third-party advertising platforms (including Google AdSense and Ezoic) to serve contextual and interest-based advertisements.</p>
            <p>• Third-party vendors use cookies (including Google DoubleClick / DART cookies) to serve ads based on prior visits to this and other websites.</p>
            <p>• Users may opt out of personalized advertising by visiting Google Ads Settings (adssettings.google.com) or the Network Advertising Initiative (optout.networkadvertising.org).</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Affiliate Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Toolzium participates in select affiliate marketing programs (e.g. NordVPN, Surfshark, NordPass).</p>
            <p>• When you click on an affiliate link and complete a purchase, we may receive a commission at no additional cost to you. This enables us to maintain all 550+ tools 100% free of charge.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Data Rights (GDPR & CCPA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• You may access and use all public tools without creating an account or providing financial credentials.</p>
            <p>• To request data removal, contact our data protection team at: contact@toolzium.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
