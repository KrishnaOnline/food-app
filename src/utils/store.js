import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        // more slices exist
    },
});

export default store;