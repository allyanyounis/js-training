
export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        DevNotes Blog
      </h1>

      <div className="animate-pulse space-y-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <article key={item} className="rounded-lg border p-5">
            <div className="h-6 w-3/4 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
            <div className="mt-4 h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />
          </article>
        ))}
      </div>
    </main>
  );
}
