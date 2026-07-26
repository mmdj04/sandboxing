"use client";

import { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Copy, Check } from "lucide-react";

interface ApiPlaygroundProps {
  title: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  initialCode?: string;
  description?: string;
}

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  PATCH: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const defaultCode = `// Example API call
const response = await fetch("https://api.example.com/v1/resource", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  }
});

const data = await response.json();
console.log(data);`;

export function ApiPlayground({
  title,
  method,
  endpoint,
  initialCode,
  description,
}: ApiPlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const code = initialCode || defaultCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="api-playground">
      <div className="api-playground-header">
        <div className="api-playground-title">
          <Badge className={methodColors[method]}>{method}</Badge>
          <code className="api-playground-endpoint">{endpoint}</code>
        </div>
        <div className="api-playground-actions">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      {description && (
        <p className="api-playground-description">{description}</p>
      )}
      <SandpackProvider
        template="react"
        files={{
          "/App.js": code,
        }}
        theme="dark"
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            showLineNumbers
            showTabs
            style={{ height: "300px" }}
          />
          <SandpackPreview
            showNavigator
            style={{ height: "300px" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
