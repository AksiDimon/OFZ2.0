import { ChartQuotes } from "./chartQuotes";
import { List } from "./list";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchListData } from "../redux/ofzSlice";
import { useEffect, useState } from "react";
import { chartQuotesSlice } from "../redux/ofzSlice";
import { halperRestMap, getTodayDate } from "../calcsFuncs/calcsQuotes/halperDates";
import { fetchCorporates } from "../requests/fetchCorporates";
import { Header } from "./header";
import { theatresBondSlice } from "../redux/theatresBondSlice";

const todayDate = getTodayDate();

export function Ofz() {
//const [counterZoom, setCounterZoom] = useState(1); //стэйт для процентов по Y скольконулей должно быть после запятой.
const dispatch = useDispatch();

      useEffect(() => {
        dispatch(fetchListData()); 
        // dispatch(theatresBondSlice.actions.setCurrency('ofz in Usd'))
        // fetchCorporates()
      }, []);

    const onPointerUp = selectionBox => {
        // console.log(">>>>>", selectionBox);
        dispatch(chartQuotesSlice.actions.setCalcsStrips(selectionBox))
      }

      const { ListData, status, calcsStrips: calcsStripsFromRedux,  filterPointsWithinBorder } = useSelector((state) => state.chartQuotes);
      const calcsStrips = calcsStripsFromRedux ?? halperRestMap(ListData, todayDate);


      function handleRestMap() {
        dispatch(chartQuotesSlice.actions.setRestMap());
        // setCounterZoom(1); //сбрасываю точки после запятой в процентах, так как это не сделать здесь, они останутся, при сбрасывании.
      }
    return (

            <div>
                {/* <Header/> */}
                <ChartQuotes
                ListData ={ListData}
                calcsStrips = {calcsStrips}
                onPointerUp = {onPointerUp}
                handleRestMap = {handleRestMap}
                // counterZoom = {counterZoom}
                // setCounterZoom = {setCounterZoom}
                 />
                <List 
                ListData = {ListData}
                />
            </div>



    )
}