import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { setOrder } from "@/store/orderSlice";
import { RootState } from "@/store/store";
import {
  CreateOrder,
  ErrorResponse,
  getPath,
  Order,
  Product,
} from "@/lib/data";
import { isJsonServerRunning } from "@/lib/isJsonServerRunning";

export function useOrderHandlers() {
  const { data: session } = useSession();
  const order = useSelector((state: RootState) => state.order.order);
  const dispatch = useDispatch();

  async function updateOrderOnServer(updatedOrder: Order) {
    if (!session?.accessToken) return;

    const jsonServerUp = await isJsonServerRunning();
    console.log("JSON-Server up: " + jsonServerUp);

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
        dispatch(setOrder(updatedOrder));
      } else {
        const errorData: ErrorResponse = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Failed to send to API:", error);
    }
  }

  const handleQuantityChange = (
    productId: string,
    sizeName: string,
    quantity: number,
  ) => {
    if (!order) return;

    const newOrderLines = order.orderLines.map((line) => {
      if (line.product.id === productId && line.sizeName === sizeName) {
        return { ...line, quantity };
      }
      return line;
    });

    const updated = { ...order, orderLines: newOrderLines };
    updateOrderOnServer(updated);
  };

  const handleRemoveItem = (productId: string, sizeName: string) => {
    if (!order) return;

    const newOrderLines = order.orderLines.filter(
      (line) => !(line.product.id === productId && line.sizeName === sizeName),
    );

    const updated = { ...order, orderLines: newOrderLines };
    updateOrderOnServer(updated);
  };

  const handleAddItem = (
    product: Product,
    sizeName: string,
    quantity: number,
  ) => {
    if (!order) return;

    const existingIndex = order.orderLines.findIndex(
      (line) => line.product.id === product.id && line.sizeName === sizeName,
    );

    let newOrderLines;
    if (existingIndex !== -1) {
      newOrderLines = order.orderLines.map((line, i) =>
        i === existingIndex
          ? { ...line, quantity: line.quantity + quantity }
          : line,
      );
    } else {
      const newLine = {
        product,
        sizeName,
        quantity,
      };
      newOrderLines = [...order.orderLines, newLine];
    }

    const updatedOrder = { ...order, orderLines: newOrderLines };
    updateOrderOnServer(updatedOrder);
  };

  return {
    handleAddItem,
    handleRemoveItem,
    handleQuantityChange,
  };
}
