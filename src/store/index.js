import { configureStore } from "@reduxjs/toolkit";
import productsDataSlice from "./products.slice";
import userDataSlice from "./user.slice";

const store = configureStore({
    reducer: {
        productsData: productsDataSlice.reducer,
        userData: userDataSlice.reducer,
    },
});

export default store;
