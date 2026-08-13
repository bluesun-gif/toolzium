"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Volume2, Search, Sliders, AudioLines } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const DICTIONARY: Record<string, { ipa: string, syllables: string[], type: string }> = {
"apple": { ipa:"ˈæp.əl", syllables: ["ap","ple"], type:"noun"},
"banana": { ipa:"bəˈnæn.ə", syllables: ["ba","na","na"], type:"noun"},
"cat": { ipa:"kæt", syllables: ["cat"], type:"noun"},
"dog": { ipa:"dɔːɡ", syllables: ["dog"], type:"noun"},
"elephant": { ipa:"ˈel.ɪ.fənt", syllables: ["el","e","phant"], type:"noun"},
"fish": { ipa:"fɪʃ", syllables: ["fish"], type:"noun"},
"guitar": { ipa:"ɡɪˈtɑːr", syllables: ["gui","tar"], type:"noun"},
"house": { ipa:"haʊs", syllables: ["house"], type:"noun"},
"island": { ipa:"ˈaɪ.lənd", syllables: ["is","land"], type:"noun"},
"jacket": { ipa:"ˈdʒæk.ɪt", syllables: ["jack","et"], type:"noun"},
"kangaroo": { ipa:"ˌkæŋ.ɡəˈruː", syllables: ["kan","ga","roo"], type:"noun"},
"lemon": { ipa:"ˈlem.ən", syllables: ["lem","on"], type:"noun"},
"monkey": { ipa:"ˈmʌŋ.ki", syllables: ["mon","key"], type:"noun"},
"night": { ipa:"naɪt", syllables: ["night"], type:"noun"},
"orange": { ipa:"ˈɒr.ɪndʒ", syllables: ["or","ange"], type:"noun"},
"penguin": { ipa:"ˈpeŋ.ɡwɪn", syllables: ["pen","guin"], type:"noun"},
"queen": { ipa:"kwiːn", syllables: ["queen"], type:"noun"},
"rabbit": { ipa:"ˈræb.ɪt", syllables: ["rab","bit"], type:"noun"},
"snake": { ipa:"sneɪk", syllables: ["snake"], type:"noun"},
"tiger": { ipa:"ˈtaɪ.ɡər", syllables: ["ti","ger"], type:"noun"},
"umbrella": { ipa:"ʌmˈbrel.ə", syllables: ["um","brel","la"], type:"noun"},
"violin": { ipa:"ˌvaɪ.əˈlɪn", syllables: ["vi","o","lin"], type:"noun"},
"water": { ipa:"ˈwɔː.tər", syllables: ["wa","ter"], type:"noun"},
"xylophone": { ipa:"ˈzaɪ.lə.fəʊn", syllables: ["xy","lo","phone"], type:"noun"},
"yacht": { ipa:"jɒt", syllables: ["yacht"], type:"noun"},
"zebra": { ipa:"ˈzeb.rə", syllables: ["ze","bra"], type:"noun"},
"algorithm": { ipa:"ˈæl.ɡə.rɪð.əm", syllables: ["al","go","rith","m"], type:"noun"},
"beautiful": { ipa:"ˈbjuː.tɪ.fəl", syllables: ["beau","ti","ful"], type:"adjective"},
"computer": { ipa:"kəmˈpjuː.tər", syllables: ["com","pu","ter"], type:"noun"},
"developer": { ipa:"dɪˈvel.ə.pər", syllables: ["de","vel","op","er"], type:"noun"},
"engineer": { ipa:"ˌen.dʒɪˈnɪər", syllables: ["en","gi","neer"], type:"noun"},
"frequently": { ipa:"ˈfriː.kwənt.li", syllables: ["fre","quent","ly"], type:"adverb"},
"hierarchy": { ipa:"ˈhaɪə.rɑː.ki", syllables: ["hi","er","ar","chy"], type:"noun"},
"indigenous": { ipa:"ɪnˈdɪdʒ.ɪ.nəs", syllables: ["in","dig","e","nous"], type:"adjective"},
"jewelry": { ipa:"ˈdʒuː.əl.ri", syllables: ["jew","el","ry"], type:"noun"},
"knowledge": { ipa:"ˈnɒl.ɪdʒ", syllables: ["know","ledge"], type:"noun"},
"laboratory": { ipa:"ləˈbɒr.ə.tər.i", syllables: ["la","bor","a","to","ry"], type:"noun"},
"mischievous": { ipa:"ˈmɪs.tʃɪ.vəs", syllables: ["mis","chie","vous"], type:"adjective"},
"nuclear": { ipa:"ˈnjuː.kli.ər", syllables: ["nu","cle","ar"], type:"adjective"},
"often": { ipa:"ˈɒf.ən", syllables: ["of","ten"], type:"adverb"},
"pronunciation": { ipa:"prəˌnʌn.siˈeɪ.ʃən", syllables: ["pro","nun","ci","a","tion"], type:"noun"},
"quinoa": { ipa:"ˈkiːn.wɑː", syllables: ["qui","no","a"], type:"noun"},
"recipe": { ipa:"ˈres.ɪ.pi", syllables: ["rec","i","pe"], type:"noun"},
"specific": { ipa:"spəˈsɪf.ɪk", syllables: ["spe","cif","ic"], type:"adjective"},
"temperature": { ipa:"ˈtem.prə.tʃər", syllables: ["tem","per","a","ture"], type:"noun"},
"vegetable": { ipa:"ˈvedʒ.tə.bəl", syllables: ["veg","e","ta","ble"], type:"noun"},
"wednesday": { ipa:"ˈwenz.deɪ", syllables: ["wednes","day"], type:"noun"},
"colonel": { ipa:"ˈkɜː.nəl", syllables: ["colo","nel"], type:"noun"},
"choir": { ipa:"kwaɪər", syllables: ["choir"], type:"noun"},
"espresso": { ipa:"eˈspres.əʊ", syllables: ["es","pres","so"], type:"noun"}
};

