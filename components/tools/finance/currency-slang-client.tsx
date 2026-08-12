"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton } from"@/components/shared/action-buttons";
import { BookOpen, Search, Globe } from"lucide-react";

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
 </div>
 );
}
