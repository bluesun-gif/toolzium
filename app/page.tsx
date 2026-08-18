"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoolMode } from "@/components/ui/cool-mode";
import { GlassCard } from "@/components/ui/glass-card";
import { Meteors } from "@/components/ui/meteors";
import { Ripple } from "@/components/ui/ripple";
import { Separator } from "@/components/ui/separator";
import { SparklesText } from "@/components/ui/sparkles-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ToolsData, TOTAL_TOOLS_COUNT } from "@/data/tools";
import {
  ArrowRight,
  Fingerprint,
  Github,
  Lock,
  type LucideIcon,
  MonitorSmartphone,
  Rocket,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type ToolItem = {
  title: string;
  url: string;
  description?: string;
  popular?: boolean;
};

type ToolCategory = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items: ToolItem[];
};

const isRootTools = (c: ToolCategory) => c.title.toLowerCase() === "tools";

function getPopularTools(max = 8): ToolItem[] {
  const flat: ToolItem[] = (ToolsData as ToolCategory[]).flatMap(
    (cat) => cat.items ?? []
  );
  const popular = flat.filter((t) => t.popular);
  const pool = popular.length ? popular : flat;
  const seen = new Set<string>();
  const unique = pool.filter((t) => {
    if (seen.has(t.url)) return false;
    seen.add(t.url);
    return true;
  });
  return unique.slice(0, max);
}

function getActiveCategories(): ToolCategory[] {
  return (ToolsData as ToolCategory[]).filter(
    (c) => c.isActive && !isRootTools(c)
  );
}

