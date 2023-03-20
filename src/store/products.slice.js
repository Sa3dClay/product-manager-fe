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
        updateProduct: (state, action) => {
            const { id, updatedProduct } = action.payload;
            const index = state.products.findIndex((product) => {
                return product.id === id;
            });

            if (index !== -1) {
                state.products[index] = {
                    ...state.products[index],
                    ...updatedProduct,
                };
            } else {
                state.products.push(updatedProduct);
            }
        },
    },
});

export const { setProducts, updateProduct } = productsDataSlice.actions;
export default productsDataSlice;
