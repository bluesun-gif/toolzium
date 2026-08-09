import { buildMetadata } from "@/lib/seo"
import { siteURL } from "@/lib/constants"
import JsonLd from "@/components/seo/json-ld"
import ToolPageHeader from "@/components/shared/tool-page-header"
import { Repeat } from "lucide-react"
import TextRepeaterClient from "@/components/tools/text/text-repeater-client"

export const metadata = buildMetadata({
    title: "Text Repeater — Repeat Text Online Free | Toolzium",
    description: "Repeat any text multiple times with custom separators. Copy paste flood text, multiply strings, add line numbers. Free text repeater tool — no signup required.",
    path: "/tools/text/text-repeater",
    keywords: ["text repeater", "repeat text", "text multiplier", "copy paste flood", "repeat word", "text repeat online", "repeat string", "duplicate text", "text generator repeat", "multiply text", "repeat text online free", "text repeater tool", "Toolzium", "online tools"],
})

export default function Page() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 px-4 py-8">
            <ToolPageHeader
                title="Text Repeater"
                description="Duplicate your text multiple times with custom separators and line numbers."
                icon={Repeat}
            />
            
            <div className="mt-8">
                <TextRepeaterClient />
            </div>

            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    name: "Text Repeater",
                    description: "Repeat any text multiple times with custom separators. Copy paste flood text, multiply strings, add line numbers. Free text repeater tool — no signup required.",
                    applicationCategory: "UtilitiesApplication",
                    operatingSystem: "Any",
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "USD",
                    },
                }}
            />
            
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Home",
                            item: siteURL,
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Text Tools",
                            item: siteURL + "/tools/text",
                        },
                        {
                            "@type": "ListItem",
                            position: 3,
                            name: "Text Repeater",
                            item: siteURL + "/tools/text/text-repeater",
                        },
                    ],
                }}
            />
            
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name: "What is a text repeater?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "A tool that duplicates your text a specified number of times with optional separators.",
                            }
                        },
                        {
                            "@type": "Question",
                            name: "Can I use custom separators?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "Yes, choose newline, space, comma, or enter any custom separator.",
                            }
                        },
                        {
                            "@type": "Question",
                            name: "Is there a limit?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "You can repeat text up to 10,000 times.",
                            }
                        }
                    ]
                }}
            />
        </div>
    )
}
