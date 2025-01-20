import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getTodayDate } from "../calcsFuncs/calcsQuotes/halperDates";

export const fetchTodayDate  = createAsyncThunk(
    'chartQuotes/todayDate',
    (_, thunkAPI) => {
        return getTodayDate();
    }
 );

export const todayDateSlice = createSlice({
    name: 'todayDate',
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodayDate.fulfilled, (_, action) => {
            return action.payload; // Сохраняем текущую дату в state
        })
    }
})