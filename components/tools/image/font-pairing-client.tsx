"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Switch } from"@/components/ui/switch";
import { Copy, Eye, Type, Wand2 } from"lucide-react";

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
  const filteredPairings = category === "All" ? pairings : pairings.filter(p => p.category === category);
  const getCss = (p: {
    url: string;
    heading: string;
    body: string;
  }) => {
    return `@import url('${p.url}');\n\nh1 {\n font-family: '${p.heading}', sans-serif;\n}\n\np {\n font-family: '${p.body}', sans-serif;\n}`;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Type} title="Font Pairing Suggester" description="Discover beautiful font pairings for your next design project." actions={<ResetButton onClick={() => {
        setCategory("All");
        setPreviewText("The quick brown fox jumps over the lazy dog.");
        setHeadingSize("32");
        setBodySize("16");
        setDarkMode(false);
      }} />} />

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
 <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
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
 <Input type="number" value={headingSize} onChange={e => setHeadingSize(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Body Size (px)</Label>
 <Input type="number" value={bodySize} onChange={e => setBodySize(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Preview Text</Label>
 <Input value={previewText} onChange={e => setPreviewText(e.target.value)} />
 </div>
 </div>
 <div className="flex items-center space-x-2">
 <Switch checked={darkMode} onCheckedChange={setDarkMode} />
 <Label>Dark Mode</Label>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {filteredPairings.map(p => <GlassCard key={p.id}>
 <link href={p.url} rel="stylesheet" />
 <CardHeader className="flex flex-row justify-between items-start">
 <div>
 <CardTitle className="text-lg">{p.heading} & {p.body}</CardTitle>
 <CardDescription>{p.category}</CardDescription>
 </div>
 <CopyButton getText={() => getCss(p)} label="Copy CSS" />
 </CardHeader>
 <CardContent>
 <div className={cn("p-6 rounded-lg", darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-slate-50 text-foreground')}>
 <h1 style={{
                fontFamily: `"${p.heading}", sans-serif`,
                fontSize: `${headingSize}px`,
                lineHeight: 1.2,
                marginBottom: '16px'
              }}>
 A Beautiful Story
 </h1>
 <p style={{
                fontFamily: `"${p.body}", sans-serif`,
                fontSize: `${bodySize}px`,
                lineHeight: 1.6
              }}>
 {previewText}
 </p>
 </div>
 </CardContent>
 </GlassCard>)}
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick Base",
    description:"Choose a starting font.",
    icon: Type,
  },
{
    step:"02",
    title:"Suggest",
    description:"Get complementary pairings.",
    icon: Wand2,
  },
{
    step:"03",
    title:"Preview",
    description:"See them together.",
    icon: Eye,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Type,
    title:"Font Input",
    description:"Your base typeface.",
  },
{
    icon: Wand2,
    title:"Suggestions",
    description:"Harmonious pairs.",
  },
{
    icon: Eye,
    title:"Preview",
    description:"Live sample.",
  },
{
    icon: Copy,
    title:"Copy",
    description:"Grab font names.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A font pairing suggester recommends typeface combinations that work together, solving a common design hurdle. A single font can feel flat; pairing a distinctive heading font with a readable body font creates hierarchy and personality. This tool proposes harmonious pairs.</p>
  <p>Suggestion beats random trial. Curated combinations avoid clashes — like two decorative fonts fighting each other — and ensure the body remains legible. A live preview confirms the feel.</p>
  <p>Use it to start any typographic design. The tool's value is confident, tested font pairings without design expertise.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why pair fonts?",
    answer:"Contrast adds hierarchy and interest.",
  },
{
    question:"How suggested?",
    answer:"Based on style relationships.",
  },
{
    question:"Use case?",
    answer:"Web and print design.",
  },
{
    question:"Safe pairs?",
    answer:"Curated combinations.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
</div>
 );
}
