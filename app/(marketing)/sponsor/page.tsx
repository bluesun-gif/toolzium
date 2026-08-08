import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateSEOMetadata } from "@/lib/seo-config";
import {
  ArrowRight,
  Ban,
  Check,
  Crown,
  HeartHandshake,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata({
  title: "Sponsor Toolzium - Support Open Source & Go Ad-Free",
  description:
    "Support Toolzium open source development. Go ad-free with Premium, sponsor via GitHub, or contribute code. Help keep 540+ free tools available for everyone.",
  path: "/sponsor",
});

const supportWays = [
  {
    title: "Star on GitHub",
    icon: Star,
    href: "https://github.com/toolzium/toolzium",
  },
  {
    title: "Sponsor Development",
    icon: HeartHandshake,
    href: "https://github.com/sponsors/toolzium",
  },
  {
    title: "Contribute Code",
    icon: Rocket,
    href: "https://github.com/toolzium/toolzium/blob/main/CONTRIBUTING.md",
  },
] as const;

const PLANS = [
  {
    name: "Monthly",
    price: "$4.99",
    period: "per month",
    badge: null,
    highlight: false,
    features: [
      "Ad-free experience",
      "Full privacy protection",
      "Priority tool speed",
      "Cancel anytime",
    ],
  },
  {
    name: "Yearly",
    price: "$2.99",
    period: "per month, billed annually",
    badge: "Save 40%",
    highlight: true,
    features: [
      "Everything in Monthly",
      "Early access to new tools",
      "Premium badge",
      "Priority support",
    ],
  },
  {
    name: "Lifetime",
    price: "$29",
    period: "one-time payment",
    badge: "Best Value",
    highlight: false,
    features: [
      "Everything in Yearly",
      "Lifetime ad-free access",
      "Supporter Hall of Fame",
      "All future features",
    ],
  },
];

const PREMIUM_FEATURES = [
  { icon: Ban, text: "100% Ad-Free Experience across all 540+ tools" },
  { icon: Zap, text: "Priority tool loading — no throttling" },
  { icon: Shield, text: "Zero data tracking, full privacy mode" },
  { icon: Sparkles, text: "Early access to new tools before public launch" },
  { icon: Star, text: "Premium crown badge in search and community" },
  { icon: Crown, text: "Supporter Hall of Fame (Lifetime only)" },
];

export default function SponsorPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5 text-sm font-medium">
            <Crown className="h-4 w-4 text-yellow-500 fill-yellow-400" />
            Support the Mission
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Support Toolzium
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Toolzium is free and privacy-first. Support us by going Premium or
            contributing to open source. Every bit helps keep 540+ tools free for
            everyone.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="h-12 gap-2 px-8 bg-gradient-to-r from-violet-500 to-primary hover:opacity-90" asChild>
              <Link href="#premium">
                <Crown className="h-5 w-5" />
                Go Ad-Free — Premium
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 gap-2 px-8"
              asChild
            >
              <Link
                href="https://github.com/sponsors/toolzium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HeartHandshake className="h-5 w-5" />
                Sponsor on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section id="premium" className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/5 px-4 py-1.5 text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-4">
            <Crown className="h-4 w-4 fill-yellow-400" />
            Premium Membership
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Go Ad-Free. Support the Mission.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Remove all ads, unlock full privacy mode, and get early access to new
            tools. Starting at just $2.99/month.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mb-12 rounded-2xl border bg-card p-6 sm:p-8">
          <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-5">
            What you get with Premium
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {PREMIUM_FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.highlight
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.badge && (
                <Badge
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-0.5 ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {plan.badge}
                </Badge>
              )}

              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {plan.period}
                </p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full gap-2 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-violet-500 to-primary hover:opacity-90"
                    : ""
                }`}
                variant={plan.highlight ? "default" : "outline"}
              >
                <Crown className="h-4 w-4" />
                Choose {plan.name}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          🔒 Payment integration coming soon. Click the Crown icon (👑) in the navbar to activate Premium in demo mode.
        </p>
      </section>

      {/* Open Source Ways to Support */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 border-t">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Other Ways to Help</h2>
          <p className="text-sm text-muted-foreground">
            Can&apos;t go Premium? These free contributions mean just as much.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {supportWays.map((way) => {
            const Icon = way.icon;
            return (
              <Link
                key={way.title}
                href={way.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex h-full flex-col items-center rounded-xl border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{way.title}</h3>
                  <ArrowRight className="mt-4 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why Support */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          How We Use Your Support
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-6">
            <Rocket className="mb-3 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Development</h3>
            <p className="text-sm text-muted-foreground">
              Building new tools and upgrading existing ones to the best on the
              internet.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <Shield className="mb-3 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Infrastructure</h3>
            <p className="text-sm text-muted-foreground">
              Vercel hosting, AI API costs (Groq + OpenRouter), CDN, domains, and
              uptime.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <Users className="mb-3 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Community</h3>
            <p className="text-sm text-muted-foreground">
              Documentation, support channels, and growing the project for
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Wall */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-semibold">Our Sponsors</h2>
        <div className="rounded-xl border bg-card p-12 text-center">
          <HeartHandshake className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">
            Your name could be here.{" "}
            <Link
              href="https://github.com/sponsors/toolzium"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Become a sponsor →
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-violet-500/5 p-12 text-center">
          <Crown className="mx-auto mb-4 h-12 w-12 text-yellow-500 fill-yellow-400" />
          <h2 className="text-2xl font-semibold">Ready to Help?</h2>
          <p className="mt-2 text-muted-foreground">
            Every contribution — Premium, GitHub, or a star — keeps Toolzium free
            for everyone.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-violet-500 to-primary hover:opacity-90"
              asChild
            >
              <Link href="#premium">
                <Crown className="h-5 w-5" />
                Go Premium
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/sponsors/toolzium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sponsor on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
