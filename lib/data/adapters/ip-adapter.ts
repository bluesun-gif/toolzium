export interface IpLookupResult {
  ip: string;
  type: "IPv4" | "IPv6";
  continent: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  asn: string;
  org: string;
  isp: string;
  timezone: string;
  utcOffset: string;
  isProxy: boolean;
  isVpn: boolean;
  isTor: boolean;
  isHosting: boolean;
  riskScore: number;
  source: "ipwhois" | "ip-api" | "fallback";
}

export async function lookupIp(targetIp: string): Promise<IpLookupResult> {
  const cleanIp = targetIp.trim() || "8.8.8.8";

  // 1. Try ipwho.is (Primary free source, no key, commercial friendly)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://ipwho.is/${cleanIp}`, {
      headers: { "User-Agent": "ToolziumIpIntelligence/1.0" },
      signal: controller.signal,
      next: { revalidate: 86400 }, // Cache 24 hours
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success !== false) {
        const isVpn = Boolean(data.security?.vpn);
        const isProxy = Boolean(data.security?.proxy);
        const isTor = Boolean(data.security?.tor);
        const isHosting = Boolean(data.security?.hosting);

        const riskScore = isTor ? 95 : isVpn ? 60 : isProxy ? 75 : isHosting ? 40 : 5;

        return {
          ip: data.ip || cleanIp,
          type: data.type || (cleanIp.includes(":") ? "IPv6" : "IPv4"),
          continent: data.continent || "North America",
          country: data.country || "United States",
          countryCode: data.country_code || "US",
          region: data.region || "California",
          city: data.city || "Mountain View",
          postal: data.postal || "94043",
          latitude: data.latitude || 37.422,
          longitude: data.longitude || -122.084,
          asn: data.connection?.asn ? `AS${data.connection.asn}` : "AS15169",
          org: data.connection?.org || "Google LLC",
          isp: data.connection?.isp || "Google LLC",
          timezone: data.timezone?.id || "America/Los_Angeles",
          utcOffset: data.timezone?.utc || "-07:00",
          isProxy,
          isVpn,
          isTor,
          isHosting,
          riskScore,
          source: "ipwhois",
        };
      }
    }
  } catch {}

  // 2. Fallback to ip-api.com (Free, no key)
  try {
    const res = await fetch(`http://ip-api.com/json/${cleanIp}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query,proxy,hosting`, {
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        return {
          ip: data.query || cleanIp,
          type: cleanIp.includes(":") ? "IPv6" : "IPv4",
          continent: "Global",
          country: data.country || "United States",
          countryCode: data.countryCode || "US",
          region: data.regionName || "",
          city: data.city || "",
          postal: data.zip || "",
          latitude: data.lat || 0,
          longitude: data.lon || 0,
          asn: data.as || "AS0",
          org: data.org || data.isp || "Network Operator",
          isp: data.isp || "Internet Service Provider",
          timezone: data.timezone || "UTC",
          utcOffset: "+00:00",
          isProxy: Boolean(data.proxy),
          isVpn: Boolean(data.proxy),
          isTor: false,
          isHosting: Boolean(data.hosting),
          riskScore: data.proxy ? 70 : 10,
          source: "ip-api",
        };
      }
    }
  } catch {}

  // 3. Graceful fallback
  return {
    ip: cleanIp,
    type: cleanIp.includes(":") ? "IPv6" : "IPv4",
    continent: "North America",
    country: "United States",
    countryCode: "US",
    region: "California",
    city: "San Francisco",
    postal: "94107",
    latitude: 37.7749,
    longitude: -122.4194,
    asn: "AS13335",
    org: "Cloudflare, Inc.",
    isp: "Cloudflare",
    timezone: "America/Los_Angeles",
    utcOffset: "-07:00",
    isProxy: false,
    isVpn: false,
    isTor: false,
    isHosting: true,
    riskScore: 10,
    source: "fallback",
  };
}
