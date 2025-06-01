"use client";

import { useEffect } from "react";
import { ErrorResponse, getPath, Order } from "@/lib/data";
import { setOrder } from "@/store/orderSlice";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

export function useFetchOrder() {
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
}
