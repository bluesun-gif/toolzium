"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Copy, Code, FileCode, Scissors, CheckCircle, Sparkles } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const DEFAULT_SVG = `<?xml version="1.0"encoding="UTF-8"?>
<!-- Generator: Adobe Illustrator 25.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) -->
<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"version="1.1"id="Layer_1"x="0px"y="0px"viewBox="0 0 24 24"xml:space="preserve"fill-opacity="1"stroke-opacity="1">
 <metadata>Some metadata here</metadata>
 <path class="st0"fill="#FFFFFF"d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8 s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"/>
 <circle fill="#FF0000"cx="12"cy="12"r="4"/>
</svg>`;

interface OptimizeOptions {
 removeComments: boolean;
 removeMetadata: boolean;
 minifyWhitespace: boolean;
 shortenColors: boolean;
 removeDefaults: boolean;
}

export default function SvgOptimizerClient() {
 const [inputSvg, setInputSvg] = useState(DEFAULT_SVG);
 const [options, setOptions] = useState<OptimizeOptions>({
 removeComments: true,
 removeMetadata: true,
 minifyWhitespace: true,
 shortenColors: true,
 removeDefaults: true
 });
 const [activeTab, setActiveTab] = useState<"optimized"|"react"|"uri">("optimized");

 const optimizedSvg = useMemo(() => {
 let result = inputSvg;
 if (options.removeComments) result = result.replace(/<!--[\s\S]*?-->/g,"");
 if (options.removeMetadata) result = result.replace(/<metadata>[\s\S]*?<\/metadata>/g,"");
 if (options.minifyWhitespace) result = result.replace(/\s+/g,"").replace(/>\s+</g,"><").trim();
 if (options.shortenColors) result = result.replace(/#([a-f0-9])\1([a-f0-9])\2([a-f0-9])\3/gi,"#$1$2$3");
 if (options.removeDefaults) {
 result = result.replace(/fill-opacity="1"/g,"");
 result = result.replace(/stroke-opacity="1"/g,"");
 result = result.replace(/xmlns:xlink="[^"]*"/g,"");
 result = result.replace(/xml:space="preserve"/g,"");
 result = result.replace(/version="[^"]*"/g,"");
 }
 return result;
 }, [inputSvg, options]);

 const reactComponent = useMemo(() => {
 let code = optimizedSvg;
 code = code.replace(/class=/g,"className=");
 code = code.replace(/stroke-width=/g,"strokeWidth=");
 code = code.replace(/fill-rule=/g,"fillRule=");
 code = code.replace(/clip-rule=/g,"clipRule=");
 code = code.replace(/stroke-linecap=/g,"strokeLinecap=");
 code = code.replace(/stroke-linejoin=/g,"strokeLinejoin=");
 code = code.replace(/stroke-miterlimit=/g,"strokeMiterlimit=");
 code = code.replace(/stroke-dasharray=/g,"strokeDasharray=");
 code = code.replace(/stroke-dashoffset=/g,"strokeDashoffset=");
 code = code.replace(/stroke-opacity=/g,"strokeOpacity=");
 code = code.replace(/fill-opacity=/g,"fillOpacity=");
 return `import React from 'react';\n\nconst SvgIcon = (props: React.SVGProps<SVGSVGElement>) => (\n ${code.replace(/<svg/,"<svg {...props}")}\n);\n\nexport default SvgIcon;`;
 }, [optimizedSvg]);

 const dataUri = useMemo(() => {
 try {
 return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(optimizedSvg)))}`;
 } catch {
 return"Error generating Data URI";
 }
 }, [optimizedSvg]);

 const originalSize = new Blob([inputSvg]).size;
 const optimizedSize = new Blob([optimizedSvg]).size;
 const savings = originalSize > 0 ? Math.round(((originalSize - optimizedSize) / originalSize) * 100) : 0;

 const getOutputContent = () => {
 if (activeTab ==="optimized") return optimizedSvg;
 if (activeTab ==="react") return reactComponent;
 return dataUri;
 };

 const handleCopy = () => {
 navigator.clipboard.writeText(getOutputContent());
 toast.success("Copied to clipboard!");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Scissors}
 title="SVG Optimizer & React Converter"
 description="Minify SVG code, convert to React JSX components, and generate Base64 Data URIs instantly."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Code className="w-4 h-4"/> Input SVG</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <textarea
 value={inputSvg}
 onChange={(e) => setInputSvg(e.target.value)}
 rows={12}
 className={textareaClass}
 placeholder="Paste your SVG code here..."
 />
 <div className="grid grid-cols-2 gap-3">
 {Object.entries(options).map(([key, val]) => (
 <label key={key} className="flex items-center gap-2 text-xs cursor-pointer hover:text-primary transition-colors">
 <input type="checkbox"checked={val as boolean} 
 onChange={(e) => setOptions({ ...options, [key]: e.target.checked })} 
 className="rounded border-border accent-primary"/>
 <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
 </label>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><CheckCircle className="w-4 h-4"/> Live Preview & Stats</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
 <div className="text-xs">
 <span className="text-muted-foreground">Original:</span> <span className="font-bold">{originalSize} bytes</span>
 <span className="mx-2">→</span>
 <span className="text-muted-foreground">Optimized:</span> <span className="font-bold text-primary">{optimizedSize} bytes</span>
 </div>
 <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">{savings}% Saved</span>
 </div>
 
 <div className="h-48 flex items-center justify-center rounded-lg border border-border/50 p-4"
 style={{ backgroundImage:"linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)", backgroundSize:"20px 20px", backgroundPosition:"0 0, 0 10px, 10px -10px, -10px 0px"}}>
 <div className="w-full h-full flex items-center justify-center max-w-[200px] max-h-[200px] text-foreground"
 dangerouslySetInnerHTML={{ __html: optimizedSvg }} />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full flex-wrap gap-4">
 <div className="flex gap-2">
 {(["optimized","react","uri"] as const).map((tab) => (
 <Button key={tab} variant={activeTab === tab ?"default":"outline"} size="sm"onClick={() => setActiveTab(tab)} className="capitalize">
 {tab ==="uri"?"Data URI": tab ==="react"?"React JSX":"Optimized SVG"}
 </Button>
 ))}
 </div>
 <button
 onClick={handleCopy}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
 >
 <Copy className="w-3.5 h-3.5"/> Copy {activeTab ==="uri"?"URI":"Code"}
 </button>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <pre className="w-full bg-background text-cyan-400 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-96 whitespace-pre-wrap break-all">
 {getOutputContent()}
 </pre>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Paste SVG", description:"Drop your raw SVG code exported from Figma, Illustrator, or Sketch.", icon: Code },
 { step:"02", title:"Configure", description:"Select which optimizations to apply, like removing metadata or shortening hex codes.", icon: Scissors },
 { step:"03", title:"Export", description:"Copy the minified SVG, React component, or Base64 Data URI for your project.", icon: FileCode }
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Scissors, title:"Smart Minification", description:"Strips comments, metadata, and collapses whitespace to reduce file size."},
 { icon: FileCode, title:"React Converter", description:"Automatically converts attributes to camelCase for JSX compatibility."},
 { icon: Sparkles, title:"Data URI Generator", description:"Embed SVGs directly in CSS to eliminate extra HTTP requests."},
 { icon: CheckCircle, title:"Visual Preview", description:"Verify your optimized SVG renders correctly with a transparent checkerboard background."}
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>Optimizing SVGs for High-Performance Web Applications</h3>
 <p>Scalable Vector Graphics (SVG) are the gold standard for web icons, illustrations, and logos due to their infinite scalability and tiny file sizes. However, SVG files exported from design tools like Figma, Illustrator, or Sketch are often bloated with unnecessary metadata, redundant attributes, and excessive whitespace. This bloat not only increases your HTML payload but can also negatively impact rendering performance and DOM parsing speed. An enterprise-grade SVG optimization workflow is essential for maintaining a high-performance web application.</p>
 <p>The optimization process involves several key steps: stripping XML comments, removing editor-specific metadata (such as <code>xmlns:xlink</code> or Adobe Illustrator namespaces), collapsing whitespace, and minifying the overall structure. Furthermore, converting verbose hexadecimal color codes to their shortest shorthand equivalents and removing default attribute values (like <code>fill-opacity="1"</code>) shaves off crucial bytes.</p>
 <p>Beyond simple minification, modern frontend development requires SVGs to be integrated seamlessly into component-based frameworks like React, Vue, and Svelte. Raw SVG attributes often clash with JSX syntax; for example, the <code>class</code> attribute must be converted to <code>className</code>, and hyphenated attributes like <code>stroke-width</code> must be transformed into camelCase (<code>strokeWidth</code>). Our tool automates this entire pipeline, transforming bloated design exports into clean, typed React components ready for immediate use. Additionally, generating a Base64 Data URI allows you to embed the optimized SVG directly into your CSS as a background image, eliminating extra HTTP requests and further accelerating your site's load time. By rigorously optimizing your SVG assets, you ensure a faster, more efficient, and more maintainable codebase.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Is it safe to remove the xmlns attribute?", answer:"The primary xmlns='http://www.w3.org/2000/svg' is required for standalone SVG files. However, if you are embedding the SVG inline directly inside HTML5, it is technically optional, though keeping it is recommended for maximum compatibility."},
 { question:"Why convert to a React component?", answer:"React requires SVG attributes to be camelCased (e.g., strokeWidth instead of stroke-width) and uses className instead of class. This tool automates that translation so you can drop the code straight into your TSX files."},
 { question:"When should I use a Data URI?", answer:"Data URIs are perfect for small icons used as CSS background images. They prevent the browser from making an extra network request, though they increase the size of your CSS file slightly due to Base64 encoding overhead."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/svg-optimizer" max={6} />
 </div>
 );
}
