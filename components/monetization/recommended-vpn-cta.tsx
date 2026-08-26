"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getRecommendedVpn, VPN_PARTNERS } from "@/lib/monetization";
import { ArrowRight, CheckCircle2, Shield, Sparkles } from "lucide-react";

interface RecommendedVpnCtaProps {
  countryCode?: string;
  context?: "ip" | "phone" | "breach" | "whois" | "general";
  title?: string;
  subtitle?: string;
}

export function RecommendedVpnCta({
  countryCode = "US",
  context = "general",
  title,
  subtitle,
}: RecommendedVpnCtaProps) {
  const partner = getRecommendedVpn(countryCode);

  const contextCopy = {
    ip: {
      defaultTitle: "Your Real IP & Location Are Visible to Websites",
      defaultSub: "ISPs, advertisers, and public Wi-Fi operators can log your exact geolocation, browsing history, and online activity.",
    },
    phone: {
      defaultTitle: "Prevent Identity Scraping & Robocalls",
      defaultSub: "Data brokers match phone numbers with IP addresses. Encrypt your internet connection to block tracking.",
    },
    breach: {
      defaultTitle: "Protect Your Exposed Accounts & Passwords",
      defaultSub: "Prevent credential stuffing and man-in-the-middle attacks across all your devices with encrypted VPN tunnels.",
    },
    whois: {
      defaultTitle: "Mask Your Network Identity Online",
      defaultSub: "Domain administrators and webmasters use VPNs to safely inspect competitors, test DNS, and hide their origin IP.",
    },
    general: {
      defaultTitle: "Secure Your Digital Privacy Worldwide",
      defaultSub: "Encrypt your DNS queries, hide your true IP address, and unblock global content with military-grade 256-bit encryption.",
    },
  }[context];

  return (
    <Card className="my-8 overflow-hidden rounded-3xl border-2 border-primary/25 bg-gradient-to-br from-primary/8 via-card to-background shadow-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30 px-3 py-1 text-xs font-bold rounded-full">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {partner.badge}
              </Badge>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                {partner.discount}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {title || contextCopy.defaultTitle}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {subtitle || contextCopy.defaultSub}
            </p>

            <div className="grid sm:grid-cols-2 gap-2 pt-2 text-xs text-foreground/85 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>{partner.highlight}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>30-Day 100% Money-Back Guarantee</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto lg:w-full rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20 text-sm hover:scale-[1.02] transition-transform"
            >
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2"
              >
                <Shield className="h-4 w-4" />
                <span>Get {partner.name} Deal</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <span className="text-[11px] text-muted-foreground text-center">
              Rated {partner.rating}/5.0 by 45,000+ Trustpilot reviews
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecommendedVpnCta;
