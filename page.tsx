import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center pb-24">
        <h1 className="text-4xl font-bold mb-6">Welcome to Streetwear Cloathing</h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Discover the latest styles for men, women, and kids. Fashion for every season and every occasion.
        </p>
        <a
          href="/men"
          className="bg-primary-400 text-white font-semibold px-6 py-2 rounded hover:bg-primary-600 transition"
        >
          Shop Now
        </a>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-primary-400 text-white w-full fixed bottom-0 left-0 py-3 px-6 flex justify-between items-center z-50">
        <Link href="/about">
          <button className="bg-white text-primary-800 font-semibold px-4 py-1 rounded hover:bg-primary-300">
            About us
          </button>
        </Link>
        <Link href="/contact">
          <button className="bg-white text-primary-800 font-semibold px-4 py-1 rounded hover:bg-primary-300">
            Contact us
          </button>
        </Link>
      </footer>
    </>
  );
}
