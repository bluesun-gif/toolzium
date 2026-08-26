export interface AffiliatePartner {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  discount: string;
  url: string;
  rating: number;
  highlight: string;
  logo: string;
}

export const VPN_PARTNERS: AffiliatePartner[] = [
  {
    id: "nordvpn",
    name: "NordVPN",
    tagline: "Ultra-fast VPN with Threat Protection & Meshnet",
    badge: "⭐ Editor's Choice",
    discount: "Save 74% + 3 Months Free",
    url: "https://nordvpn.com/?utm_source=toolzium&utm_medium=affiliate&utm_campaign=security_tools",
    rating: 4.9,
    highlight: "Double VPN Encryption & RAM-only servers in 111+ countries",
    logo: "🛡️",
  },
  {
    id: "surfshark",
    name: "Surfshark VPN",
    tagline: "Unlimited simultaneous device connections & CleanWeb AdBlock",
    badge: "⚡ Best Value",
    discount: "Save 86% + 2 Months Free",
    url: "https://surfshark.com/?utm_source=toolzium&utm_medium=affiliate&utm_campaign=ip_lookup",
    rating: 4.8,
    highlight: "Camouflage mode & Cookie pop-up blocker included",
    logo: "🦈",
  },
  {
    id: "expressvpn",
    name: "ExpressVPN",
    tagline: "High-speed servers in 105 countries with Lightway protocol",
    badge: "🚀 Fastest Speed",
    discount: "Save 49% + 3 Free Months",
    url: "https://expressvpn.com/?utm_source=toolzium&utm_medium=affiliate&utm_campaign=whois_privacy",
    rating: 4.7,
    highlight: "TrustedServer technology with zero activity logs",
    logo: "⚡",
  },
];

export const PASSWORD_MANAGERS: AffiliatePartner[] = [
  {
    id: "nordpass",
    name: "NordPass",
    tagline: "Next-gen XChaCha20 encrypted password manager & passkey vault",
    badge: "🔐 Most Secure",
    discount: "Save 56% with 2-Year Plan",
    url: "https://nordpass.com/?utm_source=toolzium&utm_medium=affiliate&utm_campaign=breach_checker",
    rating: 4.9,
    highlight: "Zero-knowledge architecture with data breach scanner",
    logo: "🔑",
  },
  {
    id: "1password",
    name: "1Password",
    tagline: "Industry-standard password manager for families & teams",
    badge: "🏆 Top Rated",
    discount: "Try 14 Days Free",
    url: "https://1password.com/?utm_source=toolzium&utm_medium=affiliate&utm_campaign=password_audit",
    rating: 4.8,
    highlight: "Watchtower vulnerability alerts & Travel Mode protection",
    logo: "🛡️",
  },
];

export function getRecommendedVpn(countryCode?: string): AffiliatePartner {
  const code = (countryCode || "US").toUpperCase();
  if (code === "GB" || code === "UK") {
    return VPN_PARTNERS[1]; // Surfshark popular in UK
  }
  if (code === "CA" || code === "AU" || code === "DE") {
    return VPN_PARTNERS[2]; // ExpressVPN / Nord
  }
  return VPN_PARTNERS[0]; // NordVPN default for US & global
}
