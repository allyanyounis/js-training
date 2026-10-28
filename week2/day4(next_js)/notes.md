# Next.js — Server and Client Components

## 1. Server Components

A **Server Component** runs on the server to render UI. In the Next.js App Router, components are Server Components by default.

### Example: `app/blog/page.tsx`

```tsx
import { getAllPosts } from "../../lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <h1>Our Blog</h1>

      {posts.map((post) => (
        <article key={post.slug}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </main>
  );
}
```

**Explanation:**
- `getAllPosts()` retrieves the blog posts.
- `.map()` renders each post.
- This component does not require browser interaction, so it can remain a Server Component.

## 2. Client Components

A **Client Component** supports interactive behavior, such as React state, event handlers, and browser APIs.

### Example: `LikeButton.tsx`

```tsx
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "Liked" : "Like"}
    </button>
  );
}
```

**Explanation:**
- `"use client"` declares the Client Component boundary.
- `useState` tracks whether the button is liked.
- `onClick` responds when the user clicks the button.
- `setLiked(!liked)` toggles the state.
- The button text updates when the state changes.

## 3. Server Components vs Client Components

| Server Component | Client Component |
|---|---|
| Default in the App Router | Uses `"use client"` at its entry point |
| Can access server-side resources | Can use browser APIs such as `localStorage` |
| Cannot use `useState` or event handlers directly | Can use state and event handlers |
| Suitable for displaying data and page content | Suitable for interactive features |
| Does not add its own component JavaScript to the client bundle | Its code and dependencies can contribute to the client bundle |

## 4. What Does `"use client"` Do?

The `"use client"` directive marks a file as an entry point to the Client Component module graph.

- It enables client-side React features such as state and event handlers.
- Components imported into that client boundary become part of the client-side module graph.
- It does not need to be added to every component.
- Keeping the client boundary small helps limit the JavaScript sent to the browser.

## 5. Composition Patterns

A **composition pattern** means building a larger UI by combining smaller, reusable components.

For example, a blog page can combine:

- `Navbar` — displays navigation links.
- `PostSearch` — searches blog posts.
- `LikeButton` — lets users like a post.
- `CopyLinkButton` — copies a post's URL.

Instead of writing everything in one large component, smaller components are combined to build the interface.

### Example: Passing Props

A Server Component can pass blog posts to a Client Component through props.

```tsx
// app/blog/page.tsx — Server Component
const posts = getAllPosts();

return <PostSearch posts={posts} />;
```

The Client Component receives the posts:

```tsx
"use client";

export default function PostSearch({ posts }) {
  // Filter posts based on the search input.
}
```

**Key points:**
- The Server Component retrieves the posts.
- `posts` is a prop containing the data passed to `PostSearch`.
- The Client Component handles interactive searching.
- Plain blog-post objects containing strings and arrays are suitable serializable props.

### Composition with `children`

The `children` prop lets a component render UI placed between its opening and closing tags.

```tsx
function Card({ children }) {
  return <div className="rounded-lg border p-4">{children}</div>;
}
```

Usage:

```tsx
<Card>
  <h2>Learning React</h2>
  <p>Understanding components and props.</p>
</Card>
```

The heading and paragraph are passed to `Card` through `children`.

In Next.js, this pattern can allow a Client Component to wrap UI created by a Server Component without importing that Server Component into the Client Component.

## 6. Why Keep the Client Boundary Small?

- Reduces the amount of JavaScript sent to the browser.
- Keeps server-rendered content separate from interactive logic.
- Makes components easier to maintain and test.
- Allows only the features that require browser interaction to use client-side functionality.