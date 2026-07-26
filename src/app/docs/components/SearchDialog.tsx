"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileText, Search, ArrowRight, Hash } from "lucide-react";

interface DocItem {
  title: string;
  slug: string[];
  section: string;
  description?: string;
  content?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allDocs: DocItem[];
}

const sectionLabels: Record<string, string> = {
  "getting-started": "Getting Started",
  components: "Core",
  guides: "Guides",
  api: "API Reference",
  examples: "Examples",
};

export function SearchDialog({ open, onOpenChange, allDocs }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return allDocs.slice(0, 10);
    return fuse.search(searchQuery).map((r) => r.item);
  }, [searchQuery, fuse, allDocs]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && searchResults[selectedIndex]) {
      const href = `/docs/${searchResults[selectedIndex].slug.join("/")}`;
      window.location.href = href;
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="search-dialog sm:max-w-[550px] p-0 gap-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center gap-2 text-base">
            <Search className="w-5 h-5 text-muted-foreground" />
            Search Documentation
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-2">
          <Input
            ref={inputRef}
            placeholder="Search docs... (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full"
          />
        </div>

        <div className="search-results max-h-[400px] overflow-y-auto px-2 pb-4">
          {searchResults.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No results found for &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map((item, index) => {
                const href = `/docs/${item.slug.join("/")}`;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => onOpenChange(false)}
                    className={`search-result flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {item.description || sectionLabels[item.section] || item.section}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd>
              Open
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">esc</kbd>
            Close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
