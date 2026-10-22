export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl p-8 animate-pulse">
      {/* Author name placeholder */}
      <div className="h-8 w-1/3 rounded bg-gray-200" />

      {/* Author email placeholder */}
      <div className="mt-2 h-4 w-1/4 rounded bg-gray-200" />

      {/* Heading placeholder */}
      <div className="mt-8 h-6 w-1/4 rounded bg-gray-200" />

      {/* Posts placeholder */}
      <div className="mt-4 space-y-4">
        {[1, 2, 3].map((item) => (
          <article key={item} className="rounded-lg border p-5">
            <div className="h-6 w-2/3 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
          </article>
        ))}
      </div>
    </main>
  );
}
