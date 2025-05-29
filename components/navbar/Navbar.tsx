"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/assets/logo-horizontal.svg";
import { Searchbar } from "@/components/ui/components/Searchbar";
import { Product } from "@/lib/data";
import { UserButton } from "./user/UserButton";
import { CartButton } from "./cart/CartButton";
import { Button } from "@/components/ui/components/Button";

export const Navbar = () => {
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const router = useRouter();

  const onChangeHandler = async (query: string) => {
    if (process.env.NODE_ENV === "development") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      const results = data.filter((item: Product) =>
        item.name.toLowerCase().includes(query)
      );
      setFilteredData(results);
    } else if (process.env.NODE_ENV === "production") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?search=${query}`
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
    <header className="bg-primary-400 pt-2 pb-2">
      <section className="flex justify-between">
        <div className="flex gap-2">
          <Logo
            onClick={() => router.push("/")}
            className="w-16 hover:bg-primary-700 cursor-pointer ml-4"
          />
          <Button onClick={() => router.push("/men")} className="">
            Men
          </Button>

          <Button onClick={() => router.push("/women")} className="">
            Women
          </Button>

          <Button onClick={() => router.push("/kids")} className="">
            Kids
          </Button>
        </div>
        <div className="flex gap-4">
          <Searchbar
            placeholder={"Search for products..."}
            data={filteredData}
            onSearch={(query) => onSearchHandler(query)}
            onChange={(query) => onChangeHandler(query)}
            onClick={(item) => onClickHandler(item)}
            size="xs"
          />
          <CartButton />
          <UserButton />
        </div>
      </section>
    </header>
  );
};
