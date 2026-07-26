"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import { SearchDialog } from "./SearchDialog";

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
  const [searchOpen, setSearchOpen] = useState(false);

  const sectionLabels: Record<string, string> = {
    "getting-started": "Getting Started",
    components: "Core",
    guides: "Guides",
    api: "API Reference",
    examples: "Examples",
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search docs... (⌘K)"
              className="pl-9 cursor-pointer"
              readOnly
              onClick={() => setSearchOpen(true)}
              onFocus={() => setSearchOpen(true)}
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
      </aside>

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        allDocs={allDocs}
      />
    </>
  );
}
