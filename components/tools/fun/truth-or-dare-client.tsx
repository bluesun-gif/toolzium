"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { 
  Dice5, 
  MessageCircleQuestion, 
  Flame, 
  Settings2, 
  History, 
  Share2, 
  SkipForward, 
  User, 
  Check, 
  ShieldAlert, 
  ShieldCheck,
  RefreshCw
} from "lucide-react";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";

// Types
type Difficulty = "easy" | "medium" | "spicy";
type AgeMode = "family" | "adult";
type PromptType = "truth" | "dare";

interface Prompt {
  id: string;
  type: PromptType;
  difficulty: Difficulty;
  age: AgeMode;
  text: string;
}

interface HistoryItem {
  prompt: Prompt;
  playerName: string;
  timestamp: number;
}

// Data (50+ Truths and 50+ Dares across categories)
const PROMPTS: Prompt[] = [
  // TRUTHS - Family / Easy
  { id: "t1", type: "truth", difficulty: "easy", age: "family", text: "What's your favorite color?" },
  { id: "t2", type: "truth", difficulty: "easy", age: "family", text: "What is your biggest fear?" },
  { id: "t3", type: "truth", difficulty: "easy", age: "family", text: "Who is your favorite superhero?" },
  { id: "t4", type: "truth", difficulty: "easy", age: "family", text: "What's the last dream you remember?" },
  { id: "t5", type: "truth", difficulty: "easy", age: "family", text: "What is your favorite food?" },
  { id: "t6", type: "truth", difficulty: "easy", age: "family", text: "If you could have a superpower, what would it be?" },
  { id: "t7", type: "truth", difficulty: "easy", age: "family", text: "What is your favorite animal?" },
  { id: "t8", type: "truth", difficulty: "easy", age: "family", text: "What's the funniest joke you know by heart?" },
  { id: "t9", type: "truth", difficulty: "easy", age: "family", text: "What is the best gift you have ever received?" },
  { id: "t10", type: "truth", difficulty: "easy", age: "family", text: "Have you ever blamed a fart on someone else?" },
  // TRUTHS - Family / Medium
  { id: "t11", type: "truth", difficulty: "medium", age: "family", text: "What is the most embarrassing thing you've ever done?" },
  { id: "t12", type: "truth", difficulty: "medium", age: "family", text: "Have you ever cheated on a test?" },
  { id: "t13", type: "truth", difficulty: "medium", age: "family", text: "Who in this room do you think is the funniest?" },
  { id: "t14", type: "truth", difficulty: "medium", age: "family", text: "What is a secret you kept from your parents?" },
  { id: "t15", type: "truth", difficulty: "medium", age: "family", text: "What is the grossest food you've ever eaten?" },
  { id: "t16", type: "truth", difficulty: "medium", age: "family", text: "Have you ever pretended to be sick to get out of something?" },
  { id: "t17", type: "truth", difficulty: "medium", age: "family", text: "What is your worst habit?" },
  { id: "t18", type: "truth", difficulty: "medium", age: "family", text: "Have you ever snooped through someone else's phone?" },
  { id: "t19", type: "truth", difficulty: "medium", age: "family", text: "What is the weirdest thing you do when you're alone?" },
  { id: "t20", type: "truth", difficulty: "medium", age: "family", text: "What was your most embarrassing phase?" },
  // TRUTHS - Family / Spicy
  { id: "t21", type: "truth", difficulty: "spicy", age: "family", text: "Who is your secret crush?" },
  { id: "t22", type: "truth", difficulty: "spicy", age: "family", text: "What is the biggest lie you've ever told?" },
  { id: "t23", type: "truth", difficulty: "spicy", age: "family", text: "Who in this room would you least want to be trapped on a desert island with?" },
  { id: "t24", type: "truth", difficulty: "spicy", age: "family", text: "What is the meanest thing you've ever said to someone?" },
  { id: "t25", type: "truth", difficulty: "spicy", age: "family", text: "Have you ever stolen something?" },
  { id: "t26", type: "truth", difficulty: "spicy", age: "family", text: "What is the most trouble you've ever gotten into at school?" },
  { id: "t27", type: "truth", difficulty: "spicy", age: "family", text: "Who is your least favorite teacher and why?" },
  { id: "t28", type: "truth", difficulty: "spicy", age: "family", text: "Have you ever broken something and blamed it on someone else?" },
  { id: "t29", type: "truth", difficulty: "spicy", age: "family", text: "What's the worst rumor you've ever spread?" },
  { id: "t30", type: "truth", difficulty: "spicy", age: "family", text: "If you had to swap lives with someone in this room, who would it be and why?" },
  
  // TRUTHS - Adult / Easy
  { id: "t31", type: "truth", difficulty: "easy", age: "adult", text: "What is your biggest regret?" },
  { id: "t32", type: "truth", difficulty: "easy", age: "adult", text: "Have you ever been fired from a job?" },
  { id: "t33", type: "truth", difficulty: "easy", age: "adult", text: "What's the most drunken thing you've ever done?" },
  { id: "t34", type: "truth", difficulty: "easy", age: "adult", text: "What is your worst dating experience?" },
  { id: "t35", type: "truth", difficulty: "easy", age: "adult", text: "Have you ever had a crush on a coworker?" },
  { id: "t36", type: "truth", difficulty: "easy", age: "adult", text: "What is your most irrational fear?" },
  { id: "t37", type: "truth", difficulty: "easy", age: "adult", text: "Have you ever lied on your resume?" },
  { id: "t38", type: "truth", difficulty: "easy", age: "adult", text: "What is the most expensive thing you've bought and regretted?" },
  { id: "t39", type: "truth", difficulty: "easy", age: "adult", text: "Have you ever eavesdropped on a conversation you shouldn't have?" },
  { id: "t40", type: "truth", difficulty: "easy", age: "adult", text: "What's the longest you've gone without showering?" },
  // TRUTHS - Adult / Medium
  { id: "t41", type: "truth", difficulty: "medium", age: "adult", text: "What is the most illegal thing you've ever done?" },
  { id: "t42", type: "truth", difficulty: "medium", age: "adult", text: "Have you ever ghosted someone after a few dates?" },
  { id: "t43", type: "truth", difficulty: "medium", age: "adult", text: "What is your biggest insecurity?" },
  { id: "t44", type: "truth", difficulty: "medium", age: "adult", text: "Have you ever sent a text to the wrong person that caused a disaster?" },
  { id: "t45", type: "truth", difficulty: "medium", age: "adult", text: "What is a secret you've never told anyone?" },
  { id: "t46", type: "truth", difficulty: "medium", age: "adult", text: "Have you ever gone through your partner's phone?" },
  { id: "t47", type: "truth", difficulty: "medium", age: "adult", text: "Who is your weirdest celebrity crush?" },
  { id: "t48", type: "truth", difficulty: "medium", age: "adult", text: "What is the worst lie you've ever told a partner?" },
  { id: "t49", type: "truth", difficulty: "medium", age: "adult", text: "Have you ever dated two people at the same time?" },
  { id: "t50", type: "truth", difficulty: "medium", age: "adult", text: "What is your most toxic trait?" },
  // TRUTHS - Adult / Spicy
  { id: "t51", type: "truth", difficulty: "spicy", age: "adult", text: "What is your wildest fantasy?" },
  { id: "t52", type: "truth", difficulty: "spicy", age: "adult", text: "Have you ever had a one-night stand?" },
  { id: "t53", type: "truth", difficulty: "spicy", age: "adult", text: "Who in this room are you most attracted to?" },
  { id: "t54", type: "truth", difficulty: "spicy", age: "adult", text: "What is your biggest turn-on?" },
  { id: "t55", type: "truth", difficulty: "spicy", age: "adult", text: "What is the weirdest place you've ever been intimate?" },
  { id: "t56", type: "truth", difficulty: "spicy", age: "adult", text: "Have you ever cheated on a partner?" },
  { id: "t57", type: "truth", difficulty: "spicy", age: "adult", text: "What is the dirtiest text you've ever sent or received?" },
  { id: "t58", type: "truth", difficulty: "spicy", age: "adult", text: "Have you ever faked it?" },
  { id: "t59", type: "truth", difficulty: "spicy", age: "adult", text: "If you had to sleep with someone in this room, who would it be?" },
  { id: "t60", type: "truth", difficulty: "spicy", age: "adult", text: "What is your guilty pleasure in the bedroom?" },

  // DARES - Family / Easy
  { id: "d1", type: "dare", difficulty: "easy", age: "family", text: "Do 10 jumping jacks." },
  { id: "d2", type: "dare", difficulty: "easy", age: "family", text: "Balance a spoon on your nose for 10 seconds." },
  { id: "d3", type: "dare", difficulty: "easy", age: "family", text: "Talk in a funny accent for the next 3 rounds." },
  { id: "d4", type: "dare", difficulty: "easy", age: "family", text: "Try to lick your elbow." },
  { id: "d5", type: "dare", difficulty: "easy", age: "family", text: "Act like a monkey until it's your turn again." },
  { id: "d6", type: "dare", difficulty: "easy", age: "family", text: "Sing the ABCs backwards." },
  { id: "d7", type: "dare", difficulty: "easy", age: "family", text: "Do a silly dance for 30 seconds." },
  { id: "d8", type: "dare", difficulty: "easy", age: "family", text: "Spin around 10 times and try to walk in a straight line." },
  { id: "d9", type: "dare", difficulty: "easy", age: "family", text: "Make the funniest face you can and keep it for 1 minute." },
  { id: "d10", type: "dare", difficulty: "easy", age: "family", text: "Say a tongue twister 5 times fast." },
  // DARES - Family / Medium
  { id: "d11", type: "dare", difficulty: "medium", age: "family", text: "Let someone draw on your face with a pen." },
  { id: "d12", type: "dare", difficulty: "medium", age: "family", text: "Eat a spoonful of mustard or hot sauce." },
  { id: "d13", type: "dare", difficulty: "medium", age: "family", text: "Speak only in whispers for the next 10 minutes." },
  { id: "d14", type: "dare", difficulty: "medium", age: "family", text: "Let the group give you a new hairstyle." },
  { id: "d15", type: "dare", difficulty: "medium", age: "family", text: "Do a plank for a full minute." },
  { id: "d16", type: "dare", difficulty: "medium", age: "family", text: "Pretend to be a waiter/waitress and take snack orders from the group." },
  { id: "d17", type: "dare", difficulty: "medium", age: "family", text: "Try to juggle 3 items of the group's choosing." },
  { id: "d18", type: "dare", difficulty: "medium", age: "family", text: "Sing a song chosen by the group loudly." },
  { id: "d19", type: "dare", difficulty: "medium", age: "family", text: "Walk backwards for the next 5 minutes." },
  { id: "d20", type: "dare", difficulty: "medium", age: "family", text: "Call a random family member and say you love them." },
  // DARES - Family / Spicy
  { id: "d21", type: "dare", difficulty: "spicy", age: "family", text: "Go outside and yell 'I believe in fairies!' loudly." },
  { id: "d22", type: "dare", difficulty: "spicy", age: "family", text: "Let someone crack an egg on your head (or pretend to if indoors)." },
  { id: "d23", type: "dare", difficulty: "spicy", age: "family", text: "Eat a raw slice of onion." },
  { id: "d24", type: "dare", difficulty: "spicy", age: "family", text: "Let the person to your left post a status on your social media." },
  { id: "d25", type: "dare", difficulty: "spicy", age: "family", text: "Wear socks on your hands until it's your turn again." },
  { id: "d26", type: "dare", difficulty: "spicy", age: "family", text: "Do an impression of someone in the room until they guess who it is." },
  { id: "d27", type: "dare", difficulty: "spicy", age: "family", text: "Drink a mystery mixture created by the group (non-toxic)." },
  { id: "d28", type: "dare", difficulty: "spicy", age: "family", text: "Let someone pour a cup of ice water down your back." },
  { id: "d29", type: "dare", difficulty: "spicy", age: "family", text: "Smell everyone's shoes and rate them from best to worst." },
  { id: "d30", type: "dare", difficulty: "spicy", age: "family", text: "Take a bite out of a stick of butter." },
  
  // DARES - Adult / Easy
  { id: "d31", type: "dare", difficulty: "easy", age: "adult", text: "Show the last photo you took on your phone." },
  { id: "d32", type: "dare", difficulty: "easy", age: "adult", text: "Let the group look at your internet search history." },
  { id: "d33", type: "dare", difficulty: "easy", age: "adult", text: "Send a text to your boss saying 'You're the best!'." },
  { id: "d34", type: "dare", difficulty: "easy", age: "adult", text: "Do 20 pushups." },
  { id: "d35", type: "dare", difficulty: "easy", age: "adult", text: "Take a shot (of alcohol or a spicy condiment)." },
  { id: "d36", type: "dare", difficulty: "easy", age: "adult", text: "Read the last text message you received out loud." },
  { id: "d37", type: "dare", difficulty: "easy", age: "adult", text: "Show everyone your screen time stats." },
  { id: "d38", type: "dare", difficulty: "easy", age: "adult", text: "Give the person to your right a compliment." },
  { id: "d39", type: "dare", difficulty: "easy", age: "adult", text: "Call a random contact and sing them 'Happy Birthday'." },
  { id: "d40", type: "dare", difficulty: "easy", age: "adult", text: "Empty your wallet/purse and show everyone what's inside." },
  // DARES - Adult / Medium
  { id: "d41", type: "dare", difficulty: "medium", age: "adult", text: "Text your ex 'I miss you' and show the group." },
  { id: "d42", type: "dare", difficulty: "medium", age: "adult", text: "Let the group choose a contact for you to prank call." },
  { id: "d43", type: "dare", difficulty: "medium", age: "adult", text: "Give someone in the group a foot massage for 1 minute." },
  { id: "d44", type: "dare", difficulty: "medium", age: "adult", text: "Let the person to your left text anyone from your phone." },
  { id: "d45", type: "dare", difficulty: "medium", age: "adult", text: "Post an embarrassing selfie on your Instagram/Facebook story." },
  { id: "d46", type: "dare", difficulty: "medium", age: "adult", text: "Do a sexy dance to a song chosen by the group." },
  { id: "d47", type: "dare", difficulty: "medium", age: "adult", text: "Swap an item of clothing with someone in the room." },
  { id: "d48", type: "dare", difficulty: "medium", age: "adult", text: "Let someone give you a wet willy." },
  { id: "d49", type: "dare", difficulty: "medium", age: "adult", text: "Kiss the cheek of the person to your left." },
  { id: "d50", type: "dare", difficulty: "medium", age: "adult", text: "Whisper a dirty secret into the ear of the person on your right." },
  // DARES - Adult / Spicy
  { id: "d51", type: "dare", difficulty: "spicy", age: "adult", text: "Take off one piece of clothing (keep it PG-13 if needed)." },
  { id: "d52", type: "dare", difficulty: "spicy", age: "adult", text: "Give a lap dance to someone of the group's choosing." },
  { id: "d53", type: "dare", difficulty: "spicy", age: "adult", text: "Demonstrate your favorite sexual position with a pillow." },
  { id: "d54", type: "dare", difficulty: "spicy", age: "adult", text: "Let someone in the group read your DMs out loud for 1 minute." },
  { id: "d55", type: "dare", difficulty: "spicy", age: "adult", text: "Make out with your hand for 30 seconds while making eye contact with someone." },
  { id: "d56", type: "dare", difficulty: "spicy", age: "adult", text: "Send a risky text to the 5th person in your contacts." },
  { id: "d57", type: "dare", difficulty: "spicy", age: "adult", text: "Let the group dare you to do anything they want." },
  { id: "d58", type: "dare", difficulty: "spicy", age: "adult", text: "Sit on the lap of the person across from you for the next 3 rounds." },
  { id: "d59", type: "dare", difficulty: "spicy", age: "adult", text: "Lick the neck of the person to your right." },
  { id: "d60", type: "dare", difficulty: "spicy", age: "adult", text: "Go to the bathroom with someone and stay in there for 2 minutes." },
];

