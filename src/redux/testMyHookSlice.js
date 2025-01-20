import { createSlice } from "@reduxjs/toolkit";
import { getTodayDate, halperRestMap, calcEmphasizeSquare } from "../calcsFuncs/calcsQuotes/halperDates";




export const testMyHookSlice = createSlice({
    name: 'testMyHook',
    initialState: null,
    reducers: {
        setSelectionBox(state, action) {
            console.log(action.payload, '🤩')
            state.selectionBox = action.payload;
        },
        setCalcsStrips(state, action) {
             console.log(action.payload, '😡')
             state.calcsStrips =  calcEmphasizeSquare(state.calcsStrips ?? halperRestMap(state.ListData, getTodayDate()), action.payload)
           },
    }
})