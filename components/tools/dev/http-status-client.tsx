"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CopyButton, ActionButton } from "@/components/shared/action-buttons";
import { Server, Search, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusCode = {
  code: number;
  name: string;
  description: string;
  useCase: string;
  category: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
};

const STATUS_CODES: StatusCode[] = [
  // 1xx
  { code: 100, name: "Continue", description: "The server has received the request headers and the client should proceed to send the request body.", useCase: "Client sending a large payload to check if server accepts it.", category: "1xx" },
  { code: 101, name: "Switching Protocols", description: "The requester has asked the server to switch protocols and the server has agreed to do so.", useCase: "Upgrading HTTP to WebSocket.", category: "1xx" },
  
  // 2xx
  { code: 200, name: "OK", description: "Standard response for successful HTTP requests.", useCase: "Successful GET or POST requests.", category: "2xx" },
  { code: 201, name: "Created", description: "The request has been fulfilled, resulting in the creation of a new resource.", useCase: "Successful POST request creating a user.", category: "2xx" },
  { code: 204, name: "No Content", description: "The server successfully processed the request and is not returning any content.", useCase: "Successful DELETE request.", category: "2xx" },
  
  // 3xx
  { code: 301, name: "Moved Permanently", description: "This and all future requests should be directed to the given URI.", useCase: "Domain redirection.", category: "3xx" },
  { code: 302, name: "Found", description: "Tells the client to look at (browse to) another URL.", useCase: "Temporary redirect.", category: "3xx" },
  { code: 304, name: "Not Modified", description: "Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.", useCase: "Caching optimization.", category: "3xx" },

  // 4xx
  { code: 400, name: "Bad Request", description: "The server cannot or will not process the request due to an apparent client error.", useCase: "Invalid JSON payload.", category: "4xx" },
  { code: 401, name: "Unauthorized", description: "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.", useCase: "Missing or invalid auth token.", category: "4xx" },
  { code: 403, name: "Forbidden", description: "The request contained valid data and was understood by the server, but the server is refusing action.", useCase: "Insufficient permissions.", category: "4xx" },
  { code: 404, name: "Not Found", description: "The requested resource could not be found but may be available in the future.", useCase: "Invalid URL.", category: "4xx" },
  { code: 429, name: "Too Many Requests", description: "The user has sent too many requests in a given amount of time.", useCase: "Rate limiting.", category: "4xx" },
  
  // 5xx
  { code: 500, name: "Internal Server Error", description: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.", useCase: "Unhandled backend exception.", category: "5xx" },
  { code: 502, name: "Bad Gateway", description: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.", useCase: "Proxy/gateway error.", category: "5xx" },
  { code: 503, name: "Service Unavailable", description: "The server cannot handle the request (because it is overloaded or down for maintenance).", useCase: "Maintenance or overload.", category: "5xx" }
];

const categoryColors = {
  "1xx": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800",
  "2xx": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800",
  "3xx": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800",
  "4xx": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800",
  "5xx": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800"
};

export function HttpStatusClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCodes = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return STATUS_CODES.filter(
      (c) => c.code.toString().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = { "1xx": 0, "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0 };
    STATUS_CODES.forEach(c => counts[c.category]++);
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Server}
        title="HTTP Status Code Reference"
        description="Comprehensive dictionary of HTTP status codes, their meanings, and typical use cases."
        actions={
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by code or name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(stats).map(([cat, count]) => (
          <GlassCard key={cat} className={cn("border", categoryColors[cat as keyof typeof categoryColors])}>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{cat}</span>
              <span className="text-sm opacity-80">{count} Codes</span>
            </CardContent>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCodes.map((code) => (
          <GlassCard key={code.code} className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className={cn("px-2 py-1 rounded text-sm font-bold border", categoryColors[code.category])}>
                    {code.code}
                  </span>
                  <CardTitle className="text-lg">{code.name}</CardTitle>
                </div>
                <CopyButton
                  getText={() => `${code.code} ${code.name}\n${code.description}\nUse Case: ${code.useCase}`}
                  label="Copy"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">{code.description}</p>
              <Separator />
              <div className="mt-auto">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Common Use Case
                </p>
                <p className="text-sm">{code.useCase}</p>
              </div>
            </CardContent>
          </GlassCard>
        ))}
        {filteredCodes.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground flex flex-col items-center">
            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
            <p>No status codes found matching &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
