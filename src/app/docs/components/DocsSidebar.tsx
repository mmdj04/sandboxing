"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DocsSidebarProps {
  sections: Record<string, { title: string; slug: string[] }[]>;
}

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sectionLabels: Record<string, string> = {
    "getting-started": "Getting Started",
    components: "Core",
    guides: "Guides",
    api: "API Reference",
    examples: "Examples",
  };

  return (
    <>
      <button
        className={`docs-mobile-toggle ${mobileOpen ? "hidden" : ""}`}
        onClick={() => setMobileOpen(true)}
      >
        Menu
      </button>
      <div
        className={`docs-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <aside className={`docs-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="docs-sidebar-header">
          <Link href="/" className="docs-logo">
            Open-Source AI
          </Link>
          <button
            className="docs-sidebar-close"
            onClick={() => setMobileOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="docs-search">
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="docs-search-input"
          />
        </div>

        <nav className="docs-nav">
          {Object.entries(sections).map(([sectionKey, items]) => (
            <div key={sectionKey} className="docs-section">
              <h3 className="docs-section-title">
                {sectionLabels[sectionKey] || sectionKey}
              </h3>
              <ul className="docs-links">
                {items
                  .filter(
                    (item) =>
                      !searchQuery ||
                      item.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => {
                    const href = `/docs/${item.slug.join("/")}`;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`docs-link ${pathname === href ? "active" : ""}`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
