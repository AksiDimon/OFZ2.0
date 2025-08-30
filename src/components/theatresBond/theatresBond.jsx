import s from './theatresBond.module.css'
import { useEffect, useState } from 'react'
import { fetchDaysPoints } from './fetch'
import { generateHorizontalData, generateVerticalData } from '../../calcsFuncs/calcsQuotes/printCordinates'
import { date2ms } from '../../calcsFuncs/calcsQuotes/halperDates'
import { useFollow } from './hookFolow';
import { fetchTheatresThunk, theatresBondSlice, fetchCurrencyUsdRubThunk } from '../../redux/theatresBondSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { BondChart } from './bondChart'
import { useParams } from 'react-router-dom';
import { fetchCurrency } from './fetchCurrency'
import { calculateCalasStrips } from './halperFuncs'
export function TheatresBond({}) {
     const dispatch = useDispatch()
     const location = useLocation()
     const {bondId} = useParams()
    const {pointsDays,} = useSelector(state => state.theatresBond);
    const selectedCurrency = useSelector(state => state.theatresBond.currency.selectedCurrency)
    const {rate} = useSelector(state => state.theatresBond.currency.usdRub);
    const {minDate, maxDate, minPercent, maxPercent} = calculateCalasStrips(pointsDays, rate, selectedCurrency)
    const {from, till} = useSelector(state => state.theatresBond.inputDates)

    useEffect(() => {
         dispatch(fetchTheatresThunk(bondId))
         dispatch(fetchCurrencyUsdRubThunk()) // диспачу валюту
         
         console.log( minDate, maxDate, {from, till}, '🍊')

    }, [from, till])

    //  console.log({from, till})


     const sortedСostInPercents = pointsDays.map(day => day.close).sort((a, b) => a - b);
    const sortedDates = pointsDays.map(day => day.end.split(' ')[0]).sort();

    
    
    // console.log(sortedСostInPercents, '🌈')





    
    
    function handleRubCheckBox (e) {
        const chosenCheckBox = e.target.value
        dispatch(theatresBondSlice.actions.setCurrency(chosenCheckBox))
    }

    function handlePercentCheckBox (e) {
          const chosenCheckBox = e.target.value

          dispatch(theatresBondSlice.actions.setCurrency('% от Номинала'))
    }



    const points = pointsDays.map((obj) => {
        
        return {
             obj,
            x:
                (date2ms(obj.end.split(' ')[0]) - date2ms(sortedDates[0])) /
                (date2ms(sortedDates.at(-1)) - date2ms(sortedDates[0])),
            y:
                (obj.close - sortedСostInPercents[0]) /
                (sortedСostInPercents.at(-1) - sortedСostInPercents[0]),
        }
    })

const {divRef,hoverX, hoverPoint, handleMouseMove, handleMouseLeave} = useFollow(points);

    if (pointsDays.length === 0 ) {
        return (
            <div> ...Wait</div>
        )
    }
    // function calcBordersPrivetBond() {}


    const horizontalData = generateHorizontalData(
        // sortedСostInPercents[0],
        // sortedСostInPercents.at(-1)
        minPercent,
        maxPercent
    );
    const verticalData = generateVerticalData(
        sortedDates[0],
        sortedDates.at(-1),
        date2ms
    )
    .filter((obj, index, arr) => index === 0 || index === arr.length - 1 || index % 2 === 0 )



return (
    <>
        <BondChart
        points = {points}
        
        divRef = {divRef}
        hoverX = {hoverX}
        hoverPoint = {hoverPoint}
        handleMouseMove = {handleMouseMove}
        handleMouseLeave = {handleMouseLeave}
        horizontalData = {horizontalData}
        verticalData = {verticalData}

        handleRubCheckBox = {handleRubCheckBox}
        handlePercentCheckBox = {handlePercentCheckBox}
        
        />
    </>
    
)
}