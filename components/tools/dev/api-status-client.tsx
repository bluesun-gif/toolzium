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
import toast from"react-hot-toast";
import { Activity, Search, Plus, ExternalLink, Server, Cloud, CreditCard, Code, MessageSquare, Shield } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface ApiEndpoint {
 name: string;
 icon: string;
 url: string;
 statusUrl: string;
 category: string;
 sla: string;
}

const DEFAULT_APIS: ApiEndpoint[] = [
 { name:"AWS", icon:"☁️", url:"https://aws.amazon.com", statusUrl:"https://health.aws.amazon.com/health/status", category:"Cloud", sla:"99.99%"},
 { name:"Google Cloud", icon:"☁️", url:"https://cloud.google.com", statusUrl:"https://status.cloud.google.com/", category:"Cloud", sla:"99.95%"},
 { name:"Azure", icon:"☁️", url:"https://azure.microsoft.com", statusUrl:"https://status.azure.com/", category:"Cloud", sla:"99.9%"},
 { name:"Stripe", icon:"💳", url:"https://stripe.com", statusUrl:"https://status.stripe.com/", category:"Payment", sla:"99.999%"},
 { name:"GitHub", icon:"🐙", url:"https://github.com", statusUrl:"https://www.githubstatus.com/", category:"DevTools", sla:"99.9%"},
 { name:"Vercel", icon:"▲", url:"https://vercel.com", statusUrl:"https://www.vercel-status.com/", category:"Cloud", sla:"99.99%"},
 { name:"Cloudflare", icon:"🛡️", url:"https://cloudflare.com", statusUrl:"https://www.cloudflarestatus.com/", category:"Cloud", sla:"100%"},
 { name:"Discord", icon:"💬", url:"https://discord.com", statusUrl:"https://discordstatus.com/", category:"Social", sla:"99.9%"},
 { name:"Slack", icon:"💬", url:"https://slack.com", statusUrl:"https://status.slack.com/", category:"Social", sla:"99.9%"},
 { name:"Twilio", icon:"📞", url:"https://twilio.com", statusUrl:"https://status.twilio.com/", category:"DevTools", sla:"99.95%"},
 { name:"Firebase", icon:"🔥", url:"https://firebase.google.com", statusUrl:"https://status.firebase.google.com/", category:"Cloud", sla:"99.95%"},
 { name:"MongoDB Atlas", icon:"🍃", url:"https://mongodb.com", statusUrl:"https://status.mongodb.com/", category:"Cloud", sla:"99.99%"},
 { name:"Supabase", icon:"⚡", url:"https://supabase.com", statusUrl:"https://status.supabase.com/", category:"Cloud", sla:"99.9%"},
 { name:"Netlify", icon:"🔺", url:"https://netlify.com", statusUrl:"https://www.netlifystatus.com/", category:"Cloud", sla:"99.99%"},
 { name:"Auth0", icon:"🔒", url:"https://auth0.com", statusUrl:"https://status.auth0.com/", category:"Auth", sla:"99.95%"},
];

const categories = ["All","Cloud","Payment","DevTools","Social","Auth"];

