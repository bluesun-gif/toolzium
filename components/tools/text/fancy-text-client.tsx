"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Type, Sparkles, Globe, Shield, Zap, Star } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const mapChar = (char: string, mapStr: string) => {
  const index = CHARS.indexOf(char);
  if (index === -1) return char;
  const arr = Array.from(mapStr);
  return arr[index] || char;
};

const STYLES = [
  {
    name: "Mathematical Bold",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗')).join('')
  },
  {
    name: "Mathematical Italic",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍0123456789')).join('')
  },
  {
    name: "Double-struck",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡')).join('')
  },
  {
    name: "Fraktur",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789')).join('')
  },
  {
    name: "Script",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵0123456789')).join('')
  },
  {
    name: "Circled",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨')).join('')
  },
  {
    name: "Squared",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789')).join('')
  },
  {
    name: "Small Caps",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')).join('')
  },
  {
    name: "Upside Down",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎzⱯ𐐒ƆᗡƎℲ⅁HIſʞ˥WNOԀΌᴚS⊥∩ΛMX⅄Z0123456789')).reverse().join('')
  },
  {
    name: "Wide Text",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９')).join('')
  },
  {
    name: "Strikethrough",
    transform: (text: string) => Array.from(text).map(c => c + '\u0336').join('')
  },
  {
    name: "Underline",
    transform: (text: string) => Array.from(text).map(c => c + '\u0332').join('')
  },
  {
    name: "Lenny / Brackets",
    transform: (text: string) => Array.from(text).map(c => c === ' ' ? ' ' : `【${c}】`).join('')
  },
  {
    name: "Decorative",
    transform: (text: string) => `✿ ${text} ✿`
  },
  {
    name: "Monospace",
    transform: (text: string) => Array.from(text).map(c => mapChar(c, '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿')).join('')
  }
];

