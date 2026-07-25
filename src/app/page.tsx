export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Welcome Section */}
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
        <p style={{ fontSize: "1.125rem", color: "#666" }}>
          Get started by editing{" "}
          <code
            style={{
              background: "#f5f5f5",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
            }}
          >
            src/app/page.tsx
          </code>
        </p>
      </div>

      {/* Bento Grid Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem 4rem",
        }}
      >
        {/* Row 1 - 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1px",
            background: "#1a1a1a",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "1px",
          }}
        >
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Fully Composable
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Every component is a building block. Combine small, focused pieces to create exactly the UI you need.
            </p>
          </div>
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              AI SDK Integration
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Deep integration with the AI SDK. Streaming, status states and type safety built-in.
            </p>
          </div>
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              shadcn/ui Foundation
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Built on shadcn/ui conventions. Your existing theme and setup apply automatically.
            </p>
          </div>
        </div>

        {/* Row 2 - 2 columns (wide + narrow) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "1px",
            background: "#1a1a1a",
            marginBottom: "1px",
          }}
        >
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Lightning Fast
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Optimized for speed with instant completions, real-time collaboration, and sub-millisecond response times across your entire workflow.
            </p>
          </div>
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Enterprise Security
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              SOC 2 compliant with end-to-end encryption and role-based access control.
            </p>
          </div>
        </div>

        {/* Row 3 - 3 columns (narrow + wide + narrow) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            gap: "1px",
            background: "#1a1a1a",
            marginBottom: "1px",
          }}
        >
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Global Edge
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Deploy to 300+ edge locations worldwide with automatic CDN.
            </p>
          </div>
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              AI-Powered Agent
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Autonomous coding agent that understands your entire codebase. Writes, tests, and debugs code with human-level reasoning.
            </p>
          </div>
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Database
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Built-in Postgres, Redis, and KV storage with automatic scaling.
            </p>
          </div>
        </div>

        {/* Row 4 - 2 columns (narrow + wide) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "1px",
            background: "#1a1a1a",
            marginBottom: "1px",
          }}
        >
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Secrets
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Encrypted environment variables with automatic rotation.
            </p>
          </div>
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Monorepo Ready
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              First-class monorepo support with Turborepo. Intelligent caching, parallel builds, and dependency graph optimization.
            </p>
          </div>
        </div>

        {/* Row 5 - 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1px",
            background: "#1a1a1a",
            borderRadius: "0 0 16px 16px",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              CLI & API
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Full-featured CLI and REST API for complete programmatic control.
            </p>
          </div>
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Smart Previews
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Every pull request gets an instant preview deployment with unique URL.
            </p>
          </div>
          <div style={{ background: "#0d0d0d", padding: "2rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Auto Deploy
            </h3>
            <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Push to main and your app is live with automatic builds and rollback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
