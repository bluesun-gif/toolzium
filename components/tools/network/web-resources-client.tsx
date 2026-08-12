"use client";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Badge } from"@/components/ui/badge";
import { Shield, Search, ExternalLink, Globe, User, Mail, ShieldAlert, Image, MapPin, Layers } from"lucide-react";

interface WebResource {
 name: string;
 description: string;
 url: string;
 category:"Identity & Usernames"|"Email & Phone"|"Domain & DNS"|"IP & Geolocation"|"Social Media"|"Threat Intel & Breaches"|"Images & Verification"|"Directories & Archives";
 tags: string[];
 popular?: boolean;
}

const RESOURCES: WebResource[] = [
 // Threat Intel & Breaches
 {
 name:"Have I Been Pwned",
 description:"Check if your email, phone, or passwords have been compromised in data breaches. An essential tool for security audits.",
 url:"https://haveibeenpwned.com",
 category:"Threat Intel & Breaches",
 tags: ["Free","No Login","API Available"],
 },
 {
 name:"DeHashed",
 description:"Modern credential leak search engine. Scan breached records, names, emails, IPs, usernames, and addresses.",
 url:"https://www.dehashed.com",
 category:"Threat Intel & Breaches",
 tags: ["Freemium","Search Engine","Account Required"],
 },
 {
 name:"VirusTotal",
 description:"Analyze suspicious files, domains, IPs, and URLs to detect malware and other cyber threats automatically.",
 url:"https://www.virustotal.com",
 category:"Threat Intel & Breaches",
 tags: ["Free","Scan Engine","No Login"],
 },
 {
 name:"Intelligence X",
 description:"Search engine and archive that lets you search by email, domain, IP, CIDR, Bitcoin address, and more in leak data.",
 url:"https://intelx.io",
 category:"Threat Intel & Breaches",
 tags: ["Freemium","Deep Web","API Available"],
 },
 {
 name:"LeakLookup",
 description:"Allows search of compromised credentials including email addresses, usernames, and passwords from breach databases.",
 url:"https://leak-lookup.com",
 category:"Threat Intel & Breaches",
 tags: ["Freemium","Credential Search"],
 },

 // Identity & Usernames
 {
 name:"WhatsMyName",
 description:"Check username availability across hundreds of websites and social media platforms to trace identity footprints.",
 url:"https://whatsmyname.app",
 category:"Identity & Usernames",
 tags: ["Free","No Login","Open Source"],
 },
 {
 name:"Namechk",
 description:"Search username availability and domain availability across dozens of popular platforms and TLD extensions.",
 url:"https://namechk.com",
 category:"Identity & Usernames",
 tags: ["Free","No Login"],
 },
 {
 name:"Sherlock",
 description:"Command-line tool to hunt down social accounts by username across social networks (referenced directory info).",
 url:"https://sherlock-project.github.io",
 category:"Identity & Usernames",
 tags: ["Free","CLI Tool","GitHub"],
 },
 {
 name:"User Search",
 description:"Lookup usernames, emails, names, or phone numbers across popular dating websites, social platforms, and forums.",
 url:"https://usersearch.org",
 category:"Identity & Usernames",
 tags: ["Freemium","No Login"],
 },

 // Email & Phone
 {
 name:"Epieos",
 description:"Perform quick searches on any email address or phone number to find linked Google IDs, calendars, and active profiles.",
 url:"https://epieos.com",
 category:"Email & Phone",
 tags: ["Free","No Login","Email Lookup"],
 },
 {
 name:"Hunter.io",
 description:"Find professional email addresses belonging to employees of any company, complete with confidence scores.",
 url:"https://hunter.io",
 category:"Email & Phone",
 tags: ["Freemium","Corporate","API Available"],
 },
 {
 name:"PhoneInfoga",
 description:"Information gathering tool for phone numbers. Trace carrier, location, and scan search engine dorks.",
 url:"https://sundowndev.github.io/phoneinfoga",
 category:"Email & Phone",
 tags: ["Free","CLI Tool","GitHub"],
 },
 {
 name:"Sync.ME",
 description:"Public reverse phone lookup directory that identifies callers, detects spam calls, and links social media profiles.",
 url:"https://sync.me",
 category:"Email & Phone",
 tags: ["Free","Caller ID"],
 },

 // Domain & DNS
 {
 name:"DNSDumpster",
 description:"Free domain research tool that discovers subdomains, maps host networks, and generates clean infrastructure graphs.",
 url:"https://dnsdumpster.com",
 category:"Domain & DNS",
 tags: ["Free","No Login","DNS Mapping"],
 },
 {
 name:"Urlscan.io",
 description:"A sandbox for the web. Submit a URL to analyze the network requests, screenshots, security headers, and technologies.",
 url:"https://urlscan.io",
 category:"Domain & DNS",
 tags: ["Free","Sandbox","API Available"],
 },
 {
 name:"SecurityTrails",
 description:"Search history of IP addresses, DNS records, subdomains, and WHOIS details. Excellent for recon tracking.",
 url:"https://securitytrails.com",
 category:"Domain & DNS",
 tags: ["Freemium","DNS History","Account Required"],
 },
 {
 name:"crt.sh",
 description:"Search Certificate Transparency (CT) logs to find all SSL/TLS certificates issued for a target domain.",
 url:"https://crt.sh",
 category:"Domain & DNS",
 tags: ["Free","No Login","CT Logs"],
 },
 {
 name:"DNS Checker",
 description:"Check DNS propagation across global servers. Verify A, AAAA, MX, CNAME, and TXT updates instantly.",
 url:"https://dnschecker.org",
 category:"Domain & DNS",
 tags: ["Free","DNS Propagation"],
 },

 // IP & Geolocation
 {
 name:"Shodan",
 description:"The search engine for internet-connected devices. Search servers, routers, webcams, IoT devices, and smart monitors.",
 url:"https://www.shodan.io",
 category:"IP & Geolocation",
 tags: ["Freemium","IoT Scanner","API Available"],
 },
 {
 name:"Censys",
 description:"Scans the global internet address space to discover, catalog, and analyze active services, ports, and certificates.",
 url:"https://censys.com",
 category:"IP & Geolocation",
 tags: ["Freemium","Recon Engine"],
 },
 {
 name:"Wigle.net",
 description:"Maps and database of wireless networks, cell towers, and Wi-Fi access points across the globe using GPS tracking.",
 url:"https://wigle.net",
 category:"IP & Geolocation",
 tags: ["Free","Wi-Fi Scanning","Map View"],
 },
 {
 name:"GeoSpy",
 description:"AI-powered tool that analyzes photographs to estimate the geographical location where the photo was taken.",
 url:"https://geospy.ai",
 category:"IP & Geolocation",
 tags: ["Freemium","AI Geolocator"],
 },
 {
 name:"IPinfo.io",
 description:"Comprehensive database of IP geolocation, ASNs, hostnames, carriers, and corporate networks.",
 url:"https://ipinfo.io",
 category:"IP & Geolocation",
 tags: ["Freemium","IP Lookup"],
 },

 // Social Media
 {
 name:"Social Searcher",
 description:"Free social media search engine. Monitor public mentions across Twitter/X, Instagram, YouTube, Facebook, and Web.",
 url:"https://www.social-searcher.com",
 category:"Social Media",
 tags: ["Free","Real-Time Tracking"],
 },
 {
 name:"Tinfoleak",
 description:"Detailed analysis on Twitter/X accounts. Analyzes device usage, locations, and time trends.",
 url:"https://tinfoleak.com",
 category:"Social Media",
 tags: ["Freemium","X Analytics"],
 },
 {
 name:"OSINT Industries",
 description:"Advanced email and phone number identity platform that maps online accounts across 300+ websites in real-time.",
 url:"https://osint.industries",
 category:"Social Media",
 tags: ["Freemium","Account Mapper"],
 },

 // Images & Verification
 {
 name:"TinEye",
 description:"Reverse image search engine. Specializes in finding identical matches, crops, and alterations of uploaded images.",
 url:"https://tineye.com",
 category:"Images & Verification",
 tags: ["Free","Reverse Search"],
 },
 {
 name:"SunCalc",
 description:"Shows sun movement and sunlight phases for any given day and location. Used by investigators for geographical sun positioning.",
 url:"https://www.suncalc.org",
 category:"Images & Verification",
 tags: ["Free","Position Mapping","Map View"],
 },
 {
 name:"Metadata2Go",
 description:"Free online tool to read metadata from documents and images. Extracted EXIF data, GPS coordinates, and file markers.",
 url:"https://www.metadata2go.com",
 category:"Images & Verification",
 tags: ["Free","Metadata Reader"],
 },

 // Directories & Archives
 {
 name:"Investigation Resourcemind",
 description:"A comprehensive directory focusing on gathering information from open sources, sorted as an interactive mind map.",
 url:"https://osintframework.com",
 category:"Directories & Archives",
 tags: ["Free","Resource Map"],
 popular: true,
 },
 {
 name:"Wayback Machine",
 description:"Internet Archive library. Check older, cached, or deleted versions of web pages, files, and domains over time.",
 url:"https://archive.org/web/",
 category:"Directories & Archives",
 tags: ["Free","Archive Library"],
 popular: true,
 },
];

