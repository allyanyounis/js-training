import Link from "next/link";
import { getPostsByTag, getAllPosts } from "../../../lib/posts";
import { notFound } from "next/navigation";

export const instant = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  return tags.map((tag) => ({
    tag,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-900">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">
          Posts tagged: {tag}
        </h1>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-lg border bg-white p-6"
            >
              <h2 className="mb-2 text-2xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mb-2 text-sm text-gray-500">
                {post.date}
              </p>

              <p className="text-gray-600">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
