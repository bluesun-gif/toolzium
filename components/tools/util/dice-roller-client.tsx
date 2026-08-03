"use client";

import { useState, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dices, RotateCcw, History, BarChart3, Trash2 } from "lucide-react";

// Secure random number generator (1-6)
const secureRandomDie = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return (array[0] % 6) + 1;
};

const Die = ({ value, rolling }: { value: number; rolling: boolean }) => {
  const getDots = (v: number) => {
    switch (v) {
      case 1: return [4];
      case 2: return [0, 8];
      case 3: return [0, 4, 8];
      case 4: return [0, 2, 6, 8];
      case 5: return [0, 2, 4, 6, 8];
      case 6: return [0, 2, 3, 5, 6, 8];
      default: return [4];
    }
  };

  const dots = getDots(value);
  const rotation = rolling ? Math.floor(Math.random() * 360) : 0;
  
  return (
    <div 
      className="w-16 h-16 sm:w-24 sm:h-24 bg-white border-2 border-slate-200 rounded-xl shadow-md p-2 grid grid-cols-3 grid-rows-3 gap-1 transition-all duration-300"
      style={{
        transform: rolling ? `rotate(${rotation}deg) scale(1.1)` : 'rotate(0deg) scale(1)',
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div 
          key={i} 
          className={`rounded-full transition-colors duration-200 ${dots.includes(i) ? 'bg-slate-800' : 'bg-transparent'}`} 
        />
      ))}
    </div>
  );
};

interface RollRecord {
  id: string;
  timestamp: Date;
  values: number[];
  total: number;
}

export default function DiceRollerClient() {
  const [numDice, setNumDice] = useState<number>(2);
  const [dice, setDice] = useState<number[]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<RollRecord[]>([]);

  // Initialize dice when number of dice changes
  useEffect(() => {
    if (dice.length !== numDice) {
      const newDice = Array(numDice).fill(1).map((_, i) => dice[i] || 1);
      setDice(newDice);
    }
  }, [numDice, dice]);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Simulate rolling animation
    const rollInterval = setInterval(() => {
      setDice(Array(numDice).fill(0).map(() => Math.floor(Math.random() * 6) + 1));
    }, 50);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValues = Array(numDice).fill(0).map(() => secureRandomDie());
      setDice(finalValues);
      setIsRolling(false);
      
      setHistory(prev => [{
        id: crypto.randomUUID(),
        timestamp: new Date(),
        values: finalValues,
        total: finalValues.reduce((a, b) => a + b, 0)
      }, ...prev]);
    }, 600);
  }, [numDice, isRolling]);

  const clearHistory = () => setHistory([]);

  // Statistics
  const totalRolls = history.length;
  const allRolledValues = history.flatMap(h => h.values);
  const totalSum = allRolledValues.reduce((a, b) => a + b, 0);
  const average = totalRolls > 0 ? (totalSum / allRolledValues.length).toFixed(2) : "0.00";
  
  const distribution = [1, 2, 3, 4, 5, 6].map(val => ({
    value: val,
    count: allRolledValues.filter(v => v === val).length
  }));
  const maxCount = Math.max(...distribution.map(d => d.count), 1);

  return (
    <>
      <ToolPageHeader 
        title="Dice Roller" 
        description="Roll virtual dice online with realistic faces, tracking, and statistics. Supports up to 6 dice simultaneously." 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Roll Dice</CardTitle>
            <CardDescription>Click the button or press Space to roll</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Number of Dice: {numDice}</Label>
              </div>
              <Slider
                value={[numDice]}
                min={1}
                max={6}
                step={1}
                onValueChange={(val) => setNumDice(val[0])}
                disabled={isRolling}
              />
            </div>

            <div className="min-h-[250px] flex items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex flex-wrap justify-center gap-6">
                {dice.map((val, idx) => (
                  <Die key={idx} value={val} rolling={isRolling} />
                ))}
              </div>
            </div>

            <div className="flex justify-center flex-col items-center gap-4">
              <Button 
                size="lg" 
                onClick={rollDice} 
                disabled={isRolling}
                className="w-full sm:w-auto min-w-[200px] text-lg h-14"
              >
                {isRolling ? (
                  <RotateCcw className="mr-2 h-6 w-6 animate-spin" />
                ) : (
                  <Dices className="mr-2 h-6 w-6" />
                )}
                {isRolling ? "Rolling..." : "Roll Dice"}
              </Button>
              
              {!isRolling && history.length > 0 && (
                <div className="text-center">
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-4xl font-bold text-slate-800">
                    {history[0].total}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="history">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="history"><History className="w-4 h-4 mr-2" /> History</TabsTrigger>
                <TabsTrigger value="stats"><BarChart3 className="w-4 h-4 mr-2" /> Stats</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="space-y-4 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-500">Recent Rolls</span>
                  {history.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearHistory}>
                      <Trash2 className="w-4 h-4 mr-2" /> Clear
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-[350px] pr-4">
                  {history.length === 0 ? (
                    <div className="text-center text-slate-500 text-sm py-10">No rolls yet</div>
                  ) : (
                    <div className="space-y-3">
                      {history.map((record) => (
                        <div key={record.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex gap-2">
                            {record.values.map((v, i) => (
                              <Badge key={i} variant="outline" className="w-6 h-6 p-0 flex items-center justify-center bg-white">
                                {v}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold">Sum: {record.total}</span>
                            <span className="text-xs text-slate-400">
                              {record.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="stats" className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-xs text-slate-500 mb-1">Total Rolls</div>
                    <div className="text-2xl font-bold">{totalRolls}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-xs text-slate-500 mb-1">Average Face</div>
                    <div className="text-2xl font-bold">{average}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Face Distribution</Label>
                  <div className="space-y-2">
                    {distribution.map((d) => (
                      <div key={d.value} className="flex items-center gap-3">
                        <div className="w-4 text-sm font-medium">{d.value}</div>
                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-slate-800 rounded-full transition-all duration-500"
                            style={{ width: `${totalRolls > 0 ? (d.count / maxCount) * 100 : 0}%` }}
                          />
                        </div>
                        <div className="w-8 text-right text-sm text-slate-500">{d.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
