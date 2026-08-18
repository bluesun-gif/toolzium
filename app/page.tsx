"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
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
  BadgeCheck,
  Fingerprint,
  Github,
  Lock,
  type LucideIcon,
  MonitorSmartphone,
  Rocket,
  Shield,
  Sparkles,
  Zap,
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

        {/* Subtle grid background */}
        <GridPattern className="absolute inset-0 -z-10 [&>rect]:stroke-border/40 opacity-60" />

        {/* Soft ambient orbs */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/5 blur-[100px] -z-10" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/4 blur-3xl -z-10" />

        {/* Meteors — only a few, subtle */}
        <Meteors number={6} minDuration={8} maxDuration={18} className="bg-primary/40 shadow-none" />

        {/* ── Badge ── */}
        <BlurFade delay={0.05} inView>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm px-4 py-1.5 mb-8 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
            <AnimatedGradientText
              className="text-xs font-semibold tracking-wide"
              colorFrom="#7c3aed"
              colorTo="#6366f1"
              speed={0.6}
            >
              Fast · Free · Privacy-Friendly
            </AnimatedGradientText>
          </div>
        </BlurFade>

        {/* ── Main headline ── */}
        <BlurFade delay={0.1} inView>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter text-foreground max-w-4xl">
            <span className="text-primary tabular-nums">
              <NumberTicker value={TOTAL_TOOLS_COUNT} />+
            </span>{" "}
            Free Online Tools
          </h1>
        </BlurFade>

        {/* ── Animated "for [audience]" cycling line ── */}
        <BlurFade delay={0.16} inView>
          <div className="mt-3 h-9 flex items-center justify-center">
            <span className="text-lg sm:text-xl text-muted-foreground font-medium mr-2">
              Built for
            </span>
            <TypingAnimation
              words={["Developers", "Designers", "Marketers", "Students", "Creators", "Professionals"]}
              loop
              as="span"
              duration={60}
              deleteSpeed={30}
              pauseDelay={1800}
              showCursor
              className="text-lg sm:text-xl font-bold text-primary"
            />
          </div>
        </BlurFade>

        {/* ── Description ── */}
        <BlurFade delay={0.22} inView>
          <p className="mt-5 max-w-lg text-sm sm:text-base text-muted-foreground leading-relaxed">
            URL shortener, QR codes, image converter, JSON formatter,
            calculators, and more. No signup. Privacy-first.
          </p>
        </BlurFade>

        {/* ── CTA Buttons ── */}
        <BlurFade delay={0.28} inView>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CoolMode>
              <Link href="/tools">
                <ShimmerButton className="h-11 px-7 text-sm font-bold rounded-xl shadow-lg shadow-primary/20">
                  Explore Tools
                  <ArrowRight className="inline ml-2 h-4 w-4" />
                </ShimmerButton>
              </Link>
            </CoolMode>
            <Button variant="outline" asChild size="lg" className="h-11 rounded-xl">
              <Link href="/about">About</Link>
            </Button>
          </div>
        </BlurFade>

        {/* ── Stats row ── */}
        <BlurFade delay={0.34} inView>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {[
              { icon: Zap, num: TOTAL_TOOLS_COUNT, suffix: "+", label: "Free Tools" },
              { icon: Shield, num: 100, suffix: "%", label: "Browser-Processed" },
              { icon: BadgeCheck, num: 0, suffix: "", label: "Signup Required" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <s.icon className="h-4 w-4 text-primary/60" />
                  <span className="text-2xl font-extrabold text-foreground tabular-nums">
                    <NumberTicker value={s.num} className="text-primary" />
                    {s.suffix}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
              </div>
            ))}
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
              desc: "Instant load times, lightweight pages, and cache-friendly architecture. Most tools run 100% in your browser.",
            },
            {
              icon: Lock,
              title: "Private by Default",
              desc: "Browser-first processing. Server features avoid persistent storage. Your data stays yours — always.",
            },
            {
              icon: MonitorSmartphone,
              title: "Works Everywhere",
              desc: "Fully responsive, keyboard-friendly, WCAG-aware design. Seamlessly works on any device or screen size.",
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
            <SparklesText
              sparklesCount={5}
              className="text-xl font-bold tracking-tight"
            >
              Browse by Category
            </SparklesText>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
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
                    <div className="min-w-0">
                      <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors truncate">
                        {c.title}
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {c.items?.length ?? 0} tools
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 pt-0">
                    <div className="flex flex-wrap gap-1">
                      {(c.items || []).slice(0, 3).map((t) => (
                        <Badge
                          key={t.url}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0.5 truncate max-w-[120px]"
                          title={t.title}
                        >
                          {t.title}
                        </Badge>
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
              <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
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
            {/* Subtle ripple behind content */}
            <Ripple
              mainCircleSize={120}
              mainCircleOpacity={0.06}
              numCircles={4}
              className="opacity-40"
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-0.5">
                  <Fingerprint className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight mb-1">Security & Privacy First</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    On-device processing for all tools. For server features, we don&apos;t persist your data. Your files never leave your browser.
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
              {
                q: "Is Toolzium free?",
                a: `Yes. All ${TOTAL_TOOLS_COUNT}+ tools are completely free to use without any account or signup required.`,
              },
              {
                q: "Do you store my data?",
                a: "No. Tools run in your browser where possible. Server features avoid persistent storage. We prioritize privacy and process data on-device whenever possible.",
              },
              {
                q: "How can I request a tool?",
                a: "Use the Contact page or open an issue on our GitHub repository. We're always looking to add tools our users need.",
              },
              {
                q: "What types of tools are available?",
                a: "URL tools (shortener, QR codes), text utilities (word counter, case converter), developer tools (JSON formatter, hash generator), calculators, SEO tools, image tools (converter, resizer), and many more.",
              },
              {
                q: "Do I need to create an account?",
                a: "No account required for most tools. Some advanced features may require optional registration for saved preferences.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="px-4 border-b border-border/40 last:border-0"
              >
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

      {/* ─── SUPPORT SECTION ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <BlurFade delay={0.05} inView>
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-sm p-8 md:p-10">
            {/* Meteors inside the card */}
            <Meteors number={6} minDuration={10} maxDuration={22} className="bg-primary/40" />

            {/* Ambient glow behind */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-[inherit]" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Support the Project</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Sponsor to help us ship faster and keep Toolzium free for everyone.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <CoolMode>
                  <Link href="/sponsor">
                    <ShimmerButton className="h-10 px-5 text-sm rounded-lg">
                      Become a Sponsor
                    </ShimmerButton>
                  </Link>
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
