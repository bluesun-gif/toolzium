"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Tag, Copy } from"lucide-react";
import { CopyButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function DiscountFinderClient() {
 const [originalPrice, setOriginalPrice] = useState<number>(100);
 const [discountPercent, setDiscountPercent] = useState<number>(20);
 const [taxPercent, setTaxPercent] = useState<number>(0);

 const calculations = useMemo(() => {
 const discountAmount = (originalPrice * discountPercent) / 100;
 const priceAfterDiscount = originalPrice - discountAmount;
 const taxAmount = (priceAfterDiscount * taxPercent) / 100;
 const finalPrice = priceAfterDiscount + taxAmount;
 const totalSavings = originalPrice - finalPrice;

 return {
 discountAmount,
 priceAfterDiscount,
 taxAmount,
 finalPrice,
 totalSavings,
 };
 }, [originalPrice, discountPercent, taxPercent]);

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={Tag}
 title="Discount Calculator"
 description="Calculate discounts, final prices, and total savings with optional tax."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Tag className="w-4 h-4 text-primary"/> Price Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">
 Original Price ($)
 </label>
 <Input
 type="number"
 value={originalPrice}
 onChange={(e) => setOriginalPrice(Number(e.target.value))}
 min={0}
 step={0.01}
 />
 </div>
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">
 Discount (%)
 </label>
 <Input
 type="number"
 value={discountPercent}
 onChange={(e) => setDiscountPercent(Number(e.target.value))}
 min={0}
 max={100}
 />
 </div>
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">
 Tax (%) (optional)
 </label>
 <Input
 type="number"
 value={taxPercent}
 onChange={(e) => setTaxPercent(Number(e.target.value))}
 min={0}
 max={100}
 />
 </div>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 <div className="p-4 bg-muted/40 rounded-lg text-center">
 <div className="text-xs text-muted-foreground mb-1">Discount</div>
 <div className="text-xl font-bold text-red-500">
 ${calculations.discountAmount.toFixed(2)}
 </div>
 <CopyButton
 getText={() => calculations.discountAmount.toFixed(2)}
 label="Copy"
 />
 </div>

 <div className="p-4 bg-muted/40 rounded-lg text-center">
 <div className="text-xs text-muted-foreground mb-1">After Discount</div>
 <div className="text-xl font-bold">
 ${calculations.priceAfterDiscount.toFixed(2)}
 </div>
 <CopyButton
 getText={() => calculations.priceAfterDiscount.toFixed(2)}
 label="Copy"
 />
 </div>

 {taxPercent > 0 && (
 <div className="p-4 bg-muted/40 rounded-lg text-center">
 <div className="text-xs text-muted-foreground mb-1">Tax</div>
 <div className="text-xl font-bold text-orange-500">
 ${calculations.taxAmount.toFixed(2)}
 </div>
 <CopyButton
 getText={() => calculations.taxAmount.toFixed(2)}
 label="Copy"
 />
 </div>
 )}

 <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
 <div className="text-xs text-muted-foreground mb-1">Final Price</div>
 <div className="text-xl font-bold text-primary">
 ${calculations.finalPrice.toFixed(2)}
 </div>
 <CopyButton
 getText={() => calculations.finalPrice.toFixed(2)}
 label="Copy"
 />
 </div>
 </div>

 <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">You Save</div>
 <div className="text-3xl font-bold text-green-600 dark:text-green-400">
 ${calculations.totalSavings.toFixed(2)}
 </div>
 <CopyButton
 getText={() => calculations.totalSavings.toFixed(2)}
 label="Copy Savings"
 />
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Enter Original Price", description:"Input the full price before any discount is applied.", icon: Tag },
 { step:"02", title:"Set Discount", description:"Enter the discount percentage to see your savings.", icon: Tag },
 { step:"03", title:"Add Tax (Optional)", description:"Include sales tax to calculate the final total price.", icon: Copy },
 ]}
 badges={["100% Free","Client-Side","Instant"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Tag, title:"Discount Calculation", description:"Instantly see how much you save with any percentage discount."},
 { icon: Copy, title:"Tax Support", description:"Optionally add sales tax to calculate the true final price."},
 { icon: Tag, title:"Savings Display", description:"Clearly shows your total savings in a highlighted card."},
 { icon: Copy, title:"Copy Values", description:"Copy any calculated value with one click for use elsewhere."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Understanding discounts and final prices is essential for smart shopping and budgeting. This calculator breaks down the math so you can see exactly how much you're saving and what you'll actually pay at checkout. Whether you're comparing deals, planning purchases, or just curious about the real cost after discounts and taxes.</p>
 <p>The discount calculation is straightforward: multiply the original price by the discount percentage, then subtract that amount from the original. For example, a 20% discount on $100 saves you $20, bringing the price to $80. The tax calculation (if applicable) is then applied to the discounted price, not the original — a detail that many shoppers miss.</p>
 <p>This tool is particularly useful during sales events, when comparing"percent off"versus"dollars off"deals, or when shopping in regions with sales tax. The savings display makes it easy to see the real value of a discount, helping you make informed purchasing decisions and avoid marketing tricks that make small discounts seem larger than they are.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Is tax calculated on the original or discounted price?", answer:"Sales tax is typically calculated on the price after the discount is applied, which is how this calculator works."},
 { question:"Can I use this for bulk discounts?", answer:"Yes, enter the total original price for all items and the discount percentage to see your total savings."},
 { question:"What if there's no tax?", answer:"Simply leave the tax field at 0%, and the calculator will show the price after discount as the final price."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/calc/discount-finder" max={6} />
 </div>
 );
}
