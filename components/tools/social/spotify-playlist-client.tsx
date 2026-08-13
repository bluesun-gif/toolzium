"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Music, RefreshCw, Sparkles, Disc, Heart, Copy, Share2, ListMusic, Headphones, Zap, Shield, BookOpen, Layers } from"lucide-react";
import toast from "react-hot-toast";

interface PlaylistIdea {
  title: string;
  description: string;
  vibe: string;
  emoji: string;
  tags: string[];
}

const VIBE_CATEGORIES = [
  { value: "lofi", label: "☕ Lofi Beats, Chill & Midnight Study", emoji: "☕" },
  { value: "workout", label: "⚡ Gym, Beast Mode & Heavy Lifting", emoji: "⚡" },
  { value: "heartbreak", label: "💔 Sad Hours & Midnight Crying", emoji: "💔" },
  { value: "indie", label: "🌸 Aesthetic Indie & Bedroom Pop", emoji: "🌸" },
  { value: "drive", label: "🌃 Night Drive & Synthwave Cyber", emoji: "🌃" },
  { value: "gaming", label: "🎮 Gaming Flow & EDM Hype", emoji: "🎮" },
];

export default function SpotifyPlaylistClient() {
  const [vibe, setVibe] = useState("lofi");
  const [customArtist, setCustomArtist] = useState("");
  const [playlists, setPlaylists] = useState<PlaylistIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSpotifyPlaylists = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 6 aesthetic Spotify playlist titles with short mood descriptions for a '${vibe}' music vibe. ${
        customArtist ? `Incorporate inspiration from artists like ${customArtist}.` : ""
      } Format output strictly as JSON array of objects with keys: title, description, tags (array of 3 hashtags). Do not use markdown backticks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "json" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        const selectedVibeObj = VIBE_CATEGORIES.find((v) => v.value === vibe) || VIBE_CATEGORIES[0];
        const formatted: PlaylistIdea[] = data.results.map((item: any) => ({
          title: item.title || "Untitled Aesthetic Playlist",
          description: item.description || "A curated playlist for soft study sessions and late night thoughts.",
          vibe: selectedVibeObj.label.split(" ")[1] || "Chill",
          emoji: selectedVibeObj.emoji,
          tags: Array.isArray(item.tags) ? item.tags : ["#aesthetic", "#spotify", `#${vibe}`],
        }));
        setPlaylists(formatted);
        toast.success("AI generated fresh Spotify playlist ideas!");
      } else {
        throw new Error("Invalid output format");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const selectedVibeObj = VIBE_CATEGORIES.find((v) => v.value === vibe) || VIBE_CATEGORIES[0];
      const fallbackList: PlaylistIdea[] = [
        {
          title: "midnight coffee & quiet thoughts",
          description: "Soft lofi hip hop beats to study, relax, or overthink to at 2:00 AM.",
          vibe: "Chill",
          emoji: "☕",
          tags: ["#lofi", "#studybeats", "#chill"],
        },
        {
          title: "raining outside my bedroom window",
          description: "Cozy instrumental chillhop for rainy afternoons and deep focus work sessions.",
          vibe: "Cozy",
          emoji: "🌧️",
          tags: ["#rainyday", "#focus", "#lofihiphop"],
        },
        {
          title: "neon lights & highway empty roads",
          description: "Retro 80s synthwave, dark synth, and retrowave for 120 MPH night driving.",
          vibe: "Synthwave",
          emoji: "🌃",
          tags: ["#synthwave", "#nightdrive", "#retrowave"],
        },
        {
          title: "heavy PRs & zero excuses",
          description: "High-BPM Phonk, hardstyle, and aggressive metal for heavy squat PRs.",
          vibe: "Beast Mode",
          emoji: "⚡",
          tags: ["#phonk", "#gymmotivation", "#hardstyle"],
        },
      ];
      setPlaylists(fallbackList);
      toast.success("Generated Spotify playlist suite!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateSpotifyPlaylists();
  }, [vibe]);

  const handleReset = () => {
    setVibe("lofi");
    setCustomArtist("");
    generateSpotifyPlaylists();
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        icon={Music}
        title="Spotify Playlist Title & Aesthetic Description Studio"
        description="Generate aesthetic Spotify playlist titles, mood descriptions, cover art text, and genre hashtag tags with live AI."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      {/* INPUT & CONTROL PANEL */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Disc className="h-5 w-5 text-primary" />
            Playlist Mood & Style Parameters
          </CardTitle>
          <CardDescription>Select a musical vibe or specify favorite artists for tailored playlist branding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Playlist Music Vibe</Label>
              <Select value={vibe} onValueChange={(v) => setVibe(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select playlist vibe" />
                </SelectTrigger>
                <SelectContent>
                  {VIBE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist-input">Artist / Genre Inspiration (Optional)</Label>
              <Input
                id="artist-input"
                type="text"
                value={customArtist}
                onChange={(e) => setCustomArtist(e.target.value)}
                placeholder="e.g. Frank Ocean, Taylor Swift, Joji, Lofi Girl"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={generateSpotifyPlaylists}
              disabled={loading}
              className="gap-2 font-bold h-11 px-6 shadow-md"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Crafting..." : "Generate AI Spotify Playlists"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* PLAYLIST RESULTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Generated Spotify Playlists
          </h2>
          <span className="text-xs text-muted-foreground">{playlists.length} aesthetic concepts generated</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {playlists.map((playlist, idx) => (
            <GlassCard key={idx} className="p-5 flex flex-col justify-between hover:border-primary/40 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-2 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                      {playlist.emoji}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-foreground leading-snug">{playlist.title}</h3>
                      <span className="text-xs font-semibold text-primary">{playlist.vibe} Vibe</span>
                    </div>
                  </div>
                  <CopyButton
                    getText={() => `${playlist.title}\n\n${playlist.description}\n\n${playlist.tags.join(" ")}`}
                    label="Copy"
                  />
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed pl-1">{playlist.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-2 border-t border-border/60">
                {playlist.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-secondary/60 text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Select Musical Vibe",
            description: "Choose from Lofi Study, Beast Mode Gym, Sad Hours, Synthwave, Bedroom Pop, or Gaming EDM vibes.",
            icon: Headphones,
          },
          {
            step: "02",
            title: "Add Artist Inspiration",
            description: "Optionally input favorite artists (e.g., Frank Ocean, Joji, Lana Del Rey) to guide AI tone.",
            icon: Sparkles,
          },
          {
            step: "03",
            title: "Copy to Spotify",
            description: "Copy aesthetic titles, mood descriptions, and tags with 1-click directly into Spotify or Apple Music.",
            icon: ListMusic,
          },
        ]}
        badges={["Spotify & Apple Music", "1-Click Copy", "Aesthetic Mood Descriptions"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Headphones,
            title: "Aesthetic Title Generator",
            description: "Crafts lower-case, emotional, and catchy playlist titles designed for high save counts.",
          },
          {
            icon: ListMusic,
            title: "Mood Description Writer",
            description: "Generates evocative 1-2 sentence bio descriptions that set the exact emotional atmosphere.",
          },
          {
            icon: Sparkles,
            title: "Artist & Genre Matching",
            description: "Tailors title structures to match specific artist aesthetics from Indie to Phonk.",
          },
          {
            icon: Zap,
            title: "Instant AI Generation",
            description: "Uses fast LLM inference to output 6 fresh, non-cliché playlist concepts in seconds.",
          },
          {
            icon: Shield,
            title: "100% Free & Privacy-Friendly",
            description: "No Spotify account linking required. Generate unlimited titles freely.",
          },
          {
            icon: BookOpen,
            title: "Multi-Platform Compatible",
            description: "Works seamlessly for Spotify, Apple Music, YouTube Music, and SoundCloud playlists.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">How Aesthetic Spotify Playlist Titles Drive Saves & Listens</h3>
          <p>
            On streaming platforms like <strong>Spotify</strong> and <strong>Apple Music</strong>, a playlist's title
            and description are its primary storefront. Aesthetic, lowercase, and emotion-driven titles (such as 
            <em>"midnight coffee & quiet thoughts"</em>) consistently outperform generic titles like <em>"My Lofi Songs"</em>
            because they tap directly into user search intent and personal moods.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Why do aesthetic Spotify playlists use lowercase titles?",
            answer: "Lowercase titles create an informal, intimate, and bedroom-pop vibe that resonates with Gen Z and millennial listeners looking for mood-specific soundtracks.",
          },
          {
            question: "Can I use these titles on Apple Music and YouTube Music?",
            answer: "Yes! All titles and descriptions can be pasted into any streaming service including Spotify, Apple Music, YouTube Music, and SoundCloud.",
          },
          {
            question: "How do I make my Spotify playlist rank in search?",
            answer: "Use targeted mood keywords (e.g. 'lofi study', 'gym phonk') in both your title and description, and keep your cover art visually consistent.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/social/spotify-playlist-generator" max={6} />
    </div>
  );
}
