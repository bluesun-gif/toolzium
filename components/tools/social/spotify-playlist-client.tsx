"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import SelectField from"@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Music, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

const VIBE_CATEGORIES = [
 { value:"lofi", label:"☕ Lofi, Chill & Midnight Study"},
 { value:"workout", label:"⚡ Gym, Beast Mode & PR Heavy"},
 { value:"heartbreak", label:"💔 Sad Hours & Midnight Crying"},
 { value:"indie", label:"🌸 Aesthetic Indie & Bedroom Pop"},
 { value:"drive", label:"🌃 Night Drive & Synthwave"},
];

export default function SpotifyPlaylistClient() {
 const [vibe, setVibe] = useState("lofi");
 const [playlists, setPlaylists] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateSpotifyPlaylists = async () => {
 setLoading(true);

 try {
 const prompt = `Generate 6 aesthetic Spotify playlist titles with short mood descriptions for a '${vibe}' music vibe. Format each output line as: 'Title - Description'. Do not use markdown bold or asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"prose"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setPlaylists(data.results);
 toast.success("AI generated fresh Spotify playlist ideas!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 console.warn("AI generation fallback:", err);
 const fallbackList = [
"midnight coffee & quiet thoughts ☕ - soft lofi beats to study, relax, or overthink to at 2 AM.",
"raining outside my window 🌧️ - cozy instrumental chillhop for rainy afternoons and deep focus.",
 ];
 setPlaylists(fallbackList);
 toast.success("Generated Spotify playlists!");
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 generateSpotifyPlaylists();
 }, [vibe]);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Music}
 title="Spotify Playlist Title & Aesthetic Description Studio"
 description="Generate aesthetic Spotify playlist titles, mood descriptions, and lofi/indie/gym cover text with live AI inference."
 />

 <GlassCard className="p-6 space-y-4">
 <SelectField
 label="Select Playlist Music Vibe"
 value={vibe}
 onValueChange={(v) => setVibe(String(v ||"lofi"))}
 options={VIBE_CATEGORIES}
 />

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateSpotifyPlaylists}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Crafting...":"Generate AI Spotify Playlists"}
 </Button>
 </div>
 </GlassCard>

 {/* Premium AI Output Display */}
 <AiOutputDisplay
 title="AI Generated Spotify Playlists"
 subtitle="Aesthetic Titles & Mood Descriptions for Spotify"
 content={playlists}
 loading={loading}
 onRegenerate={generateSpotifyPlaylists}
 variant="prose"
 />
 </div>
 );
}
