import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Welcome to Confession Booth</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/upload" className="text-blue-600 underline">
            Upload Media
          </Link>
        </li>
        <li>
          <Link href="/view" className="text-blue-600 underline">
            View Random Media
          </Link>
        </li>
      </ul>
    </main>
  );
}

