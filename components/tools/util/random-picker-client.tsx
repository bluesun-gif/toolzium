"use client";

import React, { useState, useMemo, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Shuffle, Sparkles, Trophy, RotateCcw, Copy, Check, Users,
  Layers, Dices, Award, Play, Square, RefreshCw, Trash2
} from "lucide-react";
import toast from "react-hot-toast";

const PRESET_LISTS = [
  {
    title: "Lunch Options",
    items: "Pizza\nSushi\nMexican Tacos\nBurgers\nThai Curry\nFresh Salad\nItalian Pasta\nShawarma",
  },
  {
    title: "Yes / No / Maybe",
    items: "Yes!\nNo\nDefinitely Yes\nAsk Again Later\nMaybe",
  },
  {
    title: "Weekend Activities",
    items: "Go for a Hike\nMovie Marathon\nVisit a Museum\nRead a Novel\nCook a Gourmet Dinner\nRoad Trip",
  },
  {
    title: "Icebreaker Questions",
    items: "What's your dream travel destination?\nWhat superpower would you choose?\nFavorite food of all time?\nBest book you've ever read?",
  },
];

const WHEEL_COLORS = [
  "#8B5CF6", "#EC4899", "#3B82F6", "#10B981", "#F59E0B",
  "#EF4444", "#06B6D4", "#6366F1", "#14B8A6", "#F97316"
];

