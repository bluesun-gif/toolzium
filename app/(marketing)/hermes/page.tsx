import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateSEOMetadata } from "@/lib/seo-config";
import Link from "next/link";

export const metadata = generateSEOMetadata({
  title:
    "Hermes — Your Personal AI Chief of Staff, Installed on Your Machine",
  description:
    "A 24/7 autonomous AI agent that runs your laptop, hunts clients, writes your content, remembers everything, and works while you sleep. Done-for-you installation by the team that runs it every day.",
  path: "/hermes",
});

const CONTACT_EMAIL = "contact@toolzium.com";

const capabilities = [
  {
    title: "Works While You Sleep",
    body: "Scheduled agent fleet — daily research scouts, opportunity hunters, and reports land in your inbox before you wake up. No prompting required.",
  },
  {
    title: "Total Memory",
    body: "A holographic long-term brain: every client, preference, project, and decision is remembered across sessions forever. It gets smarter the longer you use it.",
  },
  {
    title: "Hands On Your Machine",
    body: "Real browser automation, terminal control, file management, deployments. It doesn't just chat — it clicks, types, builds, and ships on your actual computer.",
  },
  {
    title: "Money-Working Mode",
    body: "Lead hunting on LinkedIn, Reddit and job boards. Drafted proposals, content pipelines for X and LinkedIn, and a deal tracker — an agent pointed at revenue.",
  },
  {
    title: "Voice & Phone Ready",
    body: "Jarvis-style realtime voice layer: your agent can listen, speak, and hold a conversation — on your laptop or over Telegram.",
  },
  {
    title: "Private By Design",
    body: "Runs on YOUR hardware with YOUR API keys. No third-party SaaS holding your data, no per-seat subscription tax. It leaves when you uninstall it — nothing else does.",
  },
];

const tiers = [
  {
    name: "DIY Kit",
    price: "$297",
    tagline: "Everything packaged, you install it",
    features: [
      "Complete Hermes setup: config, skills library, memory system",
      "Step-by-step Windows/macOS install guide + video walkthrough",
      "Pre-built cron agent fleet (research, leads, content, reports)",
      "30 min setup call to unblock you",
      "Lifetime updates to the kit",
    ],
    cta: "Get the Kit",
    highlight: false,
  },
  {
    name: "Done-For-You Install",
    price: "$997",
    tagline: "We set it up on your machine, live, in 90 minutes",
    features: [
      "Everything in DIY Kit, plus:",
      "Live screen-share install on YOUR computer",
      "Your persona, goals & workflows configured into its brain",
      "Connected to your LinkedIn / X / email / calendar pipelines",
      "First money-agent (lead hunter) running before the call ends",
      "2 weeks of chat support while it learns you",
    ],
    cta: "Book Your Install",
    highlight: true,
  },
  {
    name: "Concierge",
    price: "$2,500 + $300/mo",
    tagline: "For founders who want the machine humming, forever",
    features: [
      "Everything in Done-For-You, plus:",
      "We maintain & upgrade your agent fleet monthly",
      "New skills & automations built on request",
      "Weekly strategy report from your agent's own output",
      "Priority support with a real human + agent team",
    ],
    cta: "Apply for Concierge",
    highlight: false,
  },
];

const steps = [
  {
    n: "1",
    title: "Discovery call (15 min, free)",
    body: "Tell us what you actually want done — clients, content, ops, research. We map your life into agent jobs.",
  },
  {
    n: "2",
    title: "Install & brain-feed (90 min)",
    body: "We set Hermes up on your machine, wire your accounts, and teach it your goals, tone, and pipeline.",
  },
  {
    n: "3",
    title: "It starts working day one",
    body: "Overnight scouts run, morning reports land, lead hunters start qualifying. You approve, it executes.",
  },
];

export default function HermesPage() {
  const mailto = (subject: string) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Hero */}
      <div className="mb-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Personal AI Infrastructure — installed on your machine
        </p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl">
          Meet Hermes.
          <br />
          <span className="text-muted-foreground">
            Your AI Chief of Staff.
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Not another chatbot in a browser tab. A 24/7 autonomous agent that
          lives on <strong className="text-foreground">your</strong> laptop —
          hunting clients, writing content, researching opportunities,
          remembering everything, and executing real work while you sleep.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <a href={mailto("Hermes install — I want in")}>
              Book a Free Discovery Call
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#pricing">See Pricing</a>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Runs on Windows, macOS & Linux. Your hardware. Your API keys. Your
          data.
        </p>
      </div>

      {/* The problem */}
      <Card className="mb-16 border-dashed">
        <CardContent className="p-8 text-center">
          <p className="mx-auto max-w-3xl text-lg">
            You already know AI agents can run a business. You&apos;ve watched
            the demos. The problem is{" "}
            <strong>nobody hands you the working thing</strong> — the memory
            system, the scheduled agent fleet, the lead pipelines, the browser
            control. Weeks of setup, dozens of tools, endless config.{" "}
            <strong>We already did those weeks. You get the day one.</strong>
          </p>
        </CardContent>
      </Card>

      {/* Capabilities */}
      <section className="mb-16">
        <h2 className="mb-2 text-center text-3xl font-bold tracking-tight">
          What it actually does
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          Every capability below is live in production — not a roadmap.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <Card key={c.title}>
              <CardHeader>
                <CardTitle className="text-lg">{c.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {c.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
          From zero to autonomous in one afternoon
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n}>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {s.n}
                  </span>
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {s.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mb-16">
        <h2 className="mb-2 text-center text-3xl font-bold tracking-tight">
          Pricing
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          One-time setup. No per-seat SaaS tax. Your machine owns it forever.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <Card
              key={t.name}
              className={
                t.highlight
                  ? "relative border-primary shadow-lg ring-1 ring-primary/30"
                  : "relative"
              }
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between">
                  <span>{t.name}</span>
                  <span className="text-2xl font-bold">{t.price}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{t.tagline}</p>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={t.highlight ? "default" : "outline"}
                  asChild
                >
                  <a href={mailto(`Hermes ${t.name} — interested`)}>{t.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Guarantee / FAQ */}
      <section className="mb-16 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Who is this for?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Freelancers drowning in admin, founders who need a second brain
            that <em>executes</em>, and technical people who want their
            computer working for them 24/7. If you want a chatbot, this is
            overkill. If you want leverage, this is the floor.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Is my data safe?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Everything runs locally on your hardware with your own API keys.
            There is no cloud service of ours holding your data — when the
            install is done, the machine is yours. We never see your files,
            credentials, or conversations.
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Stop renting AI. Own one.
          </h2>
          <p className="mx-auto mb-6 max-w-xl opacity-90">
            One 15-minute call and we&apos;ll show you exactly what Hermes
            would do on your machine, with your goals. If it&apos;s not a fit,
            we&apos;ll tell you.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href={mailto("Hermes install — I want in")}>
              Book a Free Discovery Call
            </a>
          </Button>
          <p className="mt-4 text-sm opacity-75">
            or email {CONTACT_EMAIL} — we reply within a day.
          </p>
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Part of the{" "}
        <Link href="/" className="underline">
          Toolzium
        </Link>{" "}
        family — free online tools for developers since day one.
      </p>
    </div>
  );
}
