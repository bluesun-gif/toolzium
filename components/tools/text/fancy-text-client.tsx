"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";

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
  );
}
