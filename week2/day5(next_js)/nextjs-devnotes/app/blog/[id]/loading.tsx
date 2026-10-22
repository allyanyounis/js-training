
export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl p-8 animate-pulse">
      {/* Post title placeholder */}
      <div className="h-8 w-3/4 rounded bg-gray-200" />

      {/* Author placeholder */}
      <div className="mt-4 h-4 w-1/3 rounded bg-gray-200" />

      {/* Post body placeholders */}
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
      </div>

      {/* Comments placeholder */}
      <div className="mt-10 h-6 w-1/4 rounded bg-gray-200" />

      <div className="mt-4 space-y-4">
        <div className="h-20 rounded bg-gray-200" />
        <div className="h-20 rounded bg-gray-200" />
      </div>
    </main>
  );
}
