"use client";

import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid hsl(0, 0%, 18%)",
        position: "sticky",
        top: 0,
        background: "hsl(0, 0%, 9%)",
        zIndex: 100,
      }}
    >
      <a
        href="/"
        style={{
          color: "#fff",
          fontSize: "1.25rem",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Sandboxing
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          style={{
            background: "#fff",
            color: "#000",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Inscreva-se
        </button>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid hsl(0, 0%, 18%)",
            borderRadius: "6px",
            padding: "0.5rem",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "hsl(0, 0%, 9%)",
            borderBottom: "1px solid hsl(0, 0%, 18%)",
            padding: "1rem 2rem",
            display: "none",
          }}
        >
          <a href="/docs" style={{ color: "#ccc", display: "block", padding: "0.5rem 0", textDecoration: "none" }}>Docs</a>
          <a href="/components" style={{ color: "#ccc", display: "block", padding: "0.5rem 0", textDecoration: "none" }}>Components</a>
          <a href="/examples" style={{ color: "#ccc", display: "block", padding: "0.5rem 0", textDecoration: "none" }}>Examples</a>
        </div>
      )}
    </header>
  );
}
