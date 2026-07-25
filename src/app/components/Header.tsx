"use client";

import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          borderBottom: "1px solid hsl(0, 0%, 25%)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
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
          Open-Source Agentic Infrastructure
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
            onClick={() => setMenuOpen(true)}
            style={{
              display: "none",
              background: "transparent",
              border: "1px solid hsl(0, 0%, 25%)",
              borderRadius: "6px",
              padding: "0.5rem",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "hsl(0, 0%, 9%)",
            zIndex: 200,
            padding: "1rem 2rem 2rem",
            display: "none",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: "transparent",
                border: "1px solid hsl(0, 0%, 25%)",
                borderRadius: "6px",
                padding: "0.5rem",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <a href="/docs" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, textDecoration: "none" }}>Docs</a>
            <a href="/components" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, textDecoration: "none" }}>Components</a>
            <a href="/examples" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, textDecoration: "none" }}>Examples</a>
          </nav>
        </div>
      )}
    </>
  );
}
