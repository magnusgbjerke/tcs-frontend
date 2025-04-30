"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/products";
import { useRouter } from "next/navigation";
import User from "@/components/ui/assets/circle-user-round.svg";
import Cart from "@/components/ui/assets/shopping-cart.svg";
import { Searchbar } from "@/components/ui/components/Searchbar";

export const Navbar = () => {
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const onChangeHandler = async (query: string) => {
    if (process.env.NODE_ENV === "development") {
      const response = await fetch(`http://localhost:8080/api/products`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      const results = data.filter((item: Product) =>
        item.name.toLowerCase().includes(query),
      );
      setFilteredData(results);
    } else if (process.env.NODE_ENV === "production") {
      const response = await fetch(
        `http://localhost:8080/api/products?search=${query}`,
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setFilteredData(data);
    }
  };

  const router1 = useRouter();
  const onSearchHandler = (query: string) => {
    router1.push(`/search/${query}`);
  };

  const router2 = useRouter();
  const onClickHandler = (item: Product) => {
    router2.push(`/${item.id.toString()}`);
  };

  return (
    <header className="bg-primary-400 max-h-[60px] justify-items-center">
      <div className="max-w-[1440px] w-full">
        <section className="flex justify-between items-center pt-2 pb-2">
          <div className="flex gap-4 items-center">
            <Link href="/">
              <strong>[Logo]</strong>
            </Link>
            <Link href="/men">
              <button className="bg-white text-primary-800 font-semibold px-4 py-1 rounded hover:bg-primary-300">
                Men
              </button>
            </Link>
            <Link href="/women">
              <button className="bg-white text-primary-800 font-semibold px-4 py-1 rounded hover:bg-primary-300">
                Women
              </button>
            </Link>
            <Link href="/kids">
              <button className="bg-white text-primary-800 font-semibold px-4 py-1 rounded hover:bg-primary-300">
                Kids
              </button>
            </Link>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2"></div>
          <div className="flex gap-2">
            <Searchbar
              placeholder={"Search for products..."}
              data={filteredData}
              onSearch={(query) => onSearchHandler(query)}
              onChange={(query) => onChangeHandler(query)}
              onClick={(item) => onClickHandler(item)}
              size="xs"
            />
            <User
              onClick={() => alert("user")}
              className="w-9 h-9 cursor-pointer text-primary-800"
            />
            <Cart
              onClick={() => alert("user")}
              className="w-9 h-9 cursor-pointer text-primary-800"
            />
          </div>
        </section>
      </div>
    </header>
  );
};
