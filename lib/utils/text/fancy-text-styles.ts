// Complete 100+ Fancy Text Generators & Unicode Transformers

export type FancyCategory = "popular" | "fonts" | "decorative" | "aesthetic" | "gaming" | "glitch" | "symbols";

export type FancyStyle = {
  id: string;
  name: string;
  category: FancyCategory;
  transform: (text: string) => string;
};

const NORMAL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function mapChars(text: string, fontString: string): string {
  const fontChars = Array.from(fontString);
  return Array.from(text)
    .map((c) => {
      const idx = NORMAL.indexOf(c);
      return idx !== -1 && fontChars[idx] ? fontChars[idx] : c;
    })
    .join("");
}

function combineModifier(text: string, mark: string): string {
  return Array.from(text)
    .map((c) => (c === " " ? " " : c + mark))
    .join("");
}

// Unicode Alphabets
const BOLD_SERIF = "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗";
const BOLD_SANS = "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵";
const ITALIC_SERIF = "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍0123456789";
const ITALIC_SANS = "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡0123456789";
const BOLD_ITALIC_SERIF = "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗";
const BOLD_ITALIC_SANS = "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵";
const DOUBLE_STRUCK = "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡";
const SCRIPT = "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵0123456789";
const BOLD_SCRIPT = "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789";
const FRAKTUR = "𝔞𝔟𝔠𝔡𝔢int𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789";
const BOLD_FRAKTUR = "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅0123456789";
const MONOSPACE = "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿";
const CIRCLED = "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨";
const DARK_CIRCLED = "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩⓿➊➋➌➍➎➏➐➑➒";
const SQUARED = "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789";
const DARK_SQUARED = "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789";
const FULLWIDTH = "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９";
const SMALL_CAPS = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const PARENTHESIZED = "⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒰⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒰⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼";

// Glitch Zalgo marks
const ZALGO_UP = ["\u030d", "\u030e", "\u0304", "\u0305", "\u033f", "\u0311", "\u0306", "\u0310", "\u0352", "\u0357", "\u0351", "\u0307", "\u0308", "\u030a", "\u0342", "\u0343", "\u0344", "\u034a", "\u034b", "\u034c", "\u0303", "\u0302", "\u030c", "\u0350", "\u0300", "\u0301", "\u030b", "\u030f", "\u0312", "\u0313", "\u0314", "\u033d", "\u0309", "\u0363", "\u0364", "\u0365", "\u0366", "\u0367", "\u0368", "\u0369", "\u036a", "\u036b", "\u036c", "\u036d", "\u036e", "\u036f", "\u033e", "\u035b", "\u0346", "\u031a"];
const ZALGO_DOWN = ["\u0316", "\u0317", "\u0318", "\u0319", "\u031c", "\u031d", "\u031e", "\u031f", "\u0320", "\u0324", "\u0325", "\u0326", "\u0329", "\u032a", "\u032b", "\u032c", "\u032d", "\u032e", "\u032f", "\u0330", "\u0331", "\u0332", "\u0333", "\u0339", "\u033a", "\u033b", "\u033c", "\u0345", "\u0347", "\u0348", "\u0349", "\u034d", "\u034e", "\u0353", "\u0354", "\u0355", "\u0356", "\u0359", "\u035a", "\u0323"];

function zalgo(text: string, count: number): string {
  return Array.from(text)
    .map((c) => {
      if (c === " ") return " ";
      let out = c;
      for (let i = 0; i < count; i++) {
        out += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
        out += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
      }
      return out;
    })
    .join("");
}

const UPSIDE_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
  k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
  u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "q", C: "Ɔ", D: "p", E: "Ǝ", F: "Ⅎ", G: "פ", H: "H", I: "I", J: "ſ",
  K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Q", R: "ɹ", S: "S", T: "┴",
  U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6",
  "?": "¿", "!": "¡", ".": "˙", ",": "'", "'": ",", "\"": "„"
};

function flipUpsideDown(text: string): string {
  return Array.from(text).reverse().map((c) => UPSIDE_MAP[c] || c).join("");
}

