"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { HelpCircle, ChevronDown } from "lucide-react";
import * as React from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type ToolFaqAccordionProps = {
  title?: string;
  subtitle?: string;
  faqs: FaqItem[];
  className?: string;
};

export default function ToolFaqAccordion({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about using this tool.",
  faqs,
  className = "",
}: ToolFaqAccordionProps) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={`mt-16 space-y-8 ${className}`}>
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center justify-center md:justify-start gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <HelpCircle className="h-6 w-6 text-primary shrink-0" />
          </div>
          <span>{title}</span>
        </h2>
        {subtitle && <p className="text-sm md:text-base text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>

      <div className="space-y-4 max-w-4xl mx-auto md:mx-0">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <GlassCard key={idx} className={`overflow-hidden transition-all duration-300 border-l-4 ${isOpen ? "border-l-primary shadow-md bg-muted/80 backdrop-blur" : "border-l-transparent bg-background/40 backdrop-blur hover:bg-muted/60"}`}>
              <button
                type="button"
                id={`faq-btn-${idx}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:px-6 flex items-center justify-between text-left font-semibold text-sm sm:text-base text-foreground gap-4 hover:text-primary transition-colors focus:outline-none"
              >
                <span>{faq.question}</span>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? "bg-primary/10 text-primary" : "bg-muted text-slate-400"}`}>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-btn-${idx}`}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
