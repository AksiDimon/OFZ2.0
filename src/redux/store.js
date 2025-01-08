import { configureStore } from "@reduxjs/toolkit";
import { chartQuotesSlice } from "./ofzSlice";


export const store = configureStore({
    reducer: {
        chartQuotes: chartQuotesSlice.reducer
    }
})
window.store = store
console.log("📀", store.getState());