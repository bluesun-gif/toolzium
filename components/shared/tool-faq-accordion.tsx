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
    <section className={`mt-10 space-y-6 ${className}`}>
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary shrink-0" />
          <span>{title}</span>
        </h2>
        {subtitle && <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <GlassCard key={idx} className="overflow-hidden transition-all duration-200">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:px-5 flex items-center justify-between text-left font-medium text-sm sm:text-base text-foreground gap-4 hover:text-primary transition-colors focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                  {faq.answer}
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
