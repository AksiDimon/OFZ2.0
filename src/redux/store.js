import { configureStore } from "@reduxjs/toolkit";
import { chartQuotesSlice } from "./ofzSlice";
import { getTodayDate } from "../calcsFuncs/calcsQuotes/halperDates";
import { todayDateSlice } from "./todayDateSlice";
import { testMyHookSlice } from "./testMyHookSlice";
import { corporatesSlice } from "./corporateSlice";
import { replaysSlice } from "./replaysSlice";
export const store = configureStore({
    reducer: {
        chartQuotes: chartQuotesSlice.reducer,
        corporates: corporatesSlice.reducer,
        replays: replaysSlice.reducer,
        todayDate: todayDateSlice.reducer,
        // testHook: testMyHookSlice.reducer,
    },
    preloadedState: {
        todayDate: getTodayDate(),
    },
});
window.store = store
console.log("📀", store.getState());