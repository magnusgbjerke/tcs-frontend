"use client";

import Link from "next/link";
import { Searchbar } from "./Searchbar";

export const Navbar = () => {
  const exampleData = [
    "T-shirt",
    "Jeans",
    "Hoodie",
    "Jacket",
    "Sneakers",
    "Boots",
    "Dress",
    "Hat",
    "Scarf",
    "Socks",
  ];
  return (
    <header className="bg-primary-400 h-[60px] justify-items-center sticky">
      <div className="max-w-[1440px] w-full">
        <section className="flex justify-between items-center">
          <div>
            {" "}
            <Link href="/">
              <strong>[Logo]</strong>
            </Link>
            <Link href="/men">
              <strong>[Button: Men]</strong>
            </Link>
            <Link href="/women">
              <strong>[Button: Women]</strong>
            </Link>
            <Link href="/kids">
              <strong>[Button: Kids]</strong>
            </Link>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            middle
          </div>
          <div className="flex">
            <Searchbar
              placeholder={"Search for products..."}
              data={exampleData}
              onSearch={(q) => console.log(q)}
              size="xs"
            />
            <p className="text-nowrap">[Icon: Profile]</p>
            <p className="text-nowrap">[Icon: Cart]</p>
          </div>
        </section>
      </div>
    </header>
  );
};
