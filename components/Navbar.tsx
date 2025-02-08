"use client";

import Link from "next/link";
import { Searchbar } from "./ui/Searchbar";
import { mockSearch } from "@/mocks/searchbar";

export const Navbar = () => {
  return (
    <header className="bg-primary-400 max-h-[60px] justify-items-center">
      <div className="max-w-[1440px] w-full">
        <section className="flex justify-between items-center pt-2 pb-2">
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
          <div className="absolute left-1/2 transform -translate-x-1/2"></div>
          <div className="flex gap-2">
            <Searchbar
              placeholder={"Search for products..."}
              data={mockSearch}
              onSearch={(query) => {
                alert(`Searched for: ${query}`);
              }}
              size="xs"
            />
            <img
              src={"assets/circle-user-round.svg"}
              width={40}
              onClick={() => alert("user")}
              className={`cursor-pointer`}
            />
            <img
              src={"assets/shopping-cart.svg"}
              width={40}
              onClick={() => alert("cart")}
              className={`cursor-pointer`}
            />
          </div>
        </section>
      </div>
    </header>
  );
};
