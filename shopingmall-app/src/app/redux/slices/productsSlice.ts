import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "../../../../public/products.json";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: productsData,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
