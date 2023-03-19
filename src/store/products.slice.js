import { createSlice } from "@reduxjs/toolkit";

const productsDataSlice = createSlice({
    name: "productsData",
    initialState: {
        products: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productsDataSlice.actions;
export default productsDataSlice;