export const ALL_FANCY_STYLES: FancyStyle[] = [
  // --- POPULAR & ESSENTIAL FONTS (1-18) ---
  { id: "bold-sans", name: "Bold Sans", category: "popular", transform: (t) => mapChars(t, BOLD_SANS) },
  { id: "bold-serif", name: "Bold Serif", category: "popular", transform: (t) => mapChars(t, BOLD_SERIF) },
  { id: "italic-sans", name: "Italic Sans", category: "popular", transform: (t) => mapChars(t, ITALIC_SANS) },
  { id: "italic-serif", name: "Italic Serif", category: "popular", transform: (t) => mapChars(t, ITALIC_SERIF) },
  { id: "bold-italic", name: "Bold Italic", category: "popular", transform: (t) => mapChars(t, BOLD_ITALIC_SERIF) },
  { id: "bold-italic-sans", name: "Bold Italic Sans", category: "popular", transform: (t) => mapChars(t, BOLD_ITALIC_SANS) },
  { id: "double-struck", name: "Double-Struck (Blackboard)", category: "popular", transform: (t) => mapChars(t, DOUBLE_STRUCK) },
  { id: "small-caps", name: "Small Caps (Bio Style)", category: "popular", transform: (t) => mapChars(t, SMALL_CAPS) },
  { id: "script-cursive", name: "Script / Cursive", category: "popular", transform: (t) => mapChars(t, SCRIPT) },
  { id: "bold-script", name: "Bold Cursive", category: "popular", transform: (t) => mapChars(t, BOLD_SCRIPT) },
  { id: "fraktur-gothic", name: "Gothic / Fraktur", category: "popular", transform: (t) => mapChars(t, FRAKTUR) },
  { id: "bold-fraktur", name: "Bold Medieval Gothic", category: "popular", transform: (t) => mapChars(t, BOLD_FRAKTUR) },
  { id: "monospace-code", name: "Monospace Typewriter", category: "popular", transform: (t) => mapChars(t, MONOSPACE) },
  { id: "circled-bubble", name: "Circled Bubble", category: "popular", transform: (t) => mapChars(t, CIRCLED) },
  { id: "dark-circled", name: "Inverted Bubble (Black)", category: "popular", transform: (t) => mapChars(t, DARK_CIRCLED) },
  { id: "squared-box", name: "Squared Box", category: "popular", transform: (t) => mapChars(t, SQUARED) },
  { id: "dark-squared", name: "Inverted Squared Box", category: "popular", transform: (t) => mapChars(t, DARK_SQUARED) },
  { id: "fullwidth-vapor", name: "Fullwidth Aesthetic", category: "popular", transform: (t) => mapChars(t, FULLWIDTH) },

  // --- TYPOGRAPHIC & COMBINING MODIFIERS (19-35) ---
  { id: "strikethrough", name: "Strikethrough", category: "fonts", transform: (t) => combineModifier(t, "\u0336") },
  { id: "underline-single", name: "Underline Single", category: "fonts", transform: (t) => combineModifier(t, "\u0332") },
  { id: "underline-double", name: "Underline Double", category: "fonts", transform: (t) => combineModifier(t, "\u0333") },
  { id: "overline", name: "Overline Bar", category: "fonts", transform: (t) => combineModifier(t, "\u0305") },
  { id: "slash-through", name: "Slash Through", category: "fonts", transform: (t) => combineModifier(t, "\u0338") },
  { id: "dotted-above", name: "Dotted Above", category: "fonts", transform: (t) => combineModifier(t, "\u0307") },
  { id: "dotted-below", name: "Dotted Below", category: "fonts", transform: (t) => combineModifier(t, "\u0323") },
  { id: "crosshatch", name: "Crosshatch Text", category: "fonts", transform: (t) => combineModifier(t, "\u0337") },
  { id: "wavy-underline", name: "Wavy Underline", category: "fonts", transform: (t) => combineModifier(t, "\u0330") },
  { id: "parenthesized", name: "Parenthesized", category: "fonts", transform: (t) => mapChars(t, PARENTHESIZED) },
  { id: "upside-down", name: "Upside Down", category: "fonts", transform: (t) => flipUpsideDown(t) },
  { id: "reversed-text", name: "Reversed / Backwards", category: "fonts", transform: (t) => Array.from(t).reverse().join("") },
  { id: "spaced-aesthetic", name: "W i d e  S p a c e d", category: "fonts", transform: (t) => Array.from(t).join(" ") },
  { id: "extra-spaced", name: "E  x  t  r  a    W  i  d  e", category: "fonts", transform: (t) => Array.from(t).join("  ") },
  { id: "dotted-line", name: "D.o.t.t.e.d", category: "fonts", transform: (t) => Array.from(t).join(".") },
  { id: "hyphen-spaced", name: "H-y-p-h-e-n", category: "fonts", transform: (t) => Array.from(t).join("-") },
  { id: "tilde-wave", name: "T~i~l~d~e", category: "fonts", transform: (t) => Array.from(t).join("~") },

  // --- AESTHETIC & BIO STYLES (36-55) ---
  { id: "sparkle-wings", name: "Sparkle Wings", category: "aesthetic", transform: (t) => `✧･ﾟ: *✧･ﾟ:* ${t} *:･ﾟ✧*:･ﾟ✧` },
  { id: "sakura-blossom", name: "Sakura Blossom", category: "aesthetic", transform: (t) => `🌸 ${mapChars(t, BOLD_SERIF)} 🌸` },
  { id: "aesthetic-sparkles", name: "Aesthetic Soft Sparkles", category: "aesthetic", transform: (t) => `⋆.ೃ࿔*:･ ${t} ⋆.ೃ࿔*:･` },
  { id: "angel-wings", name: "Angel Wings", category: "aesthetic", transform: (t) => `꧁༺ ${t} ༻꧂` },
  { id: "japanese-brackets", name: "Japanese Brackets", category: "aesthetic", transform: (t) => `【 ${mapChars(t, FULLWIDTH)} 】` },
  { id: "white-brackets", name: "Lenticular Brackets", category: "aesthetic", transform: (t) => `〖 ${t} 〗` },
  { id: "vintage-corner", name: "Vintage Corner Frame", category: "aesthetic", transform: (t) => `◤ ${t} ◢` },
  { id: "heart-soft", name: "Soft Hearts", category: "aesthetic", transform: (t) => `♡ ${t} ♡` },
  { id: "heart-sparkle", name: "Glitter Hearts", category: "aesthetic", transform: (t) => `💖 ${mapChars(t, BOLD_SANS)} 💖` },
  { id: "starlight-fairy", name: "Starlight Fairy", category: "aesthetic", transform: (t) => `ੈ✩‧₊˚ ${t} ˚₊‧✩ੈ` },
  { id: "moon-cloud", name: "Moon & Cloud", category: "aesthetic", transform: (t) => `☁️🌙 ${t} 🌙☁️` },
  { id: "butterfly-aesthetic", name: "Butterflies", category: "aesthetic", transform: (t) => `🦋 ${mapChars(t, ITALIC_SANS)} 🦋` },
  { id: "ribbon-bow", name: "Ribbon Bows", category: "aesthetic", transform: (t) => `🎀 ${t} 🎀` },
  { id: "crystal-gem", name: "Crystal Gem", category: "aesthetic", transform: (t) => `💎 ${mapChars(t, BOLD_SANS)} 💎` },
  { id: "cozy-coffee", name: "Cozy Aesthetic", category: "aesthetic", transform: (t) => `☕ ${t} 📖` },
  { id: "sun-shine", name: "Sunshine Warmth", category: "aesthetic", transform: (t) => `☀️ ${t} ✨` },
  { id: "music-melody", name: "Musical Melody", category: "aesthetic", transform: (t) => `♪♫ ${t} ♫♪` },
  { id: "retro-wave", name: "Vaporwave Neon", category: "aesthetic", transform: (t) => `⚡ ${mapChars(t, FULLWIDTH)} ⚡` },
  { id: "aesthetic-dots", name: "Aesthetic Dot Bounds", category: "aesthetic", transform: (t) => `•°• ${t} •°•` },
  { id: "star-dust", name: "Star Dust Galaxy", category: "aesthetic", transform: (t) => `✧˚ ༘ ⋆｡˚ ${t} ˚｡⋆ ༘ ˚✧` },

  // --- GAMING & SOCIAL MEDIA BIOS (56-75) ---
  { id: "gaming-cross-swords", name: "Cross Swords Warrior", category: "gaming", transform: (t) => `⚔️ ${mapChars(t, BOLD_SANS)} ⚔️` },
  { id: "gaming-sniper", name: "Target Sniper Crosshair", category: "gaming", transform: (t) => `🎯 ${mapChars(t, BOLD_SANS)} 🎯` },
  { id: "gaming-crown-king", name: "Royal Crown Emperor", category: "gaming", transform: (t) => `👑 ${mapChars(t, BOLD_SERIF)} 👑` },
  { id: "gaming-skull-danger", name: "Skull Assassin", category: "gaming", transform: (t) => `☠️ ${mapChars(t, BOLD_FRAKTUR)} ☠️` },
  { id: "gaming-fire-blaze", name: "Fire Blaze Hype", category: "gaming", transform: (t) => `🔥 ${mapChars(t, BOLD_SANS)} 🔥` },
  { id: "gaming-toxic-bio", name: "Biohazard Warning", category: "gaming", transform: (t) => `☣️ ${mapChars(t, MONOSPACE)} ☣️` },
  { id: "gaming-lightning", name: "Lightning Bolt", category: "gaming", transform: (t) => `⚡ ${mapChars(t, BOLD_SANS)} ⚡` },
  { id: "gaming-cyber-matrix", name: "Cyber Matrix Block", category: "gaming", transform: (t) => `░▒▓█ ${mapChars(t, BOLD_SANS)} █▓▒░` },
  { id: "gaming-brackets-pro", name: "Pro Clan Tag", category: "gaming", transform: (t) => `[ 亗 ${mapChars(t, BOLD_SANS)} 亗 ]` },
  { id: "gaming-dragon-wings", name: "Dragon Wings", category: "gaming", transform: (t) => `꧁༺ ☬ ${t} ☬ ༻꧂` },
  { id: "gaming-vip-star", name: "VIP Gold Star", category: "gaming", transform: (t) => `★彡 ${mapChars(t, BOLD_SANS)} 彡★` },
  { id: "gaming-shield-guard", name: "Shield Guardian", category: "gaming", transform: (t) => `🛡️ ${t} 🛡️` },
  { id: "gaming-ninja-shuriken", name: "Ninja Shuriken", category: "gaming", transform: (t) => `🥷 ✴️ ${t} ✴️` },
  { id: "gaming-controller", name: "Arcade Master", category: "gaming", transform: (t) => `🎮 ${mapChars(t, BOLD_SANS)} 🕹️` },
  { id: "gaming-demon-horns", name: "Demon Horns", category: "gaming", transform: (t) => `ψ ${mapChars(t, BOLD_FRAKTUR)} ψ` },
  { id: "gaming-arrow-target", name: "Arrow Flow", category: "gaming", transform: (t) => `»»————- ${t} ————-««` },
  { id: "gaming-glitch-clan", name: "Glitch Clan", category: "gaming", transform: (t) => `xX_${mapChars(t, BOLD_SANS)}_Xx` },
  { id: "gaming-alpha-omega", name: "Alpha Omega", category: "gaming", transform: (t) => `Ω ${mapChars(t, BOLD_SERIF)} Ω` },
  { id: "gaming-dark-knight", name: "Dark Knight", category: "gaming", transform: (t) => `🗡️ ${mapChars(t, FRAKTUR)} 🛡️` },
  { id: "gaming-ghost-phantom", name: "Ghost Phantom", category: "gaming", transform: (t) => `👻 ${mapChars(t, ITALIC_SANS)} 👻` },

  // --- GLITCH, ZALGO & CURSED TEXT (76-88) ---
  { id: "zalgo-light", name: "Zalgo Glitch (Light)", category: "glitch", transform: (t) => zalgo(t, 2) },
  { id: "zalgo-medium", name: "Zalgo Glitch (Medium)", category: "glitch", transform: (t) => zalgo(t, 5) },
  { id: "zalgo-heavy", name: "Zalgo Glitch (Heavy Chaos)", category: "glitch", transform: (t) => zalgo(t, 10) },
  { id: "glitch-static", name: "Cyber Noise Static", category: "glitch", transform: (t) => `▓▒░ ${t} ░▒▓` },
  { id: "matrix-binary", name: "Matrix Rain Glow", category: "glitch", transform: (t) => `010 [ ${mapChars(t, MONOSPACE)} ] 101` },
  { id: "barcode-scan", name: "Barcode Scanner", category: "glitch", transform: (t) => `║▌║▌║ ${t} ║▌║▌║` },
  { id: "glitch-shredder", name: "Shredder Broken", category: "glitch", transform: (t) => combineModifier(combineModifier(t, "\u0336"), "\u0338") },
  { id: "hazard-danger", name: "Hazard Danger Zone", category: "glitch", transform: (t) => `⚠️ // ${mapChars(t, BOLD_SANS)} // ⚠️` },
  { id: "glitch-brackets", name: "Glitch Brackets", category: "glitch", transform: (t) => `<<| ${t} |>>` },
  { id: "glitch-cyberpunk", name: "Cyberpunk 2077 HUD", category: "glitch", transform: (t) => `/// SYSTEM: ${mapChars(t, MONOSPACE)} ///` },
  { id: "glitch-binary-box", name: "Binary Locked Box", category: "glitch", transform: (t) => `[0x0] ${t} [0xFF]` },
  { id: "glitch-corrupted", name: "Corrupted Memory", category: "glitch", transform: (t) => `ERR: ${mapChars(t, DOUBLE_STRUCK)} :FATAL` },
  { id: "glitch-waves", name: "Distortion Waves", category: "glitch", transform: (t) => `≋≋ ${t} ≋≋` },

  // --- DECORATIVE FRAMES & BORDERS (89-105) ---
  { id: "vintage-scroll", name: "Vintage Scroll Frame", category: "decorative", transform: (t) => `📜 ✧ ${t} ✧ 📜` },
  { id: "diamond-chain", name: "Diamond Chain Link", category: "decorative", transform: (t) => `◈ ━━━━ ${t} ━━━━ ◈` },
  { id: "sparkle-border", name: "Sparkle Line Border", category: "decorative", transform: (t) => `✨ ——— ${t} ——— ✨` },
  { id: "star-constellation", name: "Constellation Path", category: "decorative", transform: (t) => `★・‥…― ${t} ―…‥・★` },
  { id: "flower-chain", name: "Flower Garden Garland", category: "decorative", transform: (t) => `✿.｡.:* ${t} *.:｡.✿` },
  { id: "royal-crest", name: "Royal Heraldic Crest", category: "decorative", transform: (t) => `⚜️ ${mapChars(t, BOLD_SERIF)} ⚜️` },
  { id: "infinity-loop", name: "Infinity Eternity", category: "decorative", transform: (t) => `♾️ ${t} ♾️` },
  { id: "sun-moon-balance", name: "Celestial Sun & Moon", category: "decorative", transform: (t) => `☼☽ ${t} ☾☼` },
  { id: "leaves-nature", name: "Botanical Leaves", category: "decorative", transform: (t) => `🌿 ${t} 🍃` },
  { id: "geometric-cube", name: "Geometric Diamonds", category: "decorative", transform: (t) => `◆◇◆ ${t} ◆◇◆` },
  { id: "arrow-compass", name: "Compass Rose", category: "decorative", transform: (t) => `🧭 ➔ ${t} ➔ 🧭` },
  { id: "bubble-pop", name: "Bubble Floating", category: "decorative", transform: (t) => `🫧 ${t} 🫧` },
  { id: "party-festive", name: "Party Celebration", category: "decorative", transform: (t) => `🎉 ${t} 🎊` },
  { id: "magic-wand", name: "Magic Spell", category: "decorative", transform: (t) => `🪄 *･ﾟ ${t} ﾟ･*` },
  { id: "cloud-dream", name: "Dreamy Cloud", category: "decorative", transform: (t) => `☁️ ( ${t} ) ☁️` },
  { id: "cute-hug", name: "Cute Kaomoji Hug", category: "decorative", transform: (t) => `(づ｡◕‿‿◕｡)づ ${t}` },
  { id: "cat-paw", name: "Cat Paw Whiskers", category: "decorative", transform: (t) => `ฅ^•ﻌ•^ฅ ${t} 🐾` },
];
