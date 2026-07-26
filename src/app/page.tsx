"use client";

import { CodeBlock } from "./components/CodeBlock";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Tesseract } from "./components/Tesseract";
import "./bento.css";

const BORDER = "1px solid hsl(0, 0%, 25%)";
const CARD_BG = "hsl(0, 0%, 9%)";

const rows = [
  {
    columns: "1fr 1fr",
    cells: [
      { title: "The Best Open-Source Documentation", desc: "World-class documentation built by the community, for the community. Every guide, tutorial, and reference crafted to be clear, complete, and always up to date." },
      { type: "code", code: "$ npx open-source-ai infra init\n✔ Setting up project.\n✔ Installing components.\n✔ Created 3 files:\n  - components/ui/button.tsx\n  - components/ai/chat.tsx\n  - docs/getting-started.md\n✔ Ready to build!" },
    ],
  },
  {
    columns: "1fr 2fr 1fr",
    cells: [
      { title: "Universal Components", desc: "Every UI component you need, open-source and free. Buttons, forms, modals, navigation, and more — all production-ready." },
      { title: "AI-Native by Default", desc: "Built from the ground up for AI agents. Streaming, tool use, memory, and reasoning capabilities baked into every layer of the stack." },
      { title: "Fully Composable", desc: "Mix and match components like Lego blocks. Every piece works together seamlessly, so you can build exactly what you envision." },
    ],
  },
  {
    columns: "1fr 2fr",
    cells: [
      { title: "Community Driven", desc: "Built by thousands of contributors worldwide. Every decision is transparent, every contribution matters." },
      { title: "One Ecosystem, Everything Included", desc: "UI components, AI agents, documentation, design systems, deployment tools, databases — everything you need in a single open-source ecosystem. No vendor lock-in, ever." },
    ],
  },
  {
    columns: "1fr 1fr 1fr",
    cells: [
      { title: "Lightning Fast", desc: "Optimized for speed at every level. From build tools to runtime, everything is designed for maximum performance." },
      { title: "Type Safe End-to-End", desc: "Full TypeScript support from database to UI. Catch errors before they happen with complete type safety across your entire stack." },
      { title: "Production Ready", desc: "Battle-tested by thousands of teams. Deploy with confidence knowing every component is reliable and secure." },
    ],
  },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "hsl(0, 0%, 9%)", minHeight: "100vh" }}>
      <Header />
      <div style={{ paddingTop: "3.5rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 1rem 4rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "400px", margin: "0 auto", padding: "24px" }}>
          <Tesseract />
        </div>
        <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#fff", marginTop: "2rem", position: "relative", zIndex: 10 }}>
          Open-Source Agentic Infrastructure
        </h1>
        <p style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)", color: "#999", maxWidth: "600px", position: "relative", zIndex: 10 }}>
          The largest open-source project ever created. Everything you need — components, AI agents, documentation, and tools — all open-source, all in one place.
        </p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1rem 4rem" }}>
        <div className="bento-row first-row">
          {[
            { title: "Best Documentation in the World", desc: "Community-built, always up-to-date documentation that sets the standard for open-source projects everywhere." },
            { title: "Best Component System", desc: "A complete, production-ready component library. Like shadcn and ai-elements, but bigger, better, and fully open-source." },
            { title: "Built for AI Agents", desc: "First-class support for AI workflows. Streaming, tool use, memory, and autonomous coding — all built-in." },
          ].map((item, i) => (
            <div key={i} className="bento-cell">
              <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>{item.title}</h3>
              <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`bento-row bento-grid-${row.columns === "1fr 1fr 1fr" ? "3" : row.columns === "2fr 1fr" ? "2" : row.columns === "1fr 2fr 1fr" ? "2-1" : "1-2"}`}
          >
            {row.cells.map((cell, cellIdx) => (
              <div key={cellIdx} className="bento-cell">
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
        <div className="bento-cta">
          <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>Join the future of open-source</h2>
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
      <Footer />
    </div>
  );
}
