"use client";

import React from "react";
import { ErrorResponse, getPath, Order, Product } from "@/lib/data";
import { useOrderHandlers } from "@/lib/updateOrderOnServer";

import { setOrder } from "@/store/orderSlice";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const { handleAddItem, handleQuantityChange } = useOrderHandlers();
  const order = useSelector((state: RootState) => state.order.order);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      if (!session?.accessToken) return;
      try {
        const response = await fetch(getPath("/api/order"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (response.ok) {
          const order: Order = await response.json();
          dispatch(setOrder(order));
        } else {
          const errorData: ErrorResponse = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Failed to send to API:", error);
      }
    }
    fetchData();
  }, [session?.accessToken, dispatch]);

  // Find if the product already exists in the order
  const orderLine = order?.orderLines.find(
    (line) => line.product.id === product.id,
  );

  return (
    <div>
      {order && orderLine ? (
        <div className="inline-flex items-center border border-gray-300 rounded w-28 select-none">
          <button
            onClick={() => {
              const index = order.orderLines.findIndex(
                (line) => line.product.id === product.id,
              );
              if (index !== -1) {
                const currentQty = order.orderLines[index].quantity;
                if (currentQty > 1) {
                  handleQuantityChange(index, currentQty - 1);
                }
              }
            }}
            className="flex-1 h-9 bg-gray-200 text-lg rounded-l hover:bg-gray-300"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <div className="flex-1 text-center text-base select-none">
            {orderLine?.quantity}
          </div>
          <button
            onClick={() => {
              const index = order.orderLines.findIndex(
                (line) => line.product.id === product.id,
              );
              if (index !== -1) {
                handleQuantityChange(
                  index,
                  order.orderLines[index].quantity + 1,
                );
              }
            }}
            className="flex-1 h-9 bg-gray-200 text-lg rounded-r hover:bg-gray-300"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      ) : (
        <button onClick={() => handleAddItem(product, "M", 1)}>Add Item</button>
      )}
    </div>
  );
}
