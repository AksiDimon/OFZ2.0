import { ChartQuotes,  } from "./chartQuotes"
import { List } from "./list"
import {useEffect, useState} from 'react'
import { fetchReplaysThunk, replaysSlice } from "../redux/replaysSlice"
import { halperRestMap, getTodayDate } from '../calcsFuncs/calcsQuotes/halperDates';
import { useDispatch, useSelector } from "react-redux"
import { ListReplays } from "./listReplays";



import { fetchPrivetReplays } from "../requests/fetchReplays";
import { TheatresBond } from "./theatresBond/theatresBond";
const todayDate = getTodayDate();

export function Replays () {
    // const [counterZoom, setCounterZoom] = useState(1)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchReplaysThunk());
       
    //    fetchPrivetReplays().then(data => {console.log(data, '😻') })
    }, [])

    const onPointerUp = (selectionBox) => {
        dispatch(replaysSlice.actions.setCalcsStrips(selectionBox))
    }

    const {ListData, calcsStrips: calcsStripsFromRedux} = useSelector(state => state.replays);
    const calcsStrips = calcsStripsFromRedux ?? halperRestMap(ListData, todayDate);

    function handleRestMap() {
        dispatch(replaysSlice.actions.setRestMap());
       // setCounterZoom(1); //сбрасываю точки после запятой в процентах, так как это не сделать здесь, они останутся, при сбрасывании.
      }
    return (
        <div>
            <ChartQuotes
            ListData={ListData}
            calcsStrips= {calcsStrips}
            onPointerUp = {onPointerUp}
            handleRestMap = {handleRestMap}
            // counterZoom={counterZoom}
            // setCounterZoom = {setCounterZoom}
            />
            <ListReplays
            ListData={ListData}
            />
            <TheatresBond/>
        </div>
    )
}