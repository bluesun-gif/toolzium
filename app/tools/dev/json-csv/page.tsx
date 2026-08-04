import { buildMetadata } from "@/lib/seo"
import { siteURL } from "@/lib/constants"
import JsonLd from "@/components/seo/json-ld"
import JsonCsvClient from "@/components/tools/dev/json-csv-client"

export const metadata = buildMetadata({
  title: "JSON to CSV Converter — Convert JSON to CSV Online | Toolzium",
  description: "Convert JSON arrays to CSV format instantly. Choose delimiters, flatten nested objects, download CSV files. Free online JSON to CSV converter — no signup.",
  path: "/tools/dev/json-csv",
  keywords: [
    "json to csv", "json csv", "json 2 csv", "json to csv online", "convert json csv", 
    "json csv converter", "json to excel", "json to spreadsheet", "json array to csv", 
    "json to csv free", "json converter", "data converter", "Toolzium", "online tools", "developer tools"
  ],
})

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JSON to CSV Converter",
      "url": `${siteURL}/tools/dev/json-csv`,
      "description": "Convert JSON arrays to CSV format instantly. Choose delimiters, flatten nested objects, download CSV files.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
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
          "name": "Developer Tools",
          "item": `${siteURL}/tools/dev`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "JSON to CSV",
          "item": `${siteURL}/tools/dev/json-csv`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What JSON format is supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Arrays of objects like [{key: value}, ...]. Nested objects can be flattened."
          }
        },
        {
          "@type": "Question",
          "name": "Can I choose a different delimiter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, choose comma, tab, semicolon, or pipe."
          }
        },
        {
          "@type": "Question",
          "name": "Can I download the CSV?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, click the download button to save as a .csv file."
          }
        }
      ]
    }
  ]

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <JsonCsvClient />
    </>
  )
}
