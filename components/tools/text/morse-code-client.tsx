"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Radio, ArrowRightLeft, Copy } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const MORSE_MAP: Record<string, string> = {
"A":".-","B":"-...","C":"-.-.","D":"-..","E":".","F":"..-.",
"G":"--.","H":"....","I":"..","J":".---","K":"-.-","L":".-..",
"M":"--","N":"-.","O":"---","P":".--.","Q":"--.-","R":".-.",
"S":"...","T":"-","U":"..-","V":"...-","W":".--","X":"-..-",
"Y":"-.--","Z":"--..","0":"-----","1":".----","2":"..---",
"3":"...--","4":"....-","5":".....","6":"-....","7":"--...",
"8":"---..","9":"----.",".":".-.-.-",",":"--..--","?":"..--..",
"'":".----.","!":"-.-.--","/":"-..-.","(":"-.--.",")":"-.--.-",
"&":".-...",":":"---...",";":"-.-.-.","=":"-...-","+":".-.-.",
"-":"-....-","_":"..--.-", '"':".-..-.","$":"...-..-","@":".--.-."
};

const REVERSE_MORSE_MAP: Record<string, string> = Object.fromEntries(
 Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

export default function MorseCodeClient() {
 const [input, setInput] = useState("");
 const [mode, setMode] = useState<"text-to-morse"|"morse-to-text">("text-to-morse");

 const output = useMemo(() => {
 if (!input.trim()) return"";

 if (mode ==="text-to-morse") {
 return input
 .toUpperCase()
 .split("")
 .map((word) =>
 word
 .split("")
 .map((char) => MORSE_MAP[char] ||"")
 .filter(Boolean)
 .join("")
 )
 .join("/");
 } else {
 return input
 .split("/")
 .map((word) =>
 word
 .trim()
 .split("")
 .map((morse) => REVERSE_MORSE_MAP[morse] ||"")
 .join("")
 )
 .join("");
 }
 }, [input, mode]);

 const handleModeToggle = () => {
 setMode(mode ==="text-to-morse"?"morse-to-text":"text-to-morse");
 setInput("");
 toast.success(`Switched to ${mode ==="text-to-morse"?"Morse to Text":"Text to Morse"}`);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader
 icon={Radio}
 title="Morse Code Translator"
 description="Convert text to Morse code and decode Morse code back to readable text instantly."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Radio className="w-4 h-4 text-primary"/> Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={6}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 placeholder={mode ==="text-to-morse"?"Enter text to convert to Morse code...":"Enter Morse code (e.g., .... . .-.. .-.. --- / .-- --- .-. .-.. -..)"}
 />
 <Button onClick={handleModeToggle} variant="outline"className="w-full">
 <ArrowRightLeft className="w-4 h-4 mr-2"/>
 Switch to {mode ==="text-to-morse"?"Morse to Text":"Text to Morse"}
 </Button>
 </CardContent>
 </Card>

 {output && (
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Copy className="w-4 h-4 text-primary"/> Output
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea
 value={output}
 readOnly
 rows={6}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 />
 <CopyButton getText={() => output} label="Copy Output"/>
 </CardContent>
 </Card>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Enter Text or Morse", description:"Type your message or paste Morse code into the input field.", icon: Radio },
 { step:"02", title:"Select Conversion Mode", description:"Choose between converting text to Morse or decoding Morse back to text.", icon: ArrowRightLeft },
 { step:"03", title:"Copy Result", description:"Get the translated output instantly and copy it with a single click.", icon: Copy },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Radio, title:"International Standard", description:"Uses the official International Morse Code standard with all letters, numbers, and common punctuation."},
 { icon: ArrowRightLeft, title:"Bidirectional Translation", description:"Seamlessly switch between text-to-Morse and Morse-to-text modes."},
 { icon: Copy, title:"Word Separation", description:"Characters are separated by spaces and words by ' / ' for clear readability."},
 { icon: Radio, title:"Real-Time Processing", description:"See the translation results update live as you type."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Morse code is a character encoding system that represents letters, numbers, and punctuation as sequences of dots (.) and dashes (-). Invented by Samuel Morse and Alfred Vail in the 1830s, it became the standard for telegraph communication and remains relevant today in aviation, amateur radio, and emergency signaling.</p>
 <p>The International Morse Code standard assigns unique patterns to each character. For example,"SOS"— the universal distress signal — is encoded as"... --- ..."(three dots, three dashes, three dots). Letters within a word are separated by spaces, while words are separated by"/"(space-slash-space) in this tool's output format.</p>
 <p>Modern applications of Morse code include assistive technology for people with disabilities, amateur radio communication (CW mode), aviation navigation beacons, and educational exercises in computer science and history. This translator supports all 26 letters, 10 digits, and common punctuation marks according to the official standard.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What Morse code standard does this tool use?", answer:"This tool uses the International Morse Code standard, which is the most widely recognized and used worldwide."},
 { question:"How are words separated in the output?", answer:"Characters within a word are separated by single spaces, while words are separated by ' / ' (space-slash-space)."},
 { question:"Does it support special characters?", answer:"Yes, it supports common punctuation including periods, commas, question marks, exclamation points, and more."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/morse-code"max={6} />
 </div>
 );
}
