import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import ColorPickerClient from "@/components/tools/dev/color-picker-client";

const title = "Color Picker — HEX, RGB, HSL Color Chooser | Toolzium";
const description = "Pick any color and get HEX, RGB, HSL codes instantly. Free online color picker with color name detection, complementary colors, and recent color history.";
const url = siteURL + "/tools/dev/color-picker";

export const metadata = buildMetadata({
  title,
  description,
  path: "/tools/dev/color-picker",
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
        { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools/dev" },
        { "@type": "ListItem", position: 3, name: "Color Picker", item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Color Picker",
      description,
      url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      featureList: [
        "Real-time HEX, RGB, HSL, HSV conversion",
        "Visual color picker with hue and saturation adjustment",
        "Automatic complementary color generation",
        "CSS color name detection",
        "Recent colors history tracking",
        "100% local browser-based execution"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between HEX and HSL?",
          acceptedAnswer: { "@type": "Answer", text: "HEX is a hexadecimal representation of Red, Green, and Blue values, commonly used in web development. HSL represents Hue, Saturation, and Lightness, making it much easier for designers to adjust color intensity or brightness intuitively." },
        },
        {
          "@type": "Question",
          name: "What are complementary colors?",
          acceptedAnswer: { "@type": "Answer", text: "Complementary colors are pairs of colors that, when combined or placed next to each other, create the highest contrast. They sit opposite each other on the color wheel (e.g., blue and orange)." },
        },
        {
          "@type": "Question",
          name: "What color formats does this tool support?",
          acceptedAnswer: { "@type": "Answer", text: "The tool supports HEX, RGB, HSL, and HSV color formats, offering real-time conversions between them." },
        },
        {
          "@type": "Question",
          name: "What is a safe contrast ratio for web accessibility?",
          acceptedAnswer: { "@type": "Answer", text: "According to WCAG 2.1 guidelines, standard text requires a minimum contrast ratio of 4.5:1 (Level AA) against its background, while large text requires a 3:1 ratio. Enhanced contrast (Level AAA) requires a 7:1 ratio." },
        },
        {
          "@type": "Question",
          name: "Is this color picker private?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. All color generation, picking, and conversions are calculated locally in your browser. No data is sent to a server." },
        }
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <ColorPickerClient />
    </>
  );
}
