import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDaysPoints } from '../components/theatresBond/fetch';
import { fetchCurrencyUsdRub } from '../components/theatresBond/fetchCurrency';
import { calculateCalasStrips } from '../components/theatresBond/halperFuncs';

export const fetchTheatresThunk = createAsyncThunk(
  'chartQuotesLine/fetchCTheatresThunk',
  (bondId, thunkAPI) => {
    const state = thunkAPI.getState();
    const { from, till } = state.theatresBond.inputDates;
    return fetchDaysPoints(bondId, from, till);
  }
);

export const fetchCurrencyUsdRubThunk = createAsyncThunk(
  'currencyUsdRub/fetchCurrencyUsdRubThunk',
  (_, thunkAPI) => {
    return fetchCurrencyUsdRub();
  }
);

const initialState = {
  pointsDays: [], // Сюда попадут данные из thunk
  status: 'idle', // idle | loading | succeeded | failed
  error: null, // Для хранения ошибок
  // calcsStrips: null,
  inputDates: {
    from: null,
    till: null,
  },
  currency: {
    selectedCurrency: '% от Номинала',
    usdRub: { rate: 0, secid: '', tradedate: '' },
    status: 'idle',
  },
  calcsStrips: {
    minDate: '',
    maxDate: '',
    minPercent: '',
    maxPercent: '',
  },
};

export const theatresBondSlice = createSlice({
  name: 'eachBond',
  initialState,
  reducers: {
    setInputDates(state, action) {
      state.inputDates = {
        ...state.inputDates,
        ...action.payload,
      };
    },
    setCalcsStrips(state, action) {
      state.calcsStrips = calculateCalasStrips(
        state.pointsDays,
        state.currency.usdRub.rate,
        state.currency.selectedCurrency
      );
    },
    setCurrency(state, action) {
      state.currency.selectedCurrency = action.payload;
    },
    // setPointsDays(start, action) {

    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheatresThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTheatresThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pointsDays = action.payload;
      })
      .addCase(fetchCurrencyUsdRubThunk.pending, (state) => {
        state.currency.status = 'loading';
      })
      .addCase(fetchCurrencyUsdRubThunk.fulfilled, (state, action) => {
        state.currency.status = 'succeeded';
        state.currency.usdRub = action.payload;
      });
  },
});
