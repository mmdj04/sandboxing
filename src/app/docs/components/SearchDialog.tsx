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
import { FileText, Search, ArrowRight } from "lucide-react";

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
      <DialogContent className="search-dialog sm:max-w-[550px] p-0 border-0">
        <DialogHeader className="p-4 pb-3 border-b border-white/10">
          <DialogTitle className="flex items-center gap-2 text-[15px] font-medium text-white">
            <Search className="w-4 h-4 text-gray-400" />
            Search Documentation
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-3 pt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-[hsl(0,0%,12%)] border border-[hsl(0,0%,20%)] rounded-lg text-white placeholder-gray-500 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[hsl(0,0%,30%)] transition-colors"
            />
          </div>
        </div>

        <div className="search-results max-h-[360px] overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              No results found for &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="pb-2">
              {searchResults.map((item, index) => {
                const href = `/docs/${item.slug.join("/")}`;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => onOpenChange(false)}
                    className={`search-result flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-all ${
                      index === selectedIndex
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-0.5">
                        {item.description || sectionLabels[item.section] || item.section}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 text-[11px] text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 font-mono text-[10px]">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 font-mono text-[10px]">↵</kbd>
              <span>Open</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 font-mono text-[10px]">esc</kbd>
            <span>Close</span>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
