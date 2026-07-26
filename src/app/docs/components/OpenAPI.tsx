"use client";

import { useEffect, useRef } from "react";

interface OpenAPIProps {
  spec: Record<string, unknown>;
}

export function OpenAPI({ spec }: OpenAPIProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      import("swagger-ui-react/swagger-ui.css").then(() => {
        import("swagger-ui-react").then(({ default: SwaggerUI }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = "";
            SwaggerUI({
              spec,
              domNode: containerRef.current,
              deepLinking: true,
              presets: [
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                require("swagger-ui-react").presets.apis,
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                require("swagger-ui-react").SwaggerUIStandalonePreset,
              ],
              layout: "StandaloneLayout",
            });
          }
        });
      });
    }
  }, [spec]);

  return (
    <div className="openapi-container" ref={containerRef} />
  );
}

interface OpenAPIEndpointProps {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  summary: string;
  description?: string;
  parameters?: Array<{
    name: string;
    in: string;
    required?: boolean;
    schema: { type: string };
    description?: string;
  }>;
  responses?: Record<string, { description: string }>;
}

const methodColors: Record<string, string> = {
  get: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  post: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  put: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  delete: "bg-red-500/20 text-red-400 border-red-500/30",
  patch: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export function OpenAPIEndpoint({
  method,
  path,
  summary,
  description,
  parameters,
  responses,
}: OpenAPIEndpointProps) {
  return (
    <div className="openapi-endpoint">
      <div className="openapi-endpoint-header">
        <span className={`openapi-method ${methodColors[method]}`}>
          {method.toUpperCase()}
        </span>
        <code className="openapi-path">{path}</code>
      </div>
      <p className="openapi-summary">{summary}</p>
      {description && <p className="openapi-description">{description}</p>}

      {parameters && parameters.length > 0 && (
        <div className="openapi-parameters">
          <h4>Parameters</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>In</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param) => (
                <tr key={param.name}>
                  <td><code>{param.name}</code></td>
                  <td>{param.in}</td>
                  <td>{param.schema.type}</td>
                  <td>{param.required ? "Yes" : "No"}</td>
                  <td>{param.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {responses && (
        <div className="openapi-responses">
          <h4>Responses</h4>
          <div className="openapi-response-codes">
            {Object.entries(responses).map(([code, response]) => (
              <div key={code} className="openapi-response">
                <span className={`openapi-status-code ${code.startsWith("2") ? "success" : code.startsWith("4") || code.startsWith("5") ? "error" : ""}`}>
                  {code}
                </span>
                <span>{response.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
