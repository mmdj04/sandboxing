import type { Metadata } from "next";
import { DocsSidebar } from "./components/DocsSidebar";
import { getDocsBySection, getAllDocsWithContent, AVAILABLE_VERSIONS, type Version } from "@/lib/docs";
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
  const allDocs = getAllDocsWithContent();

  return (
    <div className="docs-layout">
      <DocsSidebar sections={sections} allDocs={allDocs} versions={AVAILABLE_VERSIONS} />
      <main className="docs-main">
        <div className="docs-content">{children}</div>
      </main>
    </div>
  );
}
