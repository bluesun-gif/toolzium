import { Metadata } from "next";
import WhoisClient from "@/components/tools/network/whois-client";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";
const title = "WHOIS Domain Lookup — Check Domain Registration Details | Toolzium";
const description =
  "Free online WHOIS domain lookup tool. Check registrar info, domain registration date, expiry date, owner details, name servers, and raw RDAP records instantly.";
const toolUrl = `${siteURL}/tools/network/whois`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools/network/whois",
  keywords: [
    "whois lookup",
    "domain lookup",
    "check domain owner",
    "domain expiration date",
    "registrar whois search",
    "rdap query online",
    "dns registrar checker",
    "domain age tool",
  ],
});

export default function Page() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WHOIS Domain Lookup — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description:
      "Free online WHOIS domain lookup tool. Check domain registration details, registrar information, expiration date, and DNS records instantly.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Real-time WHOIS domain lookup via RDAP",
      "Lookup registrar, creation, and expiry dates",
      "List name servers and status codes",
      "View raw RDAP JSON response data",
      "Search history log cached locally",
    ],
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "WHOIS Domain Lookup", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is WHOIS and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WHOIS is a query and response protocol widely used for querying databases that store the registered users or assignees of an Internet resource, such as a domain name. This tool queries the newer RDAP (Registration Data Access Protocol) standard, which delivers structured JSON WHOIS data.",
        },
      },
      {
        "@type": "Question",
        name: "Why is domain owner contact info redacted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Due to modern privacy regulations like GDPR and CCPA, registrars now redact personal contact details (names, emails, phones) from public WHOIS records by default. They often use proxy services or show 'Redacted for Privacy'.",
        },
      },
      {
        "@type": "Question",
        name: "How do I check when a domain expires?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Perform a WHOIS query on the domain name. The output will display an 'Expiration Date' or 'events' list with an action type 'expiry' which tells you exactly when the domain registration terminates.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a registrar and registry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A registry is the organization that manages the top-level domain (TLD) database (like Verisign for .com). A registrar is a commercial entity (like Namecheap or GoDaddy) authorized to sell domain registrations to end-users (registrants).",
        },
      },
      {
        "@type": "Question",
        name: "Why does WHOIS show different results for different TLDs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Different registries enforce varying privacy rules, data formats, and query limits. For example, country-code TLDs (ccTLDs like .uk or .de) often have stricter lookup limitations and redact more data compared to generic TLDs like .com.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WhoisClient />
    
      <RelatedTools currentToolUrl="/tools/network/whois" />
</>
  );
}
