"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Square, TimerReset, Flag, Copy } from "lucide-react";
import toast from "react-hot-toast";

interface Lap {
  id: number;
  time: number;
  overall: number;
}

export default function StopwatchClient() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);

  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const animate = useCallback((currentTime: number) => {
    const deltaTime = currentTime - startTimeRef.current;
    const newTime = accumulatedTimeRef.current + deltaTime;
    timeRef.current = newTime;
    setTime(newTime);
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      accumulatedTimeRef.current = timeRef.current;
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isRunning, animate]);

  const handleStartStop = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleLap = useCallback(() => {
    if (!isRunning) return;
    setLaps((prevLaps) => {
      const prevTotal = prevLaps.length > 0 ? prevLaps[0].overall : 0;
      const lapTime = timeRef.current - prevTotal;
      return [{ id: prevLaps.length + 1, time: lapTime, overall: timeRef.current }, ...prevLaps];
    });
  }, [isRunning]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    timeRef.current = 0;
    accumulatedTimeRef.current = 0;
    setLaps([]);
  }, []);

  const recordLap = useCallback(() => {
    if (!isRunning && timeRef.current === 0) return;
    
    setLaps((prevLaps) => {
      const prevTotal = prevLaps.length > 0 ? prevLaps[0].overall : 0;
      const lapTime = timeRef.current - prevTotal;
      const newLap: Lap = {
        id: prevLaps.length + 1,
        time: lapTime,
        overall: timeRef.current,
      };
      return [newLap, ...prevLaps];
    });
  }, [isRunning]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.code === "Space") {
        e.preventDefault();
        handleStartStop();
      } else if (e.code === "KeyL") {
        e.preventDefault();
        recordLap();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleStartStop, recordLap, handleReset]);

  const formatTime = (ms: number) => {
    if (ms === 0) return "00:00.00";
    const totalMs = Math.floor(ms);
    const milliseconds = Math.floor((totalMs % 1000) / 10).toString().padStart(2, "0");
    const seconds = Math.floor((totalMs / 1000) % 60).toString().padStart(2, "0");
    const minutes = Math.floor(totalMs / (1000 * 60)).toString().padStart(2, "0");
    
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const copyLaps = () => {
    if (laps.length === 0) {
      toast.error("Record some laps first.");
      return;
    }
    const text = laps
      .map((lap) => `Lap ${lap.id}: ${formatTime(lap.time)} (Total: ${formatTime(lap.overall)})`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast.success("Lap times copied to clipboard.");
  };

  return (
    <>
      <ToolPageHeader 
        title="Stopwatch" 
        description="A precise stopwatch with lap recording and millisecond accuracy. Features keyboard shortcuts for quick control." 
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-1 lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Timer</CardTitle>
            <CardDescription>
              Keyboard shortcuts: <kbd className="px-1 py-0.5 bg-muted rounded border text-xs">Space</kbd> Start/Stop · <kbd className="px-1 py-0.5 bg-muted rounded border text-xs">L</kbd> Lap · <kbd className="px-1 py-0.5 bg-muted rounded border text-xs">R</kbd> Reset
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
            <div className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold tabular-nums tracking-tight">
              {formatTime(time)}
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center w-full max-w-md">
              <Button 
                size="lg" 
                variant={isRunning ? "destructive" : "default"} 
                className="flex-1 min-w-32 h-16 text-lg"
                onClick={handleStartStop}
              >
                {isRunning ? (
                  <><Square className="mr-2 h-5 w-5 fill-current" /> Stop</>
                ) : (
                  <><Play className="mr-2 h-5 w-5 fill-current" /> Start</>
                )}
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary" 
                className="flex-1 min-w-32 h-16 text-lg"
                onClick={handleLap}
                disabled={!isRunning}
              >
                <Flag className="mr-2 h-5 w-5" /> Lap
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 min-w-32 h-16 text-lg"
                onClick={handleReset}
                disabled={time === 0}
              >
                <TimerReset className="mr-2 h-5 w-5" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-[500px] md:h-auto md:min-h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1">
              <CardTitle>Laps</CardTitle>
              <CardDescription>{laps.length} recorded</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={copyLaps} disabled={laps.length === 0} title="Copy laps">
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden relative">
            {laps.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground p-6 text-center">
                No laps recorded yet. Start the timer and click Lap to record.
              </div>
            ) : (
              <ScrollArea className="h-full absolute inset-0">
                <div className="space-y-4 px-6 pb-6 pt-2">
                  {laps.map((lap) => (
                    <div key={lap.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div className="text-sm font-medium text-muted-foreground">
                        Lap {lap.id}
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-semibold">
                          +{formatTime(lap.time)}
                        </div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {formatTime(lap.overall)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
