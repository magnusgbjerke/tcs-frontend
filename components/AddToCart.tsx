"use client";

import React, { useState } from "react";
import { Product } from "@/lib/data";
import { useOrderHandlers } from "@/lib/hook/useOrderHandlers";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/components/Button";
import { useFetchOrder } from "@/lib/hook/useFetchOrder";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const { handleRemoveItem, handleAddItem, handleQuantityChange } =
    useOrderHandlers();
  const order = useSelector((state: RootState) => state.order.order);

  // Fetch orders
  useFetchOrder();

  // Dynamically get sizes from product stock
  const availableSizes = product.stock
    .filter((item) => item.quantity > 0)
    .map((item) => item.size);

  // Default to first available size if possible
  const [selectedSize, setSelectedSize] = useState<string>(
    availableSizes[0] || "",
  );

  if (availableSizes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={`px-3 py-1 border rounded ${
              selectedSize === size
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">Selected size: {selectedSize}</p>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => handleAddItem(product, selectedSize, 1)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 "
        >
          Add Item
        </Button>
      </div>
      {order && (
        <>
          {order.orderLines
            .filter((line) => line.product.id === product.id)
            .map((line) => (
              <div
                key={`${line.product.id}-${line.sizeName}`}
                className="flex gap-4"
              >
                <div className="inline-flex items-center border border-gray-300 rounded w-28 select-none">
                  <button
                    onClick={() => {
                      if (line.quantity > 1) {
                        handleQuantityChange(
                          line.product.id,
                          line.sizeName,
                          line.quantity - 1,
                        );
                      }
                    }}
                    className="flex-1 h-9 bg-gray-200 text-lg rounded-l hover:bg-gray-300"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center text-base select-none">
                    {line.quantity}
                  </div>
                  <button
                    onClick={() => {
                      handleQuantityChange(
                        line.product.id,
                        line.sizeName,
                        line.quantity + 1,
                      );
                    }}
                    className="flex-1 h-9 bg-gray-200 text-lg rounded-r hover:bg-gray-300"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <div className="flex-1 text-center text-sm font-semibold select-none">
                    {line.sizeName}
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleRemoveItem(line.product.id, line.sizeName)
                  }
                  className="mt-1 text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
