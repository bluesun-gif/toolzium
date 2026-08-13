import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ScientificCalculatorClient from "@/components/tools/calc/scientific-calculator-client";

export const metadata = buildMetadata({
  title: "Scientific Calculator",
  description: "Advanced scientific calculator with trigonometric, logarithmic, and exponential functions. Calculate sin, cos, tan, log, square root, and more. Free online scientific calculator for students and engineers.",
  path: "/tools/calc/scientific",
  keywords: ["root", "trigonometric", "logarithmic", "with", "calculate", "exponential", "functions", "calculator", "more", "scientific", "advanced", "square"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Scientific Calculator",
    description: "Advanced scientific calculator with trigonometric, logarithmic, and exponential functions. Calculate sin, cos, tan, log, square root, and more. Free online scientific calculator for students and engineers.",
    path: "/tools/calc/scientific",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ScientificCalculatorClient />
    </div>
  );
}
