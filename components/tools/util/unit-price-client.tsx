"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Calculator, Plus, Trash2, Trophy, Sparkles, ShoppingBag,
  Percent, DollarSign, ArrowRight, CheckCircle2, ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  quantity: string;
  unit: string;
  discount: string;
}

const UNIT_CONVERSIONS: Record<string, { base: string; factor: number }> = {
  // Mass
  g: { base: "kg", factor: 0.001 },
  kg: { base: "kg", factor: 1 },
  oz: { base: "kg", factor: 0.0283495 },
  lb: { base: "kg", factor: 0.453592 },
  // Volume
  ml: { base: "L", factor: 0.001 },
  L: { base: "L", factor: 1 },
  "fl oz": { base: "L", factor: 0.0295735 },
  gal: { base: "L", factor: 3.78541 },
  qt: { base: "L", factor: 0.946353 },
  // Count
  pcs: { base: "item", factor: 1 },
  pack: { base: "item", factor: 1 },
  sheet: { base: "item", factor: 1 },
  roll: { base: "item", factor: 1 },
};

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    name: "Small Package (Standard)",
    price: "4.99",
    quantity: "250",
    unit: "g",
    discount: "0",
  },
  {
    id: "2",
    name: "Bulk Family Size",
    price: "12.49",
    quantity: "1",
    unit: "kg",
    discount: "10",
  },
  {
    id: "3",
    name: "Club Pack",
    price: "24.99",
    quantity: "2.5",
    unit: "kg",
    discount: "0",
  },
];

