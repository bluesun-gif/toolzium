"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Search, Server, Globe, AlertCircle, CheckCircle, Info } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface HttpStatus {
 code: number;
 name: string;
 desc: string;
 cat:"1xx"|"2xx"|"3xx"|"4xx"|"5xx";
 example: string;
}

const statuses: HttpStatus[] = [
 { code: 100, name:"Continue", desc:"The server has received the request headers and the client should proceed to send the request body.", cat:"1xx", example:"Used in large file uploads to verify server readiness before transmission."},
 { code: 101, name:"Switching Protocols", desc:"The requester has asked the server to change protocols and the server has agreed to do so.", cat:"1xx", example:"Upgrading an HTTP connection to a WebSocket protocol."},
 { code: 200, name:"OK", desc:"The request has succeeded. The information returned depends on the method used.", cat:"2xx", example:"A standard GET request successfully retrieving a webpage or API resource."},
 { code: 201, name:"Created", desc:"The request has been fulfilled and has resulted in the creation of a new resource.", cat:"2xx", example:"A POST request successfully creating a new user record in the database."},
 { code: 202, name:"Accepted", desc:"The request has been accepted for processing, but the processing has not been completed.", cat:"2xx", example:"A long-running background job like video transcoding has been queued."},
 { code: 204, name:"No Content", desc:"The server has successfully fulfilled the request but does not need to return a body.", cat:"2xx", example:"A DELETE request that successfully removes a record without returning the deleted data."},
 { code: 301, name:"Moved Permanently", desc:"The requested resource has been assigned a new permanent URI and any future references should use one of the returned URIs.", cat:"3xx", example:"Redirecting an old HTTP domain to its HTTPS equivalent."},
 { code: 302, name:"Found", desc:"The requested resource resides temporarily under a different URI.", cat:"3xx", example:"Temporary redirect during a maintenance window or A/B testing."},
 { code: 304, name:"Not Modified", desc:"Indicates that the resource has not been modified since the version specified by the request headers.", cat:"3xx", example:"Browser cache validation using If-Modified-Since headers."},
 { code: 307, name:"Temporary Redirect", desc:"The requested resource resides temporarily under a different URI, but the method must not change.", cat:"3xx", example:"Redirecting a POST request while preserving the POST method and body."},
 { code: 400, name:"Bad Request", desc:"The request could not be understood by the server due to malformed syntax.", cat:"4xx", example:"Sending invalid JSON or missing required parameters in an API call."},
 { code: 401, name:"Unauthorized", desc:"The request requires user authentication. The client must authenticate itself to get the requested response.", cat:"4xx", example:"Attempting to access a protected route without a valid JWT token."},
 { code: 403, name:"Forbidden", desc:"The server understood the request, but is refusing to fulfill it. Authorization will not help.", cat:"4xx", example:"A logged-in user attempting to access an admin-only dashboard."},
 { code: 404, name:"Not Found", desc:"The server has not found anything matching the Request-URI.", cat:"4xx", example:"A user clicking a broken link or mistyping a URL."},
 { code: 405, name:"Method Not Allowed", desc:"The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.", cat:"4xx", example:"Sending a DELETE request to an endpoint that only supports GET."},
 { code: 408, name:"Request Timeout", desc:"The client did not produce a request within the time that the server was prepared to wait.", cat:"4xx", example:"A slow client connection failing to send headers in time."},
 { code: 409, name:"Conflict", desc:"The request could not be completed due to a conflict with the current state of the resource.", cat:"4xx", example:"Attempting to create a user with an email address that already exists."},
 { code: 418, name:"I'm a teapot", desc:"Any attempt to brew coffee with a teapot should result in the error code '418 I'm a teapot'.", cat:"4xx", example:"An April Fools' joke defined in RFC 2324 (HTCPCP)."},
 { code: 422, name:"Unprocessable Entity", desc:"The server understands the content type, but was unable to process the contained instructions.", cat:"4xx", example:"Validation failures where the JSON is valid but the data violates business rules."},
 { code: 429, name:"Too Many Requests", desc:"The user has sent too many requests in a given amount of time (rate limiting).", cat:"4xx", example:"A bot scraping an API faster than the allowed rate limit permits."},
 { code: 500, name:"Internal Server Error", desc:"The server encountered an unexpected condition which prevented it from fulfilling the request.", cat:"5xx", example:"An unhandled exception or null pointer crashing the backend application."},
 { code: 502, name:"Bad Gateway", desc:"The server, while acting as a gateway or proxy, received an invalid response from the upstream server.", cat:"5xx", example:"Nginx failing to connect to a crashed Node.js upstream process."},
 { code: 503, name:"Service Unavailable", desc:"The server is currently unable to handle the request due to temporary overloading or maintenance.", cat:"5xx", example:"A deployment in progress or a database connection pool exhaustion."},
 { code: 504, name:"Gateway Timeout", desc:"The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.", cat:"5xx", example:"An API gateway timing out while waiting for a slow microservice to respond."},
 { code: 505, name:"HTTP Version Not Supported", desc:"The server does not support, or refuses to support, the HTTP protocol version that was used in the request.", cat:"5xx", example:"A legacy server rejecting an HTTP/2 or HTTP/3 request."},
];

