import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "content/docs");

export interface DocMeta {
  title: string;
  description: string;
  order: number;
  slug: string[];
  section: string;
}

export interface DocFile extends DocMeta {
  content: string;
}

export interface DocSearchItem extends DocMeta {
  content?: string;
}

function getSectionFromPath(filePath: string): string {
  const relativePath = path.relative(docsDirectory, filePath);
  const parts = relativePath.split(path.sep);
  if (parts.length > 1) {
    return parts[0];
  }
  return "getting-started";
}

function getSlugFromPath(filePath: string): string[] {
  const relativePath = path.relative(docsDirectory, filePath);
  const withoutExt = relativePath.replace(/\.mdx?$/, "");
  return withoutExt.split(path.sep).filter(Boolean);
}

export function getAllDocs(): DocMeta[] {
  const files: DocMeta[] = [];

  function readDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        readDir(fullPath);
      } else if (entry.name.endsWith(".mdx")) {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        files.push({
          title: data.title || entry.name.replace(/\.mdx?$/, ""),
          description: data.description || "",
          order: data.order || 999,
          slug: getSlugFromPath(fullPath),
          section: getSectionFromPath(fullPath),
        });
      }
    }
  }

  readDir(docsDirectory);

  return files.sort((a, b) => a.order - b.order);
}

export function getAllDocsWithContent(): DocSearchItem[] {
  const files: DocSearchItem[] = [];

  function readDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        readDir(fullPath);
      } else if (entry.name.endsWith(".mdx")) {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        files.push({
          title: data.title || entry.name.replace(/\.mdx?$/, ""),
          description: data.description || "",
          order: data.order || 999,
          slug: getSlugFromPath(fullPath),
          section: getSectionFromPath(fullPath),
          content: content.slice(0, 500),
        });
      }
    }
  }

  readDir(docsDirectory);

  return files.sort((a, b) => a.order - b.order);
}

export function getDocBySlug(slug: string[]): DocFile | null {
  const filePath = path.join(docsDirectory, ...slug) + ".mdx";
  const indexPath = path.join(docsDirectory, ...slug, "index.mdx");

  let actualPath = filePath;
  if (!fs.existsSync(filePath) && fs.existsSync(indexPath)) {
    actualPath = indexPath;
  }

  if (!fs.existsSync(actualPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(actualPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title || "",
    description: data.description || "",
    order: data.order || 999,
    slug: getSlugFromPath(actualPath),
    section: getSectionFromPath(actualPath),
    content,
  };
}

export function getDocsBySection(): Record<string, DocMeta[]> {
  const docs = getAllDocs();
  const sections: Record<string, DocMeta[]> = {};

  for (const doc of docs) {
    if (!sections[doc.section]) {
      sections[doc.section] = [];
    }
    sections[doc.section].push(doc);
  }

  return sections;
}

export function searchDocs(query: string): DocMeta[] {
  const docs = getAllDocs();
  const lowerQuery = query.toLowerCase();

  return docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.description.toLowerCase().includes(lowerQuery)
  );
}
