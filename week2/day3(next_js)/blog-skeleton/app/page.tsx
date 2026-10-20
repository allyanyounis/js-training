import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-900">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
          My Blog
        </p>

        <h1 className="mb-6 text-5xl font-bold text-gray-900">
          Ideas, Stories, and Insights
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Welcome to my blog, where I share useful ideas, lessons,
          and experiences about technology and learning.
        </p>

        <Link
          href="/blog"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Explore Articles
        </Link>
      </section>

      <section className="mx-auto mt-16 max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold">
          Latest Posts
        </h2>

        <div className="grid gap-6">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-lg border bg-white p-6"
            >
              <h3 className="mb-2 text-2xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h3>

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
