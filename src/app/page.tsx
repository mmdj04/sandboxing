const BORDER = "1px solid hsl(0, 0%, 18%)";
const CARD_BG = "hsl(0, 0%, 13%)";

const rows = [
  {
    columns: "1fr 1fr 1fr",
    cells: [
      { title: "Fully Composable", desc: "Every component is a building block. Combine small, focused pieces to create exactly the UI you need." },
      { title: "AI SDK Integration", desc: "Deep integration with the AI SDK. Streaming, status states and type safety built-in." },
      { title: "shadcn/ui Foundation", desc: "Built on shadcn/ui conventions. Your existing theme and setup apply automatically." },
    ],
  },
  {
    columns: "2fr 1fr",
    cells: [
      { title: "Lightning Fast", desc: "Optimized for speed with instant completions, real-time collaboration, and sub-millisecond response times across your entire workflow." },
      { title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption and role-based access control." },
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Welcome to Sandboxing
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#999" }}>
          Get started by editing{" "}
          <code style={{ background: "hsl(0, 0%, 18%)", padding: "0.25rem 0.5rem", borderRadius: "4px", color: "#ccc" }}>
            src/app/page.tsx
          </code>
        </p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem 4rem" }}>
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "grid",
              gridTemplateColumns: row.columns,
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
                  ...(cellIdx === row.cells.length - 1 ? { borderRight: BORDER } : {}),
                  ...(rowIdx === rows.length - 1 ? { borderBottom: BORDER } : {}),
                }}
              >
                <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>{cell.title}</h3>
                <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>{cell.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
