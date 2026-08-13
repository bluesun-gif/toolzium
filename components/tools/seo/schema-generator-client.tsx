"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, Code2, Plus, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
type SchemaType = "Article" | "Product" | "LocalBusiness" | "FAQPage" | "Recipe";
interface FaqItem {
  q: string;
  a: string;
}
export function SchemaGeneratorClient() {
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [faqs, setFaqs] = useState<FaqItem[]>([{
    q: "",
    a: ""
  }]);
  const [showPreview, setShowPreview] = useState(false);
  const schemaConfig: Record<SchemaType, {
    key: string;
    label: string;
    type: string;
    options?: string[];
  }[]> = {
    Article: [{
      key: "headline",
      label: "Headline",
      type: "text"
    }, {
      key: "author",
      label: "Author Name",
      type: "text"
    }, {
      key: "datePublished",
      label: "Date Published (YYYY-MM-DD)",
      type: "date"
    }, {
      key: "image",
      label: "Image URL",
      type: "text"
    }, {
      key: "description",
      label: "Description",
      type: "textarea"
    }],
    Product: [{
      key: "name",
      label: "Product Name",
      type: "text"
    }, {
      key: "description",
      label: "Description",
      type: "textarea"
    }, {
      key: "image",
      label: "Image URL",
      type: "text"
    }, {
      key: "price",
      label: "Price",
      type: "number"
    }, {
      key: "currency",
      label: "Currency (e.g., USD)",
      type: "text"
    }, {
      key: "availability",
      label: "Availability",
      type: "select",
      options: ["InStock", "OutOfStock", "PreOrder"]
    }],
    LocalBusiness: [{
      key: "name",
      label: "Business Name",
      type: "text"
    }, {
      key: "address",
      label: "Street Address",
      type: "text"
    }, {
      key: "city",
      label: "City",
      type: "text"
    }, {
      key: "state",
      label: "State",
      type: "text"
    }, {
      key: "zip",
      label: "Zip Code",
      type: "text"
    }, {
      key: "phone",
      label: "Phone Number",
      type: "text"
    }],
    FAQPage: [{
      key: "faq",
      label: "Questions & Answers",
      type: "faq"
    }],
    Recipe: [{
      key: "name",
      label: "Recipe Name",
      type: "text"
    }, {
      key: "prepTime",
      label: "Prep Time (e.g., PT15M)",
      type: "text"
    }, {
      key: "cookTime",
      label: "Cook Time (e.g., PT1H)",
      type: "text"
    }, {
      key: "ingredients",
      label: "Ingredients (comma separated)",
      type: "textarea"
    }, {
      key: "instructions",
      label: "Instructions (comma separated)",
      type: "textarea"
    }]
  };
  const handleFieldChange = (key: string, value: string) => {
    setFields(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const addFaq = () => setFaqs([...faqs, {
    q: "",
    a: ""
  }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
  const updateFaq = (index: number, field: "q" | "a", value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };
  const generateJsonLd = useMemo(() => {
    let base: any = {
      "@context": "https://schema.org",
      "@type": schemaType
    };
    if (schemaType === "FAQPage") {
      base.mainEntity = faqs.filter((f: FaqItem) => f.q && f.a).map((f: FaqItem) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }));
    } else if (schemaType === "Recipe") {
      base.name = fields.name;
      base.recipeIngredient = fields.ingredients ? fields.ingredients.split(',').map((s: string) => s.trim()) : [];
      base.recipeInstructions = fields.instructions ? fields.instructions.split(',').map((s: string) => ({
        "@type": "HowToStep",
        "text": s.trim()
      })) : [];
      if (fields.prepTime) base.prepTime = fields.prepTime;
      if (fields.cookTime) base.cookTime = fields.cookTime;
    } else if (schemaType === "Product") {
      base.name = fields.name;
      base.description = fields.description;
      base.image = fields.image;
      if (fields.price && fields.currency) {
        base.offers = {
          "@type": "Offer",
          "price": parseFloat(fields.price),
          "priceCurrency": fields.currency,
          "availability": `https://schema.org/${fields.availability || "InStock"}`
        };
      }
    } else if (schemaType === "LocalBusiness") {
      base.name = fields.name;
      base.address = {
        "@type": "PostalAddress",
        "streetAddress": fields.address,
        "addressLocality": fields.city,
        "addressRegion": fields.state,
        "postalCode": fields.zip
      };
      if (fields.phone) base.telephone = fields.phone;
    } else {
      Object.keys(fields).forEach(key => {
        if (fields[key]) base[key] = fields[key];
      });
    }
    return JSON.stringify(base, null, 2);
  }, [schemaType, fields, faqs]);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  const handleCopyScript = () => {
    const script = `<script type="application/ld+json">\n${generateJsonLd}\n</script>`;
    handleCopy(script);
  };
  const handleReset = () => {
    setFields({});
    setFaqs([{
      q: "",
      a: ""
    }]);
    toast.success("Form reset");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 p-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Code2} title="Schema Markup Generator (JSON-LD)" description="Generate valid structured data for Google Rich Snippets. Support for Articles, Products, Local Business, FAQs, and Recipes." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Code2 className="w-4 h-4" /> Schema Configuration
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="space-y-2">
 <Label>Schema Type</Label>
 <select className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50" value={schemaType} onChange={e => {
              setSchemaType(e.target.value as SchemaType);
              setFields({});
            }}>
 {Object.keys(schemaConfig).map(type => <option key={type} value={type}>{type}</option>)}
 </select>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {schemaConfig[schemaType].map(field => {
              if (field.type === "faq") return null;
              return <div key={field.key} className="space-y-2">
 <Label>{field.label}</Label>
 {field.type === "textarea" ? <textarea className={textareaClass} rows={3} value={fields[field.key] || ""} onChange={e => handleFieldChange(field.key, e.target.value)} /> : field.type === "select" ? <select className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm" value={fields[field.key] || ""} onChange={e => handleFieldChange(field.key, e.target.value)}>
 <option value="">Select...</option>
 {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
 </select> : <Input type={field.type} value={fields[field.key] || ""} onChange={e => handleFieldChange(field.key, e.target.value)} />}
 </div>;
            })}
 </div>

 {schemaType === "FAQPage" && <div className="space-y-4 border-t border-border/50 pt-6">
 <h3 className="font-semibold text-lg">FAQ Entries</h3>
 {faqs.map((faq, i) => <Card key={i} className="border border-border/50 bg-muted/10">
 <CardContent className="p-4 space-y-3">
 <div className="flex justify-between items-center">
 <Label>Question {i + 1}</Label>
 {faqs.length > 1 && <Button variant="ghost" size="sm" className="text-red-500" onClick={() => removeFaq(i)}>
 <Trash2 className="w-4 h-4" />
 </Button>}
 </div>
 <Input placeholder="Enter question..." value={faq.q} onChange={e => updateFaq(i, "q", e.target.value)} />
 <Label>Answer</Label>
 <textarea className={textareaClass} rows={2} placeholder="Enter answer..." value={faq.a} onChange={e => updateFaq(i, "a", e.target.value)} />
 </CardContent>
 </Card>)}
 <Button variant="outline" onClick={addFaq} className="w-full">
 <Plus className="w-4 h-4 mr-2" /> Add Question
 </Button>
 </div>}

 <div className="flex gap-3">
 <Button variant="outline" onClick={handleReset}>
 <RotateCcw className="w-4 h-4 mr-2" /> Reset
 </Button>
 <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
 <Eye className="w-4 h-4 mr-2" /> {showPreview ? 'Hide' : 'Show'} Preview
 </Button>
 </div>

 <div className="space-y-4 border-t border-border/50 pt-6">
 <div className="flex items-center justify-between">
 <h3 className="font-semibold text-lg">Generated JSON-LD</h3>
 <div className="flex gap-2">
 <Button size="sm" variant="outline" onClick={() => handleCopy(generateJsonLd)}>
 <Copy className="w-3 h-3 mr-2" /> Copy JSON
 </Button>
 <Button size="sm" onClick={handleCopyScript}>
 <Copy className="w-3 h-3 mr-2" /> Copy HTML Tag
 </Button>
 </div>
 </div>
 <pre className="p-4 font-mono text-xs bg-background text-cyan-400 rounded-xl border overflow-x-auto max-h-96 leading-relaxed">
 {generateJsonLd}
 </pre>
 </div>

 {showPreview && <div className="space-y-4 border-t border-border/50 pt-6">
 <h3 className="font-semibold text-lg">Rich Snippet Preview</h3>
 <Card className="border border-border/50 bg-background max-w-2xl">
 <CardContent className="p-4 space-y-2">
 <p className="text-xs text-green-700 dark:text-green-500 font-bold">
 {schemaType === "Product" && fields.price ? `${fields.price} ${fields.currency} - In Stock` : schemaType === "FAQPage" ? "FAQ Rich Snippet" : "toolzium.com"}
 </p>
 <h4 className="text-xl text-primary font-semibold hover:underline cursor-pointer">
 {fields.name || fields.headline || "Your Page Title"}
 </h4>
 <p className="text-sm text-foreground/80 line-clamp-2">
 {fields.description || "Your meta description will appear here. Fill out the form above to see how your structured data enhances your search presence."}
 </p>
 {schemaType === "FAQPage" && faqs[0].q && <div className="mt-3 border-t border-border pt-3">
 <p className="text-sm font-semibold">{faqs[0].q}</p>
 <p className="text-xs text-muted-foreground mt-1">{faqs[0].a}</p>
 </div>}
 </CardContent>
 </Card>
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Schema Type",
        description: "Choose the structured data format that matches your page content, such as Article, Product, or FAQ.",
        icon: Code2
      }, {
        step: "02",
        title: "Fill Dynamic Fields",
        description: "Enter the required and recommended properties. The form adapts automatically to your selected schema type.",
        icon: Plus
      }, {
        step: "03",
        title: "Copy & Implement",
        description: "Copy the generated JSON-LD script tag and paste it into the <head> of your HTML document.",
        icon: Copy
      }]} badges={["Valid JSON-LD", "Rich Snippets", "SEO Optimized"]} />

 <ToolFeatureGuides features={[{
        icon: Code2,
        title: "14+ Schema Types",
        description: "Support for the most impactful schema types including Product, LocalBusiness, FAQPage, Recipe, and HowTo."
      }, {
        icon: Eye,
        title: "Live Rich Snippet Preview",
        description: "Visualize exactly how your structured data will appear in Google search results before deploying."
      }, {
        icon: Copy,
        title: "HTML Script Tag Export",
        description: "Instantly copy the fully formatted <script type='application/ld+json'> tag ready for immediate CMS or HTML insertion."
      }, {
        icon: Plus,
        title: "Dynamic FAQ Builder",
        description: "Add, remove, and reorder an unlimited number of Q&A pairs for comprehensive FAQPage schema generation."
      }]}>
 <h3>Unlock Rich Snippets with JSON-LD</h3>
 <p>Search engines rely on structured data to understand the context of your content. By implementing Schema.org markup, you translate your HTML into a machine-readable format that explicitly defines your products, articles, and business details. This directly enables Rich Snippets—the enhanced search results featuring star ratings, pricing, FAQs, and images.</p>
 <p>Toolzium's Schema Markup Generator eliminates the complexity of writing raw JSON-LD. Our dynamic engine ensures your output strictly adheres to Google's structured data guidelines, preventing validation errors and maximizing your chances of securing prominent SERP real estate. Higher click-through rates and better indexing start with clean, valid schema.</p>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Where do I paste the JSON-LD code?",
        answer: "Paste the generated <script> tag inside the <head> section of your webpage, or anywhere within the <body> if your CMS restricts head access. Google can read it from either location."
      }, {
        question: "Does this tool validate the schema?",
        answer: "Yes, the generator enforces correct syntax and required property structures. However, for final production validation, always test your live URL using Google's official Rich Results Test tool."
      }, {
        question: "Can I combine multiple schema types?",
        answer: "Yes, you can generate multiple blocks of JSON-LD and place them on the same page. For example, an e-commerce page might use both Product and FAQPage schema."
      }, {
        question: "Is JSON-LD better than Microdata?",
        answer: "Google strongly recommends JSON-LD over Microdata or RDFa because it separates the structured data from your HTML markup, making it easier to maintain and less prone to breaking when the UI changes."
      }]} />

 <RelatedTools currentToolUrl="/tools/seo/schema-generator" max={6} />
 </div></div>;
}
export default SchemaGeneratorClient;