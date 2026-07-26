import { getAllDocs } from "@/lib/docs";

export async function GET() {
  const docs = getAllDocs();

  let content = "# AI Documentation\n\n";
  content += "This documentation is for the Open-Source Agentic Infrastructure project.\n\n";
  content += "## Pages\n\n";

  for (const doc of docs) {
    const url = `/docs/${doc.slug.join("/")}`;
    content += `- [${doc.title}](${url}): ${doc.description}\n`;
  }

  content += "\n## API Reference\n\n";
  content += "For API documentation, visit the API Reference section.\n\n";
  content += "## Examples\n\n";
  content += "For code examples, visit the Examples section.\n";

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
