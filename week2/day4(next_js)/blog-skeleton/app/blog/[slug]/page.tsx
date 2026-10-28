import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import { notFound } from "next/navigation";
import LikeButton from "@/components/LikeButton";

export const instant = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-900">
      <article className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm text-gray-500">
          {post.date}
        </p>

        <h1 className="mb-6 text-4xl font-bold">
          {post.title}
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          {post.excerpt}
        </p>

        <p className="mb-8 leading-8">
          {post.content}
        </p>

        <div className="mt-6">
          <LikeButton postSlug={post.slug} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
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
    </main>
  );
}
