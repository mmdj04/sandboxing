"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Core",
    items: [
      { title: "Components", href: "/docs/components" },
      { title: "AI Agents", href: "/docs/ai-agents" },
      { title: "Documentation", href: "/docs/documentation-guide" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Theming", href: "/docs/theming" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <nav className="docs-nav">
          {sections.map((section) => (
            <div key={section.title} className="docs-section">
              <h3 className="docs-section-title">{section.title}</h3>
              <ul className="docs-links">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`docs-link ${pathname === item.href ? "active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
