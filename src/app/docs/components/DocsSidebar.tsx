"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Section {
  title: string;
  items: { title: string; href: string }[];
}

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
  };

  return (
    <>
      <button
        className="docs-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? "Close" : "Menu"}
      </button>
      <aside className={`docs-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="docs-sidebar-header">
          <Link href="/" className="docs-logo">
            Open-Source AI
          </Link>
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
