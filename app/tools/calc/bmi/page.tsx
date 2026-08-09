import JsonLd from "@/components/seo/json-ld";
import BMICalculatorClient from "@/components/tools/calc/bmi-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free BMI Calculator & Healthy Weight Range | Toolzium",
  description:
    "Calculate your Body Mass Index (BMI) instantly. Supports metric (cm/kg) & imperial (in/lb) units with WHO health risk categories and target weight ranges.",
  path: "/tools/calc/bmi",
  keywords: [
    "BMI calculator",
    "body mass index calculator",
    "calculate BMI online",
    "healthy weight range calculator",
    "BMI chart WHO",
    "metric BMI calculator",
    "imperial BMI calculator",
    "Toolzium",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/calc/bmi`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free BMI Calculator & Healthy Weight Range — Toolzium",
    url: toolUrl,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    description:
      "Calculate Body Mass Index (BMI) using height and weight. Features metric/imperial units, WHO health categories, and healthy weight targets.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Instant BMI score calculation",
      "Metric (cm/kg) & Imperial (in/lb) units",
      "WHO weight categories: Underweight, Healthy, Overweight, Obese",
      "Optimal healthy weight range calculation for height",
      "100% Client-Side Privacy: zero server logging",
    ],
    creator: {
      "@type": "Organization",
      name: "Toolzium",
      url: "https://toolzium.com",
    },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteURL}` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 3, name: "BMI Calculator", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Body Mass Index (BMI)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Body Mass Index (BMI) is a medical calculation that uses your height and weight to estimate overall body mass. It classifies weight into four general categories: Underweight, Healthy Weight, Overweight, and Obese.",
        },
      },
      {
        "@type": "Question",
        name: "What are the standard WHO BMI categories?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Underweight: BMI under 18.5. Healthy Weight: BMI 18.5 – 24.9. Overweight: BMI 25.0 – 29.9. Obese: BMI 30.0 or higher.",
        },
      },
      {
        "@type": "Question",
        name: "Is BMI accurate for athletes and bodybuilders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BMI does not distinguish between muscle mass and fat mass. Trained athletes or bodybuilders with high muscle mass may be classified as 'Overweight' despite having low body fat.",
        },
      },
      {
        "@type": "Question",
        name: "How is the Healthy Weight Range calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The healthy weight range calculates the minimum and maximum weight in kilograms or pounds that corresponds to a healthy BMI between 18.5 and 24.9 for your height.",
        },
      },
      {
        "@type": "Question",
        name: "Is my personal health data stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Toolzium calculates all health metrics locally in your web browser. We do not store, log, or track your weight or height inputs.",
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />

      <BMICalculatorClient />
    </div>
  );
}
