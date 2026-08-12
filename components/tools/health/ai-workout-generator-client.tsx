"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Activity, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

export default function AiWorkoutGeneratorClient() {
 const [goal, setGoal] = useState("Hypertrophy & Muscle Building");
 const [daysPerWeek, setDaysPerWeek] = useState("4");
 const [equipment, setEquipment] = useState("Full Commercial Gym (Barbells, Dumbbells, Cables)");
 const [experience, setExperience] = useState("Intermediate");
 const [results, setResults] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateWorkout = async () => {
 setLoading(true);

 try {
 const prompt = `Design a customized ${daysPerWeek}-day workout routine split for a '${experience}' lifter. Goal: '${goal}'. Equipment: '${equipment}'. Provide detailed exercise selection, sets, rep ranges, rest intervals, and progressive overload rules for each training day. Format as ${daysPerWeek} distinct day workout cards. No markdown asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"cards"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setResults(data.results);
 toast.success("AI Workout Routine generated!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 toast.error("AI generation failed. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Activity}
 title="AI Personal Workout Routine & Training Split Generator"
 description="Generate custom 3, 4, 5, or 6-day workout splits (Push-Pull-Legs, Upper-Lower, Full Body) with rep ranges and progressive overload rules using live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Primary Fitness Goal:</label>
 <Input
 type="text"
 value={goal}
 onChange={(e) => setGoal(e.target.value)}
 placeholder="e.g. Muscle Building, Strength, Fat Loss, Endurance"
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Training Days Per Week:</label>
 <select
 value={daysPerWeek}
 onChange={(e) => setDaysPerWeek(e.target.value)}
 className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
 >
 <option value="3">3 Days / Week (Full Body or Push/Pull/Legs)</option>
 <option value="4">4 Days / Week (Upper / Lower Split)</option>
 <option value="5">5 Days / Week (Push / Pull / Legs + Upper / Lower)</option>
 <option value="6">6 Days / Week (Push / Pull / Legs x 2)</option>
 </select>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Available Equipment:</label>
 <Input
 type="text"
 value={equipment}
 onChange={(e) => setEquipment(e.target.value)}
 placeholder="e.g. Dumbbells & Resistance Bands, Bodyweight, Full Gym"
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Experience Level:</label>
 <select
 value={experience}
 onChange={(e) => setExperience(e.target.value)}
 className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
 >
 <option value="Beginner">Beginner (&lt; 1 Year)</option>
 <option value="Intermediate">Intermediate (1-3 Years)</option>
 <option value="Advanced">Advanced (3+ Years)</option>
 </select>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateWorkout}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Designing Routine...":"AI Generate Personal Workout Plan"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated Personalized Training Routine Split"
 subtitle="Exercise selection, set & rep guidance, and progressive overload targets"
 content={results}
 loading={loading}
 onRegenerate={generateWorkout}
 variant="cards"
 />
 )}
 </div>
 );
}
