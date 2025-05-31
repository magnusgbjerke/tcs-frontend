import { Order } from "@/lib/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  order: Order | null;
}

const initialState: OrderState = {
  order: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order | null>) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
