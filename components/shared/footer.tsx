import Image from "next/image";
import Link from "next/link";
import { socialIcons } from "./icons";
import { TOTAL_TOOLS_COUNT } from "@/data/tools";

const toolCategories = [
  { name: "Text Tools", href: "/tools#cat-text" },
  { name: "URL Tools", href: "/tools#cat-url" },
  { name: "Image Tools", href: "/tools#cat-image" },
  { name: "Developer", href: "/tools#cat-developer" },
  { name: "SEO Tools", href: "/tools#cat-seo" },
  { name: "Calculators", href: "/tools#cat-calculators" },
  { name: "Network", href: "/tools#cat-network-security" },
  { name: "Utilities", href: "/tools#cat-utilities" },
];

const navLinks = [
  { name: "All Tools", href: "/tools" },
  { name: "About", href: "/about" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Sponsor", href: "/sponsor" },
];

function Footer() {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 font-inter relative overflow-hidden border-t border-border/40">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top: Logo + Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Socials (Grouped by Proximity) */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/assets/logo.png"
                height={36}
                width={36}
                alt="Toolzium Logo"
                className="rounded-xl"
              />
              <span className="text-xl font-bold tracking-tight text-foreground">Toolzium</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs leading-relaxed">
              {TOTAL_TOOLS_COUNT}+ free online tools for developers, designers, marketers, and
              everyone. No signup required.
            </p>

            {/* Social Icons - Positioned directly with brand */}
            <div className="flex items-center gap-3 mt-4">
              {socialIcons.map((icon) => (
                <a
                  key={icon.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.name}
                  className="h-9 w-9 rounded-xl border border-border/60 bg-muted/40 hover:bg-primary/10 hover:border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                  href={icon.href}
                >
                  {icon.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Tool Categories */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-3.5">
              Tool Categories
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {toolCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-3.5">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Toolzium. All rights reserved. Built for speed and privacy.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;