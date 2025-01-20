import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchReplays } from "../requests/fetchReplays";
import { getTodayDate, halperRestMap, calcEmphasizeSquare } from "../calcsFuncs/calcsQuotes/halperDates";

export const fetchReplaysThunk = createAsyncThunk(
    'chartQuotes/fetchReplaysThunk',
    (_, thunkAPI) => {
        return fetchReplays().then(data => data)
    }
)



const initialState = {
    ListData: [], // Сюда попадут данные из thunk
    status: 'idle', // idle | loading | succeeded | failed
    error: null, // Для хранения ошибок
    calcsStrips: null,
}


export const replaysSlice = createSlice({
    name: 'replays',
    initialState,
    reducers: {
        setCalcsStrips(state, action) {
            state.calcsStrips =  calcEmphasizeSquare(state.calcsStrips ?? halperRestMap(state.ListData, getTodayDate()), action.payload)
        },
        setRestMap(state) {
            state.calcsStrips = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchReplaysThunk.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchReplaysThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // console.log(action.payload, 'fetchReplaysThunk')
            state.ListData = action.payload
          })
    }
})