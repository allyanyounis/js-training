import { notFound } from "next/navigation";
import { getUserById, getPosts } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default async function AuthorPage({ params }: Props) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const [author, posts]: [
    { id: number; name: string; email: string } | null,
    Post[]
  ] = await Promise.all([
    getUserById(id),
    getPosts(),
  ]);

  if (!author) {
    notFound();
  }

  const authorPosts = posts.filter(
    (post) => post.userId === author.id
  );

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold">{author.name}</h1>

      <p className="mt-2 text-gray-500">{author.email}</p>

      <h2 className="mt-8 text-2xl font-semibold">
        Posts by {author.name}
      </h2>

      <div className="mt-4 space-y-4">
        {authorPosts.map((post) => (
          <article key={post.id} className="rounded-lg border p-5">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="mt-2">{post.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
