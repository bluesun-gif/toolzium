import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSEOMetadata } from "@/lib/seo-config";

export const metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description:
    "Our commitment to privacy, data protection, and ad network compliance at Toolzium. Learn how we collect, use, and protect your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy &amp; Compliance
        </h1>
        <p className="text-lg text-muted-foreground">
          Toolzium is built on strict privacy-first principles. Most tools execute 100% locally in
          your web browser. This policy was last updated on <strong>September 2, 2026</strong>.
        </p>
      </div>

      <div className="space-y-6">
        {/* Information We Collect */}
        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>We collect minimal information necessary to provide and improve our services:</p>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              &bull; <strong>Usage Data:</strong> Pages visited, tools used, time spent, and general
              browser/device type &mdash; collected anonymously via Google Analytics (GA4).
            </p>
            <p>
              &bull; <strong>Account Data (optional):</strong> If you create an account, we store your
              email address and display name securely. You can delete your account at any time.
            </p>
            <p>
              &bull; <strong>Log Data:</strong> Standard server logs (IP address, request timestamps) are
              retained for a maximum of 30 days for security and abuse prevention purposes only.
            </p>
            <p>
              &bull; <strong>Tool Inputs:</strong> Data entered into client-side tools (text, images,
              files) is processed entirely within your browser and is never transmitted to our servers.
            </p>
          </CardContent>
        </Card>

        {/* Browser-First Execution */}
        <Card>
          <CardHeader>
            <CardTitle>Browser-First Execution &amp; Zero Plaintext Logging</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              &bull; <strong>Client-Side Processing:</strong> Image converters, hash generators, code
              formatters, and regex utilities process data in your local browser memory. Your files
              and text never leave your device.
            </p>
            <p>
              &bull; <strong>Password Breach Queries:</strong> We utilize the mathematical k-anonymity
              model. Only the first 5 characters of your SHA-1 hash are queried; your full plaintext
              password never touches our servers or external networks.
            </p>
            <p>
              &bull; <strong>Lookup Intelligence:</strong> Reverse phone, WHOIS, IP, and username queries
              are performed via public RDAP, ASN, and telemetry endpoints without logging personal
              identity records.
            </p>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card>
          <CardHeader>
            <CardTitle>Cookies &amp; Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              We use cookies and similar tracking technologies to enhance your experience and deliver
              relevant advertising:
            </p>
            <p>
              &bull; <strong>Essential Cookies:</strong> Required for core site functionality such as
              authentication sessions and theme preferences. These cannot be disabled.
            </p>
            <p>
              &bull; <strong>Analytics Cookies (Google Analytics / GA4):</strong> We use Google
              Analytics to understand how visitors use Toolzium. Data is aggregated and anonymized.
            </p>
            <p>
              &bull; <strong>Advertising Cookies (Google AdSense):</strong> Google AdSense uses
              cookies, including the DoubleClick/DART cookie, to serve ads based on your visits to
              this and other websites. These cookies allow Google to personalize ads to your interests.
            </p>
            <p>
              You can control or disable cookies through your browser settings at any time.
            </p>
          </CardContent>
        </Card>

        {/* Advertising */}
        <Card>
          <CardHeader>
            <CardTitle>Advertising &amp; Google AdSense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Toolzium uses <strong>Google AdSense</strong>, a third-party advertising service
              provided by Google LLC, to display advertisements. Advertising revenue allows us to
              keep all 570+ tools completely free of charge.
            </p>
            <p>
              &bull; Google AdSense uses cookies (including the DART cookie) to serve ads based on your
              prior visits to this website and other sites on the internet.
            </p>
            <p>
              &bull; Google may use information from these cookies to personalize the ads you see on
              Toolzium and across other websites you visit.
            </p>
            <p>
              &bull; <strong>Opt-Out of Personalized Ads:</strong> Visit{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="underline text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>{" "}
              or the{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                className="underline text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google ad and content network privacy policy
              </a>
              .
            </p>
            <p>
              &bull; <strong>Opt-Out of Third-Party Advertising Cookies:</strong> Visit the{" "}
              <a
                href="http://optout.networkadvertising.org/"
                className="underline text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Network Advertising Initiative opt-out page
              </a>{" "}
              or the{" "}
              <a
                href="http://optout.aboutads.info/"
                className="underline text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Digital Advertising Alliance opt-out page
              </a>
              .
            </p>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              We use the following third-party services, each with their own privacy policies:
            </p>
            <p>
              &bull; <strong>Google Analytics (GA4)</strong> &mdash; Website analytics.{" "}
              <a
                href="https://policies.google.com/privacy"
                className="underline text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </p>
            <p>
              &bull; <strong>Google AdSense</strong> &mdash; Display advertising network.{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                className="underline text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ads Policy
              </a>
            </p>
            <p>
              &bull; <strong>Vercel</strong> &mdash; Website hosting and edge network.{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="underline text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </p>
            <p>
              &bull; <strong>Neon PostgreSQL</strong> &mdash; Serverless database (URL shortener, user accounts).{" "}
              <a
                href="https://neon.tech/privacy-policy"
                className="underline text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </p>
            <p>
              &bull; <strong>NextAuth.js / Auth.js</strong> &mdash; Authentication library for user sessions.
            </p>
          </CardContent>
        </Card>

        {/* Affiliate Disclosure */}
        <Card>
          <CardHeader>
            <CardTitle>Affiliate Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              &bull; Toolzium participates in select affiliate marketing programs (e.g. NordVPN,
              Surfshark, NordPass).
            </p>
            <p>
              &bull; When you click on an affiliate link and complete a purchase, we may receive a
              commission at no additional cost to you. This enables us to maintain all 570+ tools
              100% free of charge.
            </p>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>We use the information we collect to:</p>
            <p>&bull; Operate, maintain, and improve the Toolzium platform and its tools.</p>
            <p>&bull; Understand usage patterns and improve tool discoverability.</p>
            <p>&bull; Detect, prevent, and respond to fraud, abuse, and security incidents.</p>
            <p>&bull; Comply with applicable laws and legal obligations.</p>
            <p>&bull; Display relevant advertisements via Google AdSense to sustain free access.</p>
            <p>
              We do <strong>not</strong> sell your personal data to third parties. Tool inputs
              (text, images, files) are processed locally and never stored on our servers.
            </p>
          </CardContent>
        </Card>

        {/* Data Rights */}
        <Card>
          <CardHeader>
            <CardTitle>Your Data Rights (GDPR &amp; CCPA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Depending on your location, you may have the following rights regarding your personal
              data:
            </p>
            <p>&bull; <strong>Access:</strong> Request a copy of the personal data we hold about you.</p>
            <p>&bull; <strong>Correction:</strong> Request correction of inaccurate data.</p>
            <p>&bull; <strong>Deletion:</strong> Request deletion of your personal data (right to be forgotten).</p>
            <p>&bull; <strong>Portability:</strong> Request your data in a machine-readable format.</p>
            <p>&bull; <strong>Opt-Out:</strong> California residents may opt out of the sale of personal information. We do not sell personal data.</p>
            <p>
              To exercise your rights or request data removal, contact us at:{" "}
              <a
                href="mailto:contact@toolzium.com"
                className="underline text-foreground font-semibold"
              >
                contact@toolzium.com
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>&bull; <strong>Server logs:</strong> Retained for up to 30 days, then automatically deleted.</p>
            <p>&bull; <strong>Account data:</strong> Retained while your account is active; deleted within 30 days of account deletion request.</p>
            <p>&bull; <strong>Analytics data:</strong> Retained per Google&apos;s standard retention policies (up to 14 months by default).</p>
            <p>&bull; <strong>Tool inputs:</strong> Not retained &mdash; processed locally in your browser and never stored on our servers.</p>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Children&apos;s Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Toolzium is not directed to children under the age of 13. We do not knowingly collect
              personal information from children under 13. If you believe a child under 13 has
              provided us with personal information, please contact us at{" "}
              <a
                href="mailto:contact@toolzium.com"
                className="underline text-foreground font-semibold"
              >
                contact@toolzium.com
              </a>{" "}
              and we will delete such information promptly.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card>
          <CardHeader>
            <CardTitle>Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              We may update this Privacy Policy from time to time. We will post the updated policy
              on this page with a revised &quot;Last updated&quot; date. Continued use of Toolzium
              after any changes constitutes your acceptance of the updated policy.
            </p>
            <p>
              For questions, contact us at{" "}
              <a
                href="mailto:contact@toolzium.com"
                className="underline text-foreground font-semibold"
              >
                contact@toolzium.com
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}