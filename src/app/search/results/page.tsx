"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "../../components/Header";

interface SearchResult {
  title: string;
  description: string;
  section: string;
  slug: string[];
  url: string;
  score: number;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (initialQuery) {
      doSearch(initialQuery);
    }
  }, [initialQuery, doSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/results?q=${encodeURIComponent(query)}`);
      doSearch(query);
    }
  };

  const sectionLabels: Record<string, string> = {
    "getting-started": "Getting Started",
    components: "Components",
    guides: "Guides",
    examples: "Examples",
    api: "API Reference",
  };

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "hsl(0, 0%, 9%)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Compact Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid hsl(0, 0%, 20%)",
        background: "hsl(0, 0%, 9%)",
        gap: "1.5rem",
        flexWrap: "wrap",
      }}>
        {/* Logo */}
        <a href="/search" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 400 }}>
            <span style={{ color: "#4285f4" }}>O</span>
            <span style={{ color: "#ea4335" }}>S</span>
            <span style={{ color: "#fbbc05" }}>A</span>
            <span style={{ color: "#34a853" }}>I</span>
          </span>
        </a>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: "600px", minWidth: "200px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            background: "hsl(0, 0%, 12%)",
            border: "1px solid hsl(0, 0%, 30%)",
            borderRadius: "24px",
            padding: "0 0.75rem",
            height: "42px",
          }}>
            <svg style={{ width: "18px", height: "18px", color: "#999", marginRight: "10px", flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: "15px",
              }}
            />
          </div>
        </form>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: "1rem", fontSize: "13px", color: "#999" }}>
          <a href="/docs" style={{ color: "#8ab4f8", textDecoration: "none" }}>Docs</a>
          <a href="/" style={{ color: "#8ab4f8", textDecoration: "none" }}>Home</a>
        </nav>
      </header>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid hsl(0, 0%, 20%)", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", gap: "1.5rem", maxWidth: "600px", marginLeft: "88px" }}>
          <button style={{
            background: "none",
            border: "none",
            borderBottom: "3px solid #8ab4f8",
            color: "#8ab4f8",
            padding: "0.75rem 0",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}>
            All
          </button>
          <button style={{
            background: "none",
            border: "none",
            borderBottom: "3px solid transparent",
            color: "#999",
            padding: "0.75rem 0",
            fontSize: "14px",
            cursor: "pointer",
          }}>
            Docs
          </button>
          <button style={{
            background: "none",
            border: "none",
            borderBottom: "3px solid transparent",
            color: "#999",
            padding: "0.75rem 0",
            fontSize: "14px",
            cursor: "pointer",
          }}>
            Guides
          </button>
        </div>
      </div>

      {/* Results */}
      <main style={{ flex: 1, padding: "1rem 1.5rem", maxWidth: "800px", width: "100%" }}>
        {searched && !loading && (
          <p style={{ color: "#999", fontSize: "13px", marginBottom: "1.5rem", marginLeft: "88px" }}>
            About {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{initialQuery}&quot;
          </p>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#999" }}>
            Searching...
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
              No results found for &quot;{initialQuery}&quot;
            </p>
            <p style={{ color: "#999", fontSize: "0.875rem" }}>
              Try different keywords or check the{" "}
              <a href="/docs" style={{ color: "#8ab4f8" }}>documentation</a>.
            </p>
          </div>
        )}

        {!loading && !searched && (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ color: "#999", fontSize: "0.875rem" }}>
              Search across agents, components, guides, and more.
            </p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {results.map((result, i) => (
            <div key={i} style={{ padding: "1.25rem 0", borderBottom: "1px solid hsl(0, 0%, 15%)" }}>
              {/* Breadcrumb / URL */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                <div style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "hsl(0, 0%, 20%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "#fff",
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {result.section.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span style={{ color: "#bdc1c6", fontSize: "13px" }}>
                    {sectionLabels[result.section] || result.section}
                  </span>
                  <span style={{ color: "#666", fontSize: "13px", margin: "0 0.25rem" }}>&rsaquo;</span>
                  <span style={{ color: "#bdc1c6", fontSize: "13px" }}>
                    {result.url}
                  </span>
                </div>
              </div>

              {/* Title */}
              <a
                href={result.url}
                style={{
                  color: "#8ab4f8",
                  fontSize: "1.125rem",
                  textDecoration: "none",
                  lineHeight: 1.3,
                  display: "block",
                  marginBottom: "0.375rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                {result.title}
              </a>

              {/* Description */}
              <p style={{ color: "#bdc1c6", fontSize: "0.875rem", lineHeight: 1.5, margin: 0 }}>
                {result.description.length > 160
                  ? result.description.slice(0, 160) + "..."
                  : result.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid hsl(0, 0%, 20%)",
        padding: "1rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "13px",
        color: "#999",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}>
        <span>Open-Source Agentic Infrastructure</span>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="/docs" style={{ color: "#8ab4f8", textDecoration: "none" }}>Docs</a>
          <a href="https://github.com/mmdj04/sandboxing" style={{ color: "#8ab4f8", textDecoration: "none" }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "hsl(0, 0%, 9%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
        Loading...
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
