"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton } from"@/components/shared/action-buttons";
import { BookOpen, Globe, Lightbulb, Search } from"lucide-react";

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
    const matchesCat = category === "All" || item.category === category;
    return matchesSearch && matchesCat;
  });
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={BookOpen} title="Currency Slang Dictionary" description="Dictionary of money and currency slang terms worldwide." actions={<></>} />

 <GlassCard>
 <CardContent className="pt-6">
 <div className="flex flex-col md:flex-row gap-4">
 <div className="relative flex-1">
 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
 <Input placeholder="Search terms or meanings..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
 </div>
 <div className="w-full md:w-64">
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger>
 <SelectValue placeholder="Category" />
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
 {filteredData.length > 0 ? filteredData.map((item, i) => <GlassCard key={i} className="flex flex-col h-full">
 <CardHeader className="pb-2">
 <div className="flex justify-between items-start">
 <CardTitle className="text-xl text-primary">{item.term}</CardTitle>
 <CopyButton getText={() => `${item.term}: ${item.meaning}`} label="Copy" />
 </div>
 <CardDescription className="flex items-center gap-1 mt-1">
 <Globe className="w-3 h-3" /> {item.origin} &bull; {item.category}
 </CardDescription>
 </CardHeader>
 <CardContent className="flex-1 flex flex-col justify-between">
 <p className="font-medium text-sm mb-3">{item.meaning}</p>
 <div className="text-xs text-muted-foreground italic bg-muted/30 p-2 rounded">
"{item.example}"
 </div>
 </CardContent>
 </GlassCard>) : <div className="col-span-full py-12 text-center text-muted-foreground">
 No terms found matching your criteria.
 </div>}
 </div>
 )}
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Browse Terms",
    description:"Explore slang for money worldwide.",
    icon: BookOpen,
  },
{
    step:"02",
    title:"Search",
    description:"Find a specific term quickly.",
    icon: Search,
  },
{
    step:"03",
    title:"Learn",
    description:"Read origin and usage notes.",
    icon: Lightbulb,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: BookOpen,
    title:"Global Coverage",
    description:"Terms from US, UK, and many regions.",
  },
{
    icon: Search,
    title:"Quick Lookup",
    description:"Jump straight to a word.",
  },
{
    icon: Lightbulb,
    title:"Context Notes",
    description:"Explains where and why slang is used.",
  },
{
    icon: Globe,
    title:"Cultural Insight",
    description:"Connects language to local finance culture.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Money has a rich slang vocabulary that varies by country and community. A dictionary of currency slang helps travelers, writers, and curious minds understand informal references they encounter in speech, media, or online. Terms like buck, quid, or coin carry history and local color that formal names lack.</p>
  <p>Slang emerges from practicality. Nicknames are faster to say and often reference the currency's design, a historical figure, or a cultural joke. The US dollar's buck traces to colonial deer-skin trading, while the UK's quid has murkier but similarly informal roots. Knowing these enriches understanding of everyday language.</p>
  <p>Regional variation is the tricky part. The same word can mean different things across borders, and some slang is hyper-local. A term common in one city may puzzle someone from another region, so context matters. The dictionary flags origin and usage so you know when a word fits and when it might confuse.</p>
  <p>Use this reference for flavor and clarity, not for financial transactions. Slang has no place in contracts, transfers, or bank forms where precise terms are required. But for conversation, content creation, or decoding a foreign film, it adds nuance. Browsing the collection also reveals how people relate to money emotionally and culturally — a small window into how different societies talk about value.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why do currencies have nicknames?",
    answer:"Slang makes everyday talk easier and reflects local culture and history.",
  },
{
    question:"Is buck only for dollars?",
    answer:"Buck commonly means US dollar but similar slang exists for other currencies.",
  },
{
    question:"Are these terms formal?",
    answer:"No, they are informal; use them casually, not in contracts or banking.",
  },
{
    question:"Do regions share slang?",
    answer:"Some terms spread globally; others are strictly local.",
  },
{
    question:"Can slang cause confusion?",
    answer:"Yes, the same word can mean different amounts in different places, so clarify when needed.",
  }
  ]}
/>
</div>
 );
}
