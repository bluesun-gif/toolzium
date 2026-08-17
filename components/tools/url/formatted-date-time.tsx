"use client";

import { ToolBackground } from "@/components/shared/tool-background";

import { useEffect, useState } from"react";

export default function FormattedDateTime({ dateISO }: { dateISO: string | null }) {
 const [formatted, setFormatted] = useState<string>("");

 useEffect(() => {
 if (!dateISO) return;
 try {
 const d = new Date(dateISO);
 setFormatted(d.toLocaleString(undefined, {
 year:"numeric",
 month:"numeric",
 day:"numeric",
 hour:"numeric",
 minute:"2-digit",
 second:"2-digit",
 hour12: true,
 }));
 } catch (_) {
 setFormatted(String(dateISO));
 }
 }, [dateISO]);

 if (!dateISO) return <span>—</span>;

 if (!formatted) {
 return <span>{new Date(dateISO).toLocaleString("en-US", { timeZone:"UTC"})}</span>;
 }

 return <span>{formatted}</span>;
}
