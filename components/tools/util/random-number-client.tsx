"use client";

import { useState, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function RandomNumberClient() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(10);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [sortResults, setSortResults] = useState<boolean>(false);
  
  const [singleResult, setSingleResult] = useState<number | null>(null);
  const [bulkResults, setBulkResults] = useState<number[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getSecureRandomNumber = (minVal: number, maxVal: number): number => {
    const range = maxVal - minVal + 1;
    const maxSafeInteger = Number.MAX_SAFE_INTEGER;
    if (range > maxSafeInteger) {
       // Fallback for extremely large ranges
       return Math.floor(Math.random() * range) + minVal;
    }
    
    // We need to find the smallest power of 256 that can represent the range
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    const maxValidValue = Math.pow(256, bytesNeeded) - (Math.pow(256, bytesNeeded) % range);
    
    const array = new Uint8Array(bytesNeeded);
    let randomValue;
    
    do {
      window.crypto.getRandomValues(array);
      randomValue = 0;
      for (let i = 0; i < bytesNeeded; i++) {
        randomValue = (randomValue << 8) + array[i];
      }
    } while (randomValue >= maxValidValue); // Reject values to avoid modulo bias
    
    return minVal + (randomValue % range);
  };

  const generateSingle = useCallback(() => {
    if (min >= max) {
      toast.error("Min value must be less than Max value");
      return;
    }
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    const result = getSecureRandomNumber(min, max);
    setSingleResult(result);
    setHistory(prev => [result.toString(), ...prev].slice(0, 50));
  }, [min, max]);

  const generateBulk = useCallback(() => {
    if (min >= max) {
      toast.error("Min value must be less than Max value");
      return;
    }
    if (count < 1 || count > 100) {
      toast.error("Count must be between 1 and 100");
      return;
    }
    if (!allowDuplicates && count > (max - min + 1)) {
      toast.error("Cannot generate unique numbers: count exceeds range");
      return;
    }

    const results: number[] = [];
    const used = new Set<number>();

    while (results.length < count) {
      const num = getSecureRandomNumber(min, max);
      if (!allowDuplicates) {
        if (!used.has(num)) {
          used.add(num);
          results.push(num);
        }
      } else {
        results.push(num);
      }
    }

    if (sortResults) {
      results.sort((a, b) => a - b);
    }

    setBulkResults(results);
    setHistory(prev => [results.join(", "), ...prev].slice(0, 50));
  }, [min, max, count, allowDuplicates, sortResults]);

  useEffect(() => {
    const result = getSecureRandomNumber(min, max);
    setSingleResult(result);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <>
      <ToolPageHeader 
        title="Random Number Generator" 
        description="Generate cryptographically secure random numbers within a specified range." 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generator Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="single">Single Number</TabsTrigger>
                  <TabsTrigger value="bulk">Multiple Numbers</TabsTrigger>
                </TabsList>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="min">Min</Label>
                    <Input 
                      id="min" 
                      type="number" 
                      value={min} 
                      onChange={(e) => setMin(Number(e.target.value))} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max">Max</Label>
                    <Input 
                      id="max" 
                      type="number" 
                      value={max} 
                      onChange={(e) => setMax(Number(e.target.value))} 
                    />
                  </div>
                </div>

                <TabsContent value="single" className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-12 bg-muted/30 rounded-lg border border-dashed relative overflow-hidden">
                    <div 
                      className={cn(
                        "text-7xl md:text-9xl font-bold tracking-tighter tabular-nums transition-all duration-300",
                        isAnimating ? "scale-110 opacity-50 blur-sm" : "scale-100 opacity-100 blur-0"
                      )}
                    >
                      {singleResult !== null ? singleResult : "-"}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button onClick={generateSingle} className="w-full" size="lg">
                      <RefreshCw className={cn("mr-2 h-5 w-5", isAnimating && "animate-spin")} />
                      Generate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => copyToClipboard(singleResult?.toString() || "")}
                      disabled={singleResult === null}
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="bulk" className="space-y-6">
                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg border">
                    <div className="space-y-2">
                      <Label htmlFor="count">How many numbers? (Max: 100)</Label>
                      <Input 
                        id="count" 
                        type="number" 
                        min={1} 
                        max={100} 
                        value={count} 
                        onChange={(e) => setCount(Number(e.target.value))} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allowDuplicates">Allow Duplicates</Label>
                        <p className="text-xs text-muted-foreground">
                          Numbers can repeat in the result
                        </p>
                      </div>
                      <Switch 
                        id="allowDuplicates" 
                        checked={allowDuplicates} 
                        onCheckedChange={setAllowDuplicates} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sortResults">Sort Results</Label>
                        <p className="text-xs text-muted-foreground">
                          Order numbers from smallest to largest
                        </p>
                      </div>
                      <Switch 
                        id="sortResults" 
                        checked={sortResults} 
                        onCheckedChange={setSortResults} 
                      />
                    </div>
                  </div>

                  {bulkResults.length > 0 && (
                    <div className="p-4 bg-muted/50 rounded-lg border break-words">
                      <p className="text-lg tabular-nums leading-relaxed">
                        {bulkResults.join(", ")}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <Button onClick={generateBulk} className="w-full" size="lg">
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Generate {count > 0 ? count : ""} Numbers
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => copyToClipboard(bulkResults.join(", "))}
                      disabled={bulkResults.length === 0}
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">History</CardTitle>
              {history.length > 0 && (
                <Button variant="ghost" size="icon" onClick={clearHistory} title="Clear History">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No numbers generated yet
                </p>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {history.map((item, index) => (
                    <div 
                      key={index} 
                      className="text-sm p-2 bg-muted rounded truncate tabular-nums flex justify-between items-center group cursor-pointer hover:bg-muted/80"
                      onClick={() => copyToClipboard(item)}
                      title="Click to copy"
                    >
                      <span className="truncate mr-2">{item}</span>
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
