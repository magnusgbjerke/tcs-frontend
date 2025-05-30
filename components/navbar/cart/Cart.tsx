"use client";

import { Button } from "@/components/ui/components/Button";
import { CreateOrder, ErrorResponse, getPath, Order } from "@/lib/data";
import { isJsonServerRunning } from "@/lib/isJsonServerRunning";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [data, setData] = useState<Order>();
  const { data: session } = useSession();

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
          setData(order);
        } else {
          const errorData: ErrorResponse = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Failed to send to API:", error);
      }
    }
    fetchData();
  }, [session?.accessToken]);

  async function updateOrderOnServer(updatedOrder: Order) {
    if (!session?.accessToken) return;

    const jsonServerUp = await isJsonServerRunning();

    // Transform the order data if JSON server is NOT running
    const orderPayload: Order | CreateOrder[] = jsonServerUp
      ? updatedOrder
      : updatedOrder.orderLines.map((line) => ({
          productId: line.product.id,
          sizeName: line.sizeName,
          quantity: line.quantity,
        }));

    try {
      const response = await fetch(getPath("/api/order"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        setData(updatedOrder);
      } else {
        const errorData: ErrorResponse = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Failed to send to API:", error);
    }
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    if (!data) return;
    const updated = { ...data };
    updated.orderLines[index].quantity = quantity;
    setData(updated);
    updateOrderOnServer(updated);
  };

  const handleRemoveItem = (index: number) => {
    if (!data) return;
    const updated = { ...data };
    updated.orderLines.splice(index, 1);
    setData(updated);
    updateOrderOnServer(updated);
  };

  const total = data?.orderLines?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul className="space-y-4">
        {data?.orderLines?.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <h3 className="text-md font-medium">{item.product.name}</h3>
              <p className="text-sm text-gray-500">Size: {item.sizeName}</p>
              <div className="flex items-center gap-2 mt-1">
                <label className="text-sm">Qty:</label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                  className="w-16 px-2 py-1 border rounded-md text-sm"
                />
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-md font-semibold">
                ${item.product.price * item.quantity}
              </p>
              <p className="text-sm text-gray-400">
                ${item.product.price} each
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-xl font-bold">${total}</span>
      </div>

      <Button className="w-full">Checkout</Button>
    </>
  );
}
