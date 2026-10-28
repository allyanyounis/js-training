What is Next.js?
Next.js is a React framework. You use React to build components and user interfaces, while Next.js provides additional features such as file-based routing, layouts, navigation, and server rendering.

Your task uses Next.js App Router, which creates routes based on the folders and files in your project.

Here are the main concepts you need for your blog:

1. page.js — A page
Creates the content for a URL, such as the Home page or Blog page.
2. layout.js — A shared layout
Provides common UI, such as a navbar, around multiple pages.
3. File-based routing
A folder and its page.js file define a URL. For example, app/about/page.js creates /about.
4. lib/posts.js — Blog data
Stores your six posts and helper functions to retrieve posts by slug or tag.
5. Link and dynamic routes
Link enables navigation between pages. Dynamic routes such as app/tags/[tag]/page.js let one page handle different tags.