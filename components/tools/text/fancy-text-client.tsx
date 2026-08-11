"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import { Sparkles, Copy } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

const NORMAL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DOUBLE_STRUCK = "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡";
const BOLD = "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗";
const ITALIC = "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍0123456789";
const TINY_CAPS = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SMALL_CAPS = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const UPSIDE_DOWN = "ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z0ƖᄅƐㄣϛ9ㄥ86";
const STRIKETHROUGH = "a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶0̶1̶2̶3̶4̶5̶6̶7̶8̶9̶";

const STYLES = [
  { name: "Double-Struck", map: DOUBLE_STRUCK },
  { name: "Bold", map: BOLD },
  { name: "Italic", map: ITALIC },
  { name: "Tiny Caps", map: TINY_CAPS },
  { name: "Small Caps", map: SMALL_CAPS },
  { name: "Upside-Down", map: UPSIDE_DOWN },
  { name: "Strikethrough", map: STRIKETHROUGH },
];

function convertText(text: string, map: string): string {
  return text
    .split("")
    .map((char) => {
      const index = NORMAL.indexOf(char);
      return index !== -1 ? map[index] : char;
    })
    .join("");
}

export default function FancyTextClient() {
  const [input, setInput] = useState("Hello World");

  const styledTexts = useMemo(() => {
    return STYLES.map((style) => ({
      name: style.name,
      text: convertText(input, style.map),
    }));
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={Sparkles}
        title="Fancy Text Generator"
        description="Transform your text into stylish Unicode characters for social media, bios, and messages."
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Sparkles className="w-4 h-4 text-primary" /> Input Text
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your text here..."
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {styledTexts.map((style) => (
          <Card key={style.name} className={cardClass}>
            <CardHeader className={headerClass}>
              <CardTitle className={titleClass}>
                <Copy className="w-4 h-4 text-primary" /> {style.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 space-y-3">
              <div className="p-3 bg-muted/40 rounded-lg text-lg break-all">
                {style.text || "Your styled text will appear here..."}
              </div>
              <CopyButton getText={() => style.text} label="Copy" />
            </CardContent>
          </Card>
        ))}
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Your Text", description: "Type or paste the text you want to style in the input field.", icon: Sparkles },
          { step: "02", title: "View Styled Variants", description: "See your text instantly transformed into multiple Unicode styles.", icon: Copy },
          { step: "03", title: "Copy Your Favorite", description: "Click the copy button on any style to use it anywhere.", icon: Copy },
        ]}
        badges={["100% Free", "Client-Side", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Sparkles, title: "7 Unique Styles", description: "Choose from double-struck, bold, italic, tiny caps, small caps, upside-down, and strikethrough." },
          { icon: Copy, title: "Unicode Characters", description: "Uses real Unicode characters that work across most platforms and applications." },
          { icon: Sparkles, title: "Real-Time Preview", description: "See all style variations update instantly as you type." },
          { icon: Copy, title: "One-Click Copy", description: "Copy any styled text with a single click for immediate use." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Fancy text generators use Unicode characters to create stylish text variations that work across social media platforms, messaging apps, and most modern applications. Unlike traditional font changes that require special software, Unicode characters are built into the text itself and display consistently across devices.</p>
          <p>Each style in this tool maps standard ASCII characters to their Unicode equivalents. For example, double-struck characters (𝕒, 𝕓, 𝕔) are mathematical alphanumeric symbols, while bold and italic variants come from mathematical bold and italic Unicode blocks. These characters are part of the Unicode standard and are supported by most modern fonts and operating systems.</p>
          <p>Popular use cases include Instagram and Twitter bios, Discord usernames, gaming profiles, creative messaging, and standing out in crowded comment sections. However, be aware that screen readers may pronounce these characters differently, and some older systems or applications might not display all Unicode characters correctly. Use fancy text for visual flair, but keep accessibility in mind for important information.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Will these styles work on all social media platforms?", answer: "Most modern platforms support these Unicode characters, but some older systems or specific apps might display them as boxes or question marks." },
          { question: "Are these actual fonts?", answer: "No, these are Unicode characters that look like different fonts but are actually distinct characters built into the Unicode standard." },
          { question: "Can screen readers read fancy text correctly?", answer: "Screen readers may pronounce Unicode characters differently than standard text. For accessibility, use standard text for important information." },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/text/fancy-text" max={6} />
    </div>
  );
}
