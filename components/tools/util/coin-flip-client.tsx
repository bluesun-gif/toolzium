"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CoinResult = "Heads" | "Tails";

export default function CoinFlipClient() {
  const [history, setHistory] = useState<CoinResult[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);

  const headsCount = history.filter((h) => h === "Heads").length;
  const tailsCount = history.filter((h) => h === "Tails").length;
  const totalFlips = history.length;

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    // Generate true random number using crypto
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const result: CoinResult = array[0] % 2 === 0 ? "Heads" : "Tails";
    
    // Calculate new rotation
    // Each flip adds at least 5 half-rotations (180deg) to spin a few times
    const spins = 5 + (array[0] % 5);
    const extraRotation = spins * 180;
    
    // Determine the next state based on current rotation
    const currentRotMod = rotation % 360;
    const isCurrentlyHeads = currentRotMod === 0;
    
    let targetRotation = rotation + extraRotation;
    const targetRotMod = targetRotation % 360;
    const willBeHeads = targetRotMod === 0;
    
    if ((result === "Heads" && !willBeHeads) || (result === "Tails" && willBeHeads)) {
      targetRotation += 180;
    }
    
    setRotation(targetRotation);
    
    setTimeout(() => {
      setHistory((prev) => [result, ...prev]);
      setIsFlipping(false);
    }, 1000); // Wait for the animation to finish
  };

  const resetStats = () => {
    setHistory([]);
    setRotation(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToolPageHeader title="Flip a Coin" description="Flip a virtual coin with true randomness and track your statistics." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="flex flex-col items-center p-6 text-center shadow-lg border-2">
          <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[350px]">
            {/* The Coin */}
            <div 
              className="relative w-56 h-56 cursor-pointer"
              onClick={flipCoin}
              style={{ perspective: "1000px" }}
            >
              <div 
                className="w-full h-full rounded-full transition-transform duration-1000 ease-out"
                style={{ 
                  transform: `rotateY(${rotation}deg)`,
                  transformStyle: "preserve-3d" 
                }}
              >
                {/* Heads Side */}
                <div 
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-8 border-yellow-700 shadow-[inset_0_0_20px_rgba(0,0,0,0.4),_0_10px_20px_rgba(0,0,0,0.3)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex flex-col items-center text-yellow-900">
                    <Coins size={64} className="mb-2 opacity-80" />
                    <span className="text-3xl font-black tracking-widest">HEADS</span>
                  </div>
                </div>
                
                {/* Tails Side */}
                <div 
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-8 border-slate-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.4),_0_10px_20px_rgba(0,0,0,0.3)]"
                  style={{ 
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden" 
                  }}
                >
                  <div className="flex flex-col items-center text-slate-800">
                    <Coins size={64} className="mb-2 opacity-80" />
                    <span className="text-3xl font-black tracking-widest">TAILS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="w-full mt-8 font-bold text-lg h-14" 
            onClick={flipCoin}
            disabled={isFlipping}
          >
            {isFlipping ? "Flipping..." : "FLIP COIN"}
          </Button>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-secondary p-4 rounded-xl shadow-sm">
                  <div className="text-4xl font-black">{totalFlips}</div>
                  <div className="text-xs text-muted-foreground uppercase mt-2 font-semibold">Total Flips</div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-400 p-4 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-900/50">
                  <div className="text-4xl font-black">{headsCount}</div>
                  <div className="text-xs uppercase mt-2 font-semibold">Heads ({totalFlips ? Math.round((headsCount/totalFlips)*100) : 0}%)</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="text-4xl font-black">{tailsCount}</div>
                  <div className="text-xs uppercase mt-2 font-semibold">Tails ({totalFlips ? Math.round((tailsCount/totalFlips)*100) : 0}%)</div>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={resetStats} disabled={totalFlips === 0}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Statistics
              </Button>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">History</CardTitle>
              <CardDescription>Recent flips from newest to oldest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto p-1">
                {history.length > 0 ? (
                  history.map((result, i) => (
                    <Badge 
                      key={i} 
                      className={"text-sm px-3 py-1 " + (result === "Heads" 
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white border-none shadow-sm" 
                        : "bg-slate-500 hover:bg-slate-600 text-white border-none shadow-sm")}
                    >
                      {result === "Heads" ? "H" : "T"}
                    </Badge>
                  ))
                ) : (
                  <div className="w-full text-center py-8 text-sm text-muted-foreground border-2 border-dashed rounded-lg">
                    No flips yet. Click the coin to start!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
