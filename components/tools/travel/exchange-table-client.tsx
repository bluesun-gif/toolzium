"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Table as TableIcon, DollarSign, Globe, Copy, Printer } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ExchangeTableClient() {
  const [baseCur, setBaseCur] = useState("USD");
  const [targetCur, setTargetCur] = useState("EUR");
  const [rate, setRate] = useState<number>(0.92);

  useEffect(() => {
    const saved = localStorage.getItem("exchange-table-settings");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.baseCur) setBaseCur(p.baseCur);
        if (p.targetCur) setTargetCur(p.targetCur);
        if (p.rate) setRate(p.rate);
      } catch (e) {}
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem("exchange-table-settings", JSON.stringify({ baseCur, targetCur, rate }));
  };

  const handleReset = () => {
    setBaseCur("USD");
    setTargetCur("EUR");
    setRate(0.92);
  };

  const units = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];

  const getTableText = () => {
    let text = "Exchange Reference: " + baseCur + " to " + targetCur + "\nRate: 1 " + baseCur + " = " + rate + " " + targetCur + "\n\n";
    text += baseCur + " -> " + targetCur + " | " + targetCur + " -> " + baseCur + "\n";
    text += "--------------------------------------\n";
    units.forEach(u => {
      const bToT = (u * rate).toFixed(2);
      const tToB = (rate > 0 ? (u / rate).toFixed(2) : "0.00");
      text += u + " " + baseCur + " = " + bToT + " " + targetCur + " | " + u + " " + targetCur + " = " + tToB + " " + baseCur + "\n";
    });
    return text;
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Print Exchange Table</title><style>body { font-family: sans-serif; padding: 2rem; } table { border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom: 2rem; } th, td { border: 1px solid #ddd; padding: 8px; text-align: right; } th { background-color: #f2f2f2; }</style></head><body>");
      printWindow.document.write("<h2>Exchange Reference: " + baseCur + " to " + targetCur + "</h2>");
      printWindow.document.write("<p>Rate: 1 " + baseCur + " = " + rate + " " + targetCur + "</p>");
      
      printWindow.document.write("<table><thead><tr><th>" + baseCur + "</th><th>" + targetCur + "</th><th>" + targetCur + "</th><th>" + baseCur + "</th></tr></thead><tbody>");
      units.forEach(u => {
        const bToT = (u * rate).toFixed(2);
        const tToB = (rate > 0 ? (u / rate).toFixed(2) : "0.00");
        printWindow.document.write("<tr><td>" + u + "</td><td>" + bToT + "</td><td>" + u + "</td><td>" + tToB + "</td></tr>");
      });
      printWindow.document.write("</tbody></table>");
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={TableIcon}
        title="Currency Exchange Comparison Table"
        description="Quick currency exchange conversion reference table for traveler pockets."
        actions={
          <React.Fragment>
            <ResetButton onClick={handleReset} label="Reset" />
          </React.Fragment>
        }
      />

      <div className={"grid grid-cols-1 lg:grid-cols-3 gap-6"}>
        <GlassCard className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure currency and rate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Base Currency (e.g. USD)</Label>
              <Input value={baseCur} onChange={(e) => setBaseCur(e.target.value.toUpperCase())} maxLength={3} />
            </div>
            <div className="space-y-2">
              <Label>Target Currency (e.g. EUR)</Label>
              <Input value={targetCur} onChange={(e) => setTargetCur(e.target.value.toUpperCase())} maxLength={3} />
            </div>
            <div className="space-y-2">
              <Label>Exchange Rate (1 {baseCur} = ? {targetCur})</Label>
              <Input type="number" step="0.0001" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} />
            </div>
            <Button className="w-full" onClick={saveSettings}>Save Settings</Button>
          </CardContent>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Reference Table</CardTitle>
              <CardDescription>Print or copy for your wallet.</CardDescription>
            </div>
            <div className={"flex gap-2"}>
              <CopyButton getText={getTableText} label="Copy Text" />
              <ActionButton onClick={handlePrint} icon={Printer} label="Print" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right w-1/4">{baseCur}</TableHead>
                    <TableHead className="text-right w-1/4 font-bold border-r">{targetCur}</TableHead>
                    <TableHead className="text-right w-1/4">{targetCur}</TableHead>
                    <TableHead className="text-right w-1/4 font-bold">{baseCur}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {units.map(u => (
                    <TableRow key={u}>
                      <TableCell className="text-right">{u}</TableCell>
                      <TableCell className="text-right font-medium border-r">{(u * rate).toFixed(2)}</TableCell>
                      <TableCell className="text-right">{u}</TableCell>
                      <TableCell className="text-right font-medium">{(rate > 0 ? (u / rate).toFixed(2) : "0.00")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
