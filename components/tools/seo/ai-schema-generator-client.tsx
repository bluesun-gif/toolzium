"use client";

import React, { useMemo, useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Code2, Sparkles, RefreshCw, ExternalLink } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass =
"border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const fieldClass =
"w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

const schemaTypes = [
"Article",
"FAQ",
"Product",
"LocalBusiness",
"HowTo",
"Recipe",
"Event",
] as const;

type SchemaType = (typeof schemaTypes)[number];

function cleanJsonLd(raw: string): string {
 const cleaned = raw.replace(/```json|```/gi,"").trim();
 const start = cleaned.indexOf("{");
 const end = cleaned.lastIndexOf("}");
 if (start === -1 || end === -1) return cleaned;
 return cleaned.slice(start, end + 1);
}

function getFallbackSchema(type: SchemaType, fields: Record<string, string>): string {
 const base = {
"@context":"https://schema.org",
"@type": type,
 name: fields.name ||"Example Name",
 description: fields.description ||"Example description",
 url: fields.url ||"https://example.com",
 image: fields.image ||"https://example.com/image.jpg",
 };

 if (type ==="Article") {
 return JSON.stringify(
 {
 ...base,
 headline: fields.name ||"Example Article",
 author: {
"@type":"Person",
 name: fields.author ||"Author Name",
 },
 datePublished: fields.datePublished || new Date().toISOString().split("T")[0],
 },
 null,
 2
 );
 }

 if (type ==="FAQ") {
 return JSON.stringify(
 {
"@context":"https://schema.org",
"@type":"FAQPage",
 mainEntity: [
 {
"@type":"Question",
 name:"What is structured data?",
 acceptedAnswer: {
"@type":"Answer",
 text:"Structured data helps search engines understand page content more clearly.",
 },
 },
 {
"@type":"Question",
 name:"Why use schema markup?",
 acceptedAnswer: {
"@type":"Answer",
 text:"Schema markup can improve how your content appears in rich results.",
 },
 },
 ],
 },
 null,
 2
 );
 }

 if (type ==="Product") {
 return JSON.stringify(
 {
 ...base,
 offers: {
"@type":"Offer",
 price: fields.price ||"19.99",
 priceCurrency: fields.currency ||"USD",
 availability:"https://schema.org/InStock",
 },
 },
 null,
 2
 );
 }

 if (type ==="LocalBusiness") {
 return JSON.stringify(
 {
 ...base,
 address: fields.address ||"123 Main Street, City, Country",
 telephone: fields.telephone ||"+1-555-000-0000",
 },
 null,
 2
 );
 }

 if (type ==="HowTo") {
 return JSON.stringify(
 {
 ...base,
 step: (fields.steps ||"Step one, Step two, Step three")
 .split(",")
 .map((step, index) => ({
"@type":"HowToStep",
 position: index + 1,
 text: step.trim(),
 })),
 },
 null,
 2
 );
 }

 if (type ==="Recipe") {
 return JSON.stringify(
 {
 ...base,
 prepTime: fields.prepTime ||"PT15M",
 cookTime: fields.cookTime ||"PT30M",
 recipeCategory:"Main dish",
 recipeCuisine:"International",
 },
 null,
 2
 );
 }

 if (type ==="Event") {
 return JSON.stringify(
 {
 ...base,
 startDate: fields.startDate || new Date().toISOString(),
 location: {
"@type":"Place",
 name: fields.location ||"Event Venue",
 },
 },
 null,
 2
 );
 }

 return JSON.stringify(base, null, 2);
}

