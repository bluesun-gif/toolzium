"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/action-buttons";
import { User, Shuffle } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
type Category = "Fantasy" | "Sci-Fi" | "Modern" | "Medieval";
type Gender = "Male" | "Female" | "Neutral";
const names: Record<Category, Record<Gender, string[]>> = {
  Fantasy: {
    Male: ["Aragon", "Thorin", "Elrond", "Legolas", "Gandalf", "Boromir", "Faramir", "Theoden", "Eomer", "Haldir"],
    Female: ["Arwen", "Galadriel", "Eowyn", "Tauriel", "Luthien", "Idril", "Melian", "Varda", "Yavanna", "Nessa"],
    Neutral: ["Shadowfax", "Gollum", "Smaug", "Balrog", "Ent", "Eagle", "Warg", "Huorn", "Maiar", "Valar"]
  },
  "Sci-Fi": {
    Male: ["Zane", "Kael", "Jax", "Orion", "Vex", "Kaelen", "Rion", "Thal", "Xen", "Zanth"],
    Female: ["Nova", "Lyra", "Zyra", "Vora", "Cora", "Nyx", "Sira", "Ayla", "Elara", "Kira"],
    Neutral: ["Unit-734", "Cypher", "Nexus", "Proxy", "Echo", "Glitch", "Pixel", "Vector", "Zenith", "Quasar"]
  },
  Modern: {
    Male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"],
    Female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"],
    Neutral: ["Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn", "Cameron", "Dakota", "Reese"]
  },
  Medieval: {
    Male: ["Arthur", "Lancelot", "Galahad", "Percival", "Tristan", "Merlin", "Uther", "Mordred", "Gawain", "Bors"],
    Female: ["Guinevere", "Isolde", "Morgana", "Igraine", "Viviane", "Elaine", "Nimue", "Lynette", "Lyonesse", "Mab"],
    Neutral: ["Puck", "Robin", "Oberon", "Titania", "Ariel", "Caliban", "Prospero", "Goblin", "Fairy", "Sprite"]
  }
};
export default function NameGeneratorClient() {
  const [category, setCategory] = useState<Category>("Fantasy");
  const [gender, setGender] = useState<Gender>("Male");
  const [count, setCount] = useState(5);
  const [results, setResults] = useState<string[]>([]);
  const generate = () => {
    const pool = names[category][gender];
    const generated: string[] = [];
    for (let i = 0; i < count; i++) {
      generated.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    setResults(generated);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={User} title="Name Generator" description="Generate random character names for novels, RPGs, and games across multiple genres." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Generator Settings</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="space-y-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Category</label>
 <div className="flex flex-wrap gap-2">
 {(Object.keys(names) as Category[]).map(cat => <Button key={cat} variant={category === cat ? "default" : "outline"} onClick={() => setCategory(cat)}>
 {cat}
 </Button>)}
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">Gender</label>
 <div className="flex flex-wrap gap-2">
 {(["Male", "Female", "Neutral"] as Gender[]).map(gen => <Button key={gen} variant={gender === gen ? "default" : "outline"} onClick={() => setGender(gen)}>
 {gen}
 </Button>)}
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">Quantity: {count}</label>
 <input type="range" min="1" max="20" value={count} onChange={e => setCount(parseInt(e.target.value))} className="w-full accent-primary" />
 </div>
 </div>

 <Button onClick={generate} size="lg" className="w-full sm:w-auto">
 <Shuffle className="w-4 h-4 mr-2" /> Generate Names
 </Button>

 {results.length > 0 && <div className="space-y-4 mt-6">
 <div className="flex items-center justify-between">
 <h3 className="text-sm font-semibold">Generated Names</h3>
 <CopyButton getText={() => results.join(",")} label="Copy All" />
 </div>
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
 {results.map((name, i) => <div key={i} className="p-3 bg-muted/30 border border-border/50 rounded-lg flex items-center justify-between group">
 <span className="font-medium truncate">{name}</span>
 <CopyButton getText={() => name} label="" />
 </div>)}
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Pick Genre",
        description: "Select the thematic category that fits your world-building needs.",
        icon: User
      }, {
        step: "02",
        title: "Choose Gender",
        description: "Filter the database by male, female, or gender-neutral names.",
        icon: User
      }, {
        step: "03",
        title: "Generate",
        description: "Hit the button to pull random names from the curated lists.",
        icon: User
      }]} badges={["100% Free", "Client-Side", "Fun"]} />

 <ToolFeatureGuides features={[{
        icon: User,
        title: "Four Distinct Genres",
        description: "Covers Fantasy, Sci-Fi, Modern, and Medieval naming conventions."
      }, {
        icon: User,
        title: "Curated Databases",
        description: "Hand-picked names that actually fit the aesthetic of their respective genres."
      }, {
        icon: User,
        title: "Batch Generation",
        description: "Generate up to 20 names simultaneously to quickly populate a cast of characters."
      }, {
        icon: User,
        title: "Individual Copy",
        description: "Hover over any generated name to copy it to your clipboard with a single click."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Naming characters is often one of the most time-consuming parts of writing a novel or preparing a tabletop RPG campaign. A good name instantly conveys culture, era, and personality to the audience.</p>
 <p>Our generator pulls from strictly categorized lists to ensure you don't end up with a cyberpunk hacker named 'Galadriel' or a high elf named 'Kevin' (unless that's exactly what you're going for).</p>
 <p>Whether you need a quick NPC name for your D&D session or a list of crew members for your sci-fi screenplay, this tool provides instant, genre-appropriate inspiration.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Are these names randomly generated syllables?",
        answer: "No, we use curated lists of actual names and words that fit the aesthetic of each genre, rather than mashing random syllables together."
      }, {
        question: "Can I generate last names too?",
        answer: "Currently, the tool focuses on first names. For fantasy and medieval settings, many characters are known by a single name or a title."
      }, {
        question: "Will the generator repeat names?",
        answer: "If you generate a large batch, there is a chance of repeats since it draws randomly from a finite pool of 10 names per gender/category."
      }]} />

 <RelatedTools currentToolUrl="/tools/fun/name-generator" max={6} />
 </div></div>;
}