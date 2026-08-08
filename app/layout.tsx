import "leaflet/dist/leaflet.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";

import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/google-tag-manager";
import AuthSessionProvider from "@/components/providers/session-provider";
import { PremiumProvider } from "@/components/providers/premium-provider";
import ToasterProvider from "@/components/providers/toaster-provider";
import NavigationProgressBar from "@/components/shared/navigation-progress-bar";
import JsonLd from "@/components/seo/json-ld";
import { ToolsData, TOTAL_TOOLS_COUNT } from "@/data/tools";
import { siteURL } from "@/lib/constants";
import {
  buildDynamicKeywords,
  mergeKeywords,
  siteDescriptionFallback,
} from "@/lib/seo-tools";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const STATIC_KEYWORDS = [
  "online tools",
  "url shortener",
  "pdf tools",
  "image converter",
  "text utilities",
  "developer tools",
  "calculators",
  "free tools",
  "privacy friendly",
  "seo tools",
  "unit converter",
  "hash generator",
  "regex tester",
  "json formatter",
];

const DYNAMIC_KEYWORDS = buildDynamicKeywords(ToolsData);
const KEYWORDS = mergeKeywords(STATIC_KEYWORDS, DYNAMIC_KEYWORDS);

const description =
  `Free online tools for developers and professionals: URL shortener, QR code generator, JSON formatter, image converter, Base64 encoder, hash generator, regex tester, calculators, and ${TOTAL_TOOLS_COUNT}+ utilities. No signup required, privacy-first.`;
const smartDescription = description || siteDescriptionFallback(ToolsData);

// Viewport configuration for mobile native app feel & zero side-zooming
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `Toolzium — ${TOTAL_TOOLS_COUNT}+ Free Online Tools for Everyone`,
    template: "%s - Toolzium",
  },
  description: smartDescription,
  metadataBase: new URL(siteURL),
  keywords: KEYWORDS,
  authors: [{ name: "Toolzium", url: "https://toolzium.com" }],
  creator: "Toolzium",
  publisher: "Toolzium",
  category: "UtilitiesApplication",
  applicationName: "Toolzium",
  appLinks: {
    web: {
      url: `${siteURL}`,
    },
  },
  openGraph: {
    title: `Toolzium — ${TOTAL_TOOLS_COUNT}+ Free Online Tools for Everyone`,
    description:
      `Free online tools: URL shortener, QR codes, JSON formatter, image converter, calculators, and ${TOTAL_TOOLS_COUNT}+ utilities. No signup required, privacy-first.`,
    type: "website",
    url: `${siteURL}/tools`,
    siteName: "Toolzium",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    images: [
      {
        url: `${siteURL}/assets/tools-cube.jpg`,
        width: 1200,
        height: 630,
        alt: "Toolzium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@toolzium",
    creator: "@toolzium",
    title: `Toolzium — ${TOTAL_TOOLS_COUNT}+ Free Online Tools`,
    description:
      `URL shortener, QR codes, JSON formatter, image converter, calculators, and more. ${TOTAL_TOOLS_COUNT}+ utilities. Free, no signup required, privacy-first.`,
    images: [`${siteURL}/assets/tools-cube.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    languages: {
      "en-US": `${siteURL}`,
    },
  },
  verification: {
    google: "I6XLZ8QITEB0xy7YfWARBo54DeNXNVZ421M0CqU49UE",
    other: {
      "msvalidate.01": "76B2BE5FA7F02209E351BC14BFFC9A34",
      "yandex-verification": "YANDEX_VERIFICATION_CODE_HERE",
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Toolzium",
    url: siteURL,
    inLanguage: ["en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteURL}/search?q={query}`,
      "query-input": "required name=query",
    },
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Toolzium",
    url: siteURL,
    logo: `${siteURL}/assets/logo.png`,
    sameAs: [
      "https://toolzium.com",
    ],
  };

  const navLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Toolzium Categories",
    itemListElement: ToolsData.map((c, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${siteURL}${c.url}`,
    })),
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} scroll-smooth overflow-x-hidden`}
    >
      <head>
        <GoogleTagManager />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden pb-16 md:pb-0">
        <NavigationProgressBar />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>
        <GoogleTagManagerNoScript />

        <AuthSessionProvider>
          <PremiumProvider>
            <div id="main-content" className="overflow-x-hidden w-full max-w-full">{children}</div>
          </PremiumProvider>
        </AuthSessionProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
