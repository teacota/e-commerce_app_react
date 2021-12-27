import { configureStore } from "@reduxjs/toolkit";
import authentication from "../state/authenticationSlice";
import panel from "../state/panelSlice";
import products from "../state/productsSlice";

export const store = configureStore({
  reducer: {
    authentication,
    panel,
    products,
  },
});
