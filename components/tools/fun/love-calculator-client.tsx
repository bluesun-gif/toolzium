"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Share2, Copy } from "lucide-react";

const HeartRain = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 3,
      size: 16 + Math.random() * 24,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute -top-10"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            animationName: 'heartFall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        >
          <Heart 
            className="fill-pink-500 text-pink-500 opacity-70" 
            style={{ width: h.size, height: h.size }} 
          />
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes heartFall {
          0% { transform: translateY(-5vh) rotate(0deg) scale(0.5); opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg) scale(1.5); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default function LoveCalculatorClient() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);

  const calculateLove = () => {
    if (!name1 || !name2) return;
    setIsCalculating(true);
    setResult(null);
    
    // Deterministic hash based on both names (order-independent)
    const combined = [name1.trim().toLowerCase(), name2.trim().toLowerCase()].sort().join("");
    
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert hash to 0-100
    const percentage = Math.abs(hash) % 101;

    setTimeout(() => {
      setResult(percentage);
      setIsCalculating(false);
    }, 1500);
  };

  const getMessage = (score: number) => {
    if (score <= 25) return "Keep looking...";
    if (score <= 50) return "There might be something there!";
    if (score <= 75) return "Looking good! Give it a shot!";
    if (score <= 90) return "You two are meant for each other!";
    return "Perfect match! 💕";
  };

  const getColor = (score: number) => {
    if (score <= 25) return "text-gray-500";
    if (score <= 50) return "text-blue-500";
    if (score <= 75) return "text-purple-500";
    return "text-red-500";
  };

  const handleShare = async () => {
    const text = `Love Calculator Result for ${name1} & ${name2}: ${result}%! 💖 ${getMessage(result!)}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Love Calculator Result',
          text: text,
        });
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <ToolPageHeader title="Love Calculator" description="Calculate your compatibility with a deterministic fun algorithm." />
      
      {result !== null && result > 90 && <HeartRain />}

      <div className="max-w-md mx-auto space-y-6">
        <Card className="border-pink-200 shadow-md">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl flex items-center justify-center gap-2 text-pink-600">
              <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
              Love Calculator
              <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
            </CardTitle>
            <CardDescription>Find out if it's meant to be!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name1">Your Name</Label>
              <Input
                id="name1"
                placeholder="e.g. Romeo"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="border-pink-200 focus-visible:ring-pink-400"
              />
            </div>
            
            <div className="flex justify-center py-2">
              <Heart className={`w-8 h-8 text-pink-400 ${isCalculating ? 'animate-ping' : ''}`} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name2">Partner's Name</Label>
              <Input
                id="name2"
                placeholder="e.g. Juliet"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="border-pink-200 focus-visible:ring-pink-400"
              />
            </div>

            <Button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold h-12 text-lg"
              onClick={calculateLove}
              disabled={!name1 || !name2 || isCalculating}
            >
              {isCalculating ? (
                "Calculating..."
              ) : (
                "Calculate Love"
              )}
            </Button>

            {result !== null && (
              <div className="pt-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="relative inline-flex items-center justify-center">
                  <div className={`text-6xl font-black ${getColor(result)} tracking-tighter`}>
                    {result}%
                  </div>
                </div>
                <p className="mt-4 text-xl font-medium text-gray-700">
                  {getMessage(result)}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 border-pink-200 hover:bg-pink-50"
                  onClick={handleShare}
                >
                  {copied ? <Copy className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Share Result"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