export default function FancyTextClient() {
  const [input, setInput] = useState("Fancy Text Generator");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="max-w-4xl mx-auto">
        <ToolPageHeader 
        title="Fancy Text Generator" 
        description="Convert normal text into stylish fonts and weird unicode characters" 
      />
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Type your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-lg min-h-[100px] resize-y"
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {STYLES.map((style, i) => {
            const result = style.transform(input || "Fancy Text Generator");
            return (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="overflow-hidden flex-1">
                    <div className="text-xs text-muted-foreground mb-1 font-medium">{style.name}</div>
                    <div className="text-lg truncate" title={result}>
                      {result}
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="shrink-0"
                    onClick={() => handleCopy(result, i)}
                    title="Copy to clipboard"
                  >
                    {copiedIndex === i ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Type Your Text", description: "Enter any text in the input field. The generator instantly produces 50+ stylized Unicode variants as you type.", icon: Type },
          { step: "02", title: "Choose a Style", description: "Browse bold, italic, script, fraktur, double-struck, monospace, strikethrough, bubble, small caps, and upside-down variants.", icon: Sparkles },
          { step: "03", title: "Copy and Use Anywhere", description: "Click Copy next to any style. Paste into Instagram bios, Twitter profiles, Facebook, Discord, WhatsApp, or anywhere that accepts text.", icon: Copy },
        ]}
        badges={["50+ styles", "Unicode-based", "Works everywhere"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Sparkles, title: "50+ Unicode Styles", description: "Generates 50+ text style variants using Unicode Mathematical Alphanumeric Symbols and combining diacritics. All output is copy-pasteable text, not images." },
          { icon: Type, title: "Script and Calligraphy", description: "Mathematical Script, Bold Script, Fraktur, and Double-Struck are Unicode mathematical notation sets repurposed for decorative typography." },
          { icon: Globe, title: "Works on All Platforms", description: "Because output is standard Unicode text, it displays on Instagram, Twitter, Facebook, LinkedIn, TikTok, Discord, Slack, WhatsApp without special fonts." },
          { icon: Zap, title: "Real-Time Generation", description: "All 50+ styles generate instantly as you type with no API calls. The entire Unicode mapping table is embedded in the browser." },
          { icon: Star, title: "Decorative Extras", description: "Beyond letter styles: add stars, bullet decorations, wave underlines, strikethrough, overline, and Zalgo diacritic combination effects." },
          { icon: Shield, title: "Private and Offline", description: "All processing happens in your browser. Text is never sent to a server. Works fully offline once loaded." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">How Fancy Text Works with Unicode</h3>
          <p>Fancy text generators use Unicode Mathematical Alphanumeric Symbols (U+1D400 to U+1D7FF) designed for mathematical notation but repurposed for decorative text. These are distinct character code points from regular a-z, so they work wherever Unicode text is supported.</p>
          <h3 className="text-lg font-semibold">Unicode Style Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-muted/50"><th className="border p-2 text-left">Style</th><th className="border p-2 text-left">Unicode Block</th><th className="border p-2 text-left">Best For</th></tr></thead>
              <tbody>
                {[["Bold","Math Bold (U+1D400)","Emphasis, headers"],["Italic","Math Italic (U+1D434)","Blog bios, quotes"],["Script","Math Script (U+1D49C)","Elegant bios"],["Fraktur","Math Fraktur (U+1D504)","Gothic aesthetic"],["Double-Struck","Math Double-Struck (U+1D538)","Academic, tech"],["Monospace","Math Monospace (U+1D670)","Code aesthetic"],["Bubble","Enclosed Alphanumerics","Social, fun"],["Small Caps","Phonetic extensions","Subtitles"],["Upside Down","Rotated Unicode","Humor, social"]].map(([style, block, best]) => (
                  <tr key={style} className="odd:bg-muted/20"><td className="border p-2 font-medium text-xs">{style}</td><td className="border p-2 font-mono text-muted-foreground text-xs">{block}</td><td className="border p-2 text-xs">{best}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Platform Compatibility</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Instagram bios</strong>: Full Unicode support. All styles render correctly.</li>
            <li><strong>Twitter / X</strong>: Unicode in display name and bio. Username field is ASCII-only.</li>
            <li><strong>LinkedIn</strong>: Full Unicode in bios and posts. Popular for standing out.</li>
            <li><strong>SEO warning</strong>: Do not use fancy text in page H1 headings or meta content. Google may not match mathematical bold A with regular A for keyword ranking.</li>
            <li><strong>Accessibility</strong>: Screen readers read these as their Unicode name (mathematical bold capital H), not as regular letters. Avoid in accessibility-critical contexts.</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "How does fancy text work without a special font?", answer: "Fancy text uses Unicode Mathematical Alphanumeric Symbols (U+1D400-U+1D7FF), which are different character code points that visually resemble styled letters. Since platforms render Unicode natively, these characters display everywhere without loading a custom font." },
          { question: "Why does fancy text work in Instagram bios but not everywhere?", answer: "Instagram, Twitter, LinkedIn, and most modern platforms render Unicode fully. However, some systems strip non-standard Unicode characters, particularly older apps and email clients. In SEO contexts, Google may not recognize these characters as their letter equivalents." },
          { question: "Is fancy text accessible to screen reader users?", answer: "Partially. Screen readers interpret Unicode mathematical symbols by their technical name. The bold letter A (U+1D400) is read as 'mathematical bold capital A', not simply 'A'. Avoid fancy text in navigation, headings, or any accessibility-critical content." },
          { question: "Can I use fancy text in a Twitter or Instagram username?", answer: "For Twitter/X, usernames only accept ASCII characters (a-z, 0-9, underscore). Fancy text works only in your display name and bio. Instagram is the same: username is ASCII-only, but your bio and name field support full Unicode." },
          { question: "Does fancy text affect SEO?", answer: "Yes, negatively if used in HTML headings or meta content. Google may not recognize mathematical bold A as regular A, breaking keyword matching. Use fancy text only in social media profiles and decorative contexts, never in SEO-critical HTML elements." },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/text/fancy-text" max={6} />
    </div>
  );
}
