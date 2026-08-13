"use client";
import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Alert, AlertDescription } from"@/components/ui/alert";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Github, Twitter, Instagram, Youtube, Linkedin, Twitch, Facebook, Search, ExternalLink, Copy, CheckCircle2, Gamepad2, Music, Video, BookOpen, MessageCircle, Sparkles, Shield, Zap } from"lucide-react";

type Platform = {
 id: string;
 name: string;
 urlFormat: string;
 icon: React.ReactNode;
};

const platforms: Platform[] = [
 { id:"github", name:"GitHub", urlFormat:"https://github.com/{username}", icon: <Github className="w-5 h-5"/> },
 { id:"twitter", name:"Twitter / X", urlFormat:"https://x.com/{username}", icon: <Twitter className="w-5 h-5"/> },
 { id:"instagram", name:"Instagram", urlFormat:"https://instagram.com/{username}", icon: <Instagram className="w-5 h-5"/> },
 { id:"youtube", name:"YouTube", urlFormat:"https://youtube.com/@{username}", icon: <Youtube className="w-5 h-5"/> },
 { id:"tiktok", name:"TikTok", urlFormat:"https://tiktok.com/@{username}", icon: <Video className="w-5 h-5"/> },
 { id:"reddit", name:"Reddit", urlFormat:"https://reddit.com/user/{username}", icon: <MessageCircle className="w-5 h-5"/> },
 { id:"linkedin", name:"LinkedIn", urlFormat:"https://linkedin.com/in/{username}", icon: <Linkedin className="w-5 h-5"/> },
 { id:"pinterest", name:"Pinterest", urlFormat:"https://pinterest.com/{username}", icon: <BookOpen className="w-5 h-5"/> },
 { id:"twitch", name:"Twitch", urlFormat:"https://twitch.tv/{username}", icon: <Twitch className="w-5 h-5"/> },
 { id:"medium", name:"Medium", urlFormat:"https://medium.com/@{username}", icon: <BookOpen className="w-5 h-5"/> },
 { id:"devto", name:"Dev.to", urlFormat:"https://dev.to/{username}", icon: <BookOpen className="w-5 h-5"/> },
 { id:"behance", name:"Behance", urlFormat:"https://behance.net/{username}", icon: <BookOpen className="w-5 h-5"/> },
 { id:"dribbble", name:"Dribbble", urlFormat:"https://dribbble.com/{username}", icon: <BookOpen className="w-5 h-5"/> },
 { id:"soundcloud", name:"SoundCloud", urlFormat:"https://soundcloud.com/{username}", icon: <Music className="w-5 h-5"/> },
 { id:"spotify", name:"Spotify", urlFormat:"https://open.spotify.com/user/{username}", icon: <Music className="w-5 h-5"/> },
 { id:"facebook", name:"Facebook", urlFormat:"https://facebook.com/{username}", icon: <Facebook className="w-5 h-5"/> },
 { id:"snapchat", name:"Snapchat", urlFormat:"https://snapchat.com/add/{username}", icon: <MessageCircle className="w-5 h-5"/> },
 { id:"telegram", name:"Telegram", urlFormat:"https://t.me/{username}", icon: <MessageCircle className="w-5 h-5"/> },
 { id:"steam", name:"Steam", urlFormat:"https://steamcommunity.com/id/{username}", icon: <Gamepad2 className="w-5 h-5"/> },
];

