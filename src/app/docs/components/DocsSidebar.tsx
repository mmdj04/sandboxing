"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Search } from "lucide-react";

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
            Open-Source AI
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="docs-search">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
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
