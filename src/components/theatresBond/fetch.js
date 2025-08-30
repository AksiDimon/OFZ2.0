import { transformResponse } from "../../transformHelpers/transformSecurity";
export function fetchDaysPoints(bondId, from, till) { //RU000A1059R0
    console.log( from, till, '🌶')
    const url = `https://iss.moex.com/iss/engines/stock/markets/bonds/securities/${bondId}/candles.json?from=2024-01-01&till=2025-12-31&interval=24&start=0`;
    const urlOptions = `https://iss.moex.com/iss/engines/stock/markets/bonds/securities/${bondId}/candles.json?from=${from}&till=${till}&interval=24&start=0`;
    
    const resultUrl = from === null && till === null || from.length < 10 || till.length < 10 ? url : urlOptions
    
    return fetch(resultUrl)
    .then(data => data.json())
    .then(obj =>  {return obj.candles} )
    .then(data => { 
        return transformResponse(data)
    })
    .then(val => { 
        console.log(val, 'fetchDaysPoints')
        return val
    } )

}
