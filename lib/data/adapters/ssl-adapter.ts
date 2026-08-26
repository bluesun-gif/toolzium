// ─────────────────────────────────────────────────────────────────────────────
// $0 Live SSL/TLS Certificate Scanner — Node.js TLS handshake, NO external API
// Returns authentic issuer, validity, cipher, protocol & SAN from the real cert.
// Server-side only (uses node:tls).
// ─────────────────────────────────────────────────────────────────────────────

export interface SslCertResult {
  domain: string;
  valid: boolean;
  error?: string;
  issuer?: string;
  subject?: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
  sanCount?: number;
  sanSample?: string[];
  protocol?: string;
  cipher?: string;
  keyStrengthBits?: number;
  serialNumber?: string;
  fingerprintSha256?: string;
  isExpired?: boolean;
  expiresSoon?: boolean; // < 30 days
}

export async function scanSslCertificate(
  rawDomain: string,
  timeoutMs = 6000
): Promise<SslCertResult> {
  let domain = rawDomain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
  if (!domain) return { domain, valid: false, error: "Invalid domain" };

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const tls = require("node:tls");

  return new Promise<SslCertResult>((resolve) => {
    const sock = tls.connect(
      443,
      domain,
      { servername: domain, rejectUnauthorized: false },
      () => {
        try {
          const c: any = sock.getPeerCertificate(true);
          const validTo = c.valid_to ? new Date(c.valid_to) : null;
          const validFrom = c.valid_from ? new Date(c.valid_from) : null;
          const now = new Date();
          const daysRemaining = validTo
            ? Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            : undefined;
          const san: string[] = c.subjectaltname
            ? c.subjectaltname.split(",").map((s: string) => s.trim())
            : [];
          const cipher = sock.getCipher();
          const issuer = [c.issuer?.O, c.issuer?.CN].filter(Boolean).join(" / ");

          resolve({
            domain,
            valid: true,
            issuer,
            subject: c.subject?.CN,
            validFrom: c.valid_from,
            validTo: c.valid_to,
            daysRemaining,
            sanCount: san.length,
            sanSample: san.slice(0, 10),
            protocol: sock.getProtocol(),
            cipher: cipher?.name,
            keyStrengthBits: c.bits,
            serialNumber: c.serialNumber,
            fingerprintSha256: c.fingerprint256,
            isExpired: validTo ? validTo.getTime() < now.getTime() : undefined,
            expiresSoon: daysRemaining !== undefined ? daysRemaining < 30 : undefined,
          });
          void validFrom;
        } catch (e: any) {
          resolve({ domain, valid: false, error: e?.message || "Certificate parse failed" });
        } finally {
          sock.destroy();
        }
      }
    );

    sock.on("error", (e: any) =>
      resolve({ domain, valid: false, error: e?.message || "TLS connection failed" })
    );
    sock.setTimeout(timeoutMs, () => {
      sock.destroy();
      resolve({ domain, valid: false, error: "Connection timed out" });
    });
  });
}
