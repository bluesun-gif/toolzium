import JsonLd from "@/components/seo/json-ld";
import MorseAudioClient from "@/components/tools/fun/morse-audio-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Morse Code Audio | Toolzium",
  description: "Convert text to Morse code with audio playback. Listen and learn.",
  path: "/tools/fun/morse-audio",
  keywords: ["morse", "code", "audio", "converter", "fun"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/morse-audio`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Morse Code Audio", url: toolUrl, description: "Text to Morse code converter with audio playback.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Morse Code Audio", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can I adjust the speed?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can adjust the Words Per Minute (WPM)." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MorseAudioClient />
    </div>
  );
}
