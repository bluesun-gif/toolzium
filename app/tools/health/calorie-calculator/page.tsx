import { Metadata } from "next";
import CalorieCalculatorClient from "@/components/tools/health/calorie-calculator-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = generateSEOMetadata({
  title: "Calorie Calculator — TDEE & Daily Calorie Needs",
  description: "Calculate daily calorie needs and TDEE free. Mifflin-St Jeor formula with activity levels. Macronutrient breakdown for weight loss, maintenance, or gain.",
  path: "/tools/health/calorie-calculator",
});

export default function CalorieCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is TDEE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TDEE stands for Total Daily Energy Expenditure. It represents the total number of calories you burn in a day, accounting for your basal metabolic rate (BMR) and your activity level.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is the Mifflin-St Jeor formula?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Mifflin-St Jeor formula is widely considered one of the most accurate equations for estimating Basal Metabolic Rate (BMR) in healthy adults, though individual variations still exist based on muscle mass and genetics.",
        },
      },
      {
        "@type": "Question",
        name: "Should I recalculate my calorie needs as I lose weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, as you lose weight, your body requires fewer calories to maintain its new mass. It is recommended to recalculate your TDEE every 5-10 pounds of weight loss to ensure continuous progress.",
        },
      }
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <CalorieCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/health/calorie-calculator" />
</>
  );
}
