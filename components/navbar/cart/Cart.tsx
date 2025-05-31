"use client";

import { Button } from "@/components/ui/components/Button";
import { ErrorResponse, getPath, Order } from "@/lib/data";
import { useOrderHandlers } from "@/lib/updateOrderOnServer";

import { setOrder } from "@/store/orderSlice";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const { data: session } = useSession();
  const order = useSelector((state: RootState) => state.order.order);
  const dispatch = useDispatch();
  const { handleRemoveItem, handleQuantityChange } = useOrderHandlers();

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
  }, [session?.accessToken]);

  const total = order?.orderLines?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul className="space-y-4">
        {order?.orderLines?.map((item, index) => (
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
