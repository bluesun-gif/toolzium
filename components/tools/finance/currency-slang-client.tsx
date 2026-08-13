"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton } from"@/components/shared/action-buttons";
import { BookOpen, Search, Globe, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const SLANG_DATA = [
 { term:"Buck", meaning:"One US Dollar", origin:"US", category:"US Slang", example:"Can you lend me a buck?"},
 { term:"Quid", meaning:"One British Pound", origin:"UK", category:"UK Slang", example:"That'll be ten quid."},
 { term:"HODL", meaning:"Hold On for Dear Life; holding crypto instead of selling", origin:"Internet", category:"Crypto", example:"Don't sell now, just HODL!"},
 { term:"Loonie", meaning:"Canadian one-dollar coin", origin:"Canada", category:"General", example:"I have a few loonies in my pocket."},
 { term:"Greenback", meaning:"US paper money", origin:"US", category:"Historical", example:"He paid in cold, hard greenbacks."},
 { term:"Fiver", meaning:"Five pounds or five dollars", origin:"UK/US", category:"General", example:"Can I borrow a fiver?"},
 { term:"Toonie", meaning:"Canadian two-dollar coin", origin:"Canada", category:"General", example:"A coffee costs about a toonie."},
 { term:"Whale", meaning:"Someone who holds a massive amount of cryptocurrency", origin:"Crypto", category:"Crypto", example:"A whale just moved 10,000 BTC."},
 { term:"Cabbage", meaning:"Paper money (because it's green)", origin:"US", category:"US Slang", example:"He's got a lot of cabbage."},
 { term:"Dosh", meaning:"Money", origin:"UK", category:"UK Slang", example:"I don't have enough dosh for that."},
];

export function CurrencySlangClient() {
 const [search, setSearch] = useState("");
 const [category, setCategory] = useState("All");
 
 const filteredData = SLANG_DATA.filter(item => {
 const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) || item.meaning.toLowerCase().includes(search.toLowerCase());
 const matchesCat = category ==="All"|| item.category === category;
 return matchesSearch && matchesCat;
 });

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={BookOpen}
 title="Currency Slang Dictionary"
 description="Dictionary of money and currency slang terms worldwide."
 actions={<></>}
 />

 <GlassCard>
 <CardContent className="pt-6">
 <div className="flex flex-col md:flex-row gap-4">
 <div className="relative flex-1">
 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
 <Input 
 placeholder="Search terms or meanings..."
 className="pl-9"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 />
 </div>
 <div className="w-full md:w-64">
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger>
 <SelectValue placeholder="Category"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="All">All Categories</SelectItem>
 <SelectItem value="US Slang">US Slang</SelectItem>
 <SelectItem value="UK Slang">UK Slang</SelectItem>
 <SelectItem value="Crypto">Crypto</SelectItem>
 <SelectItem value="General">General</SelectItem>
 <SelectItem value="Historical">Historical</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
 {filteredData.length > 0 ? filteredData.map((item, i) => (
 <GlassCard key={i} className="flex flex-col h-full">
 <CardHeader className="pb-2">
 <div className="flex justify-between items-start">
 <CardTitle className="text-xl text-primary">{item.term}</CardTitle>
 <CopyButton getText={() => `${item.term}: ${item.meaning}`} label="Copy"/>
 </div>
 <CardDescription className="flex items-center gap-1 mt-1">
 <Globe className="w-3 h-3"/> {item.origin} &bull; {item.category}
 </CardDescription>
 </CardHeader>
 <CardContent className="flex-1 flex flex-col justify-between">
 <p className="font-medium text-sm mb-3">{item.meaning}</p>
 <div className="text-xs text-muted-foreground italic bg-muted/30 p-2 rounded">
"{item.example}"
 </div>
 </CardContent>
 </GlassCard>
 )) : (
 <div className="col-span-full py-12 text-center text-muted-foreground">
 No terms found matching your criteria.
 </div>
 )}
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
          <h3>Why Use Our Currency Slang Dictionary?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Currency Slang Dictionary provides
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

      <RelatedTools currentToolUrl="/tools/finance/currency-slang" max={6} />

</div>
 );
}