const CATEGORIES = [
"All",
"Identity & Usernames",
"Email & Phone",
"Domain & DNS",
"IP & Geolocation",
"Social Media",
"Threat Intel & Breaches",
"Images & Verification",
"Directories & Archives"
] as const;

export default function WebResourcesClient() {
 const [activeTab, setActiveTab] = useState<string>("All");
 const [searchQuery, setSearchQuery] = useState("");

 const filteredResources = useMemo(() => {
 return RESOURCES.filter((res) => {
 const matchesTab = activeTab ==="All"|| res.category === activeTab;
 
 const text = `${res.name} ${res.description} ${res.category} ${res.tags.join("")}`.toLowerCase();
 const matchesSearch = text.includes(searchQuery.toLowerCase());
 
 return matchesTab && matchesSearch;
 });
 }, [activeTab, searchQuery]);

 const getCategoryIcon = (category: string) => {
 switch (category) {
 case"Identity & Usernames":
 return <User className="h-4 w-4"/>;
 case"Email & Phone":
 return <Mail className="h-4 w-4"/>;
 case"Domain & DNS":
 return <Globe className="h-4 w-4"/>;
 case"IP & Geolocation":
 return <MapPin className="h-4 w-4"/>;
 case"Threat Intel & Breaches":
 return <ShieldAlert className="h-4 w-4"/>;
 case"Images & Verification":
 return <Image className="h-4 w-4"/>;
 default:
 return <Layers className="h-4 w-4"/>;
 }
 };

 return (
 <>
 <ToolPageHeader
 title="Web & Security Resources Directory"
 description="Vetted collection of top-tier search engines, threat registries, and identity locators globally."
 icon={Shield}
 />

 <div className="max-w-7xl mx-auto space-y-6 px-1">
 {/* Search bar & info */}
 <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
 <div className="relative w-full md:w-96">
 <Input
 placeholder="Search resource directories..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="pl-10"
 />
 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
 </div>

 <div className="text-sm text-muted-foreground self-end md:self-center">
 Showing <strong>{filteredResources.length}</strong> of {RESOURCES.length} directories
 </div>
 </div>

 {/* Tab Filters */}
 <div className="flex flex-wrap gap-1.5 border-b pb-3">
 {CATEGORIES.map((cat) => (
 <Button
 key={cat}
 variant={activeTab === cat ?"default":"ghost"}
 size="sm"
 onClick={() => setActiveTab(cat)}
 className="text-xs h-8 rounded-full"
 >
 {activeTab === cat && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary-foreground"/>}
 {cat}
 </Button>
 ))}
 </div>

 {/* Directory Grid */}
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 {filteredResources.length > 0 ? (
 filteredResources.map((res, index) => (
 <Card key={index} className="flex flex-col justify-between hover:shadow-md transition-shadow">
 <CardHeader className="pb-2">
 <div className="flex items-center justify-between mb-2">
 <span className="text-xs text-muted-foreground flex items-center gap-1.5">
 {getCategoryIcon(res.category)}
 {res.category}
 </span>
 </div>
 <CardTitle className="text-base font-bold flex items-center justify-between group">
 {res.name}
 </CardTitle>
 <CardDescription className="text-xs line-clamp-3 pt-1">
 {res.description}
 </CardDescription>
 </CardHeader>
 <CardContent className="pt-2 flex flex-col gap-3">
 <div className="flex flex-wrap gap-1.5">
 {res.tags.map((tag) => (
 <Badge key={tag} variant="secondary"className="text-[10px] py-0.5 px-1.5 font-normal">
 {tag}
 </Badge>
 ))}
 </div>
 
 <Button variant="outline"size="sm"asChild className="w-full mt-2 text-xs">
 <a href={res.url} target="_blank"rel="noopener noreferrer"className="flex items-center justify-center gap-1.5">
 Launch External
 <ExternalLink className="h-3 w-3"/>
 </a>
 </Button>
 </CardContent>
 </Card>
 ))
 ) : (
 <div className="col-span-full py-16 text-center text-muted-foreground">
 No directories found matching your criteria.
 </div>
 )}
 </div>
 </div>
 </>
 );
}
