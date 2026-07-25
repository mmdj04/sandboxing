import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getDocBySlug, getAllDocs } from "@/lib/docs";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return { title: "Not Found" };
  }

  return {
    title: `${doc.title} | Documentation`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex(
    (d) => d.slug.join("/") === doc.slug.join("/")
  );
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  const sectionLabels: Record<string, string> = {
    "getting-started": "Getting Started",
    components: "Core",
    guides: "Guides",
    api: "API Reference",
    examples: "Examples",
  };

  return (
    <article className="docs-article">
      <div className="docs-breadcrumb">
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <Badge variant="secondary">{sectionLabels[doc.section] || doc.section}</Badge>
        <span>/</span>
        <span>{doc.title}</span>
      </div>

      <MDXRemote
        source={doc.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight, rehypeSlug],
          },
        }}
      />

      <Separator className="my-8" />

      <nav className="flex justify-between items-center gap-4">
        <div className="flex-1">
          {prevDoc ? (
            <PaginationPrevious href={`/docs/${prevDoc.slug.join("/")}`} text={prevDoc.title} />
          ) : null}
        </div>
        <div className="flex-1 text-right">
          {nextDoc ? (
            <PaginationNext href={`/docs/${nextDoc.slug.join("/")}`} text={nextDoc.title} />
          ) : null}
        </div>
      </nav>
    </article>
  );
}
