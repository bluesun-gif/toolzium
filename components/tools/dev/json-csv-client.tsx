"use client"

import React, { useState, useEffect } from "react"
import ToolPageHeader from "@/components/shared/tool-page-header"
import { GlassCard } from "@/components/ui/glass-card"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TextareaField from "@/components/shared/form-fields/textarea-field"
import SwitchRow from "@/components/shared/form-fields/switch-row"
import { CopyButton, ResetButton, ActionButton } from "@/components/shared/action-buttons"
import { Separator } from "@/components/ui/separator"
import Stat from "@/components/shared/stat"
import { FileSpreadsheet, Download } from "lucide-react"

export default function JsonCsvClient() {
  const [inputJson, setInputJson] = useState("")
  const [outputCsv, setOutputCsv] = useState("")
  const [delimiter, setDelimiter] = useState(",")
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [quoteAllFields, setQuoteAllFields] = useState(false)
  const [flattenNested, setFlattenNested] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")
  
  const [stats, setStats] = useState({ rows: 0, columns: 0 })

  const flattenObject = (obj: any, prefix = ""): any => {
    return Object.keys(obj).reduce((acc: any, k: string) => {
      const pre = prefix.length ? prefix + "." : ""
      if (typeof obj[k] === "object" && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenObject(obj[k], pre + k))
      } else {
        acc[pre + k] = obj[k]
      }
      return acc
    }, {})
  }

  useEffect(() => {
    if (!inputJson.trim()) {
      setOutputCsv("")
      setErrorMsg("")
      setStats({ rows: 0, columns: 0 })
      return
    }

    try {
      let parsed = JSON.parse(inputJson)
      
      if (!Array.isArray(parsed)) {
        if (typeof parsed === "object" && parsed !== null) {
          parsed = [parsed]
        } else {
          throw new Error("JSON must be an array of objects or an object")
        }
      }
      
      if (parsed.length === 0) {
        setOutputCsv("")
        setStats({ rows: 0, columns: 0 })
        setErrorMsg("")
        return
      }

      let data = parsed
      if (flattenNested) {
        data = parsed.map((item: any) => flattenObject(item))
      }

      // Extract all unique headers
      const allKeys = new Set<string>()
      data.forEach((item: any) => {
        if (typeof item === 'object' && item !== null) {
           Object.keys(item).forEach(k => allKeys.add(k))
        }
      })
      const headers = Array.from(allKeys)

      let csvText = ""

      const escapeCSV = (val: any) => {
        if (val === null || val === undefined) return ""
        let str = String(val)
        if (quoteAllFields || str.includes(delimiter) || str.includes("\n") || str.includes("\"")) {
          str = "\"" + str.replace(/"/g, "\"\"") + "\""
        }
        return str
      }

      if (includeHeaders) {
        csvText += headers.map(h => escapeCSV(h)).join(delimiter) + "\n"
      }

      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const row = headers.map(h => escapeCSV(item[h]))
        csvText += row.join(delimiter)
        if (i < data.length - 1) csvText += "\n"
      }

      setOutputCsv(csvText)
      setErrorMsg("")
      setStats({ rows: data.length, columns: headers.length })
    } catch (e: any) {
      setErrorMsg(e.message || "Invalid JSON")
      setOutputCsv("")
      setStats({ rows: 0, columns: 0 })
    }
  }, [inputJson, delimiter, includeHeaders, quoteAllFields, flattenNested])

  const handleSample = () => {
    setInputJson(JSON.stringify([
      { id: 1, name: "John Doe", email: "john@example.com", address: { city: "New York", zip: "10001" } },
      { id: 2, name: "Jane Smith", email: "jane@example.com", address: { city: "London", zip: "SW1A 1AA" } }
    ], null, 2))
  }

  const handleDownload = () => {
    if (!outputCsv) return
    const blob = new Blob([outputCsv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setInputJson("")
    setOutputCsv("")
    setErrorMsg("")
    setStats({ rows: 0, columns: 0 })
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <ToolPageHeader
        title="JSON to CSV Converter"
        description="Convert JSON arrays of objects into clean CSV files. Options to set custom delimiters, flatten nested objects, and quote fields."
        icon={FileSpreadsheet}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Input JSON</CardTitle>
              <CardDescription>Paste your JSON array of objects here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextareaField
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder={'[\n  {\n    "id": 1,\n    "name": "John Doe"\n  }\n]'}
                rows={12}
                error={errorMsg || undefined}
              />
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleSample}>
                  Load Sample
                </Button>
                <ResetButton onClick={handleReset} />
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Delimiter</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Comma (,)", value: "," },
                    { label: "Tab", value: "\t" },
                    { label: "Semicolon (;)", value: ";" },
                    { label: "Pipe (|)", value: "|" }
                  ].map(opt => (
                    <Button
                      key={opt.value}
                      variant={delimiter === opt.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDelimiter(opt.value)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
              <SwitchRow
                label="Include Headers Row"
                hint="Use JSON keys as CSV headers"
                checked={includeHeaders}
                onCheckedChange={setIncludeHeaders}
              />
              <SwitchRow
                label="Quote All Fields"
                hint="Enclose every value in double quotes"
                checked={quoteAllFields}
                onCheckedChange={setQuoteAllFields}
              />
              <SwitchRow
                label="Flatten Nested Objects"
                hint="Convert nested fields like { a: { b: 1 } } to a.b"
                checked={flattenNested}
                onCheckedChange={setFlattenNested}
              />
            </CardContent>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Output CSV</CardTitle>
              <CardDescription>Live preview of your converted CSV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextareaField
                value={outputCsv}
                onChange={() => {}}
                placeholder="Converted CSV will appear here..."
                rows={16}
                readOnly
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Rows" value={stats.rows.toString()} />
                <Stat label="Columns" value={stats.columns.toString()} />
              </div>

              <div className="flex gap-2 flex-wrap">
                <CopyButton getText={outputCsv} />
                <ActionButton
                  icon={Download}
                  label="Download CSV"
                  onClick={handleDownload}
                  disabled={!outputCsv}
                />
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
