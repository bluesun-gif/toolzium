"use server";

import tls from "node:tls";

export async function checkSslCertificate(domain: string) {
  return new Promise<{
    ok: boolean;
    error?: string;
    cert?: {
      issuer_name: string;
      common_name: string;
      name_value: string;
      not_before: string;
      not_after: string;
      serial_number: string;
    };
  }>((resolve) => {
    try {
      const cleanDomain = domain
        .replace(/^https?:\/\//, "")
        .replace(/\/.*$/, "")
        .toLowerCase()
        .trim();

      if (!cleanDomain) {
        resolve({ ok: false, error: "Invalid domain name" });
        return;
      }

      const socket = tls.connect(
        {
          host: cleanDomain,
          port: 443,
          servername: cleanDomain,
          rejectUnauthorized: false,
          timeout: 5000,
        },
        () => {
          const cert = socket.getPeerCertificate(true);
          socket.destroy();

          if (!cert || Object.keys(cert).length === 0) {
            resolve({ ok: false, error: "No certificate found for this domain" });
            return;
          }

          const issuerStr = Object.entries(cert.issuer || {})
            .map(([k, v]) => `${k} = ${v}`)
            .join(", ");

          const altNames = cert.subjectaltname
            ? cert.subjectaltname
                .split(", ")
                .map((item) => item.replace(/^DNS:/, ""))
                .join("\n")
            : cert.subject?.CN || "";

          resolve({
            ok: true,
            cert: {
              issuer_name: issuerStr || "Unknown",
              common_name: cert.subject?.CN || cleanDomain,
              name_value: altNames,
              not_before: cert.valid_from ? new Date(cert.valid_from).toISOString() : "",
              not_after: cert.valid_to ? new Date(cert.valid_to).toISOString() : "",
              serial_number: cert.serialNumber || "",
            },
          });
        }
      );

      socket.on("error", (err) => {
        console.error("TLS Socket error:", err);
        resolve({
          ok: false,
          error: `Failed to establish secure connection to ${cleanDomain}. Ensure the domain name is correct and port 443 is open.`,
        });
      });

      socket.on("timeout", () => {
        socket.destroy();
        resolve({ ok: false, error: "Connection timed out" });
      });
    } catch (e: any) {
      resolve({
        ok: false,
        error: e.message || "An unexpected error occurred while parsing the SSL certificate.",
      });
    }
  });
}
