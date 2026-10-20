
import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-900">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">
          Our Blog
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

              <p className="mb-3 text-gray-700">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