export function TruthOrDareClient() {
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [ageMode, setAgeMode] = useState<AgeMode>("family");
  
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const [isRevealing, setIsRevealing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get available prompts based on settings
  const getAvailablePrompts = useCallback((type: PromptType) => {
    return PROMPTS.filter(p => p.type === type && p.difficulty === difficulty && p.age === ageMode);
  }, [difficulty, ageMode]);

  const generatePrompt = useCallback((type: PromptType) => {
    setIsRevealing(true);
    
    setTimeout(() => {
      const available = getAvailablePrompts(type);
      
      // Filter out recently seen prompts if possible
      const seenIds = history.slice(0, 20).map(h => h.prompt.id);
      let unseen = available.filter(p => !seenIds.includes(p.id));
      
      if (unseen.length === 0) {
        unseen = available; // Reset if all seen
      }
      
      const randomPrompt = unseen[Math.floor(Math.random() * unseen.length)];
      
      if (randomPrompt) {
        setCurrentPrompt(randomPrompt);
        setHistory(prev => [{
          prompt: randomPrompt,
          playerName: playerName.trim() || "Player",
          timestamp: Date.now()
        }, ...prev]);
      }
      
      setIsRevealing(false);
    }, 400); // 400ms animation delay
  }, [getAvailablePrompts, history, playerName]);

  const handleShare = useCallback(async () => {
    if (!currentPrompt) return;
    
    const textToShare = `${playerName ? playerName + ', ' : ''}${currentPrompt.type === 'truth' ? 'Truth' : 'Dare'}: ${currentPrompt.text} (Generated on Toolzium)`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Truth or Dare',
          text: textToShare,
        });
      } else {
        await navigator.clipboard.writeText(textToShare);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      await navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [currentPrompt, playerName]);

  const formattedPromptText = useMemo(() => {
    if (!currentPrompt) return "";
    const prefix = playerName.trim() ? `${playerName.trim()}, ` : "";
    return `${prefix}${currentPrompt.text}`;
  }, [currentPrompt, playerName]);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Truth or Dare Generator"
        description="Randomly generate truth questions and dare challenges for your next party."
        icon={Dice5}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="flex-1 space-y-2">
                <Label htmlFor="player-name">Player Name (Optional)</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="player-name" 
                    placeholder="Enter name..." 
                    className="pl-9"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy (Mild)</SelectItem>
                    <SelectItem value="medium">Medium (Fun)</SelectItem>
                    <SelectItem value="spicy">Spicy (Wild)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch 
                  id="adult-mode" 
                  checked={ageMode === "adult"}
                  onCheckedChange={(checked) => setAgeMode(checked ? "adult" : "family")}
                />
                <Label htmlFor="adult-mode" className="flex items-center gap-1 cursor-pointer">
                  {ageMode === "family" ? (
                    <><ShieldCheck className="h-4 w-4 text-green-500" /> Family Friendly</>
                  ) : (
                    <><ShieldAlert className="h-4 w-4 text-red-500" /> Adult (18+)</>
                  )}
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="h-24 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => generatePrompt("truth")}
                disabled={isRevealing}
              >
                TRUTH
              </Button>
              <Button 
                size="lg" 
                className="h-24 text-xl font-bold bg-red-600 hover:bg-red-700 text-white"
                onClick={() => generatePrompt("dare")}
                disabled={isRevealing}
              >
                DARE
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden min-h-[300px] flex flex-col justify-center relative">
            <div 
              className={"p-8 md:p-12 text-center transition-all duration-300 transform " + (isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100")}
            >
              {currentPrompt ? (
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium uppercase tracking-wider mb-2">
                    {currentPrompt.type} • {currentPrompt.difficulty}
                  </div>
                  
                  <h2 className={"text-3xl md:text-5xl font-bold leading-tight " + (currentPrompt.type === 'truth' ? 'text-blue-500 dark:text-blue-400' : 'text-red-500 dark:text-red-400')}>
                    {formattedPromptText}
                  </h2>
                  
                  <div className="flex justify-center gap-3 pt-8">
                    <ActionButton 
                      onClick={handleShare}
                      icon={copied ? Check : Share2}
                      label={copied ? "Copied!" : "Share"}
                    />
                    <ActionButton 
                      onClick={() => generatePrompt(currentPrompt.type)}
                      icon={SkipForward}
                      label="Skip"
                      variant="outline"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground flex flex-col items-center justify-center space-y-4">
                  <MessageCircleQuestion className="h-16 w-16 opacity-20" />
                  <p className="text-xl font-medium">Click TRUTH or DARE to begin!</p>
                  <p className="text-sm">Select difficulty and age mode above.</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <History className="h-5 w-5" />
                History
              </h3>
              {history.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setHistory([])} className="h-8">
                  Clear
                </Button>
              )}
            </div>
            <Separator className="mb-4" />
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No prompts generated yet.
                </p>
              ) : (
                history.map((item, index) => (
                  <div key={item.timestamp + index} className="text-sm p-3 rounded-md bg-secondary/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className={"font-semibold uppercase text-xs " + (item.prompt.type === 'truth' ? 'text-blue-500' : 'text-red-500')}>
                        {item.prompt.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.playerName}
                      </span>
                    </div>
                    <p>{item.prompt.text}</p>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
