
const posts = [
  {
    slug: "learning-react",
    title: "Learning React Step by Step",
    date: "2026-10-10",
    excerpt: "Understand the basics of React components and state.",
    content: "React helps developers build user interfaces using reusable components. Start with JSX, props, state, and event handling.",
    tags: ["React", "JavaScript"],
  },
  {
    slug: "introduction-to-nextjs",
    title: "Introduction to Next.js",
    date: "2026-10-12",
    excerpt: "Discover routing, layouts, and pages in Next.js.",
    content: "Next.js is a React framework that provides file-based routing, layouts, and other features for building web applications.",
    tags: ["Next.js", "React"],
  },
  {
    slug: "tailwind-css-basics",
    title: "Tailwind CSS Basics",
    date: "2026-10-14",
    excerpt: "Style your pages using utility classes.",
    content: "Tailwind CSS provides utility classes that let you apply styling directly to elements through className.",
    tags: ["CSS", "Tailwind"],
  },
  {
    slug: "understanding-javascript",
    title: "Understanding JavaScript",
    date: "2026-10-16",
    excerpt: "Explore variables, functions, and arrays.",
    content: "JavaScript makes websites interactive. Learning variables, functions, arrays, and objects provides a strong foundation.",
    tags: ["JavaScript"],
  },
  {
    slug: "building-reusable-components",
    title: "Building Reusable Components",
    date: "2026-10-18",
    excerpt: "Write components that can be reused across pages.",
    content: "Reusable components reduce duplicated code and make applications easier to maintain.",
    tags: ["React", "Components"],
  },
  {
    slug: "dynamic-routes-explained",
    title: "Dynamic Routes Explained",
    date: "2026-10-20",
    excerpt: "Learn how dynamic URLs display different content.",
    content: "Dynamic routes use URL parameters to select content. In Next.js, folders such as [slug] create dynamic route segments.",
    tags: ["Next.js", "Routing"],
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByTag(tag) {
  return posts.filter((post) =>
    post.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}
