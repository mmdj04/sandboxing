import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getDocBySlug, getAllDocs } from "@/lib/docs";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

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

  return (
    <article className="docs-article">
      <div className="docs-breadcrumb">
        <Link href="/docs">Docs</Link>
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

      <nav className="docs-pagination">
        {prevDoc ? (
          <Link
            href={`/docs/${prevDoc.slug.join("/")}`}
            className="docs-pagination-link prev"
          >
            ← {prevDoc.title}
          </Link>
        ) : (
          <span />
        )}
        {nextDoc ? (
          <Link
            href={`/docs/${nextDoc.slug.join("/")}`}
            className="docs-pagination-link next"
          >
            {nextDoc.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
