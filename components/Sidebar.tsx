"use client";

import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="p-4 min-w-[240px]">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              href="/hoodies"
              className="block p-2 rounded-md hover:bg-primary-500"
            >
              Hoodies
            </Link>
          </li>
          <li>
            <Link
              href="/t-shirts"
              className="block p-2 rounded-md hover:bg-primary-500"
            >
              T-Shirts
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