export function HttpStatusClient() {
 const [search, setSearch] = useState("");
 const [cat, setCat] = useState("All");

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
 };

 const filtered = useMemo(() => {
 return statuses.filter((s) => {
 const matchSearch = search ? s.code.toString().includes(search) || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase()) : true;
 const matchCat = cat ==="All"|| s.cat === cat;
 return matchSearch && matchCat;
 });
 }, [search, cat]);

 const getColor = (c: string) => {
 switch (c) {
 case"1xx": return"text-primary bg-blue-500/10 border-blue-500/20";
 case"2xx": return"text-green-500 bg-green-500/10 border-green-500/20";
 case"3xx": return"text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
 case"4xx": return"text-orange-500 bg-orange-500/10 border-orange-500/20";
 case"5xx": return"text-red-500 bg-red-500/10 border-red-500/20";
 default: return"";
 }
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

 <ToolPageHeader
 icon={Server}
 title="HTTP Status Code Reference"
 description="A searchable, filterable encyclopedia of HTTP status codes, their meanings, and common real-world use cases."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Search className="w-4 h-4"/> Lookup & Filter
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
 <Input
 className="pl-10 h-12 text-base"
 placeholder="Search by code (e.g., 404) or description..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 />
 </div>
 <div className="flex flex-wrap gap-2">
 {["All","1xx","2xx","3xx","4xx","5xx"].map((c) => (
 <Button key={c} variant={cat === c ?"default":"outline"} size="sm"onClick={() => setCat(c)}>
 {c} {c !=="All"&&"Codes"}
 </Button>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {filtered.map((s) => (
 <Card key={s.code} className={cardClass}>
 <CardHeader className={`${headerClass} flex-row items-center justify-between`}>
 <CardTitle className={`text-3xl font-bold ${getColor(s.cat).split("")[0]}`}>{s.code}</CardTitle>
 <span className={`px-2 py-1 rounded text-[10px] font-bold border uppercase ${getColor(s.cat)}`}>{s.cat}</span>
 </CardHeader>
 <CardContent className="p-4 space-y-3">
 <h3 className="font-bold text-lg text-foreground">{s.name}</h3>
 <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
 <div className="pt-2 border-t border-border/50">
 <p className="text-xs text-primary font-medium mb-1">Common Use Case:</p>
 <p className="text-xs text-muted-foreground italic">{s.example}</p>
 </div>
 <Button variant="ghost"size="sm"className="w-full mt-2"onClick={() => handleCopy(`${s.code} ${s.name}`)}>
 <Copy className="w-3 h-3 mr-1"/> Copy {s.code}
 </Button>
 </CardContent>
 </Card>
 ))}
 </div>

 {filtered.length === 0 && (
 <div className="text-center py-12 text-muted-foreground">No status codes match your search.</div>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Search or Filter", description:"Type a specific code like 429 or select a category like '4xx Client Error' to narrow the list.", icon: Search },
 { step:"02", title:"Review Details", description:"Read the official definition, technical context, and a practical real-world example for each code.", icon: Info },
 { step:"03", title:"Copy & Implement", description:"Use the copy button to quickly grab the code and name for your documentation or error handling logic.", icon: Copy },
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Search, title:"Instant Lookup", description:"Filter through the entire HTTP specification in milliseconds using code numbers or keyword descriptions."},
 { icon: Globe, title:"Real-World Context", description:"Every code includes a practical example showing how it appears in modern web development and API design."},
 { icon: Server, title:"Category Grouping", description:"Easily isolate informational, success, redirection, client error, or server error responses."},
 { icon: AlertCircle, title:"Debugging Aid", description:"Quickly identify why an API request failed and how to adjust your client code to resolve the issue."},
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>Understanding the HTTP Response Lifecycle</h3>
 <p>HTTP status codes are three-digit numbers returned by a server in response to a client's request. They are the primary mechanism for communicating the outcome of an operation, whether it's fetching a webpage, submitting a form, or interacting with a RESTful API. These codes are strictly defined by the IETF in various RFC documents and are grouped into five distinct classes based on their first digit.</p>
 <p>Mastery of these codes is essential for frontend developers handling Axios or Fetch responses, backend engineers designing robust APIs, and DevOps professionals configuring load balancers and gateways. Returning the correct status code ensures that browsers cache appropriately, search engines index correctly, and client applications can implement precise error handling logic.</p>
 <h3>The Five Classes of Status Codes</h3>
 <ul>
 <li><strong>1xx (Informational):</strong> The request was received, continuing process. Rarely seen in standard web browsing but critical for protocol upgrades.</li>
 <li><strong>2xx (Success):</strong> The request was successfully received, understood, and accepted. The foundation of a healthy API.</li>
 <li><strong>3xx (Redirection):</strong> Further action needs to be taken in order to complete the request. Essential for URL migrations and canonicalization.</li>
 <li><strong>4xx (Client Error):</strong> The request contains bad syntax or cannot be fulfilled. Indicates the client must modify its request.</li>
 <li><strong>5xx (Server Error):</strong> The server failed to fulfill an apparently valid request. Indicates an infrastructure or backend code issue.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is the difference between 401 Unauthorized and 403 Forbidden?", answer:"401 means the client must authenticate (identity is unknown). 403 means the client is authenticated but does not have permission to access the resource (identity is known, but access is denied)."},
 { question:"When should I use 301 vs 302 redirects?", answer:"Use 301 for permanent moves (search engines transfer link equity). Use 302 for temporary moves (search engines keep the original URL indexed)."},
 { question:"Why am I getting a 502 Bad Gateway?", answer:"This typically means your reverse proxy (like Nginx or Cloudflare) cannot communicate with your upstream application server, often because the app has crashed or is restarting."},
 { question:"Is 418 I'm a teapot a real status code?", answer:"Yes, it was defined in RFC 2324 in 1998 as an April Fools' joke for the Hyper Text Coffee Pot Control Protocol, but some servers still implement it as an easter egg."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/http-status" max={6} />
 </div>
 );
}

export default HttpStatusClient;
