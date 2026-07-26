import { NextRequest, NextResponse } from "next/server";
import { getAllDocsWithContent } from "@/lib/docs";
import Fuse from "fuse.js";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ results: [], query: "" });
  }

  const docs = getAllDocsWithContent();

  const fuse = new Fuse(docs, {
    keys: [
      { name: "title", weight: 2 },
      { name: "description", weight: 1.5 },
      { name: "content", weight: 0.5 },
      { name: "section", weight: 0.3 },
    ],
    threshold: 0.4,
    includeMatches: true,
    minMatchCharLength: 2,
  });

  const searchResults = fuse.search(q).slice(0, 10);

  const results = searchResults.map((r) => ({
    title: r.item.title,
    description: r.item.description,
    section: r.item.section,
    slug: r.item.slug,
    url: `/docs/${r.item.slug.join("/")}`,
    score: r.score,
  }));

  return NextResponse.json({ results, query: q });
}
