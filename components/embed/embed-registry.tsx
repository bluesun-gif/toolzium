"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[300px] p-8">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>
);

export const EMBED_REGISTRY: Record<
  string,
  React.ComponentType<any>
> = {
  "academic/citation-generator": dynamic(
    () => import("@/components/tools/academic/citation-generator-client"),
    { loading: LoadingSpinner }
  ),
  "academic/essay-conclusion-generator": dynamic(
    () => import("@/components/tools/academic/essay-conclusion-generator-client"),
    { loading: LoadingSpinner }
  ),
  "academic/flashcard-creator": dynamic(
    () => import("@/components/tools/academic/flashcard-creator-client"),
    { loading: LoadingSpinner }
  ),
  "academic/literature-summarizer": dynamic(
    () => import("@/components/tools/academic/literature-summarizer-client"),
    { loading: LoadingSpinner }
  ),
  "academic/thesis-generator": dynamic(
    () => import("@/components/tools/academic/thesis-generator-client"),
    { loading: LoadingSpinner }
  ),
  "ai/ats-checker": dynamic(
    () => import("@/components/tools/ai/ats-checker-client"),
    { loading: LoadingSpinner }
  ),
  "ai/code-explainer": dynamic(
    () => import("@/components/tools/ai/code-explainer-client"),
    { loading: LoadingSpinner }
  ),
  "ai/pdf-chat": dynamic(
    () => import("@/components/tools/ai/pdf-chat-client"),
    { loading: LoadingSpinner }
  ),
  "ai/product-description": dynamic(
    () => import("@/components/tools/ai/product-description-client"),
    { loading: LoadingSpinner }
  ),
  "ai/prompt-optimizer": dynamic(
    () => import("@/components/tools/ai/prompt-optimizer-client"),
    { loading: LoadingSpinner }
  ),
  "ai/social-bio": dynamic(
    () => import("@/components/tools/ai/social-bio-client"),
    { loading: LoadingSpinner }
  ),
  "ai/sql-regex-builder": dynamic(
    () => import("@/components/tools/ai/sql-regex-builder-client"),
    { loading: LoadingSpinner }
  ),
  "ai/startup-name": dynamic(
    () => import("@/components/tools/ai/startup-name-client"),
    { loading: LoadingSpinner }
  ),
  "ai/youtube-script": dynamic(
    () => import("@/components/tools/ai/youtube-script-client"),
    { loading: LoadingSpinner }
  ),
  "calc/aspect-ratio": dynamic(
    () => import("@/components/tools/calc/aspect-ratio-client"),
    { loading: LoadingSpinner }
  ),
  "calc/bmi": dynamic(
    () => import("@/components/tools/calc/bmi-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/bmi-calculator": dynamic(
    () => import("@/components/tools/calc/bmi-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/cgpa": dynamic(
    () => import("@/components/tools/calc/cgpa-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/currency": dynamic(
    () => import("@/components/tools/calc/currency-converter-client"),
    { loading: LoadingSpinner }
  ),
  "calc/date-diff": dynamic(
    () => import("@/components/tools/calc/date-difference-client"),
    { loading: LoadingSpinner }
  ),
  "calc/discount": dynamic(
    () => import("@/components/tools/calc/discount-finder-client"),
    { loading: LoadingSpinner }
  ),
  "calc/emi": dynamic(
    () => import("@/components/tools/calc/emi-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/gpa": dynamic(
    () => import("@/components/tools/calc/cgpa-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/number-words": dynamic(
    () => import("@/components/tools/calc/number-words-client"),
    { loading: LoadingSpinner }
  ),
  "calc/percentage": dynamic(
    () => import("@/components/tools/calc/percentage-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/percentage-calculator": dynamic(
    () => import("@/components/tools/calc/percentage-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/scientific": dynamic(
    () => import("@/components/tools/calc/scientific-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/standard": dynamic(
    () => import("@/components/tools/calc/standard-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "calc/tip-split": dynamic(
    () => import("@/components/tools/calc/tip-splitter-client"),
    { loading: LoadingSpinner }
  ),
  "calc/unit-converter": dynamic(
    () => import("@/components/tools/calc/unit-converter-client"),
    { loading: LoadingSpinner }
  ),
  "calc/video-ratio": dynamic(
    () => import("@/components/tools/calc/video-ratio-client"),
    { loading: LoadingSpinner }
  ),
  "dev/api-status": dynamic(
    () => import("@/components/tools/dev/api-status-client"),
    { loading: LoadingSpinner }
  ),
  "dev/api-tester": dynamic(
    () => import("@/components/tools/dev/api-tester-client"),
    { loading: LoadingSpinner }
  ),
  "dev/base-converter": dynamic(
    () => import("@/components/tools/dev/base-converter-client"),
    { loading: LoadingSpinner }
  ),
  "dev/box-shadow": dynamic(
    () => import("@/components/tools/dev/box-shadow-client"),
    { loading: LoadingSpinner }
  ),
  "dev/box-shadow-generator": dynamic(
    () => import("@/components/tools/dev/box-shadow-generator-client"),
    { loading: LoadingSpinner }
  ),
  "dev/code-auditor": dynamic(
    () => import("@/components/tools/dev/code-auditor-client"),
    { loading: LoadingSpinner }
  ),
  "dev/code-minifier": dynamic(
    () => import("@/components/tools/dev/code-minifier-client"),
    { loading: LoadingSpinner }
  ),
  "dev/color-blindness": dynamic(
    () => import("@/components/tools/dev/color-blindness-client"),
    { loading: LoadingSpinner }
  ),
  "dev/color-converter": dynamic(
    () => import("@/components/tools/dev/color-converter-client"),
    { loading: LoadingSpinner }
  ),
  "dev/color-palette": dynamic(
    () => import("@/components/tools/dev/color-palette-client"),
    { loading: LoadingSpinner }
  ),
  "dev/color-picker": dynamic(
    () => import("@/components/tools/dev/color-picker-client"),
    { loading: LoadingSpinner }
  ),
  "dev/cron-explainer": dynamic(
    () => import("@/components/tools/dev/cron-explainer-client"),
    { loading: LoadingSpinner }
  ),
  "dev/cron-generator": dynamic(
    () => import("@/components/tools/dev/cron-generator-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-animation": dynamic(
    () => import("@/components/tools/dev/css-animation-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-clippath": dynamic(
    () => import("@/components/tools/dev/css-clippath-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-filters": dynamic(
    () => import("@/components/tools/dev/css-filters-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-flexbox-builder": dynamic(
    () => import("@/components/tools/dev/css-flexbox-builder-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-glassmorphism": dynamic(
    () => import("@/components/tools/dev/css-glassmorphism-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-grid": dynamic(
    () => import("@/components/tools/dev/css-grid-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-grid-builder": dynamic(
    () => import("@/components/tools/dev/css-grid-builder-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-keyframes": dynamic(
    () => import("@/components/tools/dev/css-keyframes-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-keyframes-builder": dynamic(
    () => import("@/components/tools/dev/css-keyframes-builder-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-keyframes-speed": dynamic(
    () => import("@/components/tools/dev/css-keyframes-speed-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-keyframes-stack": dynamic(
    () => import("@/components/tools/dev/css-keyframes-stack-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-radius": dynamic(
    () => import("@/components/tools/dev/css-radius-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-shadow": dynamic(
    () => import("@/components/tools/dev/css-shadow-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-transform": dynamic(
    () => import("@/components/tools/dev/css-transform-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-transform-2d": dynamic(
    () => import("@/components/tools/dev/css-transform-2d-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-transform-3d": dynamic(
    () => import("@/components/tools/dev/css-transform-3d-client"),
    { loading: LoadingSpinner }
  ),
  "dev/css-typography": dynamic(
    () => import("@/components/tools/dev/css-typography-client"),
    { loading: LoadingSpinner }
  ),
  "dev/csv-json": dynamic(
    () => import("@/components/tools/dev/csv-json-client"),
    { loading: LoadingSpinner }
  ),
  "dev/curl-converter": dynamic(
    () => import("@/components/tools/dev/curl-converter-client"),
    { loading: LoadingSpinner }
  ),
  "dev/diff-checker": dynamic(
    () => import("@/components/tools/dev/diff-checker-client"),
    { loading: LoadingSpinner }
  ),
  "dev/env-editor": dynamic(
    () => import("@/components/tools/dev/env-editor-client"),
    { loading: LoadingSpinner }
  ),
  "dev/env-scanner": dynamic(
    () => import("@/components/tools/dev/env-scanner-client"),
    { loading: LoadingSpinner }
  ),
  "dev/flexbox-generator": dynamic(
    () => import("@/components/tools/dev/flexbox-generator-client"),
    { loading: LoadingSpinner }
  ),
  "dev/flexbox-playground": dynamic(
    () => import("@/components/tools/dev/flexbox-playground-client"),
    { loading: LoadingSpinner }
  ),
  "dev/gradient-generator": dynamic(
    () => import("@/components/tools/dev/gradient-generator-client"),
    { loading: LoadingSpinner }
  ),
  "dev/hash-generator": dynamic(
    () => import("@/components/tools/dev/hash-generator-client"),
    { loading: LoadingSpinner }
  ),
  "dev/html-entities": dynamic(
    () => import("@/components/tools/dev/html-entities-client"),
    { loading: LoadingSpinner }
  ),
  "dev/html-markdown": dynamic(
    () => import("@/components/tools/dev/html-markdown-client"),
    { loading: LoadingSpinner }
  ),
  "dev/http-status": dynamic(
    () => import("@/components/tools/dev/http-status-client"),
    { loading: LoadingSpinner }
  ),
  "dev/json-csv": dynamic(
    () => import("@/components/tools/dev/json-csv-client"),
    { loading: LoadingSpinner }
  ),
  "dev/json-formatter": dynamic(
    () => import("@/components/tools/dev/json-formatter-client"),
    { loading: LoadingSpinner }
  ),
  "dev/json-schema": dynamic(
    () => import("@/components/tools/dev/json-schema-client"),
    { loading: LoadingSpinner }
  ),
  "dev/json-to-typescript": dynamic(
    () => import("@/components/tools/dev/json-to-typescript-client"),
    { loading: LoadingSpinner }
  ),
  "dev/jwt-decode": dynamic(
    () => import("@/components/tools/dev/jwt-decoder-client"),
    { loading: LoadingSpinner }
  ),
  "dev/jwt-inspector": dynamic(
    () => import("@/components/tools/dev/jwt-inspector-client"),
    { loading: LoadingSpinner }
  ),
  "dev/keycode-info": dynamic(
    () => import("@/components/tools/dev/keycode-info-client"),
    { loading: LoadingSpinner }
  ),
  "dev/lorem-ipsum": dynamic(
    () => import("@/components/tools/dev/lorem-ipsum-client"),
    { loading: LoadingSpinner }
  ),
  "dev/markdown-editor": dynamic(
    () => import("@/components/tools/dev/markdown-editor-client"),
    { loading: LoadingSpinner }
  ),
  "dev/markdown-previewer": dynamic(
    () => import("@/components/tools/dev/markdown-previewer-client"),
    { loading: LoadingSpinner }
  ),
  "dev/mesh-gradient": dynamic(
    () => import("@/components/tools/dev/mesh-gradient-client"),
    { loading: LoadingSpinner }
  ),
  "dev/password-generator": dynamic(
    () => import("@/components/tools/dev/password-generator-client"),
    { loading: LoadingSpinner }
  ),
  "dev/regex-cheatsheet": dynamic(
    () => import("@/components/tools/dev/regex-cheatsheet-client"),
    { loading: LoadingSpinner }
  ),
  "dev/regex-explainer": dynamic(
    () => import("@/components/tools/dev/regex-explainer-client"),
    { loading: LoadingSpinner }
  ),
  "dev/regex-library": dynamic(
    () => import("@/components/tools/dev/regex-library-client"),
    { loading: LoadingSpinner }
  ),
  "dev/regex-tester": dynamic(
    () => import("@/components/tools/dev/regex-tester-client"),
    { loading: LoadingSpinner }
  ),
  "dev/sql-formatter": dynamic(
    () => import("@/components/tools/dev/sql-formatter-client"),
    { loading: LoadingSpinner }
  ),
  "dev/sql-to-prisma": dynamic(
    () => import("@/components/tools/dev/sql-to-prisma-client"),
    { loading: LoadingSpinner }
  ),
  "dev/string-escape": dynamic(
    () => import("@/components/tools/dev/string-escape-client"),
    { loading: LoadingSpinner }
  ),
  "dev/svg-optimizer": dynamic(
    () => import("@/components/tools/dev/svg-optimizer-client"),
    { loading: LoadingSpinner }
  ),
  "dev/timestamp-converter": dynamic(
    () => import("@/components/tools/dev/timestamp-converter-client"),
    { loading: LoadingSpinner }
  ),
  "dev/ua-parser": dynamic(
    () => import("@/components/tools/dev/ua-parser-client"),
    { loading: LoadingSpinner }
  ),
  "dev/uuid-nanoid": dynamic(
    () => import("@/components/tools/dev/uuid-nanoid-client"),
    { loading: LoadingSpinner }
  ),
  "dev/yaml-json": dynamic(
    () => import("@/components/tools/dev/yaml-json-client"),
    { loading: LoadingSpinner }
  ),
  "finance/auto-loan-calculator": dynamic(
    () => import("@/components/tools/finance/auto-loan-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "finance/budget-50-30-20": dynamic(
    () => import("@/components/tools/finance/budget-50-30-20-client"),
    { loading: LoadingSpinner }
  ),
  "finance/budget-template": dynamic(
    () => import("@/components/tools/finance/budget-template-client"),
    { loading: LoadingSpinner }
  ),
  "finance/cap-rate-calculator": dynamic(
    () => import("@/components/tools/finance/cap-rate-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "finance/compound-growth": dynamic(
    () => import("@/components/tools/finance/compound-growth-client"),
    { loading: LoadingSpinner }
  ),
  "finance/compound-interest": dynamic(
    () => import("@/components/tools/finance/compound-interest-client"),
    { loading: LoadingSpinner }
  ),
  "finance/credit-payoff": dynamic(
    () => import("@/components/tools/finance/credit-payoff-client"),
    { loading: LoadingSpinner }
  ),
  "finance/crypto-dca-calc": dynamic(
    () => import("@/components/tools/finance/crypto-dca-client"),
    { loading: LoadingSpinner }
  ),
  "finance/crypto-profit": dynamic(
    () => import("@/components/tools/finance/crypto-profit-client"),
    { loading: LoadingSpinner }
  ),
  "finance/currency-chart": dynamic(
    () => import("@/components/tools/finance/currency-chart-client"),
    { loading: LoadingSpinner }
  ),
  "finance/currency-slang": dynamic(
    () => import("@/components/tools/finance/currency-slang-client"),
    { loading: LoadingSpinner }
  ),
  "finance/debt-payoff": dynamic(
    () => import("@/components/tools/finance/debt-payoff-client"),
    { loading: LoadingSpinner }
  ),
  "finance/debt-payoff-planner": dynamic(
    () => import("@/components/tools/finance/debt-payoff-planner-client"),
    { loading: LoadingSpinner }
  ),
  "finance/dti-calculator": dynamic(
    () => import("@/components/tools/finance/dti-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "finance/electricity-cost": dynamic(
    () => import("@/components/tools/finance/electricity-cost-client"),
    { loading: LoadingSpinner }
  ),
  "finance/emergency-fund": dynamic(
    () => import("@/components/tools/finance/emergency-fund-client"),
    { loading: LoadingSpinner }
  ),
  "finance/emergency-fund-planner": dynamic(
    () => import("@/components/tools/finance/emergency-fund-planner-client"),
    { loading: LoadingSpinner }
  ),
  "finance/emergency-goal-calc": dynamic(
    () => import("@/components/tools/finance/emergency-goal-calc-client"),
    { loading: LoadingSpinner }
  ),
  "finance/emergency-loan": dynamic(
    () => import("@/components/tools/finance/emergency-loan-client"),
    { loading: LoadingSpinner }
  ),
  "finance/expense-categories": dynamic(
    () => import("@/components/tools/finance/expense-categories-client"),
    { loading: LoadingSpinner }
  ),
  "finance/expense-splitter": dynamic(
    () => import("@/components/tools/finance/expense-splitter-client"),
    { loading: LoadingSpinner }
  ),
  "finance/fire-calc": dynamic(
    () => import("@/components/tools/finance/fire-calc-client"),
    { loading: LoadingSpinner }
  ),
  "finance/freelance-rate": dynamic(
    () => import("@/components/tools/finance/freelance-rate-client"),
    { loading: LoadingSpinner }
  ),
  "finance/freelance-rate-calc": dynamic(
    () => import("@/components/tools/finance/freelance-rate-calc-client"),
    { loading: LoadingSpinner }
  ),
  "finance/freelance-tax-calc": dynamic(
    () => import("@/components/tools/finance/freelance-tax-calc-client"),
    { loading: LoadingSpinner }
  ),
  "finance/gold-price-tracker": dynamic(
    () => import("@/components/tools/finance/gold-price-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "finance/heloc-calculator": dynamic(
    () => import("@/components/tools/finance/heloc-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "finance/interest-compare": dynamic(
    () => import("@/components/tools/finance/interest-compare-client"),
    { loading: LoadingSpinner }
  ),
  "finance/investment-return": dynamic(
    () => import("@/components/tools/finance/investment-return-client"),
    { loading: LoadingSpinner }
  ),
  "finance/invoice-tracker": dynamic(
    () => import("@/components/tools/finance/invoice-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "finance/loan-amortization": dynamic(
    () => import("@/components/tools/finance/loan-amortization-client"),
    { loading: LoadingSpinner }
  ),
  "finance/loan-comparison": dynamic(
    () => import("@/components/tools/finance/loan-comparison-client"),
    { loading: LoadingSpinner }
  ),
  "finance/ltv-calculator": dynamic(
    () => import("@/components/tools/finance/ltv-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "finance/mortgage": dynamic(
    () => import("@/components/tools/finance/mortgage-client"),
    { loading: LoadingSpinner }
  ),
  "finance/mrr-churn-calc": dynamic(
    () => import("@/components/tools/finance/mrr-churn-client"),
    { loading: LoadingSpinner }
  ),
  "finance/net-pay-calc": dynamic(
    () => import("@/components/tools/finance/net-pay-calc-client"),
    { loading: LoadingSpinner }
  ),
  "finance/net-salary": dynamic(
    () => import("@/components/tools/finance/net-salary-client"),
    { loading: LoadingSpinner }
  ),
  "finance/net-worth": dynamic(
    () => import("@/components/tools/finance/net-worth-client"),
    { loading: LoadingSpinner }
  ),
  "finance/paycheck": dynamic(
    () => import("@/components/tools/finance/paycheck-client"),
    { loading: LoadingSpinner }
  ),
  "finance/paycheck-deductions": dynamic(
    () => import("@/components/tools/finance/paycheck-deductions-client"),
    { loading: LoadingSpinner }
  ),
  "finance/rate-converter": dynamic(
    () => import("@/components/tools/finance/rate-converter-client"),
    { loading: LoadingSpinner }
  ),
  "finance/retirement": dynamic(
    () => import("@/components/tools/finance/retirement-client"),
    { loading: LoadingSpinner }
  ),
  "finance/roas-calculator": dynamic(
    () => import("@/components/tools/finance/roas-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "finance/saas-pricing-calculator": dynamic(
    () => import("@/components/tools/finance/saas-pricing-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "finance/salary-hourly": dynamic(
    () => import("@/components/tools/finance/salary-hourly-client"),
    { loading: LoadingSpinner }
  ),
  "finance/savings-goal": dynamic(
    () => import("@/components/tools/finance/savings-goal-client"),
    { loading: LoadingSpinner }
  ),
  "finance/savings-spending": dynamic(
    () => import("@/components/tools/finance/savings-spending-client"),
    { loading: LoadingSpinner }
  ),
  "finance/startup-runway-calc": dynamic(
    () => import("@/components/tools/finance/startup-runway-calc-client"),
    { loading: LoadingSpinner }
  ),
  "finance/subscriptions": dynamic(
    () => import("@/components/tools/finance/subscriptions-client"),
    { loading: LoadingSpinner }
  ),
  "finance/tax-bracket": dynamic(
    () => import("@/components/tools/finance/tax-bracket-client"),
    { loading: LoadingSpinner }
  ),
  "finance/tax-withholding": dynamic(
    () => import("@/components/tools/finance/tax-withholding-client"),
    { loading: LoadingSpinner }
  ),
  "finance/tax-withholding-calc": dynamic(
    () => import("@/components/tools/finance/tax-withholding-calc-client"),
    { loading: LoadingSpinner }
  ),
  "finance/vat": dynamic(
    () => import("@/components/tools/finance/vat-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "fun/anagram-solver": dynamic(
    () => import("@/components/tools/fun/anagram-solver-client"),
    { loading: LoadingSpinner }
  ),
  "fun/animal-quiz": dynamic(
    () => import("@/components/tools/fun/animal-quiz-client"),
    { loading: LoadingSpinner }
  ),
  "fun/ascii-art": dynamic(
    () => import("@/components/tools/fun/ascii-art-client"),
    { loading: LoadingSpinner }
  ),
  "fun/color-memory": dynamic(
    () => import("@/components/tools/fun/color-memory-client"),
    { loading: LoadingSpinner }
  ),
  "fun/compound-words": dynamic(
    () => import("@/components/tools/fun/compound-words-client"),
    { loading: LoadingSpinner }
  ),
  "fun/connect4-ai": dynamic(
    () => import("@/components/tools/fun/connect4-ai-client"),
    { loading: LoadingSpinner }
  ),
  "fun/dice-probability": dynamic(
    () => import("@/components/tools/fun/dice-probability-client"),
    { loading: LoadingSpinner }
  ),
  "fun/dice-roller": dynamic(
    () => import("@/components/tools/fun/dice-roller-client"),
    { loading: LoadingSpinner }
  ),
  "fun/emoji-story": dynamic(
    () => import("@/components/tools/fun/emoji-story-client"),
    { loading: LoadingSpinner }
  ),
  "fun/hangman": dynamic(
    () => import("@/components/tools/fun/hangman-client"),
    { loading: LoadingSpinner }
  ),
  "fun/love-calculator": dynamic(
    () => import("@/components/tools/fun/love-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "fun/magic-8-ball": dynamic(
    () => import("@/components/tools/fun/magic-8-ball-client"),
    { loading: LoadingSpinner }
  ),
  "fun/memory-card-match": dynamic(
    () => import("@/components/tools/fun/memory-card-match-client"),
    { loading: LoadingSpinner }
  ),
  "fun/memory-grid-flip": dynamic(
    () => import("@/components/tools/fun/memory-grid-flip-client"),
    { loading: LoadingSpinner }
  ),
  "fun/memory-match": dynamic(
    () => import("@/components/tools/fun/memory-match-client"),
    { loading: LoadingSpinner }
  ),
  "fun/memory-sequence": dynamic(
    () => import("@/components/tools/fun/memory-sequence-client"),
    { loading: LoadingSpinner }
  ),
  "fun/morse-audio": dynamic(
    () => import("@/components/tools/fun/morse-audio-client"),
    { loading: LoadingSpinner }
  ),
  "fun/name-generator": dynamic(
    () => import("@/components/tools/fun/name-generator-client"),
    { loading: LoadingSpinner }
  ),
  "fun/number-guess": dynamic(
    () => import("@/components/tools/fun/number-guess-client"),
    { loading: LoadingSpinner }
  ),
  "fun/pattern-memory": dynamic(
    () => import("@/components/tools/fun/pattern-memory-client"),
    { loading: LoadingSpinner }
  ),
  "fun/pattern-tile-memory": dynamic(
    () => import("@/components/tools/fun/pattern-tile-memory-client"),
    { loading: LoadingSpinner }
  ),
  "fun/quote-generator": dynamic(
    () => import("@/components/tools/fun/quote-generator-client"),
    { loading: LoadingSpinner }
  ),
  "fun/reaction-time": dynamic(
    () => import("@/components/tools/fun/reaction-time-client"),
    { loading: LoadingSpinner }
  ),
  "fun/rps": dynamic(
    () => import("@/components/tools/fun/rps-client"),
    { loading: LoadingSpinner }
  ),
  "fun/simon-says": dynamic(
    () => import("@/components/tools/fun/simon-says-client"),
    { loading: LoadingSpinner }
  ),
  "fun/sudoku": dynamic(
    () => import("@/components/tools/fun/sudoku-client"),
    { loading: LoadingSpinner }
  ),
  "fun/sudoku-unlimited": dynamic(
    () => import("@/components/tools/fun/sudoku-unlimited-client"),
    { loading: LoadingSpinner }
  ),
  "fun/tic-tac-toe": dynamic(
    () => import("@/components/tools/fun/tic-tac-toe-client"),
    { loading: LoadingSpinner }
  ),
  "fun/tictactoe-ai": dynamic(
    () => import("@/components/tools/fun/tictactoe-ai-client"),
    { loading: LoadingSpinner }
  ),
  "fun/trivia": dynamic(
    () => import("@/components/tools/fun/trivia-client"),
    { loading: LoadingSpinner }
  ),
  "fun/truth-or-dare": dynamic(
    () => import("@/components/tools/fun/truth-or-dare-client"),
    { loading: LoadingSpinner }
  ),
  "fun/two-truths": dynamic(
    () => import("@/components/tools/fun/two-truths-client"),
    { loading: LoadingSpinner }
  ),
  "fun/typing-challenge": dynamic(
    () => import("@/components/tools/fun/typing-challenge-client"),
    { loading: LoadingSpinner }
  ),
  "fun/word-association": dynamic(
    () => import("@/components/tools/fun/word-association-client"),
    { loading: LoadingSpinner }
  ),
  "fun/word-scramble": dynamic(
    () => import("@/components/tools/fun/word-scramble-client"),
    { loading: LoadingSpinner }
  ),
  "fun/word-search": dynamic(
    () => import("@/components/tools/fun/word-search-client"),
    { loading: LoadingSpinner }
  ),
  "fun/wordle": dynamic(
    () => import("@/components/tools/fun/wordle-client"),
    { loading: LoadingSpinner }
  ),
  "fun/wordle-6letter": dynamic(
    () => import("@/components/tools/fun/wordle-6letter-client"),
    { loading: LoadingSpinner }
  ),
  "fun/wordle-unlimited": dynamic(
    () => import("@/components/tools/fun/wordle-unlimited-client"),
    { loading: LoadingSpinner }
  ),
  "fun/would-you-rather": dynamic(
    () => import("@/components/tools/fun/would-you-rather-client"),
    { loading: LoadingSpinner }
  ),
  "fun/zodiac": dynamic(
    () => import("@/components/tools/fun/zodiac-client"),
    { loading: LoadingSpinner }
  ),
  "gaming/free-fire-name-generator": dynamic(
    () => import("@/components/tools/gaming/free-fire-name-client"),
    { loading: LoadingSpinner }
  ),
  "gaming/gta-name-generator": dynamic(
    () => import("@/components/tools/gaming/gta-name-client"),
    { loading: LoadingSpinner }
  ),
  "gaming/minecraft-seed-namer": dynamic(
    () => import("@/components/tools/gaming/minecraft-seed-client"),
    { loading: LoadingSpinner }
  ),
  "gaming/mlbb-name-generator": dynamic(
    () => import("@/components/tools/gaming/mlbb-name-client"),
    { loading: LoadingSpinner }
  ),
  "gaming/roblox-username-generator": dynamic(
    () => import("@/components/tools/gaming/roblox-username-client"),
    { loading: LoadingSpinner }
  ),
  "gaming/steam-bio-generator": dynamic(
    () => import("@/components/tools/gaming/steam-bio-client"),
    { loading: LoadingSpinner }
  ),
  "gaming/valorant-crosshair": dynamic(
    () => import("@/components/tools/gaming/valorant-crosshair-client"),
    { loading: LoadingSpinner }
  ),
  "health/ai-bmr-calculator": dynamic(
    () => import("@/components/tools/health/ai-bmr-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "health/ai-calorie-deficit": dynamic(
    () => import("@/components/tools/health/ai-calorie-deficit-client"),
    { loading: LoadingSpinner }
  ),
  "health/ai-meal-planner": dynamic(
    () => import("@/components/tools/health/ai-meal-planner-client"),
    { loading: LoadingSpinner }
  ),
  "health/ai-workout-generator": dynamic(
    () => import("@/components/tools/health/ai-workout-generator-client"),
    { loading: LoadingSpinner }
  ),
  "health/allergy-tracker": dynamic(
    () => import("@/components/tools/health/allergy-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "health/blood-pressure": dynamic(
    () => import("@/components/tools/health/blood-pressure-client"),
    { loading: LoadingSpinner }
  ),
  "health/blood-sugar": dynamic(
    () => import("@/components/tools/health/blood-sugar-client"),
    { loading: LoadingSpinner }
  ),
  "health/blood-type": dynamic(
    () => import("@/components/tools/health/blood-type-client"),
    { loading: LoadingSpinner }
  ),
  "health/bmr-calculator": dynamic(
    () => import("@/components/tools/health/bmr-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "health/body-fat": dynamic(
    () => import("@/components/tools/health/body-fat-client"),
    { loading: LoadingSpinner }
  ),
  "health/calorie-activity": dynamic(
    () => import("@/components/tools/health/calorie-activity-client"),
    { loading: LoadingSpinner }
  ),
  "health/calorie-burn": dynamic(
    () => import("@/components/tools/health/calorie-burn-client"),
    { loading: LoadingSpinner }
  ),
  "health/calorie-burn-activity": dynamic(
    () => import("@/components/tools/health/calorie-burn-activity-client"),
    { loading: LoadingSpinner }
  ),
  "health/calorie-calculator": dynamic(
    () => import("@/components/tools/health/calorie-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "health/calorie-deficit": dynamic(
    () => import("@/components/tools/health/calorie-deficit-client"),
    { loading: LoadingSpinner }
  ),
  "health/calorie-lookup": dynamic(
    () => import("@/components/tools/health/calorie-lookup-client"),
    { loading: LoadingSpinner }
  ),
  "health/cycling-calorie": dynamic(
    () => import("@/components/tools/health/cycling-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/due-date": dynamic(
    () => import("@/components/tools/health/due-date-client"),
    { loading: LoadingSpinner }
  ),
  "health/elliptical-calorie": dynamic(
    () => import("@/components/tools/health/elliptical-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/fasting-tracker": dynamic(
    () => import("@/components/tools/health/fasting-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "health/habit-score": dynamic(
    () => import("@/components/tools/health/habit-score-client"),
    { loading: LoadingSpinner }
  ),
  "health/heart-rate-zones": dynamic(
    () => import("@/components/tools/health/heart-rate-zones-client"),
    { loading: LoadingSpinner }
  ),
  "health/hiking-calorie": dynamic(
    () => import("@/components/tools/health/hiking-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/hydration": dynamic(
    () => import("@/components/tools/health/hydration-client"),
    { loading: LoadingSpinner }
  ),
  "health/hydration-tracker": dynamic(
    () => import("@/components/tools/health/hydration-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "health/ideal-weight": dynamic(
    () => import("@/components/tools/health/ideal-weight-client"),
    { loading: LoadingSpinner }
  ),
  "health/indoor-cycling-calorie": dynamic(
    () => import("@/components/tools/health/indoor-cycling-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/jumprope-calorie": dynamic(
    () => import("@/components/tools/health/jumprope-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/macro-calculator": dynamic(
    () => import("@/components/tools/health/macro-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "health/meal-planner": dynamic(
    () => import("@/components/tools/health/meal-planner-client"),
    { loading: LoadingSpinner }
  ),
  "health/meditation-timer": dynamic(
    () => import("@/components/tools/health/meditation-timer-client"),
    { loading: LoadingSpinner }
  ),
  "health/nutrition-label": dynamic(
    () => import("@/components/tools/health/nutrition-label-client"),
    { loading: LoadingSpinner }
  ),
  "health/pace-calorie": dynamic(
    () => import("@/components/tools/health/pace-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/pregnancy-tracker": dynamic(
    () => import("@/components/tools/health/pregnancy-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "health/protein-calc": dynamic(
    () => import("@/components/tools/health/protein-calc-client"),
    { loading: LoadingSpinner }
  ),
  "health/recumbent-bike-calorie": dynamic(
    () => import("@/components/tools/health/recumbent-bike-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/rowing-calorie": dynamic(
    () => import("@/components/tools/health/rowing-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/screen-time": dynamic(
    () => import("@/components/tools/health/screen-time-client"),
    { loading: LoadingSpinner }
  ),
  "health/sleep-calculator": dynamic(
    () => import("@/components/tools/health/sleep-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "health/sleep-planner": dynamic(
    () => import("@/components/tools/health/sleep-planner-client"),
    { loading: LoadingSpinner }
  ),
  "health/sleep-quality": dynamic(
    () => import("@/components/tools/health/sleep-quality-client"),
    { loading: LoadingSpinner }
  ),
  "health/stair-climbing-calorie": dynamic(
    () => import("@/components/tools/health/stair-climbing-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/stair-stepper-calorie": dynamic(
    () => import("@/components/tools/health/stair-stepper-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/step-counter": dynamic(
    () => import("@/components/tools/health/step-counter-client"),
    { loading: LoadingSpinner }
  ),
  "health/swimming-calorie": dynamic(
    () => import("@/components/tools/health/swimming-calorie-client"),
    { loading: LoadingSpinner }
  ),
  "health/symptom-diary": dynamic(
    () => import("@/components/tools/health/symptom-diary-client"),
    { loading: LoadingSpinner }
  ),
  "health/vision-test": dynamic(
    () => import("@/components/tools/health/vision-test-client"),
    { loading: LoadingSpinner }
  ),
  "health/water-intake": dynamic(
    () => import("@/components/tools/health/water-intake-client"),
    { loading: LoadingSpinner }
  ),
  "health/workout-timer": dynamic(
    () => import("@/components/tools/health/workout-timer-client"),
    { loading: LoadingSpinner }
  ),
  "image/annotator": dynamic(
    () => import("@/components/tools/image/annotator-client"),
    { loading: LoadingSpinner }
  ),
  "image/aspect-cropper": dynamic(
    () => import("@/components/tools/image/aspect-cropper-client"),
    { loading: LoadingSpinner }
  ),
  "image/aspect-ratio": dynamic(
    () => import("@/components/tools/image/aspect-ratio-client"),
    { loading: LoadingSpinner }
  ),
  "image/bg-remove": dynamic(
    () => import("@/components/tools/image/bg-remove-client"),
    { loading: LoadingSpinner }
  ),
  "image/blur-image": dynamic(
    () => import("@/components/tools/image/blur-image-client"),
    { loading: LoadingSpinner }
  ),
  "image/collage-layout": dynamic(
    () => import("@/components/tools/image/collage-layout-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-blind-palette": dynamic(
    () => import("@/components/tools/image/color-blind-palette-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-contrast-checker": dynamic(
    () => import("@/components/tools/image/color-contrast-checker-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-contrast-extractor": dynamic(
    () => import("@/components/tools/image/color-contrast-extractor-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-extractor": dynamic(
    () => import("@/components/tools/image/color-extractor-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-harmony": dynamic(
    () => import("@/components/tools/image/color-harmony-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-matrix": dynamic(
    () => import("@/components/tools/image/color-matrix-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-name": dynamic(
    () => import("@/components/tools/image/color-name-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-palette-export": dynamic(
    () => import("@/components/tools/image/color-palette-export-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-swapper": dynamic(
    () => import("@/components/tools/image/color-swapper-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-swatch": dynamic(
    () => import("@/components/tools/image/color-swatch-client"),
    { loading: LoadingSpinner }
  ),
  "image/color-threshold": dynamic(
    () => import("@/components/tools/image/color-threshold-client"),
    { loading: LoadingSpinner }
  ),
  "image/compress": dynamic(
    () => import("@/components/tools/image/image-compress-client"),
    { loading: LoadingSpinner }
  ),
  "image/contrast-compliance-sheet": dynamic(
    () => import("@/components/tools/image/contrast-compliance-sheet-client"),
    { loading: LoadingSpinner }
  ),
  "image/contrast-matrix-export": dynamic(
    () => import("@/components/tools/image/contrast-matrix-export-client"),
    { loading: LoadingSpinner }
  ),
  "image/contrast-matrix-sheet": dynamic(
    () => import("@/components/tools/image/contrast-matrix-sheet-client"),
    { loading: LoadingSpinner }
  ),
  "image/contrast-sheet-exporter": dynamic(
    () => import("@/components/tools/image/contrast-sheet-exporter-client"),
    { loading: LoadingSpinner }
  ),
  "image/contrast-table": dynamic(
    () => import("@/components/tools/image/contrast-table-client"),
    { loading: LoadingSpinner }
  ),
  "image/convert": dynamic(
    () => import("@/components/tools/image/image-convert-client"),
    { loading: LoadingSpinner }
  ),
  "image/exif-inspector": dynamic(
    () => import("@/components/tools/image/exif-inspector-client"),
    { loading: LoadingSpinner }
  ),
  "image/exif-viewer": dynamic(
    () => import("@/components/tools/image/exif-viewer-client"),
    { loading: LoadingSpinner }
  ),
  "image/favicon": dynamic(
    () => import("@/components/tools/image/favicon-client"),
    { loading: LoadingSpinner }
  ),
  "image/favicon-generator": dynamic(
    () => import("@/components/tools/image/favicon-generator-client"),
    { loading: LoadingSpinner }
  ),
  "image/font-pairing": dynamic(
    () => import("@/components/tools/image/font-pairing-client"),
    { loading: LoadingSpinner }
  ),
  "image/image-ascii": dynamic(
    () => import("@/components/tools/image/image-ascii-client"),
    { loading: LoadingSpinner }
  ),
  "image/image-resizer": dynamic(
    () => import("@/components/tools/image/image-resizer-client"),
    { loading: LoadingSpinner }
  ),
  "image/image-to-pdf": dynamic(
    () => import("@/components/tools/image/image-to-pdf-client"),
    { loading: LoadingSpinner }
  ),
  "image/image-to-text": dynamic(
    () => import("@/components/tools/image/image-to-text-client"),
    { loading: LoadingSpinner }
  ),
  "image/meme-generator": dynamic(
    () => import("@/components/tools/image/meme-generator-client"),
    { loading: LoadingSpinner }
  ),
  "image/metadata-cleaner": dynamic(
    () => import("@/components/tools/image/metadata-cleaner-client"),
    { loading: LoadingSpinner }
  ),
  "image/palette-extract": dynamic(
    () => import("@/components/tools/image/palette-extract-client"),
    { loading: LoadingSpinner }
  ),
  "image/photo-grid": dynamic(
    () => import("@/components/tools/image/photo-grid-client"),
    { loading: LoadingSpinner }
  ),
  "image/pixel-art": dynamic(
    () => import("@/components/tools/image/pixel-art-client"),
    { loading: LoadingSpinner }
  ),
  "image/placeholder-generator": dynamic(
    () => import("@/components/tools/image/placeholder-generator-client"),
    { loading: LoadingSpinner }
  ),
  "image/placeholder-image": dynamic(
    () => import("@/components/tools/image/placeholder-image-client"),
    { loading: LoadingSpinner }
  ),
  "image/resize": dynamic(
    () => import("@/components/tools/image/image-resize-client"),
    { loading: LoadingSpinner }
  ),
  "image/svg-path": dynamic(
    () => import("@/components/tools/image/svg-path-client"),
    { loading: LoadingSpinner }
  ),
  "image/svg-to-png": dynamic(
    () => import("@/components/tools/image/svg-to-png-client"),
    { loading: LoadingSpinner }
  ),
  "image/watermark": dynamic(
    () => import("@/components/tools/image/watermark-client"),
    { loading: LoadingSpinner }
  ),
  "image/watermark-creator": dynamic(
    () => import("@/components/tools/image/watermark-creator-client"),
    { loading: LoadingSpinner }
  ),
  "marketing/cold-email-generator": dynamic(
    () => import("@/components/tools/marketing/cold-email-generator-client"),
    { loading: LoadingSpinner }
  ),
  "marketing/ecommerce-copy-generator": dynamic(
    () => import("@/components/tools/marketing/ecommerce-copy-generator-client"),
    { loading: LoadingSpinner }
  ),
  "marketing/slogan-generator": dynamic(
    () => import("@/components/tools/marketing/slogan-generator-client"),
    { loading: LoadingSpinner }
  ),
  "network/bandwidth": dynamic(
    () => import("@/components/tools/network/bandwidth-client"),
    { loading: LoadingSpinner }
  ),
  "network/bandwidth-calc": dynamic(
    () => import("@/components/tools/network/bandwidth-calc-client"),
    { loading: LoadingSpinner }
  ),
  "network/cors-headers": dynamic(
    () => import("@/components/tools/network/cors-headers-client"),
    { loading: LoadingSpinner }
  ),
  "network/dns-generator": dynamic(
    () => import("@/components/tools/network/dns-generator-client"),
    { loading: LoadingSpinner }
  ),
  "network/dns-lookup": dynamic(
    () => import("@/components/tools/network/dns-lookup-client"),
    { loading: LoadingSpinner }
  ),
  "network/email-headers": dynamic(
    () => import("@/components/tools/network/email-headers-client"),
    { loading: LoadingSpinner }
  ),
  "network/http-headers": dynamic(
    () => import("@/components/tools/network/http-headers-client"),
    { loading: LoadingSpinner }
  ),
  "network/ip-lookup": dynamic(
    () => import("@/components/tools/network/ip-lookup-client"),
    { loading: LoadingSpinner }
  ),
  "network/mac-lookup": dynamic(
    () => import("@/components/tools/network/mac-lookup-client"),
    { loading: LoadingSpinner }
  ),
  "network/my-ip": dynamic(
    () => import("@/components/tools/network/my-ip-client"),
    { loading: LoadingSpinner }
  ),
  "network/port-reference": dynamic(
    () => import("@/components/tools/network/port-reference-client"),
    { loading: LoadingSpinner }
  ),
  "network/speed-converter": dynamic(
    () => import("@/components/tools/network/speed-converter-client"),
    { loading: LoadingSpinner }
  ),
  "network/ssl-checker": dynamic(
    () => import("@/components/tools/network/ssl-checker-client"),
    { loading: LoadingSpinner }
  ),
  "network/subdomain-finder": dynamic(
    () => import("@/components/tools/network/subdomain-finder-client"),
    { loading: LoadingSpinner }
  ),
  "network/subnet": dynamic(
    () => import("@/components/tools/network/subnet-client"),
    { loading: LoadingSpinner }
  ),
  "network/username-check": dynamic(
    () => import("@/components/tools/network/username-check-client"),
    { loading: LoadingSpinner }
  ),
  "network/web-resources": dynamic(
    () => import("@/components/tools/network/web-resources-client"),
    { loading: LoadingSpinner }
  ),
  "network/whois": dynamic(
    () => import("@/components/tools/network/whois-client"),
    { loading: LoadingSpinner }
  ),
  "network/wifi-qr": dynamic(
    () => import("@/components/tools/network/wifi-qr-client"),
    { loading: LoadingSpinner }
  ),
  "office/ai-contractor-agreement": dynamic(
    () => import("@/components/tools/office/ai-contractor-agreement-client"),
    { loading: LoadingSpinner }
  ),
  "office/ai-retainer-generator": dynamic(
    () => import("@/components/tools/office/ai-retainer-generator-client"),
    { loading: LoadingSpinner }
  ),
  "office/ai-sow-generator": dynamic(
    () => import("@/components/tools/office/ai-sow-generator-client"),
    { loading: LoadingSpinner }
  ),
  "office/bol-generator": dynamic(
    () => import("@/components/tools/office/bol-generator-client"),
    { loading: LoadingSpinner }
  ),
  "office/business-card": dynamic(
    () => import("@/components/tools/office/business-card-client"),
    { loading: LoadingSpinner }
  ),
  "office/commercial-invoice": dynamic(
    () => import("@/components/tools/office/commercial-invoice-client"),
    { loading: LoadingSpinner }
  ),
  "office/completion-letter": dynamic(
    () => import("@/components/tools/office/completion-letter-client"),
    { loading: LoadingSpinner }
  ),
  "office/consulting-agreement": dynamic(
    () => import("@/components/tools/office/consulting-agreement-client"),
    { loading: LoadingSpinner }
  ),
  "office/contract-template": dynamic(
    () => import("@/components/tools/office/contract-template-client"),
    { loading: LoadingSpinner }
  ),
  "office/contractor-agreement": dynamic(
    () => import("@/components/tools/office/contractor-agreement-client"),
    { loading: LoadingSpinner }
  ),
  "office/contractor-sow-builder": dynamic(
    () => import("@/components/tools/office/contractor-sow-builder-client"),
    { loading: LoadingSpinner }
  ),
  "office/cover-letter": dynamic(
    () => import("@/components/tools/office/cover-letter-client"),
    { loading: LoadingSpinner }
  ),
  "office/email-signature": dynamic(
    () => import("@/components/tools/office/email-signature-client"),
    { loading: LoadingSpinner }
  ),
  "office/expense-tracker": dynamic(
    () => import("@/components/tools/office/expense-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "office/file-renamer": dynamic(
    () => import("@/components/tools/office/file-renamer-client"),
    { loading: LoadingSpinner }
  ),
  "office/grocery-list": dynamic(
    () => import("@/components/tools/office/grocery-list-client"),
    { loading: LoadingSpinner }
  ),
  "office/invoice": dynamic(
    () => import("@/components/tools/office/commercial-invoice-client"),
    { loading: LoadingSpinner }
  ),
  "office/invoice-calc": dynamic(
    () => import("@/components/tools/office/invoice-calc-client"),
    { loading: LoadingSpinner }
  ),
  "office/invoice-number": dynamic(
    () => import("@/components/tools/office/invoice-number-client"),
    { loading: LoadingSpinner }
  ),
  "office/letter-template": dynamic(
    () => import("@/components/tools/office/letter-template-client"),
    { loading: LoadingSpinner }
  ),
  "office/meeting-cost": dynamic(
    () => import("@/components/tools/office/meeting-cost-client"),
    { loading: LoadingSpinner }
  ),
  "office/meeting-notes": dynamic(
    () => import("@/components/tools/office/meeting-notes-client"),
    { loading: LoadingSpinner }
  ),
  "office/msa-generator": dynamic(
    () => import("@/components/tools/office/msa-generator-client"),
    { loading: LoadingSpinner }
  ),
  "office/nda-builder": dynamic(
    () => import("@/components/tools/office/nda-builder-client"),
    { loading: LoadingSpinner }
  ),
  "office/nda-generator": dynamic(
    () => import("@/components/tools/office/nda-generator-client"),
    { loading: LoadingSpinner }
  ),
  "office/nda-scope-builder": dynamic(
    () => import("@/components/tools/office/nda-scope-builder-client"),
    { loading: LoadingSpinner }
  ),
  "office/packing-slip": dynamic(
    () => import("@/components/tools/office/packing-slip-client"),
    { loading: LoadingSpinner }
  ),
  "office/po-generator": dynamic(
    () => import("@/components/tools/office/po-generator-client"),
    { loading: LoadingSpinner }
  ),
  "office/proforma-invoice": dynamic(
    () => import("@/components/tools/office/proforma-invoice-client"),
    { loading: LoadingSpinner }
  ),
  "office/quote-generator": dynamic(
    () => import("@/components/tools/office/quote-generator-client"),
    { loading: LoadingSpinner }
  ),
  "office/receipt-scanner": dynamic(
    () => import("@/components/tools/office/receipt-scanner-client"),
    { loading: LoadingSpinner }
  ),
  "office/resume-analyzer": dynamic(
    () => import("@/components/tools/office/resume-analyzer-client"),
    { loading: LoadingSpinner }
  ),
  "office/retainer-agreement": dynamic(
    () => import("@/components/tools/office/retainer-agreement-client"),
    { loading: LoadingSpinner }
  ),
  "office/service-contract": dynamic(
    () => import("@/components/tools/office/service-contract-client"),
    { loading: LoadingSpinner }
  ),
  "office/sla-generator": dynamic(
    () => import("@/components/tools/office/sla-generator-client"),
    { loading: LoadingSpinner }
  ),
  "office/sop-builder": dynamic(
    () => import("@/components/tools/office/sop-builder-client"),
    { loading: LoadingSpinner }
  ),
  "office/sow-contractor-builder": dynamic(
    () => import("@/components/tools/office/sow-contractor-builder-client"),
    { loading: LoadingSpinner }
  ),
  "office/timesheet": dynamic(
    () => import("@/components/tools/office/timesheet-client"),
    { loading: LoadingSpinner }
  ),
  "office/todo": dynamic(
    () => import("@/components/tools/office/todo-offline-client"),
    { loading: LoadingSpinner }
  ),
  "pdf/compress": dynamic(
    () => import("@/components/tools/pdf/pdf-compress-client"),
    { loading: LoadingSpinner }
  ),
  "pdf/image-pdf": dynamic(
    () => import("@/components/tools/pdf/image-pdf-client"),
    { loading: LoadingSpinner }
  ),
  "pdf/merge": dynamic(
    () => import("@/components/tools/pdf/pdf-merge-client"),
    { loading: LoadingSpinner }
  ),
  "pdf/pdf-to-word": dynamic(
    () => import("@/components/tools/pdf/pdf-to-word-client"),
    { loading: LoadingSpinner }
  ),
  "pdf/protect": dynamic(
    () => import("@/components/tools/pdf/pdf-protect-client"),
    { loading: LoadingSpinner }
  ),
  "pdf/rotate": dynamic(
    () => import("@/components/tools/pdf/pdf-rotate-client"),
    { loading: LoadingSpinner }
  ),
  "pdf/sign-fill": dynamic(
    () => import("@/components/tools/pdf/pdf-sign-fill-client"),
    { loading: LoadingSpinner }
  ),
  "pdf/split": dynamic(
    () => import("@/components/tools/pdf/pdf-split-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/affirmations": dynamic(
    () => import("@/components/tools/productivity/affirmations-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/ai-action-items": dynamic(
    () => import("@/components/tools/productivity/ai-action-items-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/ai-meeting-summarizer": dynamic(
    () => import("@/components/tools/productivity/ai-meeting-summarizer-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/ai-risk-matrix": dynamic(
    () => import("@/components/tools/productivity/ai-risk-matrix-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/ai-status-report": dynamic(
    () => import("@/components/tools/productivity/ai-status-report-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/ambient-noise": dynamic(
    () => import("@/components/tools/productivity/ambient-noise-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/bookmarks": dynamic(
    () => import("@/components/tools/productivity/bookmarks-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/colored-kanban": dynamic(
    () => import("@/components/tools/productivity/colored-kanban-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/daily-priority-action-board": dynamic(
    () => import("@/components/tools/productivity/daily-priority-action-board-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/eisenhower-board": dynamic(
    () => import("@/components/tools/productivity/eisenhower-board-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/eisenhower-checklist": dynamic(
    () => import("@/components/tools/productivity/eisenhower-checklist-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/eisenhower-goals": dynamic(
    () => import("@/components/tools/productivity/eisenhower-goals-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/eisenhower-kanban": dynamic(
    () => import("@/components/tools/productivity/eisenhower-kanban-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/eisenhower-list": dynamic(
    () => import("@/components/tools/productivity/eisenhower-list-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/eisenhower-matrix": dynamic(
    () => import("@/components/tools/productivity/eisenhower-matrix-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/eisenhower-planner": dynamic(
    () => import("@/components/tools/productivity/eisenhower-planner-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/eisenhower-workspace": dynamic(
    () => import("@/components/tools/productivity/eisenhower-workspace-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/flashcards": dynamic(
    () => import("@/components/tools/productivity/flashcards-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/focus-timer": dynamic(
    () => import("@/components/tools/productivity/focus-timer-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/goals": dynamic(
    () => import("@/components/tools/productivity/goals-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/gratitude": dynamic(
    () => import("@/components/tools/productivity/gratitude-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/habit-planner": dynamic(
    () => import("@/components/tools/productivity/habit-planner-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/habit-tracker": dynamic(
    () => import("@/components/tools/productivity/habit-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/journal": dynamic(
    () => import("@/components/tools/productivity/journal-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/kanban": dynamic(
    () => import("@/components/tools/productivity/kanban-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/meal-prep": dynamic(
    () => import("@/components/tools/productivity/meal-prep-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/meeting-agenda": dynamic(
    () => import("@/components/tools/productivity/meeting-agenda-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/mind-map": dynamic(
    () => import("@/components/tools/productivity/mind-map-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/notepad": dynamic(
    () => import("@/components/tools/productivity/notepad-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/okr-planner": dynamic(
    () => import("@/components/tools/productivity/okr-planner-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/pomodoro-analytics": dynamic(
    () => import("@/components/tools/productivity/pomodoro-analytics-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/priority-action-planner": dynamic(
    () => import("@/components/tools/productivity/priority-action-planner-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/priority-kanban": dynamic(
    () => import("@/components/tools/productivity/priority-kanban-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/priority-matrix": dynamic(
    () => import("@/components/tools/productivity/priority-matrix-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/priority-matrix-2x2": dynamic(
    () => import("@/components/tools/productivity/priority-matrix-2x2-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/priority-quadrant-board": dynamic(
    () => import("@/components/tools/productivity/priority-quadrant-board-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/reading-list": dynamic(
    () => import("@/components/tools/productivity/reading-list-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/standup": dynamic(
    () => import("@/components/tools/productivity/standup-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/streaks": dynamic(
    () => import("@/components/tools/productivity/streaks-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/timeline": dynamic(
    () => import("@/components/tools/productivity/timeline-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/weekly-goals": dynamic(
    () => import("@/components/tools/productivity/weekly-goals-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/weekly-planner": dynamic(
    () => import("@/components/tools/productivity/weekly-planner-client"),
    { loading: LoadingSpinner }
  ),
  "productivity/whiteboard": dynamic(
    () => import("@/components/tools/productivity/whiteboard-client"),
    { loading: LoadingSpinner }
  ),
  "seo/ai-meta-generator": dynamic(
    () => import("@/components/tools/seo/ai-meta-generator-client"),
    { loading: LoadingSpinner }
  ),
  "seo/ai-schema-generator": dynamic(
    () => import("@/components/tools/seo/ai-schema-generator-client"),
    { loading: LoadingSpinner }
  ),
  "seo/meta-generator": dynamic(
    () => import("@/components/tools/seo/meta-generator-client"),
    { loading: LoadingSpinner }
  ),
  "seo/og-builder": dynamic(
    () => import("@/components/tools/seo/og-builder-client"),
    { loading: LoadingSpinner }
  ),
  "seo/og-preview": dynamic(
    () => import("@/components/tools/seo/og-preview-client"),
    { loading: LoadingSpinner }
  ),
  "seo/robots-generator": dynamic(
    () => import("@/components/tools/seo/robots-generator-client"),
    { loading: LoadingSpinner }
  ),
  "seo/schema-generator": dynamic(
    () => import("@/components/tools/seo/schema-generator-client"),
    { loading: LoadingSpinner }
  ),
  "seo/sitemap-generator": dynamic(
    () => import("@/components/tools/seo/sitemap-generator-client"),
    { loading: LoadingSpinner }
  ),
  "social/ad-copy-generator": dynamic(
    () => import("@/components/tools/social/ad-copy-generator-client"),
    { loading: LoadingSpinner }
  ),
  "social/discord-name-generator": dynamic(
    () => import("@/components/tools/social/discord-name-client"),
    { loading: LoadingSpinner }
  ),
  "social/instagram-bio-generator": dynamic(
    () => import("@/components/tools/social/instagram-bio-client"),
    { loading: LoadingSpinner }
  ),
  "social/instagram-reel-hooks": dynamic(
    () => import("@/components/tools/social/instagram-reel-client"),
    { loading: LoadingSpinner }
  ),
  "social/linkedin-headline-generator": dynamic(
    () => import("@/components/tools/social/linkedin-headline-client"),
    { loading: LoadingSpinner }
  ),
  "social/podcast-script-generator": dynamic(
    () => import("@/components/tools/social/podcast-script-generator-client"),
    { loading: LoadingSpinner }
  ),
  "social/spotify-playlist-generator": dynamic(
    () => import("@/components/tools/social/spotify-playlist-client"),
    { loading: LoadingSpinner }
  ),
  "social/tiktok-caption-generator": dynamic(
    () => import("@/components/tools/social/tiktok-caption-client"),
    { loading: LoadingSpinner }
  ),
  "social/tiktok-engagement-calc": dynamic(
    () => import("@/components/tools/social/tiktok-calc-client"),
    { loading: LoadingSpinner }
  ),
  "social/twitch-title-generator": dynamic(
    () => import("@/components/tools/social/twitch-title-client"),
    { loading: LoadingSpinner }
  ),
  "social/twitter-thread-generator": dynamic(
    () => import("@/components/tools/social/twitter-thread-generator-client"),
    { loading: LoadingSpinner }
  ),
  "social/video-downloader": dynamic(
    () => import("@/components/tools/social/video-downloader-client"),
    { loading: LoadingSpinner }
  ),
  "social/youtube-script-generator": dynamic(
    () => import("@/components/tools/social/youtube-script-generator-client"),
    { loading: LoadingSpinner }
  ),
  "social/youtube-tag-extractor": dynamic(
    () => import("@/components/tools/social/youtube-tag-client"),
    { loading: LoadingSpinner }
  ),
  "text/base64": dynamic(
    () => import("@/components/tools/text/base64-client"),
    { loading: LoadingSpinner }
  ),
  "text/binary-text": dynamic(
    () => import("@/components/tools/text/binary-text-client"),
    { loading: LoadingSpinner }
  ),
  "text/case-converter": dynamic(
    () => import("@/components/tools/text/case-converter-client"),
    { loading: LoadingSpinner }
  ),
  "text/character-counter": dynamic(
    () => import("@/components/tools/text/character-counter-client"),
    { loading: LoadingSpinner }
  ),
  "text/cleaner": dynamic(
    () => import("@/components/tools/text/text-cleaner-client"),
    { loading: LoadingSpinner }
  ),
  "text/emoji-picker": dynamic(
    () => import("@/components/tools/text/emoji-picker-client"),
    { loading: LoadingSpinner }
  ),
  "text/fancy-text": dynamic(
    () => import("@/components/tools/text/fancy-text-client"),
    { loading: LoadingSpinner }
  ),
  "text/line-tools": dynamic(
    () => import("@/components/tools/text/line-tools-client"),
    { loading: LoadingSpinner }
  ),
  "text/lorem-ipsum": dynamic(
    () => import("@/components/tools/text/lorem-ipsum-client"),
    { loading: LoadingSpinner }
  ),
  "text/markdown-studio": dynamic(
    () => import("@/components/tools/text/markdown-studio-client"),
    { loading: LoadingSpinner }
  ),
  "text/markdown-table": dynamic(
    () => import("@/components/tools/text/markdown-table-client"),
    { loading: LoadingSpinner }
  ),
  "text/morse-code": dynamic(
    () => import("@/components/tools/text/morse-code-client"),
    { loading: LoadingSpinner }
  ),
  "text/palindrome-checker": dynamic(
    () => import("@/components/tools/text/palindrome-checker-client"),
    { loading: LoadingSpinner }
  ),
  "text/password-strength": dynamic(
    () => import("@/components/tools/text/password-strength-client"),
    { loading: LoadingSpinner }
  ),
  "text/pronunciation": dynamic(
    () => import("@/components/tools/text/pronunciation-client"),
    { loading: LoadingSpinner }
  ),
  "text/reading-time": dynamic(
    () => import("@/components/tools/text/reading-time-client"),
    { loading: LoadingSpinner }
  ),
  "text/resume-builder": dynamic(
    () => import("@/components/tools/text/resume-builder-client"),
    { loading: LoadingSpinner }
  ),
  "text/rot13": dynamic(
    () => import("@/components/tools/text/rot13-client"),
    { loading: LoadingSpinner }
  ),
  "text/slugify": dynamic(
    () => import("@/components/tools/text/slugify-client"),
    { loading: LoadingSpinner }
  ),
  "text/speech-to-text": dynamic(
    () => import("@/components/tools/text/speech-to-text-client"),
    { loading: LoadingSpinner }
  ),
  "text/text-diff": dynamic(
    () => import("@/components/tools/text/text-diff-client"),
    { loading: LoadingSpinner }
  ),
  "text/text-repeater": dynamic(
    () => import("@/components/tools/text/text-repeater-client"),
    { loading: LoadingSpinner }
  ),
  "text/text-stats": dynamic(
    () => import("@/components/tools/text/text-stats-client"),
    { loading: LoadingSpinner }
  ),
  "text/text-to-speech": dynamic(
    () => import("@/components/tools/text/text-to-speech-client"),
    { loading: LoadingSpinner }
  ),
  "text/to-list": dynamic(
    () => import("@/components/tools/text/text-to-list-client"),
    { loading: LoadingSpinner }
  ),
  "text/translate": dynamic(
    () => import("@/components/tools/text/translate-client"),
    { loading: LoadingSpinner }
  ),
  "text/whitespace-remover": dynamic(
    () => import("@/components/tools/text/whitespace-remover-client"),
    { loading: LoadingSpinner }
  ),
  "text/word-counter": dynamic(
    () => import("@/components/tools/text/word-counter-client"),
    { loading: LoadingSpinner }
  ),
  "time/age": dynamic(
    () => import("@/components/tools/time/age-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "time/birthday-countdown": dynamic(
    () => import("@/components/tools/time/birthday-countdown-client"),
    { loading: LoadingSpinner }
  ),
  "time/circadian-shift-planner": dynamic(
    () => import("@/components/tools/time/circadian-shift-planner-client"),
    { loading: LoadingSpinner }
  ),
  "time/cooking-timer": dynamic(
    () => import("@/components/tools/time/cooking-timer-client"),
    { loading: LoadingSpinner }
  ),
  "time/countdown": dynamic(
    () => import("@/components/tools/time/birthday-countdown-client"),
    { loading: LoadingSpinner }
  ),
  "time/date-formatter": dynamic(
    () => import("@/components/tools/time/date-formatter-client"),
    { loading: LoadingSpinner }
  ),
  "time/event-countdown": dynamic(
    () => import("@/components/tools/time/event-countdown-client"),
    { loading: LoadingSpinner }
  ),
  "time/event-widget": dynamic(
    () => import("@/components/tools/time/event-widget-client"),
    { loading: LoadingSpinner }
  ),
  "time/holidays": dynamic(
    () => import("@/components/tools/time/holidays-client"),
    { loading: LoadingSpinner }
  ),
  "time/lunar-calendar": dynamic(
    () => import("@/components/tools/time/lunar-calendar-client"),
    { loading: LoadingSpinner }
  ),
  "time/meeting-planner": dynamic(
    () => import("@/components/tools/time/meeting-planner-client"),
    { loading: LoadingSpinner }
  ),
  "time/rem-bedtime-clock": dynamic(
    () => import("@/components/tools/time/rem-bedtime-clock-client"),
    { loading: LoadingSpinner }
  ),
  "time/rem-latency-bedtime-clock": dynamic(
    () => import("@/components/tools/time/rem-latency-bedtime-clock-client"),
    { loading: LoadingSpinner }
  ),
  "time/rem-sleep-alarm": dynamic(
    () => import("@/components/tools/time/rem-sleep-alarm-client"),
    { loading: LoadingSpinner }
  ),
  "time/rem-sleep-clock": dynamic(
    () => import("@/components/tools/time/rem-sleep-clock-client"),
    { loading: LoadingSpinner }
  ),
  "time/shift-circadian": dynamic(
    () => import("@/components/tools/time/shift-circadian-client"),
    { loading: LoadingSpinner }
  ),
  "time/shift-scheduler": dynamic(
    () => import("@/components/tools/time/shift-scheduler-client"),
    { loading: LoadingSpinner }
  ),
  "time/sleep-debt": dynamic(
    () => import("@/components/tools/time/sleep-debt-client"),
    { loading: LoadingSpinner }
  ),
  "time/sleep-efficiency": dynamic(
    () => import("@/components/tools/time/sleep-efficiency-client"),
    { loading: LoadingSpinner }
  ),
  "time/sleep-efficiency-tracker": dynamic(
    () => import("@/components/tools/time/sleep-efficiency-tracker-client"),
    { loading: LoadingSpinner }
  ),
  "time/sleep-latency": dynamic(
    () => import("@/components/tools/time/sleep-latency-client"),
    { loading: LoadingSpinner }
  ),
  "time/sleep-latency-calc": dynamic(
    () => import("@/components/tools/time/sleep-latency-calc-client"),
    { loading: LoadingSpinner }
  ),
  "time/sleep-log": dynamic(
    () => import("@/components/tools/time/sleep-log-client"),
    { loading: LoadingSpinner }
  ),
  "time/sleep-onset-clock": dynamic(
    () => import("@/components/tools/time/sleep-onset-clock-client"),
    { loading: LoadingSpinner }
  ),
  "time/sun-calculator": dynamic(
    () => import("@/components/tools/time/sun-calculator-client"),
    { loading: LoadingSpinner }
  ),
  "time/time-capsule": dynamic(
    () => import("@/components/tools/time/time-capsule-client"),
    { loading: LoadingSpinner }
  ),
  "time/timezone": dynamic(
    () => import("@/components/tools/time/timezone-compare-client"),
    { loading: LoadingSpinner }
  ),
  "time/timezone-compare": dynamic(
    () => import("@/components/tools/time/timezone-compare-client"),
    { loading: LoadingSpinner }
  ),
  "time/tz-alarm": dynamic(
    () => import("@/components/tools/time/tz-alarm-client"),
    { loading: LoadingSpinner }
  ),
  "time/weekno": dynamic(
    () => import("@/components/tools/time/week-number-client"),
    { loading: LoadingSpinner }
  ),
  "time/work-hours": dynamic(
    () => import("@/components/tools/time/work-hours-client"),
    { loading: LoadingSpinner }
  ),
  "time/world-clock": dynamic(
    () => import("@/components/tools/time/world-clock-client"),
    { loading: LoadingSpinner }
  ),
  "time/world-planner": dynamic(
    () => import("@/components/tools/time/world-planner-client"),
    { loading: LoadingSpinner }
  ),
  "travel/baggage-calc": dynamic(
    () => import("@/components/tools/travel/baggage-calc-client"),
    { loading: LoadingSpinner }
  ),
  "travel/budget": dynamic(
    () => import("@/components/tools/travel/budget-client"),
    { loading: LoadingSpinner }
  ),
  "travel/checklist": dynamic(
    () => import("@/components/tools/travel/checklist-client"),
    { loading: LoadingSpinner }
  ),
  "travel/currency-card": dynamic(
    () => import("@/components/tools/travel/currency-card-client"),
    { loading: LoadingSpinner }
  ),
  "travel/currency-matrix": dynamic(
    () => import("@/components/tools/travel/currency-matrix-client"),
    { loading: LoadingSpinner }
  ),
  "travel/currency-price-matrix": dynamic(
    () => import("@/components/tools/travel/currency-price-matrix-client"),
    { loading: LoadingSpinner }
  ),
  "travel/daily-budget": dynamic(
    () => import("@/components/tools/travel/daily-budget-client"),
    { loading: LoadingSpinner }
  ),
  "travel/distance": dynamic(
    () => import("@/components/tools/travel/distance-client"),
    { loading: LoadingSpinner }
  ),
  "travel/documents": dynamic(
    () => import("@/components/tools/travel/documents-client"),
    { loading: LoadingSpinner }
  ),
  "travel/exchange-fees": dynamic(
    () => import("@/components/tools/travel/exchange-fees-client"),
    { loading: LoadingSpinner }
  ),
  "travel/exchange-history": dynamic(
    () => import("@/components/tools/travel/exchange-history-client"),
    { loading: LoadingSpinner }
  ),
  "travel/exchange-table": dynamic(
    () => import("@/components/tools/travel/exchange-table-client"),
    { loading: LoadingSpinner }
  ),
  "travel/exchange-trend": dynamic(
    () => import("@/components/tools/travel/exchange-trend-client"),
    { loading: LoadingSpinner }
  ),
  "travel/expenses": dynamic(
    () => import("@/components/tools/travel/expenses-client"),
    { loading: LoadingSpinner }
  ),
  "travel/flight-duration": dynamic(
    () => import("@/components/tools/travel/flight-duration-client"),
    { loading: LoadingSpinner }
  ),
  "travel/flight-time": dynamic(
    () => import("@/components/tools/travel/flight-time-client"),
    { loading: LoadingSpinner }
  ),
  "travel/fuel-cost": dynamic(
    () => import("@/components/tools/travel/fuel-cost-client"),
    { loading: LoadingSpinner }
  ),
  "travel/fuel-efficiency": dynamic(
    () => import("@/components/tools/travel/fuel-efficiency-client"),
    { loading: LoadingSpinner }
  ),
  "travel/jet-lag": dynamic(
    () => import("@/components/tools/travel/jet-lag-client"),
    { loading: LoadingSpinner }
  ),
  "travel/multi-country-budget-sheet": dynamic(
    () => import("@/components/tools/travel/multi-country-budget-sheet-client"),
    { loading: LoadingSpinner }
  ),
  "travel/offline-currency": dynamic(
    () => import("@/components/tools/travel/offline-currency-client"),
    { loading: LoadingSpinner }
  ),
  "travel/packing": dynamic(
    () => import("@/components/tools/travel/packing-checklist-client"),
    { loading: LoadingSpinner }
  ),
  "travel/packing-weight": dynamic(
    () => import("@/components/tools/travel/packing-weight-client"),
    { loading: LoadingSpinner }
  ),
  "travel/passport-photo": dynamic(
    () => import("@/components/tools/travel/passport-photo-client"),
    { loading: LoadingSpinner }
  ),
  "travel/phrasebook": dynamic(
    () => import("@/components/tools/travel/phrasebook-client"),
    { loading: LoadingSpinner }
  ),
  "travel/travel-budget-calc-sheet": dynamic(
    () => import("@/components/tools/travel/travel-budget-calc-sheet-client"),
    { loading: LoadingSpinner }
  ),
  "travel/travel-budget-matrix": dynamic(
    () => import("@/components/tools/travel/travel-budget-matrix-client"),
    { loading: LoadingSpinner }
  ),
  "travel/travel-budget-planner": dynamic(
    () => import("@/components/tools/travel/travel-budget-planner-client"),
    { loading: LoadingSpinner }
  ),
  "travel/travel-budget-sheet": dynamic(
    () => import("@/components/tools/travel/travel-budget-sheet-client"),
    { loading: LoadingSpinner }
  ),
  "travel/travel-daily-budget": dynamic(
    () => import("@/components/tools/travel/travel-daily-budget-client"),
    { loading: LoadingSpinner }
  ),
  "travel/trip-budget-matrix": dynamic(
    () => import("@/components/tools/travel/trip-budget-matrix-client"),
    { loading: LoadingSpinner }
  ),
  "travel/visa-check": dynamic(
    () => import("@/components/tools/travel/visa-check-client"),
    { loading: LoadingSpinner }
  ),
  "travel/visa-index": dynamic(
    () => import("@/components/tools/travel/visa-index-client"),
    { loading: LoadingSpinner }
  ),
  "url/expand": dynamic(
    () => import("@/components/tools/url/link-expand-client"),
    { loading: LoadingSpinner }
  ),
  "url/qr": dynamic(
    () => import("@/components/tools/url/qr-client"),
    { loading: LoadingSpinner }
  ),
  "url/shortener": dynamic(
    () => import("@/components/tools/url/shortener-client"),
    { loading: LoadingSpinner }
  ),
  "url/utm-builder": dynamic(
    () => import("@/components/tools/url/utm-builder-client"),
    { loading: LoadingSpinner }
  ),
  "url/youtube-thumbnail": dynamic(
    () => import("@/components/tools/url/youtube-thumbnail-client"),
    { loading: LoadingSpinner }
  ),
  "util/clipboard-cleaner": dynamic(
    () => import("@/components/tools/util/clipboard-cleaner-client"),
    { loading: LoadingSpinner }
  ),
  "util/clipboard-manager": dynamic(
    () => import("@/components/tools/util/clipboard-manager-client"),
    { loading: LoadingSpinner }
  ),
  "util/coin-flip": dynamic(
    () => import("@/components/tools/util/coin-flip-client"),
    { loading: LoadingSpinner }
  ),
  "util/decision-maker": dynamic(
    () => import("@/components/tools/util/decision-maker-client"),
    { loading: LoadingSpinner }
  ),
  "util/dice-roller": dynamic(
    () => import("@/components/tools/util/dice-roller-client"),
    { loading: LoadingSpinner }
  ),
  "util/diceware-password": dynamic(
    () => import("@/components/tools/util/diceware-password-client"),
    { loading: LoadingSpinner }
  ),
  "util/electricity-monitor": dynamic(
    () => import("@/components/tools/util/electricity-monitor-client"),
    { loading: LoadingSpinner }
  ),
  "util/id-generator": dynamic(
    () => import("@/components/tools/util/id-generator-client"),
    { loading: LoadingSpinner }
  ),
  "util/morse-flashlight": dynamic(
    () => import("@/components/tools/util/morse-flashlight-client"),
    { loading: LoadingSpinner }
  ),
  "util/nato-password-reader": dynamic(
    () => import("@/components/tools/util/nato-password-reader-client"),
    { loading: LoadingSpinner }
  ),
  "util/nato-phonetic-password": dynamic(
    () => import("@/components/tools/util/nato-phonetic-password-client"),
    { loading: LoadingSpinner }
  ),
  "util/password-entropy": dynamic(
    () => import("@/components/tools/util/password-entropy-client"),
    { loading: LoadingSpinner }
  ),
  "util/pdf-merge": dynamic(
    () => import("@/components/tools/util/pdf-merge-client"),
    { loading: LoadingSpinner }
  ),
  "util/pdf-to-image": dynamic(
    () => import("@/components/tools/util/pdf-to-image-client"),
    { loading: LoadingSpinner }
  ),
  "util/phonetic-password": dynamic(
    () => import("@/components/tools/util/phonetic-password-client"),
    { loading: LoadingSpinner }
  ),
  "util/phonetic-password-nato": dynamic(
    () => import("@/components/tools/util/phonetic-password-nato-client"),
    { loading: LoadingSpinner }
  ),
  "util/pomodoro": dynamic(
    () => import("@/components/tools/util/pomodoro-focus-client"),
    { loading: LoadingSpinner }
  ),
  "util/random-number": dynamic(
    () => import("@/components/tools/util/random-number-client"),
    { loading: LoadingSpinner }
  ),
  "util/random-picker": dynamic(
    () => import("@/components/tools/util/random-picker-client"),
    { loading: LoadingSpinner }
  ),
  "util/screen-recorder": dynamic(
    () => import("@/components/tools/util/screen-recorder-client"),
    { loading: LoadingSpinner }
  ),
  "util/stopwatch": dynamic(
    () => import("@/components/tools/util/stopwatch-client"),
    { loading: LoadingSpinner }
  ),
  "util/typing-test": dynamic(
    () => import("@/components/tools/util/typing-test-client"),
    { loading: LoadingSpinner }
  ),
  "util/unit-price": dynamic(
    () => import("@/components/tools/util/unit-price-client"),
    { loading: LoadingSpinner }
  ),
  "writing/ai-elevator-pitch": dynamic(
    () => import("@/components/tools/writing/ai-elevator-pitch-client"),
    { loading: LoadingSpinner }
  ),
  "writing/ai-grammar-polish": dynamic(
    () => import("@/components/tools/writing/ai-grammar-polish-client"),
    { loading: LoadingSpinner }
  ),
  "writing/ai-paraphraser": dynamic(
    () => import("@/components/tools/writing/ai-paraphraser-client"),
    { loading: LoadingSpinner }
  ),
  "writing/ai-text-humanizer": dynamic(
    () => import("@/components/tools/writing/ai-text-humanizer-client"),
    { loading: LoadingSpinner }
  ),
  "writing/blog-intro-generator": dynamic(
    () => import("@/components/tools/writing/blog-intro-generator-client"),
    { loading: LoadingSpinner }
  ),
  "writing/email-subject-generator": dynamic(
    () => import("@/components/tools/writing/email-subject-generator-client"),
    { loading: LoadingSpinner }
  ),
  "writing/resume-summary-generator": dynamic(
    () => import("@/components/tools/writing/resume-summary-generator-client"),
    { loading: LoadingSpinner }
  ),
};

export function getEmbedComponent(category: string, slug: string) {
  const key = `${category}/${slug}`;
  return EMBED_REGISTRY[key] || null;
}
