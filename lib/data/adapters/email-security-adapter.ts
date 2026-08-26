// ─────────────────────────────────────────────────────────────────────────────
// $0 Email Domain Security Scanner — DNS-over-HTTPS (Google DoH), NO API KEY
// Live MX / SPF / DMARC / DKIM lookup + algorithmic deliverability grading.
// ─────────────────────────────────────────────────────────────────────────────

export interface EmailSecurityResult {
  domain: string;
  mx: { host: string; priority: number }[];
  spf: string | null;
  dmarc: string | null;
  dkimSelectors: string[];
  hasMx: boolean;
  hasSpf: boolean;
  hasDmarc: boolean;
  mailProvider: string | null;
  isDisposable: boolean;
  deliverabilityGrade: "A" | "B" | "C" | "D" | "F";
  warnings: string[];
  recommendations: string[];
}

// Curated known disposable / temporary email providers (open abuse datasets)
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com", "yopmail.com",
  "throwawaymail.com", "trashmail.com", "temp-mail.org", "getnada.com", "sharklasers.com",
  "dispostable.com", "fakeinbox.com", "maildrop.cc", "mailnesia.com", "spam4.me",
  "mohmal.com", "tempmailo.com", "emailondeck.com", "mintemail.com", "burnermail.io",
]);

const MAIL_PROVIDERS: { match: string; name: string }[] = [
  { match: "google.com", name: "Google Workspace / Gmail" },
  { match: "outlook.com", name: "Microsoft 365 / Outlook" },
  { match: "protection.outlook.com", name: "Microsoft Exchange Online Protection" },
  { match: "amazonses.com", name: "Amazon SES" },
  { match: "sendgrid.net", name: "SendGrid" },
  { match: "mailgun.org", name: "Mailgun" },
  { match: "zoho.com", name: "Zoho Mail" },
  { match: "cloudflare", name: "Cloudflare Email Routing" },
  { match: "protonmail", name: "Proton Mail" },
];

async function dohLookup(name: string, type: "MX" | "TXT"): Promise<string[]> {
  try {
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`,
      { headers: { Accept: "application/dns-json" }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const answers: { data?: string }[] = json.Answer || [];
    return answers
      .map((a) => (a.data ? a.data.replace(/\.$/, "").replace(/^"(.*)"$/, "$1") : ""))
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function checkEmailDomainSecurity(rawDomain: string): Promise<EmailSecurityResult> {
  let domain = rawDomain.trim().toLowerCase();
  domain = domain
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split("@")
    .pop() || "";

  const mxRaw = await dohLookup(domain, "MX");
  const mx = mxRaw
    .map((r) => {
      const m = r.match(/^(\d+)\s+(.+)$/);
      return m ? { priority: parseInt(m[1], 10), host: m[2] } : { priority: 0, host: r };
    })
    .sort((a, b) => a.priority - b.priority);

  const txt = await dohLookup(domain, "TXT");
  const spf = txt.find((t) => t.toUpperCase().startsWith("V=SPF1")) || null;
  const dmarcRaw = await dohLookup(`_dmarc.${domain}`, "TXT");
  const dmarc = dmarcRaw.find((t) => t.toUpperCase().startsWith("V=DMARC1")) || null;

  // Probe common DKIM selectors
  const commonSelectors = [
    "google", "selector1", "selector2", "k1", "dkim", "mandrill",
    "s1", "s2", "mail", "postfix", "dkim01", "google._domainkey",
  ];
  const dkimSelectors: string[] = [];
  await Promise.all(
    commonSelectors.map(async (sel) => {
      const base = sel.includes("_domainkey") ? sel : `${sel}._domainkey`;
      const r = await dohLookup(`${base}.${domain}`, "TXT");
      if (r.some((t) => t.toUpperCase().includes("V=DKIM1"))) dkimSelectors.push(sel);
    })
  );

  const hasMx = mx.length > 0;
  const hasSpf = !!spf;
  const hasDmarc = !!dmarc;
  const isDisposable = DISPOSABLE_DOMAINS.has(domain);

  let mailProvider: string | null = null;
  const haystack = mx.map((m) => m.host).join(" ") + " " + (spf || "");
  for (const p of MAIL_PROVIDERS) {
    if (haystack.includes(p.match)) {
      mailProvider = p.name;
      break;
    }
  }

  const warnings: string[] = [];
  const recommendations: string[] = [];

  if (!hasMx) warnings.push("No MX records found — this domain cannot receive email at all.");
  if (!hasSpf)
    warnings.push(
      "No SPF record — attackers can forge emails FROM this domain (CEO fraud / phishing / email impersonation)."
    );
  if (!hasDmarc)
    warnings.push(
      "No DMARC policy — zero protection against spoofing; Gmail & Microsoft may quarantine or reject its mail."
    );
  else {
    const p = dmarc.match(/p=(\w+)/i)?.[1]?.toLowerCase();
    if (p === "none")
      warnings.push("DMARC policy is 'none' — monitoring only, NOT enforcing. Upgrade to quarantine/reject.");
    if (p === "reject")
      recommendations.push("DMARC enforce (reject) is configured — excellent anti-spoofing posture.");
  }
  if (dkimSelectors.length === 0)
    warnings.push("No DKIM signing detected on common selectors — mail may fail authentication on strict receivers.");
  if (isDisposable)
    warnings.push(
      "This is a known disposable/temporary email domain — high spam & abuse risk. Do NOT trust for account verification or payments."
    );

  let grade: EmailSecurityResult["deliverabilityGrade"] = "A";
  const score = (hasMx ? 1 : 0) + (hasSpf ? 1 : 0) + (hasDmarc ? 1 : 0) + (dkimSelectors.length > 0 ? 1 : 0);
  if (isDisposable) grade = "F";
  else if (score >= 4) grade = "A";
  else if (score === 3) grade = "B";
  else if (score === 2) grade = "C";
  else grade = "D";

  if (!hasSpf)
    recommendations.push(
      `Publish an SPF TXT record (e.g. "v=spf1 include:${
        mailProvider ? mailProvider.split(" / ")[0].toLowerCase().replace(/\\s/g, "") : "yourmailhost"
      } ~all").`
    );
  if (!hasDmarc)
    recommendations.push(`Add a DMARC TXT record at _dmarc.${domain} (start p=none, monitor, then enforce).`);
  if (dkimSelectors.length === 0)
    recommendations.push("Configure DKIM signing with your mail provider and publish the public key.");

  return {
    domain,
    mx,
    spf,
    dmarc,
    dkimSelectors,
    hasMx,
    hasSpf,
    hasDmarc,
    mailProvider,
    isDisposable,
    deliverabilityGrade: grade,
    warnings,
    recommendations,
  };
}
