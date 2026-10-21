
"use client";

import { useEffect, useState } from "react";

export default function LikeButton({
  postSlug,
}: {
  postSlug: string;
}) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const savedLike = localStorage.getItem(`liked-${postSlug}`);
    setLiked(savedLike === "true");
  }, [postSlug]);

  function handleLike() {
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem(`liked-${postSlug}`, String(newLiked));
  }

  return (
    <button
      onClick={handleLike}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      {liked ? "Liked" : "Like"}
    </button>
  );
}
