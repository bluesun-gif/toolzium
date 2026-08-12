"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { CopyButton } from"@/components/shared/action-buttons";
import { RotateCw, Lock, Unlock, Zap } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

export default function Rot13Client() {
 const [text, setText] = useState("");

 const output = useMemo(() => {
 return text.replace(/[a-zA-Z]/g, (c) => {
 const base = c <="Z"? 65 : 97;
 return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
 });
 }, [text]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader icon={RotateCw} title="ROT13 Encoder/Decoder"description="Apply the classic ROT13 letter substitution cipher to hide or reveal text instantly."/>
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Lock className="w-4 h-4 text-primary"/> Input Text</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={6}
 className={textareaClass}
 placeholder="Type or paste text to encode/decode with ROT13..."
 />
 <div className="text-xs text-muted-foreground text-right">{text.length} characters</div>
 </CardContent>
 </Card>

 {output && (
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Unlock className="w-4 h-4 text-primary"/> ROT13 Output</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea value={output} readOnly rows={6} className={textareaClass} />
 <div className="flex justify-end">
 <CopyButton getText={() => output} label="Copy Result"/>
 </div>
 </CardContent>
 </Card>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Enter Message", description:"Type a secret message or paste an existing ROT13 encoded string.", icon: Lock },
 { step:"02", title:"Auto-Transform", description:"The cipher automatically shifts every letter by 13 positions in the alphabet.", icon: RotateCw },
 { step:"03", title:"Copy Output", description:"Grab the encoded or decoded text. Run it through again to reverse the process.", icon: Unlock },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: RotateCw, title:"Symmetric Cipher", description:"Because the alphabet has 26 letters, encoding twice returns the original text. Encode and decode use the same function."},
 { icon: Lock, title:"Preserves Formatting", description:"Numbers, punctuation, spaces, and casing are completely ignored and preserved exactly as typed."},
 { icon: Zap, title:"Instant Processing", description:"Applies the mathematical shift in real-time as you type, with zero latency."},
 { icon: Unlock, title:"Spoiler Protection", description:"Widely used on forums to hide puzzle answers, spoilers, and offensive jokes from casual scrollers."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>ROT13 ("rotate by 13 places") is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the Latin alphabet. It is a special case of the Caesar cipher, which was developed in ancient Rome. Because there are 26 letters in the basic Latin alphabet and 13 is exactly half of 26, the algorithm is its own inverse. This means applying ROT13 twice restores the original text.</p>
 <p>Historically, ROT13 found massive popularity on early internet forums, Usenet groups, and BBS systems as a way to hide spoilers, puzzle solutions, or mildly offensive jokes from people who didn't want to see them. By encoding the text, readers had to actively choose to decode it, acting as a primitive"spoiler warning"long before modern web UIs implemented blur overlays and click-to-reveal tags.</p>
 <p>It is crucial to understand that ROT13 provides absolutely zero cryptographic security. It is not encryption; it is merely an obfuscation technique. Anyone can reverse it instantly without a key. Therefore, it should never be used to protect passwords, personal data, or sensitive communications. Its value today lies purely in recreational cryptography, CTF (Capture The Flag) hacking challenges, and basic text masking.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Is ROT13 secure for encrypting passwords?", answer:"Absolutely not. ROT13 is a trivial substitution cipher that can be broken instantly by any computer or even by hand. Never use it for security purposes."},
 { question:"Why are numbers and punctuation unchanged?", answer:"The ROT13 algorithm only operates on alphabetic characters (A-Z, a-z). All other characters are passed through untouched to preserve sentence structure."},
 { question:"How do I decode a ROT13 message?", answer:"Because the cipher is symmetric, you simply paste the encoded message back into the input box. The output will be the original decoded text."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/rot13"max={6} />
 </div>
 );
}
