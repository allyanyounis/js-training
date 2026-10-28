import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-800 bg-blue-950 px-6 py-5">
      <Link
        href="/"
        className="text-xl font-bold text-white"
      >
        My Blog
      </Link>

      <div className="flex flex-wrap gap-5 text-white">
        <Link href="/" className="hover:text-blue-300">
          Home
        </Link>

        <Link href="/blog" className="hover:text-blue-300">
          Blog
        </Link>

        <Link href="/about" className="hover:text-blue-300">
          About
        </Link>

        <Link href="/contact" className="hover:text-blue-300">
          Contact
        </Link>
      </div>
    </nav>
  );
}
