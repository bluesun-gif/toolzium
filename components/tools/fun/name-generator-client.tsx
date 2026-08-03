"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { User, Shuffle, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

const firstNamesM = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Benjamin", "Samuel", "Gregory", "Frank", "Alexander", "Raymond", "Patrick", "Jack", "Dennis", "Jerry"];
const firstNamesF = ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Stephanie", "Carolyn", "Christine", "Marie", "Janet", "Catherine", "Frances", "Ann", "Joyce", "Diane"];
const firstNamesN = ["Riley", "Avery", "Jordan", "Peyton", "Cameron", "Taylor", "Morgan", "Quinn", "Casey", "Dakota", "Reese", "Rowan", "Skyler", "Finley", "Emerson", "Sawyer", "Hayden", "Eden", "Harley", "Rory", "Parker", "Phoenix", "River", "Charlie", "Kendall", "Logan", "Alexis", "Dylan", "Micah", "Blake", "Sidney", "Robin", "Shawn", "Jody", "Jamie", "Drew", "Kelly", "Jesse", "Ellis", "Frankie", "Sam", "Alex", "Tyler", "Jude", "Asher", "Sage", "Ariel", "Noel", "Hunter", "Tanner"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];
const fantasyPrefixes = ["Ael", "Aer", "Af", "Ah", "Al", "Am", "Ama", "An", "Ang", "Anir", "Ar", "Arav", "Ari", "Arn", "Art", "Ash", "Asl", "At", "Atr", "Aur", "Av", "Az", "Bae", "Bal", "Bam", "Ban", "Bar", "Bat", "Bel", "Ben", "Ber", "Bha", "Bho", "Bi", "Bli", "Bo", "Bor", "Bra", "Bri", "Bro", "Bru", "Bry", "Bu", "By"];
const fantasySuffixes = ["a", "ac", "ai", "al", "am", "an", "ar", "as", "at", "au", "av", "ay", "az", "ba", "da", "di", "do", "du", "ea", "eb", "ec", "ed", "ef", "eg", "eh", "ei", "ek", "el", "em", "en", "er", "es", "et", "eu", "ev", "ey", "ez", "fa", "fi", "fo", "fu", "ga", "gi", "go"];
const usernamePrefixes = ["Cyber", "Ninja", "Shadow", "Ghost", "Sniper", "Dragon", "Phoenix", "Wolf", "Gamer", "Pro", "Star", "Dark", "Light", "King", "Queen", "Lord", "Lady", "Master", "Epic", "Magic", "Storm", "Fire", "Ice", "Thunder", "Lightning", "Speed"];
const teamPrefixes = ["The", "Alpha", "Beta", "Omega", "Red", "Blue", "Black", "White", "Golden", "Silver", "Iron", "Steel", "Savage", "Silent", "Hidden", "Fierce", "Brave", "Elite", "Prime", "Royal", "Dark", "Light", "Shadow", "Phantom", "Ghost"];
const teamSuffixes = ["Tigers", "Lions", "Bears", "Wolves", "Eagles", "Hawks", "Dragons", "Knights", "Warriors", "Kings", "Queens", "Lords", "Legends", "Heroes", "Champions", "Stars", "Squad", "Team", "Crew", "Force", "Alliance", "Syndicate", "Cartel", "Legion", "Empire"];

type Category = "first_m" | "first_f" | "first_n" | "full" | "fantasy" | "username" | "team";

export function NameGeneratorClient() {
  const [category, setCategory] = useState<Category>("full");
  const [count, setCount] = useState<number>(5);
  const [startingLetter, setStartingLetter] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const generateName = (): string => {
    let name = "";
    if (category === "first_m") {
      name = getRandomItem(firstNamesM);
    } else if (category === "first_f") {
      name = getRandomItem(firstNamesF);
    } else if (category === "first_n") {
      name = getRandomItem(firstNamesN);
    } else if (category === "full") {
      const allFirsts = [...firstNamesM, ...firstNamesF, ...firstNamesN];
      name = `${getRandomItem(allFirsts)} ${getRandomItem(lastNames)}`;
    } else if (category === "fantasy") {
      name = `${getRandomItem(fantasyPrefixes)}${getRandomItem(fantasySuffixes)}${Math.random() > 0.5 ? getRandomItem(fantasySuffixes) : ""}`;
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    } else if (category === "username") {
      const allFirsts = [...firstNamesM, ...firstNamesF, ...firstNamesN];
      name = `${getRandomItem(usernamePrefixes)}${Math.random() > 0.5 ? getRandomItem(allFirsts) : getRandomItem(lastNames)}${Math.floor(Math.random() * 9999)}`;
    } else if (category === "team") {
      name = `${getRandomItem(teamPrefixes)} ${getRandomItem(teamSuffixes)}`;
    }
    return name;
  };

  const handleGenerate = () => {
    let newNames: string[] = [];
    let attempts = 0;
    while (newNames.length < count && attempts < 1000) {
      let n = generateName();
      if (startingLetter) {
        if (n.toLowerCase().startsWith(startingLetter.toLowerCase())) {
          newNames.push(n);
        }
      } else {
        newNames.push(n);
      }
      attempts++;
    }
    if (attempts >= 1000 && newNames.length < count) {
      toast.error(`Could only generate ${newNames.length} names with those filters.`);
    }
    setNames(newNames);
  };

  const handleReset = () => {
    setNames([]);
    setCount(5);
    setCategory("full");
    setStartingLetter("");
  };

  const copyAll = () => {
    return names.join("\n");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={User}
        title="Random Name Generator"
        description="Generate random names for characters, babies, usernames, or pen names."
        actions={
          <>
            <ActionButton onClick={handleGenerate} icon={Shuffle} label="Generate" variant="default" />
            <ResetButton onClick={handleReset} />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Names</SelectItem>
                  <SelectItem value="first_m">First Names (Male)</SelectItem>
                  <SelectItem value="first_f">First Names (Female)</SelectItem>
                  <SelectItem value="first_n">First Names (Neutral)</SelectItem>
                  <SelectItem value="fantasy">Fantasy Names</SelectItem>
                  <SelectItem value="username">Usernames</SelectItem>
                  <SelectItem value="team">Team/Project Names</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Count (1-10)</Label>
              <Input 
                type="number" 
                min={1} 
                max={10} 
                value={count} 
                onChange={(e) => setCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))} 
              />
            </div>

            <div className="space-y-2">
              <Label>Starting Letter (Optional)</Label>
              <Input 
                type="text" 
                maxLength={1} 
                value={startingLetter} 
                onChange={(e) => setStartingLetter(e.target.value)} 
                placeholder="e.g. A" 
              />
            </div>
            
            <Button onClick={handleGenerate} className="w-full">
              <Shuffle className="w-4 h-4 mr-2" />
              Generate Names
            </Button>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Generated Names</CardTitle>
              <CardDescription>
                {names.length > 0 ? `${names.length} names generated` : "No names generated yet"}
              </CardDescription>
            </div>
            {names.length > 0 && (
              <CopyButton getText={copyAll} label="Copy All" />
            )}
          </CardHeader>
          <CardContent>
            {names.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                Click generate to see names here
              </div>
            ) : (
              <ul className="space-y-2">
                {names.map((name, i) => (
                  <li key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <span className="font-medium">{name}</span>
                    <CopyButton getText={() => name} label="" />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
