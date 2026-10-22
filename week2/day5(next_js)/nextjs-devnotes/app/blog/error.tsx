
"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function BlogError({
  error,
  reset,
}: ErrorProps) {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h2 className="text-2xl font-bold">
        Something went wrong!
      </h2>

      <p className="mt-3 text-gray-500">
        We could not load the blog content.
      </p>

      <button
        onClick={() => reset()}
        className="mt-5 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