export default function UnitPriceClient() {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [currency, setCurrency] = useState<string>("$");

  const handleAddProduct = () => {
    if (products.length >= 8) {
      toast.error("Maximum 8 comparison items allowed.");
      return;
    }
    const nextIdx = products.length + 1;
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `Option ${String.fromCharCode(64 + nextIdx)}`,
        price: "",
        quantity: "",
        unit: "g",
        discount: "0",
      },
    ]);
  };

  const handleRemoveProduct = (id: string) => {
    if (products.length <= 2) {
      toast.error("You need at least 2 items to compare.");
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Calculate Unit Prices and Normalized Base Values
  const comparisonResults = useMemo(() => {
    const computed = products.map((item) => {
      const rawPrice = parseFloat(item.price) || 0;
      const rawQty = parseFloat(item.quantity) || 0;
      const rawDiscount = parseFloat(item.discount) || 0;

      const finalPrice = Math.max(0, rawPrice * (1 - rawDiscount / 100));
      const conv = UNIT_CONVERSIONS[item.unit] || { base: item.unit, factor: 1 };
      const normalizedQty = rawQty * conv.factor;

      const unitPriceRaw = rawQty > 0 ? finalPrice / rawQty : 0;
      const normalizedUnitPrice = normalizedQty > 0 ? finalPrice / normalizedQty : 0;

      return {
        ...item,
        finalPrice,
        unitPriceRaw,
        normalizedUnitPrice,
        baseUnit: conv.base,
        isValid: rawPrice > 0 && rawQty > 0,
      };
    });

    const validItems = computed.filter((c) => c.isValid && c.normalizedUnitPrice > 0);
    const minNormalizedPrice =
      validItems.length > 0
        ? Math.min(...validItems.map((c) => c.normalizedUnitPrice))
        : 0;

    return computed.map((c) => {
      const isBestValue =
        c.isValid && minNormalizedPrice > 0 && Math.abs(c.normalizedUnitPrice - minNormalizedPrice) < 0.0001;
      const percentageMoreExpensive =
        minNormalizedPrice > 0 && c.normalizedUnitPrice > minNormalizedPrice
          ? Math.round(((c.normalizedUnitPrice - minNormalizedPrice) / minNormalizedPrice) * 100)
          : 0;

      return {
        ...c,
        isBestValue,
        percentageMoreExpensive,
      };
    });
  }, [products]);

  const bestValueItem = comparisonResults.find((c) => c.isBestValue);

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Unit Price Calculator & Grocery Price Comparison"
          description="Compare prices across different package sizes, weights, and volumes to immediately find the best value and calculate exact cost savings."
          icon={Calculator}
          badgeText="🛒 Multi-Size Price Comparison • Automatic Unit Normalization"
        />

        {/* Currency & Add Item Bar */}
        <GlassCard className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-foreground">Currency Symbol:</Label>
            <div className="flex items-center gap-1">
              {["$", "€", "£", "₹", "¥", "C$", "A$"].map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setCurrency(cur)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all border",
                    currency === cur
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-muted/30 text-muted-foreground border-border/60 hover:bg-background"
                  )}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddProduct}
            className="rounded-xl text-xs font-bold gap-1.5 h-9 bg-primary text-primary-foreground shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package Option
          </Button>
        </GlassCard>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {comparisonResults.map((item, index) => (
            <GlassCard
              key={item.id}
              className={cn(
                "p-5 space-y-4 relative transition-all",
                item.isBestValue
                  ? "border-2 border-emerald-500 shadow-lg shadow-emerald-500/10 bg-emerald-500/5"
                  : "border-border/80"
              )}
            >
              {/* Best Value Badge */}
              {item.isBestValue && (
                <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> BEST VALUE (CHEAPEST)
                </div>
              )}

              <div className="flex items-center justify-between border-b border-border/60 pb-2 pt-1">
                <Input
                  value={item.name}
                  onChange={(e) => {
                    const updated = [...products];
                    updated[index].name = e.target.value;
                    setProducts(updated);
                  }}
                  className="font-bold text-xs h-8 bg-transparent border-none p-0 focus-visible:ring-0"
                />

                {products.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(item.id)}
                    className="text-muted-foreground hover:text-destructive text-xs"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Price & Quantity Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold text-muted-foreground">Price ({currency})</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={item.price}
                    onChange={(e) => {
                      const updated = [...products];
                      updated[index].price = e.target.value;
                      setProducts(updated);
                    }}
                    className="h-9 text-xs font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold text-muted-foreground">Quantity & Unit</Label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      step="any"
                      min="0"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => {
                        const updated = [...products];
                        updated[index].quantity = e.target.value;
                        setProducts(updated);
                      }}
                      className="h-9 text-xs font-mono font-bold w-1/2"
                    />
                    <select
                      value={item.unit}
                      onChange={(e) => {
                        const updated = [...products];
                        updated[index].unit = e.target.value;
                        setProducts(updated);
                      }}
                      className="bg-background border border-border text-foreground font-bold text-xs rounded-xl h-9 px-2 outline-none w-1/2 cursor-pointer"
                    >
                      <optgroup label="Weight">
                        <option value="g">g (Grams)</option>
                        <option value="kg">kg (Kilograms)</option>
                        <option value="oz">oz (Ounces)</option>
                        <option value="lb">lb (Pounds)</option>
                      </optgroup>
                      <optgroup label="Volume">
                        <option value="ml">ml (Milliliters)</option>
                        <option value="L">L (Liters)</option>
                        <option value="fl oz">fl oz</option>
                        <option value="gal">gal (Gallons)</option>
                        <option value="qt">qt (Quarts)</option>
                      </optgroup>
                      <optgroup label="Count">
                        <option value="pcs">pcs (Pieces)</option>
                        <option value="pack">pack</option>
                        <option value="sheet">sheet</option>
                        <option value="roll">roll</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              {/* Discount / Coupon % */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Discount / Coupon (%)</span>
                  <span className="font-mono">{item.discount || 0}% OFF</span>
                </div>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={item.discount}
                  onChange={(e) => {
                    const updated = [...products];
                    updated[index].discount = e.target.value;
                    setProducts(updated);
                  }}
                  className="h-8 text-xs font-mono"
                />
              </div>

              {/* Unit Price Calculation Card */}
              <div
                className={cn(
                  "p-3 rounded-xl border space-y-1 text-center font-mono",
                  item.isBestValue
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                    : "bg-muted/20 border-border/60 text-foreground"
                )}
              >
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Normalized Unit Cost</div>
                <div className="text-xl font-extrabold">
                  {currency}
                  {item.normalizedUnitPrice.toFixed(3)}
                  <span className="text-xs font-normal text-muted-foreground"> / {item.baseUnit}</span>
                </div>

                <div className="text-[11px] text-muted-foreground font-sans">
                  {item.percentageMoreExpensive > 0 ? (
                    <span className="text-amber-500 font-semibold">
                      +{item.percentageMoreExpensive}% more expensive
                    </span>
                  ) : item.isBestValue ? (
                    <span className="text-emerald-500 font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Best Deal!
                    </span>
                  ) : (
                    <span>Enter price and quantity</span>
                  )}
                </div>
              </div>

            </GlassCard>
          ))}
        </div>

        {/* Winner Summary Banner */}
        {bestValueItem && (
          <GlassCard className="p-5 sm:p-6 bg-gradient-to-r from-emerald-500/10 via-primary/5 to-emerald-500/10 border-2 border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <Trophy className="w-5 h-5" />
              <span>Smart Shopper Recommendation</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              Buy <strong>&ldquo;{bestValueItem.name}&rdquo;</strong>! At only{" "}
              <strong>
                {currency}
                {bestValueItem.normalizedUnitPrice.toFixed(3)} per {bestValueItem.baseUnit}
              </strong>
              , it delivers the maximum quantity per dollar spent across all options compared.
            </p>
          </GlassCard>
        )}

        {/* Share & Embed Bar */}
        <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            100% Free Grocery & Unit Price Calculator
          </span>
          <div className="flex items-center gap-2">
            <ShareResultButton
              toolTitle="Unit Price Calculator"
              resultTitle="Best Value Grocery Comparison"
              resultSummary={`Best value: "${bestValueItem?.name || "Product"}" at ${currency}${bestValueItem?.normalizedUnitPrice.toFixed(3) || "0"}/${bestValueItem?.baseUnit || "unit"}.`}
              resultMetrics={[
                { label: "Best Deal", value: bestValueItem?.name || "N/A" },
                { label: "Items Compared", value: products.length },
              ]}
            />
            <EmbedButton toolPath="/tools/util/unit-price" toolTitle="Unit Price Calculator" />
          </div>
        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Add Package Sizes", description: "Enter prices, package weights (e.g., 250g vs 1kg), or volumes for 2 or more products." },
            { step: "2", title: "Automatic Normalization", description: "Our calculator converts grams, ounces, liters, and pieces into common base units." },
            { step: "3", title: "Spot the Best Deal", description: "The cheapest option is highlighted in green with exact percentage savings." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Universal Unit Normalization", description: "Seamlessly compares grams against kilograms, ounces against pounds, and milliliters against liters." },
            { title: "Discount & Coupon Math", description: "Factored sales percentages and coupons into true final unit pricing automatically." },
            { title: "Compare Up to 8 Products", description: "Ideal for grocery shopping, wholesale warehouse buying, bulk food prep, and material procurement." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "How is unit price calculated?", answer: "Unit price is calculated as (Final Total Price) / (Total Quantity normalized to a base unit like kilograms or liters)." },
            { question: "Are bulk sizes always cheaper?", answer: "Not always! Marketing ploys sometimes price bulk packages higher per ounce than smaller items on sale. This tool reveals the true mathematical winner." },
            { question: "Can I compare items with different units?", answer: "Yes! As long as items share the same category (e.g. weight: g vs kg vs lb vs oz, or volume: ml vs L vs fl oz), they are normalized automatically." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/util/unit-price" />

      </div>
    </div>
  );
}
