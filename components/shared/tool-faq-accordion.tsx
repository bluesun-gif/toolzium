"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/magicui/blur-fade";
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
    <section className={`col-span-full mt-16 space-y-8 ${className}`} style={{ gridColumn: "1 / -1" }}>
      {/* Section header */}
      <BlurFade delay={0} inView>
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center justify-center md:justify-start gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="p-2.5 bg-primary/10 border border-primary/20 rounded-2xl text-primary shrink-0 shadow-sm"
            >
              <HelpCircle className="h-6 w-6" />
            </motion.div>
            <span>{title}</span>
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </BlurFade>

      {/* FAQ items with staggered entrance */}
      <div className="space-y-4 max-w-5xl mx-auto md:mx-0">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <BlurFade key={idx} delay={idx * 0.07} inView>
              <motion.div
                whileHover={!isOpen ? { x: 3 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <GlassCard
                  className={`overflow-hidden transition-all duration-300 rounded-2xl border-l-[4px] ${
                    isOpen
                      ? "border-l-primary shadow-lg shadow-primary/5 bg-card/80 backdrop-blur-md border-border"
                      : "border-l-transparent bg-card/40 backdrop-blur-md border-border/60 hover:bg-card/70 hover:border-border"
                  }`}
                >
                  <button
                    type="button"
                    id={`faq-btn-${idx}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:px-6 flex items-center justify-between text-left font-bold text-base sm:text-lg gap-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-t-2xl"
                  >
                    <span className={isOpen ? "text-primary" : "text-foreground"}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isOpen
                          ? "bg-primary/20 text-primary shadow-sm"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
                    </motion.div>
                  </button>

                  {/* Animated panel using AnimatePresence for clean mount/unmount */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm md:text-base text-muted-foreground leading-relaxed pt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
