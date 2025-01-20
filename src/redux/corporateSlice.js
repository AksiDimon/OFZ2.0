import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCorporates } from "../requests/fetchCorporates";
import { getTodayDate, halperRestMap, calcEmphasizeSquare } from "../calcsFuncs/calcsQuotes/halperDates";

export const fetchCorporatesThunk = createAsyncThunk(
    'chartQuotes/fetchCorporatesThunk',
    (_, thunkAPI) => {
        return fetchCorporates()
        .then(data => {
            const squeezeData = data.filter(({ percent, SECID }) => percent > 0  ) //&& SECID.startsWith('RU000A') //1419
         
             const rusCorp = squeezeData.filter(({SECID}) => SECID.startsWith('RU000A')).slice(0, 29) //1367
             return  rusCorp.filter(({percent}) => percent < 50)
            
        })
    }
)

const initialState = {
    ListData: [], // Сюда попадут данные из thunk
    status: 'idle', // idle | loading | succeeded | failed
    error: null, // Для хранения ошибок
    calcsStrips: null,
}


export const corporatesSlice = createSlice({
    name: 'corporates',
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
        .addCase(fetchCorporatesThunk.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCorporatesThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // console.log(action.payload, 'fetchCorporatesThunk')
            state.ListData = action.payload
          })
    }
})