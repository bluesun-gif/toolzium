import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { lookupPhone, formatE164Pretty } from "@/lib/data/adapters/phone-adapter";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { ReportButton } from "@/components/shared/report-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Phone,
  PhoneCall,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { siteURL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ number: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params;
  const decoded = decodeURIComponent(number);
  const data = await lookupPhone(decoded);
  const pretty = data.formattedNumber;

  const title = `Who called me from ${pretty}? Caller ID, Spam Score & Report`;
  const description = `Is ${pretty} a scam or safe to answer? Free reverse phone lookup reveals carrier (${data.carrier}), line type (${data.lineType}), risk score (${data.riskScore}/100), and community complaint reports.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteURL}/phone/${encodeURIComponent(data.e164)}`,
      siteName: "Toolzium",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${siteURL}/phone/${encodeURIComponent(data.e164)}`,
    },
  };
}

export default async function PhoneProgrammaticPage({ params }: PageProps) {
  const { number } = await params;
  const decoded = decodeURIComponent(number);
  const data = await lookupPhone(decoded);

  const faqs = [
    {
      question: `Who called me from ${data.formattedNumber}?`,
      answer: `This number is registered under ${data.carrier} as a ${data.lineType} connection in ${data.countryName}. Our telephony analysis indicates a spam risk score of ${data.riskScore}/100 (${data.spamLevel}).`,
    },
    {
      question: `Is it safe to answer or call back ${data.formattedNumber}?`,
      answer: data.safeToAnswer
        ? `Yes, this number has a low risk score (${data.riskScore}/100). However, always verify caller identity before sharing sensitive personal details.`
        : `Caution advised. This number has an elevated risk score (${data.riskScore}/100) and characteristics of automated robocalling or telemarketing. Do not disclose private financial information.`,
    },
    {
      question: `How do I block calls and text messages from ${data.formattedNumber}?`,
      answer: `On iOS, open the Phone app > Recents > tap (i) next to ${data.formattedNumber} > Block this Caller. On Android, open Phone app > Call history > tap the call > Block / report spam.`,
    },
    {
      question: `Can I report fraudulent calls from ${data.formattedNumber}?`,
      answer: `Yes. Click the "Report this Number" button on this page to alert the Toolzium community. In the US, you can also file an official complaint with the FTC at reportfraud.ftc.gov.`,
    },
  ];

  const guideSections = [
    {
      heading: `Detailed Telecommunications Analysis for ${data.formattedNumber}`,
      body: `Phone numbers provisioned under the ${data.countryName} numbering plan are allocated by regulatory authorities to licensed telecom carriers. ${data.formattedNumber} is assigned to ${data.carrier} as a ${data.lineType} line. Line type is critical: while physical mobile and landline numbers require identity documentation, virtual VoIP lines are frequently utilized by automated outbound robocall systems.`,
    },
    {
      heading: `Spam Risk Score & Threat Assessment: ${data.riskScore}/100`,
      body: `Our scoring algorithm evaluates call pattern velocity, line type vulnerability, regulatory enforcement actions, and real-time community reports. Numbers categorized as ${data.spamLevel} typically exhibit automated predictive dialing, high call-to-hangup ratios, or recurring impersonation complaints.`,
    },
    {
      heading: "Actionable Steps if You Received a Suspicious Call",
      body: "1. Never press keys (e.g. 'Press 1 to speak with an agent') as this verifies your number is active to robodialers.\n2. Never provide one-time SMS verification codes, SSNs, or credit card digits.\n3. Hang up and call the official customer service number from the company's verified website if someone claims to represent a financial institution.",
    },
    {
      heading: "Carrier Line Types Explained",
      body: "• Mobile: Physical cellular SIM card (Verizon, AT&T, T-Mobile).\n• Landline: Traditional copper wire or fixed fiber connection.\n• VoIP: Software-based virtual Voice over IP service (Bandwidth, Twilio, Google Voice) that can be routed over the internet from any global jurisdiction.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title={`Who called from ${data.formattedNumber}?`}
      subtitle={`Comprehensive caller intelligence, carrier verification (${data.carrier}), line type (${data.lineType}), and risk assessment for ${data.formattedNumber}.`}
      categoryName="Reverse Phone Lookup"
      categoryUrl="/lookup/phone"
      canonicalPath={`/phone/${encodeURIComponent(data.e164)}`}
      faqs={faqs}
      guideSections={guideSections}
      countryCode={data.countryIso}
      vpnContext="phone"
      relatedSearches={[
        { label: "Search another phone number", url: "/lookup/phone" },
        { label: "Check IP Geolocation", url: "/lookup/ip" },
        { label: "Domain WHOIS Lookup", url: "/lookup/whois" },
        { label: "Check Password Breach", url: "/security/password" },
      ]}
    >
      <div className="space-y-6">
        {/* Main Intelligence Card */}
        <Card className="rounded-3xl border-2 border-primary/30 bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/60 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <CardTitle className="text-2xl sm:text-3xl font-black text-foreground">
                    {data.formattedNumber}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                      data.safeToAnswer
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                    }`}
                  >
                    {data.safeToAnswer ? "SAFE TO ANSWER" : "SUSPICIOUS / SCAM RISK"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Canonical E.164: <code className="font-mono">{data.e164}</code> • Region: {data.countryName} ({data.countryIso})
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <ReportButton
                  entity={data.e164}
                  type="phone"
                  buttonText="Report this Number"
                  variant="destructive"
                />
                <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
                  <Link href="/lookup/phone">
                    <Search className="mr-1.5 h-3.5 w-3.5" />
                    New Search
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Risk Rating</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-2xl sm:text-3xl font-black ${data.riskScore >= 70 ? "text-rose-500" : data.riskScore >= 40 ? "text-amber-500" : "text-emerald-500"}`}>
                    {data.riskScore}
                  </span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">{data.spamLevel}</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Telecom Carrier</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1 truncate">{data.carrier}</p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Operating Provider</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Line Allocation</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1">{data.lineType}</p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">
                  {data.lineType === "VoIP / Virtual" ? "Virtual Gateway" : "Physical Network"}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">User Reports</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1">{data.totalReports} total</p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Community Flagged</span>
              </div>
            </div>

            {/* Complaint Breakdown */}
            {data.complaintCategories.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-border/50">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Complaint Distribution
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {data.complaintCategories.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50 text-xs">
                      <span className="text-muted-foreground font-medium">{cat.name}</span>
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        {cat.count} reports
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Community Notes */}
            {data.recentNotes.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-border/50">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Recent Caller Reports & Activity Log
                </h3>
                <div className="space-y-2">
                  {data.recentNotes.map((note, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-muted/20 border border-border/50 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-foreground">{note.category}</span>
                        <span className="text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">&ldquo;{note.note}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProgrammaticSeoWrapper>
  );
}
