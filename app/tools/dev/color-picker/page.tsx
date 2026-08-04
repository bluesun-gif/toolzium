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
      "@type": "DeveloperApplication",
      name: "Color Picker",
      description,
      url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What color formats are supported?",
          acceptedAnswer: { "@type": "Answer", text: "HEX, RGB, HSL, and HSV." },
        },
        {
          "@type": "Question",
          name: "Can I type a HEX code directly?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, type any HEX, RGB, or HSL value and the picker updates." },
        },
        {
          "@type": "Question",
          name: "Does it show complementary colors?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, the tool displays the complementary color automatically." },
        },
        {
          "@type": "Question",
          name: "Is my data stored?",
          acceptedAnswer: { "@type": "Answer", text: "No, everything runs in your browser." },
        },
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
