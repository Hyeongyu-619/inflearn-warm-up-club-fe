import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1; // 상품이 이미 존재하면 수량 증가
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // 처음 추가되는 경우 수량 1로 추가
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // 수량 감소
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload); // 수량이 1이면 삭제
      }
    },
  },
});

export const { addItem, removeItem, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
