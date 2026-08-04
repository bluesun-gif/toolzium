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
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/assets/logo.png"
                height={40}
                width={40}
                alt="Toolzium Logo"
              />
              <h2 className="text-xl font-semibold">Toolzium</h2>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              {TOTAL_TOOLS_COUNT}+ free online tools for developers, designers, marketers, and
              everyone. No signup required.
            </p>
          </div>

          {/* Tool Categories */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Tool Categories
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {toolCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social */}
          <div className="flex gap-4">
            {socialIcons.map((icon) => (
              <a
                key={icon.name}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.name}
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-300"
                href={icon.href}
              >
                {icon.svg}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Toolzium. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;