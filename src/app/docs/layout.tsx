import type { Metadata } from "next";
import { DocsSidebar } from "./components/DocsSidebar";
import "./docs.css";

export const metadata: Metadata = {
  title: "Documentation | Open-Source Agentic Infrastructure",
  description: "The best open-source documentation in the world.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="docs-layout">
      <DocsSidebar />
      <main className="docs-main">
        <div className="docs-content">{children}</div>
      </main>
    </div>
  );
}
