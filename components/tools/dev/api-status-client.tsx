"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Activity, RefreshCw, Globe, CheckCircle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

type ServiceStatus = "checking" | "up" | "down" | "unknown";

interface Service {
  id: string;
  name: string;
  url: string;
  status: ServiceStatus;
  lastChecked: Date | null;
  responseTime: number | null;
}

const DEFAULT_SERVICES: Service[] = [
  { id: "1", name: "Google", url: "https://www.google.com", status: "unknown", lastChecked: null, responseTime: null },
  { id: "2", name: "GitHub", url: "https://github.com", status: "unknown", lastChecked: null, responseTime: null },
  { id: "3", name: "AWS", url: "https://aws.amazon.com", status: "unknown", lastChecked: null, responseTime: null },
  { id: "4", name: "Cloudflare", url: "https://www.cloudflare.com", status: "unknown", lastChecked: null, responseTime: null },
  { id: "5", name: "Vercel", url: "https://vercel.com", status: "unknown", lastChecked: null, responseTime: null },
  { id: "6", name: "NPM", url: "https://registry.npmjs.org", status: "unknown", lastChecked: null, responseTime: null },
  { id: "7", name: "PyPI", url: "https://pypi.org", status: "unknown", lastChecked: null, responseTime: null },
  { id: "8", name: "Docker Hub", url: "https://hub.docker.com", status: "unknown", lastChecked: null, responseTime: null }
];

export function ApiStatusClient() {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [customUrl, setCustomUrl] = useState("");
  const [customName, setCustomName] = useState("");

  const checkService = async (id: string, url: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, status: "checking" } : s));
    
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch(url, { mode: "no-cors", signal: controller.signal });
      clearTimeout(timeoutId);
      
      const endTime = Date.now();
      setServices(prev => prev.map(s => s.id === id ? {
        ...s,
        status: "up",
        lastChecked: new Date(),
        responseTime: endTime - startTime
      } : s));
    } catch (error) {
      setServices(prev => prev.map(s => s.id === id ? {
        ...s,
        status: "down",
        lastChecked: new Date(),
        responseTime: null
      } : s));
    }
  };

  const checkAll = () => {
    services.forEach(s => checkService(s.id, s.url));
    toast.success("Checking all services...");
  };

  const addCustomService = () => {
    if (!customUrl) {
      toast.error("Please enter a URL");
      return;
    }
    
    let formattedUrl = customUrl;
    if (!/^https?:\/\//i.test(customUrl)) {
      formattedUrl = "https://" + customUrl;
    }

    const newService: Service = {
      id: Date.now().toString(),
      name: customName || formattedUrl,
      url: formattedUrl,
      status: "unknown",
      lastChecked: null,
      responseTime: null
    };

    setServices([...services, newService]);
    setCustomUrl("");
    setCustomName("");
    checkService(newService.id, newService.url);
  };

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case "up": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "down": return <XCircle className="h-5 w-5 text-red-500" />;
      case "checking": return <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Activity}
        title="API Status Monitor"
        description="Check if popular APIs, services, and custom endpoints are reachable."
        actions={
          <ActionButton onClick={checkAll} icon={RefreshCw} label="Check All" variant="default" />
        }
      />

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Add Custom Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Name (optional)</label>
              <Input
                placeholder="e.g., My Personal API"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Endpoint URL</label>
              <Input
                placeholder="https://api.example.com"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomService()}
              />
            </div>
            <Button className="w-full" onClick={addCustomService}>
              <Globe className="h-4 w-4 mr-2" />
              Add & Check
            </Button>
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Service Status</CardTitle>
            <CardDescription>Note: Due to browser CORS restrictions, some services might not report accurate detailed errors but will show as reachable if they respond.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-[300px]">
                        {service.url}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm">
                        {service.status === "up" && service.responseTime !== null ? `${service.responseTime}ms` : "-"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {service.lastChecked ? service.lastChecked.toLocaleTimeString() : "Not checked"}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => checkService(service.id, service.url)}
                      disabled={service.status === "checking"}
                    >
                      <RefreshCw className={`h-4 w-4 ${service.status === "checking" ? "animate-spin" : ""}`} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
