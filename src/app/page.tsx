import { CodeBlock } from "./components/CodeBlock";
import { Header } from "./components/Header";
import "./bento.css";

const BORDER = "1px solid hsl(0, 0%, 18%)";
const CARD_BG = "hsl(0, 0%, 9%)";

const rows = [
  {
    columns: "1fr 1fr",
    cells: [
      { title: "Fast, Flexible Installation", desc: "Install only what you need. The CLI adds components directly to your codebase with full source code access. No hidden dependencies, tree-shaking friendly." },
      { type: "code", code: "$ npx ai-elements@latest add conversation\n✔ Checking registry.\n✔ Installing dependencies.\n✔ Created 1 file:\n  - components/ai-elements/conversation.tsx\nℹ Skipped 1 files: (files might be identical, use --overwrite to overwrite)\n  - components/ui/button.tsx" },
    ],
  },
  {
    columns: "1fr 2fr 1fr",
    cells: [
      { title: "Global Edge", desc: "Deploy to 300+ edge locations worldwide with automatic CDN." },
      { title: "AI-Powered Agent", desc: "Autonomous coding agent that understands your entire codebase. Writes, tests, and debugs code with human-level reasoning." },
      { title: "Database", desc: "Built-in Postgres, Redis, and KV storage with automatic scaling." },
    ],
  },
  {
    columns: "1fr 2fr",
    cells: [
      { title: "Secrets", desc: "Encrypted environment variables with automatic rotation." },
      { title: "Monorepo Ready", desc: "First-class monorepo support with Turborepo. Intelligent caching, parallel builds, and dependency graph optimization." },
    ],
  },
  {
    columns: "1fr 1fr 1fr",
    cells: [
      { title: "CLI & API", desc: "Full-featured CLI and REST API for complete programmatic control." },
      { title: "Smart Previews", desc: "Every pull request gets an instant preview deployment with unique URL." },
      { title: "Auto Deploy", desc: "Push to main and your app is live with automatic builds and rollback." },
    ],
  },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "hsl(0, 0%, 9%)", minHeight: "100vh" }}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#fff" }}>
          Welcome to Sandboxing
        </h1>
        <p style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)", color: "#999" }}>
          Get started by editing{" "}
          <code style={{ background: "hsl(0, 0%, 18%)", padding: "0.25rem 0.5rem", borderRadius: "4px", color: "#ccc" }}>
            src/app/page.tsx
          </code>
        </p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1rem 4rem" }}>
        <div
          className="first-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            borderBottom: BORDER,
            marginLeft: "-1px",
            marginRight: "-1px",
          }}
        >
          {[
            { title: "Fully Composable", desc: "Every component is a building block. Combine small, focused pieces to create exactly the UI you need." },
            { title: "AI SDK Integration", desc: "Deep integration with the AI SDK. Streaming, status states and type safety built-in." },
            { title: "shadcn/ui Foundation", desc: "Built on shadcn/ui conventions. Your existing theme and setup apply automatically." },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: CARD_BG,
                padding: "2rem",
                borderTop: BORDER,
                borderLeft: BORDER,
                borderRight: BORDER,
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>{item.title}</h3>
              <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`bento-grid bento-grid-${row.columns === "1fr 1fr 1fr" ? "3" : row.columns === "2fr 1fr" ? "2" : row.columns === "1fr 2fr 1fr" ? "2-1" : "1-2"}`}
            style={{
              display: "grid",
              marginTop: "-1px",
            }}
          >
              {row.cells.map((cell, cellIdx) => (
                <div
                  key={cellIdx}
                  style={{
                    background: CARD_BG,
                    padding: "2rem",
                    borderTop: BORDER,
                    borderLeft: BORDER,
                    borderRight: BORDER,
                    borderBottom: BORDER,
                  }}
                >
                  {cell.type === "code" ? (
                    <CodeBlock>{cell.code}</CodeBlock>
                  ) : (
                    <>
                      <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>{cell.title}</h3>
                      <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>{cell.desc}</p>
                    </>
                  )}
                </div>
              ))}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: CARD_BG,
            padding: "2rem",
            borderTop: BORDER,
            borderLeft: BORDER,
            borderRight: BORDER,
            borderBottom: BORDER,
          }}
        >
          <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>Start building AI interfaces today</h2>
          <button
            style={{
              background: "#fff",
              color: "#000",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
