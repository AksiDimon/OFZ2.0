import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOfzBonds } from '../requests/fetchList';
import { plusOneAge, getTodayDate, calculateLastDate, date2ms, filterPointsWithinBorder, halperRestMap } from '../calcsFuncs/calcsQuotes/halperDates';



// Асинхронный thunk
export const fetchListData = createAsyncThunk(
  'chartQuotes/fetchListData',
  (_, thunkAPI) => {
//    console.log(thunkAPI.dispatch, '🥳')
    return fetchOfzBonds().then((data) => {
        
      const ofzsSqueezeData = data
        .map((obj) => {
          return {
            name: obj.name,
            percent: obj.yield,
            endDate: obj.endDate,
            yearsToEnd: obj.yearsToEnd,
          };
        })
        .filter(({ name }) => name.startsWith('ОФЗ 26'))
        .filter(({ percent }) => percent > 0);

        return ofzsSqueezeData;
    });
  }
);

 const todayDate  = createAsyncThunk(
    'chartQuotes/todayDate',
    (_, no) => {
        return getTodayDate();
    }
 );



const initialState = {
    ListData: [], // Сюда попадут данные из thunk
    status: 'idle', // idle | loading | succeeded | failed
    error: null, // Для хранения ошибок
    calcsStrips: null,
    todayDate: '',
    filterPointsWithinBorder: [],
    
};

//createSlice он автоматически создаёт: actions и reducer.
export const chartQuotesSlice = createSlice({
  name: 'chartQuotes',
  initialState,
  reducers: {
    setCalcsStrips(state, action) {
      state.calcsStrips = action.payload;
      // как было бы лучше
      // const { x0, y0, x1, y1 } = action.payload;
      //                                                 10% 20% 60% 80%
      // state.calcsStrips = update(state.calcsStrips ?? halperRestMap(ListData, todayDate), { x0, y0, x1, y1 });
    },
    setRestMap(state) {
        state.calcsStrips = null;
    },
    setFilterPointsWithinBorder(state) {
        state.filterPointsWithinBorder = filterPointsWithinBorder(state.ListData, state.calcsStrips)
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(todayDate.fulfilled, (state, action) => {
        state.todayDate = action.payload; // Сохраняем текущую дату в state
    })
    .addCase(fetchListData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListData.fulfilled, (state, action) => {
        console.log('ListData saved to store:', action.payload);
        state.status = 'succeeded';
        state.ListData = action.payload; // Сохраняем данные в state
      })
      .addCase(fetchListData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Сохраняем ошибку
      });
  }
});

// setCalcsStrips: function (state, action) {
//     state.calcsStrips = action.payload;
//   },

// type → "chartQuotes" + "/" + "setCalcsStrips"

//  console.log('👿', chartQuotesSlice);
//  console.log('😱', chartQuotesSlice.actions.setCalcsStrips('qwerty'));

// const obj = {
//     fn(x, y) {
//         return x + y;
//     }
// }

// const obj2 = {
//     fn: function(x, y) {
//         return x + y;
//     }
// }