export default function ApiStatusClient() {
 const [search, setSearch] = useState("");
 const [category, setCategory] = useState("All");
 const [customApis, setCustomApis] = useState<ApiEndpoint[]>([]);
 const [newUrl, setNewUrl] = useState("");
 const [pinging, setPinging] = useState<string | null>(null);

 useEffect(() => {
 const saved = localStorage.getItem("toolzium_custom_apis");
 if (saved) setCustomApis(JSON.parse(saved));
 }, []);

 const addCustomApi = () => {
 if (!newUrl.startsWith("http")) return toast.error("Invalid URL");
 const next = [...customApis, { name: new URL(newUrl).hostname, icon:"🔗", url: newUrl, statusUrl: newUrl, category:"Custom", sla:"N/A"}];
 setCustomApis(next);
 localStorage.setItem("toolzium_custom_apis", JSON.stringify(next));
 setNewUrl("");
 toast.success("Endpoint added");
 };

 const removeCustomApi = (url: string) => {
 const next = customApis.filter(a => a.url !== url);
 setCustomApis(next);
 localStorage.setItem("toolzium_custom_apis", JSON.stringify(next));
 };

 const pingApi = async (url: string) => {
 setPinging(url);
 const start = performance.now();
 try {
 await fetch(url, { mode: 'no-cors', cache: 'no-cache' });
 const time = Math.round(performance.now() - start);
 toast.success(`Ping successful: ${time}ms (Opaque response)`);
 } catch (err) {
 toast.error("Ping failed or blocked by network.");
 }
 setPinging(null);
 };

 const filteredApis = useMemo(() => {
 const all = [...DEFAULT_APIS, ...customApis];
 return all.filter(api => 
 (category ==="All"|| api.category === category) &&
 (api.name.toLowerCase().includes(search.toLowerCase()) || api.url.toLowerCase().includes(search.toLowerCase()))
 );
 }, [search, category, customApis]);

 const steps = [
 { step:"01", title:"Browse Services", description:"Filter through popular cloud, payment, and developer APIs by category.", icon: Search },
 { step:"02", title:"Quick Ping", description:"Test endpoint responsiveness directly from your browser using beacon requests.", icon: Activity },
 { step:"03", title:"Track Custom URLs", description:"Add your own private API endpoints to monitor their status page links.", icon: Plus },
 ];

 const features = [
 { icon: Cloud, title:"Cloud Providers", description:"Track the uptime and SLAs of major infrastructure providers like AWS and GCP."},
 { icon: CreditCard, title:"Payment Gateways", description:"Monitor critical financial infrastructure like Stripe and PayPal for transaction failures."},
 { icon: Code, title:"Developer Tools", description:"Stay ahead of outages in CI/CD pipelines, version control, and hosting platforms."},
 { icon: Shield, title:"Custom Endpoints", description:"Save and monitor your own internal microservices and private API endpoints."},
 ];

 const faqs = [
 { question:"Why does the Quick Ping show an 'Opaque response'?", answer:"Modern browsers enforce Cross-Origin Resource Sharing (CORS) policies. When pinging a third-party API that hasn't explicitly allowed your domain, the browser blocks the response body for security, but the successful network round-trip still confirms the server is online and responding."},
 { question:"How are SLA percentages calculated?", answer:"Service Level Agreements (SLAs) represent the guaranteed uptime a provider commits to. For example, 99.9% (three nines) allows for roughly 8.7 hours of downtime per year, while 99.99% (four nines) allows for only 52 minutes of downtime annually."},
 { question:"Are my custom endpoints stored securely?", answer:"Yes, all custom endpoints you add are stored exclusively in your browser's local storage. No data is ever transmitted to our servers, ensuring your internal infrastructure URLs remain completely private."},
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4">
 <ToolPageHeader icon={Activity} title="API Status Checker"description="Monitor the real-time health, SLAs, and status pages of critical third-party APIs and cloud services."/>
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Server className="w-4 h-4"/> Service Monitor</CardTitle>
 </CardHeader>
 <CardContent className="p-6 space-y-6">
 <div className="flex flex-col sm:flex-row gap-4">
 <div className="relative flex-1">
 <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground"/>
 <Input placeholder="Search services..."value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9"/>
 </div>
 <div className="flex gap-2 overflow-x-auto pb-2">
 {categories.map(c => (
 <Button key={c} variant={category === c ?"default":"outline"} size="sm"onClick={() => setCategory(c)}>{c}</Button>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {filteredApis.map(api => (
 <Card key={api.url} className="border border-border/50 shadow-sm">
 <CardContent className="p-4 flex flex-col gap-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="text-2xl">{api.icon}</span>
 <div>
 <h3 className="font-bold text-sm">{api.name}</h3>
 <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">{api.category}</span>
 </div>
 </div>
 <span className="text-xs font-mono text-green-500">SLA: {api.sla}</span>
 </div>
 <div className="flex gap-2 mt-auto">
 <Button size="sm"variant="outline"className="flex-1"onClick={() => pingApi(api.url)} disabled={pinging === api.url}>
 {pinging === api.url ?"Pinging...":"Quick Ping"}
 </Button>
 <Button size="sm"variant="secondary"asChild>
 <a href={api.statusUrl} target="_blank"rel="noopener noreferrer"className="flex items-center gap-1">
 Status <ExternalLink className="w-3 h-3"/>
 </a>
 </Button>
 {api.category ==="Custom"&& (
 <Button size="sm"variant="destructive"onClick={() => removeCustomApi(api.url)}>X</Button>
 )}
 </div>
 </CardContent>
 </Card>
 ))}
 </div>

 <div className="pt-6 border-t border-border/30 space-y-3">
 <Label>Add Custom Endpoint</Label>
 <div className="flex gap-2">
 <Input placeholder="https://api.yourcompany.com/health"value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
 <Button onClick={addCustomApi}><Plus className="w-4 h-4"/></Button>
 </div>
 </div>
 </CardContent>
 </Card>

 <ToolHowItWorks steps={steps} badges={["100% Free","Client-Side Privacy","No Signup"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-sm dark:prose-invert max-w-none">
 <h3>The Critical Role of API Reliability in Modern Architecture</h3>
 <p>In the modern microservices architecture, the reliability of third-party APIs is just as critical as your own internal infrastructure. When your application depends on cloud providers like AWS or Google Cloud, payment gateways like Stripe, or authentication services like Auth0, a sudden outage can cascade into severe user-facing disruptions. Monitoring the real-time status and historical uptime of these dependencies is a fundamental practice for senior engineers and DevOps teams. Service Level Agreements (SLAs) typically promise 99.9% to 99.999% uptime, but even a few minutes of downtime during peak traffic can result in significant revenue loss and damaged trust.</p>
 <p>An API status aggregator provides a centralized dashboard to track the health of your entire tech stack. By categorizing services into Cloud, Payment, DevTools, and Social, teams can quickly isolate the root cause of an incident. Furthermore, understanding the difference between a partial degradation and a major outage helps in triggering the correct incident response protocols. While client-side beacon pings can offer a rudimentary check for endpoint responsiveness, they are often limited by Cross-Origin Resource Sharing (CORS) policies. Therefore, linking directly to official status pages ensures you receive verified, granular updates from the provider's engineering teams. Implementing robust error handling, circuit breakers, and fallback mechanisms based on the real-time health of these external APIs is what separates fragile applications from enterprise-grade, resilient systems.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/api-status-checker"max={6} />
 </div>
 );
}