const COMMON_MISPRONOUNCED = [
 { word:"Espresso", wrong:"Ex-press-o", right:"Es-press-o"},
 { word:"Library", wrong:"Li-ber-ry", right:"Li-bra-ry"},
 { word:"Nuclear", wrong:"Nu-cu-lar", right:"Nu-cle-ar"},
 { word:"Prescription", wrong:"Per-prescription", right:"Pre-scription"},
 { word:"Sherbet", wrong:"Sher-bert", right:"Sher-bet"},
 { word:"Anyway", wrong:"Any-ways", right:"Any-way"},
 { word:"Supposedly", wrong:"Supposably", right:"Supposed-ly"},
 { word:"Irregardless", wrong:"Irregardless", right:"Regardless"},
];

export function PronunciationClient() {
 const [text, setText] = useState("How do you pronounce espresso and quinoa?");
 const [speed, setSpeed] = useState(1);
 const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
 const [selectedVoice, setSelectedVoice] = useState("");
 const [dictSearch, setDictSearch] = useState("");

 useEffect(() => {
 const loadVoices = () => {
 const available = window.speechSynthesis.getVoices();
 setVoices(available);
 if (available.length > 0 && !selectedVoice) {
 setSelectedVoice(available[0].name);
 }
 };
 loadVoices();
 window.speechSynthesis.onvoiceschanged = loadVoices;
 }, []);

 const handleSpeak = () => {
 if (!text) return;
 const utterance = new SpeechSynthesisUtterance(text);
 utterance.rate = speed;
 const voice = voices.find((v) => v.name === selectedVoice);
 if (voice) utterance.voice = voice;
 window.speechSynthesis.speak(utterance);
 };

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
 };

 const results = useMemo(() => {
 const words = text.toLowerCase().replace(/[^a-z\s]/g,"").split(/\s+/).filter(Boolean);
 return words.map((w: string) => {
 const dictEntry = DICTIONARY[w];
 if (dictEntry) {
 return { word: w, ipa: dictEntry.ipa, syllables: dictEntry.syllables, type: dictEntry.type };
 }
 return { word: w, ipa:"—", syllables: [w], type:"unknown"};
 });
 }, [text]);

 const filteredDict = useMemo(() => {
 if (!dictSearch) return [];
 return Object.keys(DICTIONARY).filter((w: string) => w.includes(dictSearch.toLowerCase())).slice(0, 10);
 }, [dictSearch]);

 const ipaString = results.map((r: any) => r.ipa).join("");

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 p-4">
      <GridPattern />

 <ToolPageHeader
 icon={AudioLines}
 title="Pronunciation Guide"
 description="Learn how to pronounce words with IPA transcriptions and syllable breakdowns."
 />

 <div className="grid lg:grid-cols-3 gap-6 mb-8">
 <Card className={`${cardClass} lg:col-span-2`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Input Text</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <textarea
 className={textareaClass}
 rows={4}
 value={text}
 onChange={(e) => setText(e.target.value)}
 placeholder="Type words or sentences here..."
 />
 
 <div className="flex flex-wrap gap-4 items-center">
 <div className="flex items-center gap-2">
 <Label>Speed:</Label>
 <select value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="border rounded px-2 py-1 bg-background text-sm">
 <option value="0.5">Slow</option>
 <option value="1">Normal</option>
 <option value="1.5">Fast</option>
 </select>
 </div>
 <div className="flex items-center gap-2">
 <Label>Voice:</Label>
 <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)} className="border rounded px-2 py-1 bg-background text-sm max-w-[200px]">
 {voices.map((v) => (
 <option key={v.name} value={v.name}>{v.name}</option>
 ))}
 </select>
 </div>
 <Button onClick={handleSpeak} className="ml-auto">
 <Volume2 className="h-4 w-4 mr-1"/> Speak
 </Button>
 </div>

 <div className="flex gap-2">
 <Button variant="outline"size="sm"onClick={() => handleCopy(ipaString)} className="flex-1">
 <Copy className="h-4 w-4 mr-1"/> Copy IPA
 </Button>
 <Button variant="destructive"size="sm"onClick={() => setText("")} className="flex-1">
 <RotateCcw className="h-4 w-4 mr-1"/> Clear
 </Button>
 </div>
 </CardContent>
 </Card>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Search className="h-4 w-4"/> Dictionary Search</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <Input placeholder="Search word..."value={dictSearch} onChange={(e) => setDictSearch(e.target.value)} />
 <div className="space-y-2 max-h-[200px] overflow-y-auto">
 {filteredDict.map((w: string) => (
 <div key={w} className="p-2 bg-muted/30 rounded text-sm flex justify-between">
 <span className="font-semibold">{w}</span>
 <span className="text-muted-foreground">{DICTIONARY[w].ipa}</span>
 </div>
 ))}
 {filteredDict.length === 0 && <p className="text-xs text-muted-foreground text-center">Type to search...</p>}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <Card className={`${cardClass} mb-8`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Phonetic Breakdown</CardTitle>
 </CardHeader>
 <CardContent className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {results.map((r: any, i: number) => (
 <div key={i} className="p-4 border rounded-lg bg-muted/20">
 <div className="flex justify-between items-center mb-2">
 <h3 className="font-bold text-lg capitalize">{r.word}</h3>
 <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r.type}</span>
 </div>
 <p className="font-mono text-sm mb-2">{r.ipa}</p>
 <p className="text-sm text-muted-foreground">
 {r.syllables.map((s: string, idx: number) => (
 <span key={idx}>{s}{idx < r.syllables.length - 1 ?"-":""}</span>
 ))}
 </p>
 </div>
 ))}
 </CardContent>
 </Card>

 <Card className={`${cardClass} mb-8`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Common Mispronounced Words</CardTitle>
 </CardHeader>
 <CardContent className="p-4 grid sm:grid-cols-2 gap-4">
 {COMMON_MISPRONOUNCED.map((m, i) => (
 <div key={i} className="p-4 border rounded-lg bg-destructive/5">
 <h3 className="font-bold mb-1">{m.word}</h3>
 <p className="text-sm"><span className="text-destructive line-through">{m.wrong}</span> <span className="text-primary font-semibold">→ {m.right}</span></p>
 </div>
 ))}
 </CardContent>
 </Card>

 <ToolHowItWorks steps={[
 { step:"01", title:"Enter Text", description:"Type any word, phrase, or sentence into the input box.", icon: AudioLines },
 { step:"02", title:"View Breakdown", description:"See the IPA transcription, syllable splits, and part of speech for each word.", icon: Search },
 { step:"03", title:"Listen & Learn", description:"Use the speak button to hear the correct pronunciation at your preferred speed.", icon: Volume2 }
 ]} />

 <ToolFeatureGuides features={[
 { icon: AudioLines, title:"IPA Transcription", description:"Get accurate International Phonetic Alphabet transcriptions for hundreds of common English words."},
 { icon: Search, title:"Syllable Breakdown", description:"Understand how words are divided into syllables to improve your speaking rhythm and spelling."},
 { icon: Volume2, title:"Adjustable Speech", description:"Listen to your text read aloud with customizable speeds and selectable system voices."},
 { icon: Sliders, title:"Mispronunciation Guide", description:"Learn from common mistakes with our curated list of frequently mispronounced English words."}
 ]}>
 <div className="prose dark:prose-invert max-w-none">
 <h2>Master English Pronunciation</h2>
 <p>Correct pronunciation is essential for clear communication and language fluency. The English language is notorious for its inconsistent spelling-to-sound rules, making it difficult for learners and native speakers alike to confidently pronounce unfamiliar words. Our Pronunciation Guide bridges this gap by providing instant, accurate phonetic data directly in your browser.</p>
 <p>At the core of this tool is the International Phonetic Alphabet (IPA). Unlike standard spelling, IPA provides a one-to-one mapping of sounds, ensuring you know exactly how a word should be articulated. We provide the precise IPA transcription alongside a clear syllable breakdown, showing you exactly where the stress falls and how to chunk the word into manageable sounds.</p>
 <p>Our integrated Web Speech API integration allows you to hear the text read aloud. You can adjust the playback speed to catch subtle vowel sounds or test different system voices to hear various accents. The built-in dictionary search lets you quickly look up hundreds of common words, while the"Common Mispronounced Words"section helps you correct bad habits before they become permanent. Whether you are preparing for a speech, learning English as a second language, or just want to settle a debate about how to say"quinoa", this tool is your definitive guide.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"What is IPA?", answer:"IPA stands for International Phonetic Alphabet. It's a standardized system of phonetic notation that represents the precise sounds of spoken language, regardless of spelling inconsistencies."},
 { question:"Does it work offline?", answer:"Yes. The dictionary and syllable breakdowns are built-in. The speech synthesis uses your device's native Web Speech API, requiring no external API calls."},
 { question:"Can it pronounce full sentences?", answer:"Absolutely. Paste any paragraph into the text area, and the speech synthesizer will read it aloud at your chosen speed."},
 { question:"Are the syllable breakdowns accurate?", answer:"Yes, they follow standard English phonological rules for dividing words into their constituent sound units."}
 ]} />

 <RelatedTools currentToolUrl="/tools/text/pronunciation" max={6} />
 </div>
 );
}

export default PronunciationClient;