export default function UsernameCheckClient() {
 const [username, setUsername] = useState("");
 const [searchQuery, setSearchQuery] = useState("");
 const [copiedId, setCopiedId] = useState<string | null>(null);

 const isValidUsername = useMemo(() => {
 if (!username) return true;
 return /^[a-zA-Z0-9_.-]+$/.test(username);
 }, [username]);

 const filteredPlatforms = useMemo(() => {
 return platforms.filter((p) =>
 p.name.toLowerCase().includes(searchQuery.toLowerCase())
 );
 }, [searchQuery]);

 const copyToClipboard = (text: string, id: string) => {
 navigator.clipboard.writeText(text);
 setCopiedId(id);
 setTimeout(() => setCopiedId(null), 2000);
 };

 const copyAll = () => {
 if (!username || !isValidUsername) return;
 const links = filteredPlatforms.map(p => p.urlFormat.replace("{username}", username)).join("\n");
 copyToClipboard(links,"all");
 };

 return (
 <div className="w-full max-w-4xl mx-auto space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader 
 title="Username Checker & Link Generator"
 description="Check username availability and generate direct profile links across 20+ social media and online platforms."
 />

 <Card>
 <CardHeader>
 <CardTitle>Enter Username</CardTitle>
 <CardDescription>Enter a username to generate profile links for all supported platforms.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
 <div className="flex-1 w-full space-y-2">
 <Label htmlFor="username">Username</Label>
 <Input
 id="username"
 placeholder="e.g. johndoe, cool_dev99"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 className={!isValidUsername && username ?"border-destructive":""}
 />
 {!isValidUsername && username && (
 <p className="text-sm text-destructive mt-1">Username can only contain alphanumeric characters, dots, dashes, and underscores.</p>
 )}
 </div>
 
 <div className="flex-1 w-full space-y-2">
 <Label htmlFor="search">Filter Platforms</Label>
 <div className="relative">
 <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
 <Input
 id="search"
 placeholder="Search platforms..."
 className="pl-9"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 />
 </div>
 </div>
 </div>
 
 <div className="flex justify-end">
 <Button 
 variant="outline"
 onClick={copyAll}
 disabled={!username || !isValidUsername || filteredPlatforms.length === 0}
 >
 {copiedId ==="all"? (
 <><CheckCircle2 className="w-4 h-4 mr-2"/> Copied All Links</>
 ) : (
 <><Copy className="w-4 h-4 mr-2"/> Copy All Links</>
 )}
 </Button>
 </div>
 </CardContent>
 </Card>

 {username && isValidUsername && (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {filteredPlatforms.map((platform) => {
 const url = platform.urlFormat.replace("{username}", username);
 
 return (
 <Card key={platform.id} className="overflow-hidden">
 <CardContent className="p-4 flex items-center justify-between gap-3">
 <div className="flex items-center gap-3 overflow-hidden min-w-0">
 <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
 {platform.icon}
 </div>
 <div className="min-w-0 overflow-hidden">
 <p className="font-semibold text-sm truncate">{platform.name}</p>
 <p className="text-xs text-muted-foreground truncate w-full"title={url}>
 {url.replace("https://","")}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-1 shrink-0">
 <Button 
 variant="ghost"
 size="icon"
 className="h-8 w-8"
 title="Copy link"
 onClick={() => copyToClipboard(url, platform.id)}
 >
 {copiedId === platform.id ? <CheckCircle2 className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4"/>}
 </Button>
 <Button 
 variant="ghost"
 size="icon"
 className="h-8 w-8"
 title="Open in new tab"
 asChild
 >
 <a href={url} target="_blank"rel="noreferrer noopener">
 <ExternalLink className="h-4 w-4"/>
 </a>
 </Button>
 </div>
 </CardContent>
 </Card>
 );
 })}
 
 {filteredPlatforms.length === 0 && (
 <div className="col-span-full py-8 text-center text-muted-foreground">
 No platforms found matching"{searchQuery}"
 </div>
 )}
 </div>
 )}
 
 {(!username || !isValidUsername) && (
 <Alert>
 <AlertDescription>
 Enter a valid username above to see generated profile links. Click"Open"to check if the profile exists or is available. Note: This tool generates direct profile URLs, it does not automatically verify availability due to platform restrictions.
 </AlertDescription>
 </Alert>
 )}
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our url?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our url provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/network/username-check" max={6} />

</div>
 );
}
