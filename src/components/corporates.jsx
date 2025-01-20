import {useEffect, useState} from 'react'
import { ChartQuotes } from "./chartQuotes";
import { List } from "./list";
import { fetchCorporatesThunk, corporatesSlice } from "../redux/corporateSlice";
import { useDispatch, useSelector } from "react-redux";
import { halperRestMap, getTodayDate } from '../calcsFuncs/calcsQuotes/halperDates';
import { fetchReplays } from '../requests/fetchReplays';

const todayDate = getTodayDate();

export function Corporates () {
    // const [counterZoom, setCounterZoom] = useState(1)

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(fetchCorporatesThunk())
       fetchReplays()
    }, [])

    const onPointerUp = selectionBox => {
        console.log(">>>>>", selectionBox);
        dispatch(corporatesSlice.actions.setCalcsStrips(selectionBox))
    } 

    const {ListData, calcsStrips: calcsStripsFromRedux} = useSelector((state) => state.corporates);
    const calcsStrips = calcsStripsFromRedux ?? halperRestMap(ListData, todayDate);

    // console.log(ListData, '🥰')

    function handleRestMap() {
        dispatch(corporatesSlice.actions.setRestMap());
       // setCounterZoom(1); //сбрасываю точки после запятой в процентах, так как это не сделать здесь, они останутся, при сбрасывании.
      }
    return (
        <div>
            {/* <Header/> */}
            <ChartQuotes
            ListData={ListData}
            calcsStrips= {calcsStrips}
            onPointerUp={onPointerUp}
            handleRestMap={handleRestMap}
            // counterZoom={counterZoom}
            // setCounterZoom = {setCounterZoom}
            />
            <List
            ListData={ListData}
            />
        </div>
    )
}