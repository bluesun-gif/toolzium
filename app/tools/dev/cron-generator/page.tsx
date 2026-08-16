import JsonLd from "@/components/seo/json-ld";
import { CronGeneratorClient } from "@/components/tools/dev/cron-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Cron Expression Generator — Free Online Tool | Toolzium",
  description: "Easily generate, parse, and explain cron expressions with our visual builder. See human-readable descriptions and next scheduled run times.",
  path: "/tools/dev/cron-generator",
  keywords: [
    "cron", "cron generator", "cron expression builder", "crontab", "crontab generator",
    "cron expression parser", "cron scheduler", "cron schedule expression", "cron syntax",
    "cron visualizer", "online cron tool", "cron next runs", "cron job", "cron format",
    "quartz cron", "unix cron", "linux cron", "cron calculator", "cron explanation", "cron string", "cron 6-field"
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/cron-generator`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cron Expression Generator",
    "url": toolUrl,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Easily generate, parse, and explain cron expressions with our visual builder."
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteURL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${siteURL}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Developer",
        "item": `${siteURL}/tools#cat-developer`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Cron Generator",
        "item": toolUrl
      }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a cron expression?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A cron expression is a string representing a schedule, consisting of 5 or 6 fields separated by spaces. It's used in Unix-like systems to trigger tasks at specific times, dates, or intervals."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between 5-field and 6-field cron?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard cron uses 5 fields (minute, hour, day of month, month, day of week). A 6-field cron adds a seconds field at the beginning, often used by systems like Quartz or AWS EventBridge for more precise scheduling."
        }
      },
      {
        "@type": "Question",
        "name": "What does the asterisk (*) mean in cron?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The asterisk (*) represents 'every' or 'any' value. For example, an asterisk in the month field means the task will run every month."
        }
      },
      {
        "@type": "Question",
        "name": "How do I specify multiple values in a cron field?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can use commas to specify multiple values (e.g., 1,15 for the 1st and 15th), or a hyphen for ranges (e.g., 1-5 for Monday through Friday)."
        }
      },
      {
        "@type": "Question",
        "name": "What is a step value in cron?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A step value is used to specify increments. It's written as a slash followed by a number. For example, */5 in the minute field means 'every 5 minutes'."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CronGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/dev/cron-generator" />
</div>
  );
}
