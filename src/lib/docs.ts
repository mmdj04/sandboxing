import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "content/docs");
const versionsDirectory = path.join(process.cwd(), "content/versions");

export const AVAILABLE_VERSIONS = ["v1.0", "v2.0", "latest"] as const;
export type Version = (typeof AVAILABLE_VERSIONS)[number];

export interface DocMeta {
  title: string;
  description: string;
  order: number;
  slug: string[];
  section: string;
  version?: Version;
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

export function getAllDocs(version: Version = "latest"): DocMeta[] {
  const files: DocMeta[] = [];
  const baseDir = version === "latest" ? docsDirectory : path.join(versionsDirectory, version);

  if (!fs.existsSync(baseDir)) {
    return getAllDocs("latest");
  }

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
          version,
        });
      }
    }
  }

  readDir(baseDir);

  return files.sort((a, b) => a.order - b.order);
}

export function getAllDocsWithContent(version: Version = "latest"): DocSearchItem[] {
  const files: DocSearchItem[] = [];
  const baseDir = version === "latest" ? docsDirectory : path.join(versionsDirectory, version);

  if (!fs.existsSync(baseDir)) {
    return getAllDocsWithContent("latest");
  }

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
          version,
        });
      }
    }
  }

  readDir(baseDir);

  return files.sort((a, b) => a.order - b.order);
}

export function getDocBySlug(slug: string[], version: Version = "latest"): DocFile | null {
  const baseDir = version === "latest" ? docsDirectory : path.join(versionsDirectory, version);
  const filePath = path.join(baseDir, ...slug) + ".mdx";
  const indexPath = path.join(baseDir, ...slug, "index.mdx");

  let actualPath = filePath;
  if (!fs.existsSync(filePath) && fs.existsSync(indexPath)) {
    actualPath = indexPath;
  }

  if (!fs.existsSync(actualPath)) {
    if (version !== "latest") {
      return getDocBySlug(slug, "latest");
    }
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
    version,
  };
}

export function getDocsBySection(version: Version = "latest"): Record<string, DocMeta[]> {
  const docs = getAllDocs(version);
  const sections: Record<string, DocMeta[]> = {};

  for (const doc of docs) {
    if (!sections[doc.section]) {
      sections[doc.section] = [];
    }
    sections[doc.section].push(doc);
  }

  return sections;
}

export function searchDocs(query: string, version: Version = "latest"): DocMeta[] {
  const docs = getAllDocs(version);
  const lowerQuery = query.toLowerCase();

  return docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.description.toLowerCase().includes(lowerQuery)
  );
}
