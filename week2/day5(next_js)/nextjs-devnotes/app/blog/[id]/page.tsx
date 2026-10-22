import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPostById, getUsers, getComments } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

async function CommentsSection({ postId }: { postId: string }) {
  const comments = await getComments(postId);

  return (
    <div className="mt-4 space-y-4">
      {comments.map(
        (comment: { id: number; name: string; body: string }) => (
          <article key={comment.id} className="rounded-lg border p-4">
            <h3 className="font-semibold">{comment.name}</h3>
            <p className="mt-2">{comment.body}</p>
          </article>
        )
      )}
    </div>
  );
}
 
export default async function PostPage({ params }: Props) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const users = await getUsers();

  const author = users.find(
    (user: { id: number }) => user.id === post.userId
  );

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <p className="mt-3 text-gray-500">
        By {author?.name ?? "Unknown author"}
      </p>

      <p className="mt-6">{post.body}</p>

      <h2 className="mt-8 text-2xl font-semibold">Comments</h2>

      <Suspense fallback={<p className="mt-4 animate-pulse">Loading comments...</p>}>
        <CommentsSection postId={id} />
      </Suspense>
    </main>
  );
}