export default function HomePage() {
  const trending = getPopularTools(8);
  const categories = getActiveCategories();

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative isolate flex flex-col items-center justify-center text-center px-4 pt-20 pb-24 min-h-[calc(100vh-64px)]">
        {/* Grid background */}
        <GridPattern className="absolute inset-0 -z-10 [&>rect]:stroke-border/40 opacity-60" />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[80px] -z-10" />
        {/* Subtle shooting stars */}
        <Meteors number={5} minDuration={8} maxDuration={18} className="bg-primary/40 shadow-none" />

        {/* Badge — uses AnimatedShinyText from original theme styling */}
        <BlurFade delay={0.05} inView>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-neutral-100 dark:border-white/5 dark:bg-neutral-900 px-4 py-1.5 mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Fast · Free · Privacy-Friendly
            </span>
          </div>
        </BlurFade>

        {/* Main headline */}
        <BlurFade delay={0.1} inView>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground max-w-4xl">
            <span className="text-primary tabular-nums">
              <NumberTicker value={TOTAL_TOOLS_COUNT} />+
            </span>{" "}
            Free Online Tools
          </h1>
        </BlurFade>

        {/* Cycling audience line */}
        <BlurFade delay={0.16} inView>
          <div className="mt-4 flex items-center justify-center gap-2 text-lg sm:text-xl">
            <span className="text-muted-foreground font-medium">Built for</span>
            <TypingAnimation
              words={["Developers", "Designers", "Marketers", "Students", "Creators", "Professionals"]}
              loop
              as="span"
              duration={60}
              deleteSpeed={30}
              pauseDelay={1800}
              showCursor
              className="font-bold text-primary"
            />
          </div>
        </BlurFade>

        {/* Description */}
        <BlurFade delay={0.22} inView>
          <p className="mt-5 max-w-lg text-base text-muted-foreground leading-relaxed text-pretty">
            URL shortener, QR codes, image converter, JSON formatter,
            calculators, and more. No signup required. Privacy-first.
          </p>
        </BlurFade>

        {/* CTA Buttons — use original themed Button, not ShimmerButton */}
        <BlurFade delay={0.28} inView>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CoolMode>
              <Button asChild size="lg" className="h-11 px-7 rounded-xl font-semibold shadow-sm">
                <Link href="/tools">
                  Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CoolMode>
            <Button variant="outline" asChild size="lg" className="h-11 rounded-xl font-semibold">
              <Link href="/about">About</Link>
            </Button>
          </div>
        </BlurFade>

        {/* Stats — clean, no icons, just numbers + labels */}
        <BlurFade delay={0.34} inView>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground tabular-nums">
                <NumberTicker value={TOTAL_TOOLS_COUNT} className="text-primary" />+
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Free Tools</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground tabular-nums">
                <NumberTicker value={100} className="text-primary" />%
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">In-Browser Processing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground tabular-nums">
                No
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Signup Required</div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ─── FEATURE CARDS ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Rocket,
              title: "Blazing Fast",
              desc: "Instant load times, lightweight pages, cache-friendly. Most tools run 100% in your browser.",
            },
            {
              icon: Lock,
              title: "Private by Default",
              desc: "Browser-first processing. Server features avoid persistent storage. Your data stays yours.",
            },
            {
              icon: MonitorSmartphone,
              title: "Works Everywhere",
              desc: "Fully responsive, keyboard-friendly, WCAG-aware. Works seamlessly on any device.",
            },
          ].map((f, i) => (
            <BlurFade key={i} delay={0.06 + i * 0.08} inView>
              <GlassCard className="h-full p-6 group hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="h-10 w-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/12 group-hover:scale-105 transition-all duration-300">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </GlassCard>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <BlurFade delay={0.05} inView>
          <div className="flex items-center justify-between mb-6">
            <SparklesText sparklesCount={5} className="text-xl font-bold tracking-tight">
              Browse by Category
            </SparklesText>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tools" className="inline-flex items-center gap-1 text-sm">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </BlurFade>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c, idx) => (
            <BlurFade key={idx} delay={0.03 + idx * 0.02} inView>
              <Link
                href={`/tools#cat-${c.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/&/g, "")
                  .replace(/[^a-z0-9-]/g, "")
                  .replace(/-+/g, "-")
                  .replace(/^-|-$/g, "")}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <GlassCard className="h-full hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                  <CardHeader className="flex flex-row items-center gap-2.5 pb-2 pt-4 px-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg border border-border/60 bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/8 group-hover:border-primary/20 group-hover:text-primary transition-all duration-200">
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors truncate">
                        {c.title}
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {c.items?.length ?? 0} tools
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 pt-0">
                    <div className="flex flex-col gap-1">
                      {(c.items || []).slice(0, 3).map((t) => (
                        <span
                          key={t.url}
                          className="text-[11px] text-muted-foreground truncate block leading-relaxed"
                          title={t.title}
                        >
                          {t.title}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </GlassCard>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ─── POPULAR TOOLS ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <BlurFade delay={0.05} inView>
          <div className="flex items-center justify-between mb-6">
            <SparklesText sparklesCount={4} className="text-xl font-bold tracking-tight">
              Popular Tools
            </SparklesText>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tools" className="inline-flex items-center gap-1 text-sm">
                Explore all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </BlurFade>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((t, i) => (
            <BlurFade key={t.url} delay={0.03 + i * 0.035} inView>
              <Link
                href={t.url}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                aria-label={t.title}
              >
                <GlassCard className="h-full hover:border-primary/40 hover:shadow-md hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-200">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                      {t.title}
                    </CardTitle>
                    {t.description && (
                      <CardDescription className="text-xs leading-relaxed line-clamp-2 mt-1">
                        {t.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                </GlassCard>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ─── PRIVACY SECTION ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <BlurFade delay={0.05} inView>
          <GlassCard elevated className="overflow-hidden relative">
            <Ripple mainCircleSize={120} mainCircleOpacity={0.06} numCircles={4} className="opacity-40" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-0.5">
                  <Fingerprint className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight mb-1">Security & Privacy First</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    On-device processing for all tools. We don&apos;t persist your data. Your files never leave your browser.
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0">
                <Link href="/privacy">Read privacy policy</Link>
              </Button>
            </div>
          </GlassCard>
        </BlurFade>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <BlurFade delay={0.05} inView>
          <SparklesText sparklesCount={4} className="text-xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </SparklesText>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <Accordion type="single" collapsible className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
            {[
              { q: "Is Toolzium free?", a: `Yes. All ${TOTAL_TOOLS_COUNT}+ tools are completely free with no account or signup required.` },
              { q: "Do you store my data?", a: "No. Tools run in your browser where possible. Server features avoid persistent storage. We process data on-device whenever possible." },
              { q: "How can I request a tool?", a: "Use the Contact page or open an issue on our GitHub repository. We're always adding tools our users need." },
              { q: "What types of tools are available?", a: "URL tools, text utilities, developer tools (JSON formatter, hash generator), calculators, SEO tools, image tools, and many more." },
              { q: "Do I need to create an account?", a: "No account required. Use any tool instantly without signing up." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="px-4 border-b border-border/40 last:border-0">
                <AccordionTrigger className="text-sm font-semibold py-4 hover:text-primary hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </section>

      {/* ─── SUPPORT ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <BlurFade delay={0.05} inView>
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-sm p-8 md:p-10">
            <Meteors number={5} minDuration={10} maxDuration={22} className="bg-primary/40" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-[inherit]" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Support the Project</h3>
                <p className="mt-1.5 text-sm text-muted-foreground max-w-sm">
                  Sponsor to help us ship faster and keep Toolzium free for everyone.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <CoolMode>
                  <Button asChild size="sm" className="h-10 px-5 rounded-lg font-semibold">
                    <Link href="/sponsor">Become a Sponsor</Link>
                  </Button>
                </CoolMode>
                <Button variant="outline" asChild size="sm" className="h-10">
                  <Link href="https://github.com/Toolzium" target="_blank" rel="noreferrer">
                    <Github className="mr-1.5 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      <Separator className="mx-auto max-w-6xl px-4 mb-0" />
      <Footer />
    </main>
  );
}
