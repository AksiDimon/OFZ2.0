import { transformResponse } from "../../transformHelpers/transformSecurity";
export function fetchDaysPoints() {
    const url = 'https://iss.moex.com/iss/engines/stock/markets/bonds/securities/RU000A1059R0/candles.json?from=2024-01-01&till=2025-12-31&interval=24&start=0';
    return fetch(url)
    .then(data => data.json())
    .then(obj =>  {return obj.candles} )
    .then(data => { 
        return transformResponse(data)
    })
    // .then(val => console.log(val, 'fetchDaysPoints'))

}
