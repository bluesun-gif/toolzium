"use client";

import React, { useState, useMemo } from"react";
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
import { Terminal, Trash2 } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const FONT: Record<string, string[]> = {
 'A': [' ### ', '# #', '#####', '# #', '# #'], 'B': ['#### ', '# #', '#### ', '# #', '#### '],
 'C': [' ####', '# ', '# ', '# ', ' ####'], 'D': ['#### ', '# #', '# #', '# #', '#### '],
 'E': ['#####', '# ', '### ', '# ', '#####'], 'F': ['#####', '# ', '### ', '# ', '# '],
 'G': [' ####', '# ', '# ##', '# #', ' ### '], 'H': ['# #', '# #', '#####', '# #', '# #'],
 'I': ['#####', ' # ', ' # ', ' # ', '#####'], 'J': ['#####', ' #', ' #', '# #', ' ### '],
 'K': ['# #', '# # ', '### ', '# # ', '# #'], 'L': ['# ', '# ', '# ', '# ', '#####'],
 'M': ['# #', '## ##', '# # #', '# #', '# #'], 'N': ['# #', '## #', '# # #', '# ##', '# #'],
 'O': [' ### ', '# #', '# #', '# #', ' ### '], 'P': ['#### ', '# #', '#### ', '# ', '# '],
 'Q': [' ### ', '# #', '# # #', '# ##', ' ####'], 'R': ['#### ', '# #', '#### ', '# # ', '# #'],
 'S': [' ####', '# ', ' ### ', ' #', '#### '], 'T': ['#####', ' # ', ' # ', ' # ', ' # '],
 'U': ['# #', '# #', '# #', '# #', ' ### '], 'V': ['# #', '# #', '# #', ' # # ', ' # '],
 'W': ['# #', '# #', '# # #', '## ##', '# #'], 'X': ['# #', ' # # ', ' # ', ' # # ', '# #'],
 'Y': ['# #', ' # # ', ' # ', ' # ', ' # '], 'Z': ['#####', ' # ', ' # ', ' # ', '#####'],
 '0': [' ### ', '# ##', '# # #', '## #', ' ### '], '1': [' # ', ' ## ', ' # ', ' # ', '#####'],
 '2': [' ### ', '# #', ' ## ', ' # ', '#####'], '3': [' ### ', '# #', ' ## ', '# #', ' ### '],
 '4': ['# #', '# #', '#####', ' #', ' #'], '5': ['#####', '# ', '#### ', ' #', '#### '],
 '6': [' ### ', '# ', '#### ', '# #', ' ### '], '7': ['#####', ' # ', ' # ', ' # ', '# '],
 '8': [' ### ', '# #', ' ### ', '# #', ' ### '], '9': [' ### ', '# #', ' ####', ' #', ' ### '],
 ' ': [' ', ' ', ' ', ' ', ' ']
};

export default function AsciiArtClient() {
 const [input, setInput] = useState("TOOLZIUM");

 const asciiArt = useMemo(() => {
 const upper = input.toUpperCase();
 const lines = ["","","","",""];
 for (let i = 0; i < upper.length; i++) {
 const char = upper[i];
 const glyph = FONT[char] || FONT[' '];
 for (let row = 0; row < 5; row++) {
 lines[row] += (glyph[row] ||"") +"";
 }
 }
 return lines.join("\n");
 }, [input]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader 
 icon={Terminal} 
 title="ASCII Art Generator"
 description="Convert your text into retro block-style ASCII art instantly."
 />
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Terminal className="w-4 h-4 text-primary"/> Text Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="flex gap-2">
 <Input 
 value={input} 
 onChange={(e) => setInput(e.target.value)} 
 placeholder="Type something..."
 className="flex-1"
 maxLength={20}
 />
 <Button onClick={() => { setInput(""); toast.success("Cleared!"); }} variant="outline"size="icon">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 
 <div className="relative">
 <div className="absolute top-2 right-2 z-10">
 <CopyButton getText={() => asciiArt} label="Copy Art"/>
 </div>
 <pre className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 overflow-x-auto font-mono text-green-500 dark:text-green-400 min-h-[200px]">
 {asciiArt ||"Enter text above..."}
 </pre>
 </div>
 </CardContent>
 </Card>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Enter Text", description:"Type up to 20 characters in the input field.", icon: Terminal },
 { step:"02", title:"Auto-Convert", description:"Watch your text transform into block-style ASCII art in real-time.", icon: Terminal },
 { step:"03", title:"Copy & Share", description:"Copy the generated art and paste it into code comments or forums.", icon: Terminal }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides 
 features={[
 { icon: Terminal, title:"Block Font", description:"Uses a clean, readable 5-line block font for all letters and numbers."},
 { icon: Terminal, title:"Real-time Preview", description:"See your ASCII art update instantly as you type."},
 { icon: Terminal, title:"Code Friendly", description:"Output is formatted in a monospace block, perfect for source code comments."},
 { icon: Terminal, title:"Offline Capable", description:"No internet connection required; the font map is built into the tool."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>ASCII art is a graphic design technique that uses computers for presentation and consists of pictures pieced together from the 95 printable characters defined by the ASCII Standard.</p>
 <p>Our generator uses a custom 5-line block font to ensure maximum readability while maintaining that classic retro terminal aesthetic. It's perfect for adding flair to README files, code headers, or text-based chat rooms.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion 
 faqs={[
 { question:"Why is there a 20 character limit?", answer:"ASCII art takes up significant horizontal space. Limiting the input ensures the output remains readable and doesn't break layouts on smaller screens."},
 { question:"Does it support lowercase letters?", answer:"The tool automatically converts all input to uppercase to match the block font map, ensuring consistent styling."},
 { question:"Can I use special characters?", answer:"Currently, the tool supports A-Z, 0-9, and spaces. Special characters will be rendered as blank spaces."}
 ]} 
 />

 <RelatedTools currentToolUrl="/tools/fun/ascii-art"max={6} />
 </div>
 );
}
