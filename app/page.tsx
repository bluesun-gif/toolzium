"use client";

import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoolMode } from "@/components/ui/cool-mode";
import { GlassCard } from "@/components/ui/glass-card";
import { Meteors } from "@/components/ui/meteors";
import { MorphingText } from "@/components/ui/morphing-text";
import { Ripple } from "@/components/ui/ripple";
import { Separator } from "@/components/ui/separator";
import { SparklesText } from "@/components/ui/sparkles-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ToolsData, TOTAL_TOOLS_COUNT } from "@/data/tools";
import { cn } from "@/lib/utils";
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

const MORPHING_WORDS = [
  "Developers",
  "Designers",
  "Marketers",
  "Students",
  "Creators",
  "Professionals",
];

export default function HomePage() {
  const trending = getPopularTools(8);
  const categories = getActiveCategories();

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center space-y-6 pt-16 pb-20 min-h-[75vh] justify-center overflow-hidden px-4">
        {/* Background */}
        <GridPattern className="[&>rect]:stroke-muted-foreground/8 [&>svg]:opacity-40" />
        <Meteors number={10} minDuration={7} maxDuration={16} className="bg-primary/60" />

        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl -z-10" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-primary/6 blur-3xl -z-10" />

        {/* Badge */}
        <BlurFade delay={0.05} inView>
          <div className="rounded-full border border-primary/20 bg-muted/60 px-4 py-1.5 shadow-sm inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <AnimatedGradientText
              className="text-sm font-semibold"
              colorFrom="#7c3aed"
              colorTo="#a855f7"
            >
              Fast · Free · Privacy-Friendly
            </AnimatedGradientText>
          </div>
        </BlurFade>

        {/* Stats / Number row */}
        <BlurFade delay={0.08} inView>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter text-foreground max-w-4xl">
            <span>
              <NumberTicker value={TOTAL_TOOLS_COUNT} className="text-primary tabular-nums" />
              <span>+ Free Online Tools</span>
            </span>
          </h1>
        </BlurFade>

        {/* Morphing text — who it's for */}
        <BlurFade delay={0.12} inView>
          <div className="text-muted-foreground text-lg sm:text-xl font-medium">
            <span>Built for </span>
            <MorphingText
              texts={MORPHING_WORDS}
              className="h-10 md:h-12 w-56 sm:w-72 inline-block align-middle text-primary text-2xl sm:text-3xl"
            />
          </div>
        </BlurFade>

        {/* Typing animation description */}
        <BlurFade delay={0.18} inView>
          <TypingAnimation
            as="p"
            className="max-w-xl text-sm md:text-base text-muted-foreground"
            duration={16}
            delay={800}
            startOnView
          >
            URL shortener, QR codes, image converter, JSON formatter, calculators, and more. No signup required.
          </TypingAnimation>
        </BlurFade>

        {/* CTA Buttons */}
        <BlurFade delay={0.24} inView>
          <div className="flex flex-wrap gap-3 z-10 justify-center">
            <CoolMode>
              <Link href="/tools" aria-label="Explore all tools">
                <ShimmerButton className="h-11 px-6 text-sm font-bold rounded-xl">
                  Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                </ShimmerButton>
              </Link>
            </CoolMode>
            <Button variant="outline" asChild size="lg">
              <Link href="/about">About</Link>
            </Button>
          </div>
        </BlurFade>

        {/* Quick stats row */}
        <BlurFade delay={0.3} inView>
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { num: TOTAL_TOOLS_COUNT, suffix: "+", label: "Free Tools" },
              { num: 0, suffix: "", label: "Signup Required" },
              { num: 100, suffix: "%", label: "In-Browser Processing" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-foreground tabular-nums">
                  <NumberTicker value={s.num} className="text-primary" />
                  {s.suffix}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* ─── Feature Cards ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Rocket, title: "Blazing Fast", desc: "Instant load, lightweight pages and cache-friendly. Most tools run 100% in your browser." },
            { icon: Lock, title: "Private by Default", desc: "Browser-first processing. Server features avoid persistent storage. Your data stays yours." },
            { icon: MonitorSmartphone, title: "Works Everywhere", desc: "Fully responsive, keyboard-friendly, WCAG-aware. Works on any device or screen size." },
          ].map((f, i) => (
            <BlurFade key={i} delay={0.05 + i * 0.07} inView>
              <GlassCard className="h-full p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-0.5 transition-all duration-300 group cursor-default">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">{f.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </GlassCard>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ─── Categories Grid ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-16">
        <BlurFade delay={0.05} inView>
          <div className="mb-8 flex items-center justify-between">
            <SparklesText
              className="text-xl md:text-2xl font-bold tracking-tight"
              sparklesCount={6}
            >Browse by Category</SparklesText>
            <Button variant="ghost" asChild>
              <Link href="/tools" className="inline-flex items-center text-sm">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </BlurFade>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c, idx) => (
            <BlurFade key={idx} delay={0.03 + idx * 0.025} inView>
              <Link
                href={`/tools#cat-${c.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "")}`}
                className="group focus:outline-none block h-full"
              >
                <GlassCard className="h-full hover:border-primary/40 hover:shadow-md hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="rounded-xl border border-border/60 bg-muted/60 p-2 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-all duration-300">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">
                        {c.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {c.items?.length ?? 0} tool{(c.items?.length ?? 0) === 1 ? "" : "s"}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1.5">
                      {(c.items || []).slice(0, 3).map((t) => (
                        <Badge key={t.url} variant="secondary" className="text-xs truncate max-w-full block" title={t.title}>
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

      {/* ─── Popular Tools ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-16">
        <BlurFade delay={0.05} inView>
          <div className="mb-8 flex items-center justify-between">
            <SparklesText
              className="text-xl md:text-2xl font-bold tracking-tight"
              sparklesCount={5}
            >Popular Tools</SparklesText>
            <Button variant="ghost" asChild>
              <Link href="/tools" className="inline-flex items-center text-sm">
                Explore all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </BlurFade>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((t, i) => (
            <BlurFade key={t.url} delay={0.03 + i * 0.04} inView>
              <Link
                href={t.url}
                className="group focus:outline-none block h-full"
                aria-label={`${t.title}${t.description ? ` — ${t.description}` : ""}`}
              >
                <GlassCard className="h-full hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-bold tracking-tight group-hover:text-primary transition-colors">
                      {t.title}
                    </CardTitle>
                    {t.description && (
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1">
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

      {/* ─── Privacy Section with Ripple ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-16">
        <BlurFade delay={0.05} inView>
          <GlassCard elevated className="overflow-hidden">
            <Ripple mainCircleSize={160} mainCircleOpacity={0.07} numCircles={5} className="opacity-50" />
            <div className="relative z-10 grid gap-6 p-6 md:grid-cols-2 md:p-10">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Fingerprint className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Security & Privacy First</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  On-device processing for all tools. For server features, we don&apos;t persist your data. Your files never leave your browser.
                </p>
              </div>
              <div className="self-center justify-self-end">
                <Button asChild variant="outline" size="lg">
                  <Link href="/privacy">Read our privacy policy</Link>
                </Button>
              </div>
            </div>
          </GlassCard>
        </BlurFade>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-16">
        <BlurFade delay={0.05} inView>
          <SparklesText
            className="mb-6 text-xl md:text-2xl font-bold tracking-tight"
            sparklesCount={4}
          >Frequently Asked Questions</SparklesText>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <Accordion type="single" collapsible className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur p-2">
            {[
              { q: "Is Toolzium free?", a: `Yes. Most tools are free to use without an account. We offer ${TOTAL_TOOLS_COUNT}+ online tools completely free with no signup required.` },
              { q: "Do you store my data?", a: "No. Tools run in your browser where possible. Server features avoid persistent storage. We prioritize privacy and process data on-device whenever possible." },
              { q: "How can I request a tool?", a: "You can request a new tool by using the Contact page or opening an issue on our GitHub repository. We're always looking to add tools that our users need." },
              { q: "What types of tools are available?", a: "We offer URL tools (shortener, QR codes), text utilities (word counter, case converter), developer tools (JSON formatter, hash generator), calculators (BMI, currency, EMI), SEO tools, image tools (converter, resizer), and more." },
              { q: "Do I need to create an account?", a: "No account is required for most tools. You can use them instantly without signing up. Some advanced features may require optional registration for saved preferences." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`a${i}`} className="border-b border-border/40 last:border-0 px-2">
                <AccordionTrigger className="text-sm font-semibold hover:text-primary hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </section>

      {/* ─── Support Section with Meteors ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <BlurFade delay={0.05} inView>
          <Card className="overflow-hidden border border-border/60 bg-card/50 backdrop-blur relative">
            <Meteors number={7} minDuration={9} maxDuration={20} className="bg-primary/50" />
            <div className="relative z-10 grid gap-6 p-6 md:grid-cols-2 md:items-center md:p-10">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-2xl font-bold tracking-tight">Support the Project</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-prose">
                  Sponsor to help us ship faster and keep Toolzium free for everyone.
                </p>
              </div>
              <div className="relative flex flex-wrap gap-3 md:justify-end">
                <CoolMode>
                  <Link href="/sponsor">
                    <ShimmerButton className="h-10 px-5 text-sm rounded-lg">
                      Become a Sponsor
                    </ShimmerButton>
                  </Link>
                </CoolMode>
                <Button variant="outline" asChild>
                  <Link href="https://github.com/Toolzium" target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </BlurFade>
      </section>

      <Separator className="mx-auto my-4 max-w-7xl" />
      <Footer />
    </main>
  );
}
