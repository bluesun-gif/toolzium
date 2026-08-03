"use client";

import React, { useState, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wifi, QrCode, Download, Printer } from "lucide-react";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";

export function WifiQrClient() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [hidden, setHidden] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const getWifiString = () => {
    const escSsid = ssid.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/:/g, '\\:');
    const escPwd = password.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/:/g, '\\:');
    
    let str = `WIFI:T:${encryption};S:${escSsid};`;
    if (encryption !== "nopass") {
      str += `P:${escPwd};`;
    }
    if (hidden) {
      str += `H:true;`;
    }
    str += `;`;
    return str;
  };

  const qrUrl = ssid ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(getWifiString())}&margin=10` : "";

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wifi-${ssid || 'network'}-qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("QR Code downloaded!");
    } catch (error) {
      toast.error("Failed to download QR code. Try opening image in new tab.");
    }
  };

  const handlePrint = () => {
    if (!qrUrl || !printRef.current) return;
    
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      toast.error("Pop-up blocked. Please allow pop-ups to print.");
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print WiFi QR</title>
          <style>
            body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .print-card { border: 2px dashed #ccc; padding: 40px; border-radius: 16px; text-align: center; }
            img { max-width: 300px; margin-bottom: 20px; }
            h1 { margin: 0 0 10px 0; font-size: 24px; }
            p { color: #666; margin: 0; }
          </style>
        </head>
        <body>
          <div class="print-card">
            ${printContent}
          </div>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleReset = () => {
    setSsid("");
    setPassword("");
    setEncryption("WPA");
    setHidden(false);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Wifi}
        title="WiFi QR Code Generator"
        description="Create a QR code that lets guests connect to your WiFi network by simply scanning it."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Network Details</CardTitle>
            <CardDescription>Enter your WiFi connection information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Network Name (SSID)</Label>
              <Input
                placeholder="e.g. My Home Network"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Security Type</Label>
              <Select value={encryption} onValueChange={setEncryption}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2/WPA3</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">None (Open Network)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {encryption !== "nopass" && (
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Network password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="hidden-network"
                checked={hidden}
                onCheckedChange={setHidden}
              />
              <Label htmlFor="hidden-network">Hidden Network</Label>
            </div>

            <div className="pt-4 flex justify-end">
              <ResetButton onClick={handleReset} />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
            <CardDescription>Scan this code to connect</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6">
            <div 
              ref={printRef}
              className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center"
            >
              {qrUrl ? (
                <>
                  <img src={qrUrl} alt="WiFi QR Code" className="w-48 h-48 sm:w-64 sm:h-64 object-contain mb-4" crossOrigin="anonymous" />
                  <h3 className="font-bold text-lg text-center text-slate-800">{ssid}</h3>
                  <p className="text-sm text-slate-500 text-center">Scan to connect to WiFi</p>
                </>
              ) : (
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-muted flex items-center justify-center rounded-lg text-muted-foreground mb-4 flex-col">
                  <QrCode className="w-12 h-12 mb-2 opacity-20" />
                  <span className="text-sm">Enter SSID to generate</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 w-full justify-center">
              <ActionButton 
                onClick={handleDownload} 
                icon={Download} 
                label="Download PNG" 
                disabled={!qrUrl}
                variant="default"
              />
              <ActionButton 
                onClick={handlePrint} 
                icon={Printer} 
                label="Print Code" 
                disabled={!qrUrl}
              />
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
