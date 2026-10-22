
import Link from "next/link";
import { Suspense } from "react";
import { getPosts, getUsers } from "@/lib/api";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
};

async function BlogContent() {
  const [posts, users]: [Post[], User[]] = await Promise.all([
    getPosts(),
    getUsers(),
  ]);

  return (
    <div className="space-y-6">
      {posts.slice(0, 10).map((post) => {
        const author = users.find(
          (user) => user.id === post.userId
        );

        return (
          <article
            key={post.id}
            className="rounded-lg border p-5"
          >
            <h2 className="text-xl font-semibold">
              <Link
                href={`/blog/${post.id}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              By{" "}
              {author ? (
                <Link
                  href={`/authors/${author.id}`}
                  className="hover:underline"
                >
                  {author.name}
                </Link>
              ) : (
                "Unknown author"
              )}
            </p>

            <p className="mt-3">{post.body}</p>
          </article>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        DevNotes Blog
      </h1>

      <Suspense
        fallback={<p className="animate-pulse">Loading posts...</p>}
      >
        <BlogContent />
      </Suspense>
    </main>
  );
}
