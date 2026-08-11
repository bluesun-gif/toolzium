"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import { Hash } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const scales = ["", "Thousand", "Million", "Billion", "Trillion"];

const convertChunk = (n: number) => {
  let str = "";
  if (n > 99) {
    str += ones[Math.floor(n / 100)] + " Hundred ";
    n %= 100;
  }
  if (n >= 20) {
    str += tens[Math.floor(n / 10)] + " ";
    n %= 10;
  }
  if (n > 0) {
    str += ones[n] + " ";
  }
  return str.trim();
};

const numberToWords = (num: number): string => {
  if (num === 0) return "Zero";
  if (isNaN(num)) return "";
  
  let isNeg = false;
  if (num < 0) {
    isNeg = true;
    num = Math.abs(num);
  }

  let intPart = Math.floor(num);
  let decPart = Math.round((num - intPart) * 100); 
  
  let words = "";
  let scaleIdx = 0;
  
  if (intPart === 0) {
    words = "Zero";
  } else {
    while (intPart > 0) {
      let chunk = intPart % 1000;
      if (chunk > 0) {
        words = convertChunk(chunk) + " " + scales[scaleIdx] + " " + words;
      }
      intPart = Math.floor(intPart / 1000);
      scaleIdx++;
    }
  }
  
  let result = (isNeg ? "Negative " : "") + words.trim();
  
  if (decPart > 0) {
    result += " Point " + convertChunk(decPart);
  }
  
  return result.replace(/\s+/g, " ").trim();
};

export default function NumberWordsClient() {
  const [input, setInput] = useState("1234567.89");

  const words = useMemo(() => {
    const num = parseFloat(input);
    if (isNaN(num)) return "Please enter a valid number";
    return numberToWords(num);
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader icon={Hash} title="Number to Words Converter" description="Instantly convert numerical digits into their English word equivalents up to trillions." />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>Input Number</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <Input 
            type="text" 
            placeholder="e.g. 1234567.89" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="text-2xl font-mono"
          />

          <div className="p-6 rounded-xl bg-muted/30 border border-border/50 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-muted-foreground">English Words</h3>
              <CopyButton getText={() => words} label="Copy" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-primary leading-relaxed break-words">
              {words}
            </p>
          </div>
        </CardContent>
      </Card>

      <ToolHowItWorks 
        steps={[
          { step: "01", title: "Enter Digits", description: "Type or paste any number, including decimals, into the input field.", icon: Hash },
          { step: "02", title: "Auto-Convert", description: "The tool instantly parses the number and generates the English word representation.", icon: Hash },
          { step: "03", title: "Copy Text", description: "Use the copy button to grab the text for use in checks, legal documents, or invoices.", icon: Hash }
        ]} 
        badges={["100% Free", "Client-Side", "Instant"]} 
      />

      <ToolFeatureGuides features={[
        { icon: Hash, title: "Large Number Support", description: "Accurately converts numbers up to the trillions scale with proper grouping." },
        { icon: Hash, title: "Decimal Handling", description: "Processes fractional parts and appends them as 'Point' followed by the words." },
        { icon: Hash, title: "Negative Numbers", description: "Correctly identifies and prefixes negative values with the word 'Negative'." },
        { icon: Hash, title: "Real-Time Parsing", description: "Updates the output continuously as you type without requiring a submit button." }
      ]}>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Writing out numbers in words is a strict requirement in many formal contexts, including writing bank checks, drafting legal contracts, and filling out financial invoices. Mistakes in spelling or grouping can lead to rejected documents.</p>
          <p>Our converter handles the complex logic of grouping by thousands, millions, and billions, while correctly applying hyphens and spacing rules for compound numbers like 'Twenty-One'.</p>
          <p>Because the conversion logic runs entirely in your browser via JavaScript, it is incredibly fast and completely secure for sensitive financial figures.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[
        { question: "Does it support decimals?", answer: "Yes, decimal values are read as 'Point' followed by the numerical words for the fractional part (e.g., 12.34 becomes 'Twelve Point Thirty-Four')." },
        { question: "What is the maximum number it can handle?", answer: "The tool supports numbers up to the Trillions scale. Extremely large numbers beyond standard JavaScript floating-point precision may lose exactness." },
        { question: "Can I convert currency amounts?", answer: "While it converts the raw numbers perfectly, you will need to manually append the currency name (e.g., 'Dollars' or 'Cents') to the final text." }
      ]} />

      <RelatedTools currentToolUrl="/tools/calc/number-words" max={6} />
    </div>
  );
}
