import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (dispatch, getState) => {
    const { category, offset } = dispatch;

    const products = await axios.get(
      process.env.REACT_APP_API +
        `products?category=${category}&offset=${offset}`
    );
    return products;
  }
);

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  products: [],
  count: 0,
  cart: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = state.cart.concat([action.payload.item]);
    },
    removeFromCart: (state, action) => {
      console.log(action);
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.products = payload.data.results;
      state.success = true;
      state.count = payload.data.count;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Could not fetch products";
    },
  },
});

export const { addToCart, removeFromCart } = productsSlice.actions;

export default productsSlice.reducer;
