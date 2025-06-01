"use client";

import { Button } from "@/components/ui/components/Button";
import { ErrorResponse, getPath } from "@/lib/data";
import { useFetchOrder } from "@/lib/hook/useFetchOrder";
import { useOrderHandlers } from "@/lib/hook/useOrderHandlers";

import { setOrder } from "@/store/orderSlice";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const { data: session } = useSession();
  const order = useSelector((state: RootState) => state.order.order);
  const dispatch = useDispatch();
  const { handleRemoveItem, handleQuantityChange } = useOrderHandlers();

  // Fetch orders
  useFetchOrder();

  const total = order?.orderLines?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const checkout = async () => {
    if (!session?.accessToken) {
      console.error("No access token. User might not be logged in.");
      return;
    }

    try {
      const response = await fetch(getPath("/api/order/checkout"), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (response.ok) {
        // Clear order
        dispatch(setOrder(null));
      } else {
        const errorData: ErrorResponse = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Failed to send to API:", error);
    }
  };

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
                    handleQuantityChange(
                      item.product.id,
                      item.sizeName,
                      parseInt(e.target.value),
                    )
                  }
                  className="w-16 px-2 py-1 border rounded-md text-sm"
                />
                <button
                  onClick={() =>
                    handleRemoveItem(item.product.id, item.sizeName)
                  }
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-md font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
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
        <span className="text-xl font-bold">
          ${total?.toFixed(2) ?? "0.00"}
        </span>
      </div>
      <Button onClick={checkout} className="w-full">
        Checkout
      </Button>
    </>
  );
}
