export default function DocumentationGuidePage() {
  return (
    <>
      <h1>Documentation</h1>
      <p>Our documentation framework helps you create beautiful, searchable documentation that developers actually want to use.</p>

      <h2>Features</h2>
      <ul>
        <li><strong>MDX Support</strong> — Write docs in Markdown with JSX</li>
        <li><strong>Full-Text Search</strong> — Instant search across all docs</li>
        <li><strong>Versioning</strong> — Multiple version support</li>
        <li><strong>i18n</strong> — Multi-language documentation</li>
        <li><strong>Dark Mode</strong> — Automatic theme switching</li>
      </ul>

      <h2>Quick Start</h2>
      <pre><code>{`npx open-source-ai docs init`}</code></pre>

      <h2>Structure</h2>
      <pre><code>{`docs/
├── content/
│   ├── getting-started/
│   │   ├── introduction.mdx
│   │   └── installation.mdx
│   ├── components/
│   │   └── index.mdx
│   └── guides/
│       └── ai-agents.mdx
└── open-source.config.js`}</code></pre>

      <h2>Writing Docs</h2>
      <p>Create MDX files with frontmatter:</p>
      <pre><code>{`---
title: My Page
description: Page description
order: 1
---

# My Page

Content goes here with **Markdown** and JSX support.

import { Callout } from "@open-source-ai/docs";

<Callout type="info">
  This is an informational callout.
</Callout>`}</code></pre>

      <h2>Search</h2>
      <p>Full-text search is built-in. Users can search across all documentation pages instantly.</p>

      <h2>Versioning</h2>
      <pre><code>{`// open-source.config.js
module.exports = {
  docs: {
    versions: ["v1.0", "v2.0", "latest"],
    defaultVersion: "latest",
  },
};`}</code></pre>

      <h2>Deployment</h2>
      <p>Deploy your documentation anywhere:</p>
      <ul>
        <li><strong>Vercel</strong> — Zero-config deployment</li>
        <li><strong>Netlify</strong> — Automatic builds</li>
        <li><strong>GitHub Pages</strong> — Free hosting</li>
        <li><strong>Self-Hosted</strong> — Any static host</li>
      </ul>

      <h2>Customization</h2>
      <p>Customize the look and feel:</p>
      <pre><code>{`:root {
  --docs-primary: #3b82f6;
  --docs-sidebar-width: 280px;
  --docs-content-max-width: 800px;
}`}</code></pre>
    </>
  );
}
