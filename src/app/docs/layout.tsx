import type { Metadata } from "next";
import { DocsSidebar } from "./components/DocsSidebar";
import { getDocsBySection } from "@/lib/docs";
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
  const sections = getDocsBySection();

  return (
    <div className="docs-layout">
      <DocsSidebar sections={sections} />
      <main className="docs-main">
        <div className="docs-content">{children}</div>
      </main>
    </div>
  );
}
