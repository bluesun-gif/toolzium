"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Minimize2, Code, BarChart3, BookOpen, Shield, Code2, Zap, FileCode, Layers, Globe, AlignLeft } from"lucide-react";
import toast from"react-hot-toast";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GridPattern } from"@/components/magicui/grid-pattern";

type Language ="html"|"css"|"js";

export function CodeMinifierClient() {
 const [inputCode, setInputCode] = useState("");
 const [minifiedCode, setMinifiedCode] = useState("");
 const [language, setLanguage] = useState<Language>("html");
 
 const handleMinify = () => {
 if (!inputCode.trim()) {
 toast.error("Please enter some code to minify.");
 return;
 }

 let minified = inputCode;
 try {
 if (language ==="css") {
 minified = minified.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments
 minified = minified.replace(/\s+/g, ' '); // Collapse whitespace
 minified = minified.replace(/\s*([\{\}\:\;\,])\s*/g, '$1'); // Remove spaces around characters
 minified = minified.trim();
 } else if (language ==="js") {
 minified = minified.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove block comments
 minified = minified.replace(/\/\/.*$/gm, ''); // Remove line comments
 minified = minified.replace(/\s+/g, ' '); // Collapse whitespace
 minified = minified.trim();
 } else if (language ==="html") {
 minified = minified.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
 minified = minified.replace(/>\s+</g, '><'); // Remove spaces between tags
 minified = minified.trim();
 }
 setMinifiedCode(minified);
 toast.success("Code minified successfully!");
 } catch (error) {
 toast.error("Failed to minify code.");
 }
 };

 const handleReset = () => {
 setInputCode("");
 setMinifiedCode("");
 toast.success("Reset successfully.");
 };
 
 const originalSize = new Blob([inputCode]).size;
 const minifiedSize = new Blob([minifiedCode]).size;
 const savings = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) :"0.0";

 return (
 <div className="max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Minimize2}
 title="Code Minifier"
 description="Minify your HTML, CSS, and JavaScript code to reduce file size and improve loading speed."
 actions={
 <>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 <CardDescription>Choose the language you want to minify.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex space-x-2">
 {(["html","css","js"] as Language[]).map((lang) => (
 <Button
 key={lang}
 variant={language === lang ?"default":"outline"}
 onClick={() => setLanguage(lang)}
 className="uppercase"
 >
 {lang}
 </Button>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Code className="h-5 w-5 text-primary"/>
 Original Code
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label htmlFor="input-code">Paste your {language.toUpperCase()} code here:</Label>
 <textarea
 id="input-code"
 className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
 placeholder={`Paste ${language.toUpperCase()} code...`}
 value={inputCode}
 onChange={(e) => setInputCode(e.target.value)}
 />
 </div>
 <Button onClick={handleMinify} className="w-full">Minify {language.toUpperCase()}</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <div className="flex items-center justify-between">
 <CardTitle className="flex items-center gap-2">
 <Minimize2 className="h-5 w-5 text-primary"/>
 Minified Output
 </CardTitle>
 {minifiedCode && (
 <CopyButton getText={() => minifiedCode} label="Copy"/>
 )}
 </div>
 </CardHeader>
 <CardContent className="space-y-4">
 <textarea
 readOnly
 className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
 placeholder="Minified code will appear here..."
 value={minifiedCode}
 />
 {minifiedCode && (
 <div className="grid grid-cols-3 gap-2 text-center text-sm">
 <div className="rounded-lg bg-secondary/50 p-2">
 <div className="text-muted-foreground">Original</div>
 <div className="font-semibold">{originalSize} bytes</div>
 </div>
 <div className="rounded-lg bg-secondary/50 p-2">
 <div className="text-muted-foreground">Minified</div>
 <div className="font-semibold">{minifiedSize} bytes</div>
 </div>
 <div className="rounded-lg bg-primary/10 p-2 text-primary">
 <div className="flex items-center justify-center gap-1">
 <BarChart3 className="h-3 w-3"/>
 <span>Saved</span>
 </div>
 <div className="font-bold">{savings}%</div>
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Paste Your Code",
 description:"Paste JavaScript, CSS, or HTML code into the editor. Select the language type from the dropdown for optimal minification.",
 icon: Code2,
 },
 {
 step:"02",
 title:"Click Minify",
 description:"The minifier removes whitespace, comments, and shortens variable names where safe. See the compression ratio and byte savings instantly.",
 icon: Zap,
 },
 {
 step:"03",
 title:"Copy Minified Output",
 description:"Copy the minified code with one click. Use it in your production build, CDN, or inline script tag to reduce page load time.",
 icon: BookOpen,
 },
 ]}
 badges={[
"JS, CSS & HTML",
"Shows size reduction",
"No uploads",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Code2,
 title:"JavaScript Minification",
 description:"Removes comments, whitespace, and unnecessary semicolons. Shortens local variable names. Produces valid, functionally identical JS for production.",
 },
 {
 icon: FileCode,
 title:"CSS Minification",
 description:"Strips CSS comments, collapses whitespace, removes redundant semicolons, and merges duplicate selectors — reducing stylesheet size by 20–40%.",
 },
 {
 icon: Globe,
 title:"HTML Minification",
 description:"Removes HTML comments, collapses whitespace between tags, and strips optional closing tags — safely reducing HTML payload size.",
 },
 {
 icon: BarChart3,
 title:"Compression Stats",
 description:"Shows original size, minified size, bytes saved, and percentage reduction — so you can measure the real impact on your page load budget.",
 },
 {
 icon: Layers,
 title:"Preserves Functionality",
 description:"Minification never changes behavior — only formatting. String contents, logic, and CSS values remain bit-for-bit identical to the original.",
 },
 {
 icon: Shield,
 title:"Client-Side & Private",
 description:"All minification runs in your browser. Your source code is never sent to any server — safe for proprietary or confidential code.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Code Minification — Why It Matters for Web Performance</h3>
 <p>
 <strong>Minification</strong> is the process of removing all unnecessary characters from source code
 without changing its functionality. This includes whitespace, comments, newlines, and block delimiters.
 For JavaScript, it also includes shortening variable names. Minified code is harder to read but
 significantly smaller — reducing download size and improving web page load time.
 </p>

 <h4 className="font-semibold">Minification vs Compression vs Obfuscation</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Technique</th>
 <th className="border p-2 text-left">What It Does</th>
 <th className="border p-2 text-left">Size Reduction</th>
 <th className="border p-2 text-left">Reversible?</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Minification","Removes whitespace, comments, shortens names","10–40%","Yes (source maps)"],
 ["Gzip/Brotli","Lossless compression at transfer time","60–80%","Yes (automatic)"],
 ["Obfuscation","Renames symbols to meaningless names","5–10%","No"],
 ["Tree shaking","Removes unused code exports","Varies","Yes (build tools)"],
 ].map(([tech, what, size, rev]) => (
 <tr key={tech} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{tech}</td>
 <td className="border p-2 text-xs">{what}</td>
 <td className="border p-2 text-primary font-mono text-xs">{size}</td>
 <td className="border p-2 text-xs">{rev}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Typical Size Reductions by File Type</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">File Type</th>
 <th className="border p-2 text-left">Typical Minification Saving</th>
 <th className="border p-2 text-left">Tool Used In Production</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["JavaScript","20–50%","Terser, esbuild, SWC"],
 ["CSS","15–40%","cssnano, Lightning CSS, PostCSS"],
 ["HTML","5–20%","html-minifier-terser"],
 ["SVG","20–60%","SVGO"],
 ["JSON","10–25%","JSON.stringify() without spaces"],
 ].map(([type, saving, tool]) => (
 <tr key={type} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{type}</td>
 <td className="border p-2 text-primary font-mono text-xs">{saving}</td>
 <td className="border p-2 text-muted-foreground text-xs">{tool}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Source Maps — Debugging Minified Code</h4>
 <p>
 Production builds should always generate <strong>source maps</strong> alongside minified files.
 A source map (`.js.map`) maps the minified code back to the original source, allowing browser
 DevTools to show readable stack traces and debug minified production code. Modern bundlers
 (Vite, webpack, esbuild) generate source maps automatically.
 </p>

 <h4 className="font-semibold">Build Tool Integration</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>Vite:</strong> Minifies with esbuild by default in production builds. Switch to Rollup+Terser for better compression.</li>
 <li><strong>Next.js:</strong> Uses SWC minifier by default since Next.js 13 — significantly faster than Babel/Terser.</li>
 <li><strong>webpack:</strong> Uses TerserPlugin for JS and css-minimizer-webpack-plugin for CSS.</li>
 <li><strong>Manual use:</strong> This tool is ideal for quickly minifying individual snippets, config files, or inline scripts without a full build pipeline.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What is the difference between minification and uglification?",
 answer:"Minification removes whitespace and comments. Uglification (sometimes called uglifying) additionally renames variables to short names like a, b, c to further reduce size. Most modern tools like Terser do both — the terms are often used interchangeably.",
 },
 {
 question:"Does minification break my code?",
 answer:"Minification should never change the behavior of your code — it is a safe transformation. However, code that depends on function.name, relies on specific whitespace, or uses eval() with variable names can break. Always test minified output before deploying to production.",
 },
 {
 question:"Should I minify code in development?",
 answer:"No. Only minify for production builds. In development, readable code with source maps makes debugging much easier. Most build tools (Vite, webpack, Next.js) automatically minify only in production mode.",
 },
 {
 question:"What is the best JavaScript minifier for production?",
 answer:"esbuild is the fastest (used by Vite), SWC is fast and Rust-based (used by Next.js), and Terser produces the smallest output but is slower. For most projects, esbuild or SWC offers the best speed/size tradeoff. Use this tool for quick one-off minification.",
 },
 {
 question:"How much does minification reduce file size?",
 answer:"Typically 15–50% for JavaScript, 15–40% for CSS, and 5–20% for HTML. Combined with Gzip or Brotli compression (automatic on most servers and CDNs), total transfer size reduction can exceed 80% compared to unoptimized source files.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/dev/code-minifier" max={6} />
 </div>
 );
}
