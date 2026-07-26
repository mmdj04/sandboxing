"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search, FileText } from "lucide-react";

interface DocItem {
  title: string;
  slug: string[];
  section: string;
  description?: string;
  content?: string;
}

interface DocsSidebarProps {
  sections: Record<string, DocItem[]>;
  allDocs: DocItem[];
}

export function DocsSidebar({ sections, allDocs }: DocsSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DocItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => {
    return new Fuse(allDocs, {
      keys: [
        { name: "title", weight: 2 },
        { name: "description", weight: 1 },
        { name: "content", weight: 0.5 },
      ],
      threshold: 0.3,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }, [allDocs]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = fuse.search(searchQuery).map((r) => r.item);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, fuse]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sectionLabels: Record<string, string> = {
    "getting-started": "Getting Started",
    components: "Core",
    guides: "Guides",
    api: "API Reference",
    examples: "Examples",
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={`docs-mobile-toggle flex items-center justify-center ${mobileOpen ? "hidden" : ""}`}
        onClick={() => setMobileOpen(true)}
      >
        Menu
      </Button>
      <div
        className={`docs-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <aside className={`docs-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="docs-sidebar-header">
          <Link href="/" className="docs-logo">
            AI Documentation
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="docs-sidebar-close h-8 w-8"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="docs-search">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search docs... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isSearchOpen && searchResults.length > 0 && (
          <div className="docs-search-results">
            <div className="docs-search-results-header">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
            </div>
            <ul className="docs-links">
              {searchResults.map((item) => {
                const href = `/docs/${item.slug.join("/")}`;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`docs-link ${pathname === href ? "active" : ""}`}
                      onClick={() => {
                        setMobileOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <FileText className="inline-block w-4 h-4 mr-2 opacity-50" />
                      {item.title}
                      <span className="docs-search-section">
                        {sectionLabels[item.section] || item.section}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {!isSearchOpen && (
          <nav className="docs-nav">
            {Object.entries(sections).map(([sectionKey, items]) => (
              <div key={sectionKey} className="docs-section">
                <h3 className="docs-section-title">
                  {sectionLabels[sectionKey] || sectionKey}
                </h3>
                <ul className="docs-links">
                  {items.map((item) => {
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
        )}
      </aside>
    </>
  );
}
