import Link from "next/link";
import { getAllDocs } from "@/lib/docs";
import "./docs.css";

export const metadata = {
  title: "Documentation | Open-Source Agentic Infrastructure",
  description: "The best open-source documentation in the world.",
};

export default function DocsPage() {
  const docs = getAllDocs();

  return (
    <article className="docs-article">
      <h1>Documentation</h1>
      <p>
        Welcome to the <strong>Open-Source Agentic Infrastructure</strong> documentation. Everything you need to build with our open-source ecosystem.
      </p>

      <h2>Getting Started</h2>
      <p>New to Open-Source AI? Start here.</p>
      <ul>
        {docs
          .filter((d) => d.section === "getting-started")
          .map((doc) => (
            <li key={doc.slug.join("/")}>
              <Link href={`/docs/${doc.slug.join("/")}`}>{doc.title}</Link> — {doc.description}
            </li>
          ))}
      </ul>

      <h2>Core</h2>
      <p>Learn about our core offerings.</p>
      <ul>
        {docs
          .filter((d) => d.section === "components")
          .map((doc) => (
            <li key={doc.slug.join("/")}>
              <Link href={`/docs/${doc.slug.join("/")}`}>{doc.title}</Link> — {doc.description}
            </li>
          ))}
      </ul>

      <h2>Guides</h2>
      <p>In-depth guides and tutorials.</p>
      <ul>
        {docs
          .filter((d) => d.section === "guides")
          .map((doc) => (
            <li key={doc.slug.join("/")}>
              <Link href={`/docs/${doc.slug.join("/")}`}>{doc.title}</Link> — {doc.description}
            </li>
          ))}
      </ul>
    </article>
  );
}
