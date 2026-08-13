"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Switch } from"@/components/ui/switch";
import { Type, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

const pairings = [
 { id:"1", category:"Modern", heading:"Montserrat", body:"Roboto", url:"https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400&display=swap"},
 { id:"2", category:"Modern", heading:"Playfair Display", body:"Source Sans Pro", url:"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+Pro:wght@400&display=swap"},
 { id:"3", category:"Classic", heading:"Merriweather", body:"Open Sans", url:"https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Open+Sans:wght@400&display=swap"},
 { id:"4", category:"Minimal", heading:"Inter", body:"Inter", url:"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"},
 { id:"5", category:"Bold", heading:"Oswald", body:"Lora", url:"https://fonts.googleapis.com/css2?family=Lora:wght@400&family=Oswald:wght@700&display=swap"},
 { id:"6", category:"Playful", heading:"Pacifico", body:"Quicksand", url:"https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400&display=swap"},
 { id:"7", category:"Classic", heading:"Lora", body:"Merriweather", url:"https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Merriweather:wght@400&display=swap"},
 { id:"8", category:"Modern", heading:"Poppins", body:"PT Sans", url:"https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=PT+Sans:wght@400&display=swap"},
 { id:"9", category:"Bold", heading:"Bebas Neue", body:"Montserrat", url:"https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400&display=swap"},
 { id:"10", category:"Minimal", heading:"Work Sans", body:"Open Sans", url:"https://fonts.googleapis.com/css2?family=Work+Sans:wght@600&family=Open+Sans:wght@400&display=swap"},
];

export function FontPairingClient() {
 const [category, setCategory] = useState("All");
 const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog.");
 const [headingSize, setHeadingSize] = useState("32");
 const [bodySize, setBodySize] = useState("16");
 const [darkMode, setDarkMode] = useState(false);

 const filteredPairings = category ==="All"? pairings : pairings.filter(p => p.category === category);

 const getCss = (p: { url: string; heading: string; body: string }) => {
 return `@import url('${p.url}');\n\nh1 {\n font-family: '${p.heading}', sans-serif;\n}\n\np {\n font-family: '${p.body}', sans-serif;\n}`;
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader 
 icon={Type} 
 title="Font Pairing Suggester"
 description="Discover beautiful font pairings for your next design project."
 actions={
 <ResetButton onClick={() => {
 setCategory("All");
 setPreviewText("The quick brown fox jumps over the lazy dog.");
 setHeadingSize("32");
 setBodySize("16");
 setDarkMode(false);
 }} />
 } 
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Controls</CardTitle>
 <CardDescription>Adjust preview settings</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger><SelectValue placeholder="Category"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="All">All</SelectItem>
 <SelectItem value="Modern">Modern</SelectItem>
 <SelectItem value="Classic">Classic</SelectItem>
 <SelectItem value="Minimal">Minimal</SelectItem>
 <SelectItem value="Bold">Bold</SelectItem>
 <SelectItem value="Playful">Playful</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Heading Size (px)</Label>
 <Input type="number"value={headingSize} onChange={(e) => setHeadingSize(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Body Size (px)</Label>
 <Input type="number"value={bodySize} onChange={(e) => setBodySize(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Preview Text</Label>
 <Input value={previewText} onChange={(e) => setPreviewText(e.target.value)} />
 </div>
 </div>
 <div className="flex items-center space-x-2">
 <Switch checked={darkMode} onCheckedChange={setDarkMode} />
 <Label>Dark Mode</Label>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {filteredPairings.map((p) => (
 <GlassCard key={p.id}>
 <link href={p.url} rel="stylesheet"/>
 <CardHeader className="flex flex-row justify-between items-start">
 <div>
 <CardTitle className="text-lg">{p.heading} & {p.body}</CardTitle>
 <CardDescription>{p.category}</CardDescription>
 </div>
 <CopyButton getText={() => getCss(p)} label="Copy CSS"/>
 </CardHeader>
 <CardContent>
 <div className={cn("p-6 rounded-lg", (darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-slate-50 text-foreground'))}>
 <h1 style={{ fontFamily: `"${p.heading}", sans-serif`, fontSize: `${headingSize}px`, lineHeight: 1.2, marginBottom: '16px' }}>
 A Beautiful Story
 </h1>
 <p style={{ fontFamily: `"${p.body}", sans-serif`, fontSize: `${bodySize}px`, lineHeight: 1.6 }}>
 {previewText}
 </p>
 </div>
 </CardContent>
 </GlassCard>
 ))}
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Font Pairing Suggester?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Font Pairing Suggester provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/image/font-pairing" max={6} />

</div>
 );
}
