import React from "react";
import Link from "next/link";
import JsonLd from "./json-ld";
import { siteURL } from "@/lib/constants";
import { AdSlot } from "@/components/shared/ad-slot";
import { RecommendedVpnCta } from "@/components/monetization/recommended-vpn-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  Link2,
  Shield,
  Sparkles,
} from "lucide-react";

export interface ProgrammaticFaqItem {
  question: string;
  answer: string;
}

export interface ProgrammaticSeoWrapperProps {
  title: string;
  subtitle: string;
  categoryName: string;
  categoryUrl: string;
  canonicalPath: string;
  faqs: ProgrammaticFaqItem[];
  guideTitle?: string;
  guideSections?: { heading: string; body: string }[];
  relatedSearches?: { label: string; url: string }[];
  countryCode?: string;
  vpnContext?: "ip" | "phone" | "breach" | "whois" | "general";
  children: React.ReactNode;
}

export function ProgrammaticSeoWrapper({
  title,
  subtitle,
  categoryName,
  categoryUrl,
  canonicalPath,
  faqs,
  guideTitle = "Comprehensive Technical Analysis & Guide",
  guideSections = [],
  relatedSearches = [],
  countryCode = "US",
  vpnContext = "general",
  children,
}: ProgrammaticSeoWrapperProps) {
  const fullUrl = `${siteURL}${canonicalPath}`;

  // Structured Data Schemas
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteURL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: `${siteURL}${categoryUrl}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: fullUrl,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${title} | Toolzium`,
    url: fullUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: subtitle,
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 space-y-8">
      {/* Schema Injection */}
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={webAppLd} />

      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap py-1">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={categoryUrl} className="hover:text-foreground transition-colors">
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold truncate max-w-[240px]">
          {title}
        </span>
      </nav>

      {/* Main Interactive Tool Content */}
      <section>{children}</section>

      {/* Top Banner Ad Slot */}
      <AdSlot slotId="content-middle" format="leaderboard" className="mx-auto" />

      {/* ─── 800+ WORD STRUCTURED GUIDE & TECHNICAL BREAKDOWN ───────────── */}
      {guideSections.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {guideTitle}
              </h2>
              <p className="text-xs text-muted-foreground">
                In-depth breakdown, safety recommendations, and operational mechanics.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {guideSections.map((sec, idx) => (
              <Card key={idx} className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-xs">
                <CardContent className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-[11px] font-mono flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{sec.heading}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sec.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* High-Converting Targeted VPN / Privacy Affiliate CTA */}
      <RecommendedVpnCta
        countryCode={countryCode}
        context={vpnContext}
      />

      {/* ─── 5-8 FAQ ACCORDION ─────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-muted-foreground">
                Verified answers to common queries regarding this lookup target and security protocols.
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2.5">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-2xl border border-border/60 bg-card/70 px-4 py-1"
              >
                <AccordionTrigger className="text-left text-xs sm:text-sm font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1 pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* ─── CROSS-TOOL INTERNAL LINKING NETWORK ────────────────────────── */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Link2 className="h-3.5 w-3.5 text-primary" />
            <span>Related Intelligence & Security Tools</span>
          </div>
          <Badge variant="outline" className="text-[10px] rounded-full">
            Topical Authority
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          <Link
            href="/lookup/phone"
            className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-colors font-medium flex flex-col justify-between"
          >
            <span className="font-bold text-foreground">Phone Lookup</span>
            <span className="text-[10px] text-muted-foreground mt-1">Scam score & carrier</span>
          </Link>
          <Link
            href="/lookup/ip"
            className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-colors font-medium flex flex-col justify-between"
          >
            <span className="font-bold text-foreground">IP Geolocation</span>
            <span className="text-[10px] text-muted-foreground mt-1">ASN, ISP, Proxy/VPN</span>
          </Link>
          <Link
            href="/lookup/whois"
            className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-colors font-medium flex flex-col justify-between"
          >
            <span className="font-bold text-foreground">WHOIS Domain</span>
            <span className="text-[10px] text-muted-foreground mt-1">RDAP registrar & age</span>
          </Link>
          <Link
            href="/lookup/username"
            className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-colors font-medium flex flex-col justify-between"
          >
            <span className="font-bold text-foreground">Username OSINT</span>
            <span className="text-[10px] text-muted-foreground mt-1">30+ social networks</span>
          </Link>
          <Link
            href="/security/password"
            className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-colors font-medium flex flex-col justify-between"
          >
            <span className="font-bold text-foreground">Breach Scanner</span>
            <span className="text-[10px] text-muted-foreground mt-1">HIBP Pwned k-anonymity</span>
          </Link>
          <Link
            href="/alternatives"
            className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-colors font-medium flex flex-col justify-between"
          >
            <span className="font-bold text-foreground">Free Alternatives</span>
            <span className="text-[10px] text-muted-foreground mt-1">Open-source software</span>
          </Link>
        </div>

        {/* Dynamic Related Target Keywords / Entities */}
        {relatedSearches.length > 0 && (
          <div className="pt-3">
            <span className="text-[11px] font-semibold text-muted-foreground block mb-2">
              Popular Related Searches:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {relatedSearches.map((rel, i) => (
                <Link
                  key={i}
                  href={rel.url}
                  className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/60 px-2.5 py-1 rounded-lg transition-colors"
                >
                  {rel.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Bottom Display Ad Slot */}
      <AdSlot slotId="content-bottom" format="horizontal" />
    </div>
  );
}

export default ProgrammaticSeoWrapper;
