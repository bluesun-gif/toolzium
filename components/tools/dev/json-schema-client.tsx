"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileJson, CheckCircle2, XCircle, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const PRESETS = {
  user: {
    name: "User Object",
    schema: {
      type: "object",
      required: ["id", "username", "email", "age"],
      properties: {
        id: { type: "integer", minimum: 1 },
        username: { type: "string", minLength: 3, maxLength: 20 },
        email: { type: "string" },
        age: { type: "integer", minimum: 18 },
        isActive: { type: "boolean" },
        roles: { type: "array", items: { type: "string", enum: ["admin", "user", "guest"] } }
      }
    },
    data: {
      id: 1,
      username: "johndoe",
      email: "john@example.com",
      age: 25,
      isActive: true,
      roles: ["admin", "user"]
    }
  },
  apiResponse: {
    name: "API Response",
    schema: {
      type: "object",
      required: ["status", "data"],
      properties: {
        status: { type: "string", enum: ["success", "error"] },
        message: { type: "string" },
        data: {
          type: "array",
          items: {
            type: "object",
            required: ["itemId", "name"],
            properties: {
              itemId: { type: "string" },
              name: { type: "string" }
            }
          }
        }
      }
    },
    data: {
      status: "success",
      data: [
        { itemId: "item-1", name: "Apple" },
        { itemId: "item-2", name: "Banana" }
      ]
    }
  },
  config: {
    name: "Config File",
    schema: {
      type: "object",
      required: ["theme", "features", "maxRetries"],
      properties: {
        theme: { type: "string", enum: ["light", "dark", "system"] },
        features: { 
          type: "object",
          properties: {
            enableNotifications: { type: "boolean" },
            betaMode: { type: "boolean" }
          }
        },
        maxRetries: { type: "integer", minimum: 0, maximum: 10 },
        tags: { type: "array", items: { type: "string" } }
      }
    },
    data: {
      theme: "dark",
      features: {
        enableNotifications: true,
        betaMode: false
      },
      maxRetries: 3,
      tags: ["web", "mobile", "desktop"]
    }
  }
};

type ValidationError = {
  path: string;
  message: string;
};