export default function AiSchemaGeneratorClient() {
 const [schemaType, setSchemaType] = useState<SchemaType>("Article");
 const [name, setName] = useState("");
 const [description, setDescription] = useState("");
 const [url, setUrl] = useState("");
 const [image, setImage] = useState("");
 const [extra, setExtra] = useState<Record<string, string>>({});
 const [loading, setLoading] = useState(false);
 const [output, setOutput] = useState("");

 const extraFields = useMemo(() => {
 switch (schemaType) {
 case"Article":
 return [
 { key:"author", label:"Author"},
 { key:"datePublished", label:"Date Published"},
 ];
 case"Product":
 return [
 { key:"price", label:"Price"},
 { key:"currency", label:"Currency"},
 ];
 case"LocalBusiness":
 return [
 { key:"address", label:"Address"},
 { key:"telephone", label:"Telephone"},
 ];
 case"HowTo":
 return [{ key:"steps", label:"Steps (comma separated)"}];
 case"Recipe":
 return [
 { key:"prepTime", label:"Prep Time"},
 { key:"cookTime", label:"Cook Time"},
 ];
 case"Event":
 return [
 { key:"startDate", label:"Start Date"},
 { key:"location", label:"Location"},
 ];
 default:
 return [];
 }
 }, [schemaType]);

 const handleGenerate = async () => {
 if (!name.trim()) {
 toast.error("Enter at least the main name or title.");
 return;
 }

 setLoading(true);

 try {
 const prompt = `You are a structured data expert.
Generate valid JSON-LD schema markup for type: ${schemaType}.
Main name: ${name}
Description: ${description ||"Not provided"}
URL: ${url ||"Not provided"}
Image: ${image ||"Not provided"}
Additional fields: ${JSON.stringify(extra)}

Return ONLY valid JSON-LD. No explanations, no markdown fences.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 const data = await res.json();

 if (data.success && data.raw) {
 const cleaned = cleanJsonLd(String(data.raw));
 JSON.parse(cleaned);
 setOutput(cleaned);
 toast.success("Schema markup generated.");
 } else {
 throw new Error("API error");
 }
 } catch {
 setOutput(
 getFallbackSchema(schemaType, {
 name,
 description,
 url,
 image,
 ...extra,
 })
 );
 toast.error("AI offline. Loaded template fallback.");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Code2}
 title="AI Schema Markup Generator"
 description="Generate valid JSON-LD structured data for Articles, FAQs, Products, Local Businesses, and more."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Sparkles className="w-4 h-4 text-primary"/> Schema Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Schema Type</label>
 <select
 value={schemaType}
 onChange={(e) => setSchemaType(e.target.value as SchemaType)}
 className={fieldClass}
 >
 {schemaTypes.map((type) => (
 <option key={type} value={type}>
 {type}
 </option>
 ))}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Name / Title</label>
 <Input
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="e.g. Best SEO Practices"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Description</label>
 <textarea
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 rows={3}
 className={fieldClass}
 placeholder="Describe the page, product, event, or business..."
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">URL</label>
 <Input
 value={url}
 onChange={(e) => setUrl(e.target.value)}
 placeholder="https://example.com/page"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Image URL</label>
 <Input
 value={image}
 onChange={(e) => setImage(e.target.value)}
 placeholder="https://example.com/image.jpg"
 />
 </div>
 </div>

 {extraFields.length > 0 && (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {extraFields.map((field) => (
 <div key={field.key} className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
 <Input
 value={extra[field.key] ||""}
 onChange={(e) =>
 setExtra((prev) => ({
 ...prev,
 [field.key]: e.target.value,
 }))
 }
 placeholder={field.label}
 />
 </div>
 ))}
 </div>
 )}

 <Button onClick={() => void handleGenerate()} disabled={loading} className="w-full">
 {loading ? (
 <>
 <RefreshCw className="w-4 h-4 animate-spin"/> Generating...
 </>
 ) : (
 <>
 <Sparkles className="w-4 h-4"/> Generate JSON-LD
 </>
 )}
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Code2 className="w-4 h-4 text-primary"/> Generated JSON-LD
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <pre className="rounded-lg border border-border/60 bg-background/70 p-3 text-xs font-mono whitespace-pre-wrap break-words max-h-[420px] overflow-auto">
 {output ||"// Your generated schema markup will appear here..."}
 </pre>
 <div className="flex flex-col gap-2 sm:flex-row">
 <CopyButton getText={() => output} label="Copy JSON-LD"/>
 <a
 href="https://validator.schema.org/"
 target="_blank"
 rel="noreferrer"
 className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border/70 px-4 text-sm font-medium hover:bg-muted/40"
 >
 <ExternalLink className="w-4 h-4"/> Validate
 </a>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Choose Schema Type",
 description:"Select Article, FAQ, Product, LocalBusiness, HowTo, Recipe, or Event.",
 icon: Code2,
 },
 {
 step:"02",
 title:"Add Page Details",
 description:"Enter the relevant fields for the selected schema type.",
 icon: Sparkles,
 },
 {
 step:"03",
 title:"Copy and Validate",
 description:"Copy the JSON-LD output and test it with a schema validator.",
 icon: ExternalLink,
 },
 ]}
 badges={["AI-Powered","JSON-LD","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 {
 icon: Code2,
 title:"JSON-LD Output",
 description:"Creates structured data in the format commonly used by modern websites.",
 },
 {
 icon: Sparkles,
 title:"AI-Assisted Markup",
 description:"Turns simple field inputs into more complete schema markup.",
 },
 {
 icon: ExternalLink,
 title:"Validation Ready",
 description:"Includes a direct path to test the generated structured data.",
 },
 {
 icon: Code2,
 title:"Multiple Schema Types",
 description:"Supports common content, commerce, and local business formats.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>
 Schema markup helps search engines understand the meaning behind your content. Instead of only reading
 text, search engines can identify entities such as articles, products, events, FAQs, and businesses. This
 can improve how your pages appear in search features and rich results.
 </p>
 <p>
 JSON-LD is the most widely recommended format for structured data because it is clean, flexible, and easy
 to maintain. This generator produces JSON-LD based on the information you provide, helping you avoid common
 syntax mistakes and missing required properties.
 </p>
 <p>
 Always validate your final markup before deploying it. Structured data should accurately represent the
 visible content on the page. Incorrect or misleading schema can lead to poor implementation quality and may
 not be eligible for rich results.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 {
 question:"Does schema guarantee rich results?",
 answer:
"No. Schema helps search engines understand content, but eligibility and display depend on the search engine.",
 },
 {
 question:"Where should I place JSON-LD?",
 answer:
"Usually inside a script tag with type application/ld+json in the head or body of the page.",
 },
 {
 question:"Can I use this for local business SEO?",
 answer:
"Yes. LocalBusiness schema is especially useful for companies with physical locations.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/seo/ai-schema-generator" max={6} />
 </div>
 );
}
