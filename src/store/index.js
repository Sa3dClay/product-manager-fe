import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./user.slice";

const store = configureStore({
    reducer: {
        userData: userDataSlice.reducer,
    },
});

export default store;