export function JsonSchemaClient() {
  const [schemaInput, setSchemaInput] = useState(JSON.stringify(PRESETS.user.schema, null, 2));
  const [dataInput, setDataInput] = useState(JSON.stringify(PRESETS.user.data, null, 2));
  
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const formatInputs = () => {
    try {
      const parsedSchema = JSON.parse(schemaInput);
      setSchemaInput(JSON.stringify(parsedSchema, null, 2));
    } catch (e) {
      toast.error("Invalid JSON in schema input");
    }
    
    try {
      const parsedData = JSON.parse(dataInput);
      setDataInput(JSON.stringify(parsedData, null, 2));
    } catch (e) {
      toast.error("Invalid JSON in data input");
    }
  };
  
  const validateSchema = (schema: any, data: any, path: string = "root"): ValidationError[] => {
    let currentErrors: ValidationError[] = [];
    
    if (schema === undefined || schema === null) return currentErrors;
    
    // Type checking
    if (schema.type) {
      const dataType = Array.isArray(data) ? "array" : data === null ? "null" : typeof data;
      if (schema.type === "integer") {
         if (typeof data !== "number" || !Number.isInteger(data)) {
           currentErrors.push({ path, message: `Expected integer but got ${dataType}` });
         }
      }
      else if (dataType !== schema.type && schema.type !== "any") {
        currentErrors.push({ path, message: `Expected ${schema.type} but got ${dataType}` });
      }
    }
    
    // Skip further validation if types mismatch or data is null
    if (currentErrors.length > 0 || data === null || data === undefined) return currentErrors;
    
    // Enum
    if (schema.enum && Array.isArray(schema.enum)) {
      if (!schema.enum.includes(data)) {
        currentErrors.push({ path, message: `Value must be one of: ${schema.enum.join(", ")}` });
      }
    }
    
    // Strings
    if (typeof data === "string") {
      if (schema.minLength !== undefined && data.length < schema.minLength) {
        currentErrors.push({ path, message: `String length must be >= ${schema.minLength}` });
      }
      if (schema.maxLength !== undefined && data.length > schema.maxLength) {
        currentErrors.push({ path, message: `String length must be <= ${schema.maxLength}` });
      }
    }
    
    // Numbers
    if (typeof data === "number") {
      if (schema.minimum !== undefined && data < schema.minimum) {
        currentErrors.push({ path, message: `Number must be >= ${schema.minimum}` });
      }
      if (schema.maximum !== undefined && data > schema.maximum) {
        currentErrors.push({ path, message: `Number must be <= ${schema.maximum}` });
      }
    }
    
    // Arrays
    if (Array.isArray(data) && schema.type === "array") {
      if (schema.items) {
        data.forEach((item, index) => {
          currentErrors = currentErrors.concat(validateSchema(schema.items, item, `${path}[${index}]`));
        });
      }
    }
    
    // Objects
    if (typeof data === "object" && !Array.isArray(data) && schema.type === "object") {
      if (schema.required && Array.isArray(schema.required)) {
        schema.required.forEach((req: string) => {
          if (data[req] === undefined) {
            currentErrors.push({ path: `${path}.${req}`, message: "Required property is missing" });
          }
        });
      }
      
      if (schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
          if (data[key] !== undefined) {
            currentErrors = currentErrors.concat(validateSchema(schema.properties[key], data[key], `${path}.${key}`));
          }
        });
      }
    }
    
    return currentErrors;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsValidating(true);
      setParseError(null);
      setErrors([]);
      
      try {
        const schema = JSON.parse(schemaInput);
        const data = JSON.parse(dataInput);
        const validationErrors = validateSchema(schema, data);
        setErrors(validationErrors);
      } catch (err: any) {
        setParseError(err.message || "Invalid JSON syntax");
      } finally {
        setIsValidating(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [schemaInput, dataInput]);

  const handlePresetChange = (key: string) => {
    if (key && PRESETS[key as keyof typeof PRESETS]) {
      const preset = PRESETS[key as keyof typeof PRESETS];
      setSchemaInput(JSON.stringify(preset.schema, null, 2));
      setDataInput(JSON.stringify(preset.data, null, 2));
      toast.success(`Loaded ${preset.name} preset`);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={FileJson}
        title="JSON Schema Validator"
        description="Validate your JSON data against a JSON Schema in real-time."
        actions={
          <>
            <Select onValueChange={handlePresetChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Load preset..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PRESETS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ActionButton onClick={formatInputs} icon={Code} label="Format JSON" variant="outline" size="default" />
            <ResetButton onClick={() => {
              setSchemaInput("{}");
              setDataInput("{}");
              toast.success("Inputs cleared");
            }} label="Clear" />
          </>
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Validation Status</CardTitle>
          <CardDescription>Real-time validation results</CardDescription>
        </CardHeader>
        <CardContent>
          {parseError ? (
            <div className="flex items-start space-x-3 text-red-500 bg-red-500/10 p-4 rounded-md">
              <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Parse Error</p>
                <p className="text-sm">{parseError}</p>
              </div>
            </div>
          ) : errors.length > 0 ? (
            <div className="flex items-start space-x-3 text-red-500 bg-red-500/10 p-4 rounded-md">
              <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="w-full">
                <p className="font-semibold">Validation Failed ({errors.length} errors)</p>
                <ul className="mt-2 space-y-1 text-sm list-disc pl-4">
                  {errors.map((err, i) => (
                    <li key={i}><span className="font-mono bg-red-500/20 px-1 py-0.5 rounded">{err.path}</span>: {err.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 text-green-500 bg-green-500/10 p-4 rounded-md">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="font-semibold">JSON is valid according to schema!</p>
            </div>
          )}
        </CardContent>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>JSON Schema</CardTitle>
              <CardDescription>Define your schema rules</CardDescription>
            </div>
            <CopyButton getText={() => schemaInput} label="Copy Schema" />
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-[500px] p-4 font-mono text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              value={schemaInput}
              onChange={(e) => setSchemaInput(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>JSON Data</CardTitle>
              <CardDescription>Data to be validated</CardDescription>
            </div>
            <CopyButton getText={() => dataInput} label="Copy Data" />
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-[500px] p-4 font-mono text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
