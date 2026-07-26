"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "javascript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      {filename && (
        <div className="code-block-header">
          <span className="code-block-filename">{filename}</span>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}
      <pre className="code-block-pre">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