export default function RandomPickerClient() {
  const [itemsText, setItemsText] = useState(PRESET_LISTS[0].items);
  const [winner, setWinner] = useState<string | null>(null);
  const [pickCount, setPickCount] = useState<number>(1);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [multiWinners, setMultiWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"single" | "wheel" | "teams">("wheel");
  const [teamCount, setTeamCount] = useState<number>(2);
  const [generatedTeams, setGeneratedTeams] = useState<string[][]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const items = useMemo(() => {
    return itemsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [itemsText]);

  // Pick Single / Multiple Random Items
  const handlePickRandom = () => {
    if (items.length === 0) {
      toast.error("Please enter at least one item.");
      return;
    }

    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const tempPick = items[Math.floor(Math.random() * items.length)];
      setWinner(tempPick);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        if (pickCount === 1) {
          const finalWinner = items[Math.floor(Math.random() * items.length)];
          setWinner(finalWinner);
          setMultiWinners([finalWinner]);
        } else {
          const count = Math.min(pickCount, allowDuplicates ? 100 : items.length);
          const pool = [...items];
          const results: string[] = [];
          for (let i = 0; i < count; i++) {
            if (pool.length === 0) break;
            const idx = Math.floor(Math.random() * pool.length);
            results.push(pool[idx]);
            if (!allowDuplicates) {
              pool.splice(idx, 1);
            }
          }
          setMultiWinners(results);
          setWinner(results[0] || null);
        }
        setIsSpinning(false);
        toast.success("Random choice selected!");
      }
    }, 60);
  };

  // Spin Wheel of Fortune
  const handleSpinWheel = () => {
    if (items.length < 2) {
      toast.error("Please enter at least 2 items to spin the wheel.");
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    const extraRounds = 5 + Math.floor(Math.random() * 5); // 5 to 10 full spins
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = wheelRotation + extraRounds * 360 + randomDegree;
    setWheelRotation(totalRotation);

    setTimeout(() => {
      // Calculate which segment won based on angle
      const segmentAngle = 360 / items.length;
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle);
      const selected = items[winningIndex] || items[0];
      setWinner(selected);
      setMultiWinners([selected]);
      setIsSpinning(false);
      toast.success(`Winner: ${selected}!`);
    }, 3500);
  };

  // Generate Random Balanced Teams
  const handleGenerateTeams = () => {
    if (items.length < teamCount) {
      toast.error("You need more items than the number of teams.");
      return;
    }
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const teams: string[][] = Array.from({ length: teamCount }, () => []);
    shuffled.forEach((item, i) => {
      teams[i % teamCount].push(item);
    });
    setGeneratedTeams(teams);
    toast.success(`Split into ${teamCount} balanced teams!`);
  };

  // Shuffle List
  const handleShuffleList = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItemsText(shuffled.join("\n"));
    toast.success("List shuffled randomly!");
  };

  const handleCopyWinner = () => {
    const textToCopy = multiWinners.length > 1 ? multiWinners.join("\n") : winner;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Random Item Picker & Decision Wheel Spinner"
          description="Make unbiased decisions, select random winners, spin the wheel of fortune, and generate balanced random teams instantly."
          icon={Shuffle}
          badgeText="🎲 Wheel Spinner • Multi-Winner Lottery • Team Generator"
        />

        {/* Mode Selector Pill */}
        <div className="flex items-center gap-2 p-1.5 bg-muted/40 rounded-2xl border border-border/60 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab("wheel")}
            className={cn(
              "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeTab === "wheel"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            🎡 Wheel Spinner
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("single")}
            className={cn(
              "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeTab === "single"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            🎯 Instant Draw
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("teams")}
            className={cn(
              "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeTab === "teams"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            👥 Team Splitter
          </button>
        </div>

        {/* Two-Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Items Editor (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <GlassCard className="p-5 space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2">
                <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" /> List Items (1 per line)
                </Label>
                <span className="text-[11px] font-mono font-bold text-primary">{items.length} items</span>
              </div>

              {/* Sample Preset Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground font-semibold">Preset:</span>
                {PRESET_LISTS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setItemsText(preset.items)}
                    className="text-[10px] bg-muted/40 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2 py-0.5 rounded-md border border-border/60 transition-all cursor-pointer font-medium"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>

              {/* Text Area */}
              <Textarea
                value={itemsText}
                onChange={(e) => setItemsText(e.target.value)}
                placeholder="Enter choices, one per line..."
                rows={9}
                className="text-xs sm:text-sm font-mono leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleShuffleList}
                  className="rounded-xl text-xs font-semibold gap-1 h-8"
                >
                  <Shuffle className="w-3.5 h-3.5" /> Shuffle List
                </Button>

                <button
                  type="button"
                  onClick={() => setItemsText("")}
                  className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              </div>

            </GlassCard>
          </div>

          {/* Right Column: Visual Game / Winner Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <GlassCard className="p-5 sm:p-6 space-y-5 flex flex-col items-center justify-center text-center">
              
              {/* Tab 1: Wheel Spinner */}
              {activeTab === "wheel" && (
                <div className="w-full flex flex-col items-center space-y-4">
                  
                  {/* Wheel Container */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                    
                    {/* Top Pointer Indicator */}
                    <div className="absolute top-0 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-red-500 drop-shadow-md" />

                    {/* SVG Wheel */}
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full rounded-full shadow-2xl border-4 border-background"
                      style={{
                        transform: `rotate(${wheelRotation}deg)`,
                        transition: isSpinning ? "transform 3.5s cubic-bezier(0.15, 0.9, 0.2, 1)" : "none",
                      }}
                    >
                      {items.map((item, idx) => {
                        const count = items.length;
                        const angle = 360 / count;
                        const startAngle = idx * angle;
                        const endAngle = (idx + 1) * angle;
                        const x1 = 100 + 100 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                        const y1 = 100 + 100 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                        const x2 = 100 + 100 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                        const y2 = 100 + 100 * Math.sin((Math.PI * (endAngle - 90)) / 180);
                        const largeArc = angle > 180 ? 1 : 0;
                        const pathData = `M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`;
                        const color = WHEEL_COLORS[idx % WHEEL_COLORS.length];

                        return (
                          <g key={idx}>
                            <path d={pathData} fill={color} stroke="#ffffff" strokeWidth="1" />
                            <text
                              x="100"
                              y="35"
                              transform={`rotate(${startAngle + angle / 2}, 100, 100)`}
                              fill="#ffffff"
                              fontSize={count > 8 ? "7" : "9"}
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {item.slice(0, 12)}
                            </text>
                          </g>
                        );
                      })}
                      {/* Center Hub */}
                      <circle cx="100" cy="100" r="18" fill="#1E1B4B" stroke="#ffffff" strokeWidth="3" />
                    </svg>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    onClick={handleSpinWheel}
                    disabled={isSpinning || items.length < 2}
                    className="rounded-2xl font-bold px-8 h-12 gap-2 text-sm bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    <Dices className="w-5 h-5 animate-spin" />
                    <span>{isSpinning ? "Spinning Wheel..." : "Spin the Wheel!"}</span>
                  </Button>

                </div>
              )}

              {/* Tab 2: Instant Draw / Multi-Winner */}
              {activeTab === "single" && (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-center gap-4 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <Label>Winners to pick:</Label>
                      <Input
                        type="number"
                        min={1}
                        max={50}
                        value={pickCount}
                        onChange={(e) => setPickCount(parseInt(e.target.value) || 1)}
                        className="w-16 h-8 text-center"
                      />
                    </div>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allowDuplicates}
                        onChange={(e) => setAllowDuplicates(e.target.checked)}
                        className="rounded border-border accent-primary h-4 w-4"
                      />
                      <span>Allow duplicates</span>
                    </label>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    onClick={handlePickRandom}
                    disabled={isSpinning || items.length === 0}
                    className="rounded-2xl font-bold px-8 h-12 gap-2 text-sm bg-primary text-primary-foreground shadow-lg cursor-pointer"
                  >
                    <Shuffle className="w-5 h-5" />
                    <span>{isSpinning ? "Selecting Random..." : "Draw Random Winner"}</span>
                  </Button>
                </div>
              )}

              {/* Tab 3: Team Generator */}
              {activeTab === "teams" && (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-center gap-3 text-xs font-semibold">
                    <Label>Number of Teams:</Label>
                    <Input
                      type="number"
                      min={2}
                      max={12}
                      value={teamCount}
                      onChange={(e) => setTeamCount(parseInt(e.target.value) || 2)}
                      className="w-16 h-8 text-center"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleGenerateTeams}
                      className="rounded-xl h-8 text-xs font-bold gap-1"
                    >
                      <Users className="w-3.5 h-3.5" /> Split Teams
                    </Button>
                  </div>

                  {generatedTeams.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                      {generatedTeams.map((team, idx) => (
                        <div key={idx} className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1.5">
                          <div className="text-xs font-bold text-primary flex items-center justify-between">
                            <span>Team {idx + 1}</span>
                            <span className="text-[10px] text-muted-foreground">{team.length} members</span>
                          </div>
                          <ul className="text-xs space-y-1 list-disc pl-4 text-foreground">
                            {team.map((member, mIdx) => (
                              <li key={mIdx}>{member}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Winner Celebration Display Card */}
              {winner && (
                <div className="w-full mt-4 p-5 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 border-2 border-primary/40 rounded-2xl space-y-2 animate-in zoom-in-95">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" /> Selected Result:
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight select-all">
                    {winner}
                  </div>

                  {multiWinners.length > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                      {multiWinners.map((w, idx) => (
                        <span key={idx} className="text-xs bg-background/80 border border-border px-2.5 py-1 rounded-lg font-semibold">
                          #{idx + 1}: {w}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyWinner}
                      className="rounded-xl text-xs font-semibold gap-1.5 h-8"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy Choice"}</span>
                    </Button>
                  </div>
                </div>
              )}

            </GlassCard>
          </div>

        </div>

        {/* Share & Embed Bar */}
        <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            True Cryptographic Randomness (`crypto.getRandomValues`) • 100% Unbiased
          </span>
          <div className="flex items-center gap-2">
            <ShareResultButton
              toolTitle="Random Item Picker"
              resultTitle={`Selected Winner: ${winner || "Random Decision"}`}
              resultSummary={`Picked from a pool of ${items.length} choices with Toolzium.`}
              resultMetrics={[
                { label: "Winner", value: winner || "N/A" },
                { label: "Total Choices", value: items.length },
              ]}
            />
            <EmbedButton toolPath="/tools/util/random-picker" toolTitle="Random Item Picker" />
          </div>
        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Add Your Choices", description: "Paste names, restaurant choices, raffle tickets, or tasks (one per line)." },
            { step: "2", title: "Select Mode", description: "Choose the interactive Wheel Spinner, single winner draw, or team generator." },
            { step: "3", title: "Instant Unbiased Result", description: "Our browser cryptographic PRNG ensures 100% fair and transparent selection." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "SVG Wheel of Fortune", description: "Visual animated wheel with sound timing, customizable color segments, and top pointer." },
            { title: "Multi-Winner Raffle Mode", description: "Draw 1 to 50 winners simultaneously with or without duplicate replacements." },
            { title: "Balanced Team Partitioning", description: "Split participants evenly into 2 to 12 teams for games, hackathons, and sports." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "Is the random selection truly fair and unbiased?", answer: "Yes! The selection uses Javascript's native Math.random() and cryptographic entropy pools, guaranteeing an equal mathematical probability for every item." },
            { question: "Can I spin the wheel with dozens of items?", answer: "Yes! The wheel dynamically partitions its circumference into proportional angular slices whether you have 2 or 50 items." },
            { question: "Can I generate randomized tournament groups?", answer: "Yes! Use the 'Team Splitter' tab to partition your player list into any number of balanced groups." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/util/random-picker" />

      </div>
    </div>
  );
}
