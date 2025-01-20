import {fusionTransform, transformSecurity, transformResponse} from '../transformHelpers/transformSecurity.js';

// 'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQOB/securities.json'  // офз
// 'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/securities.Html' // все облигации
// 'https://iss.moex.com/iss/engines/stock/markets/bonds.html' // место где можно узнать по 4 буквам тип облигации


export function fetchCorporates() {
    const url = 'https://iss.moex.com/iss/engines/stock/markets/bonds/securities/.json';
    return fetch(url)
    .then(data => data.json())
    .then(({ marketdata, securities }) => {
        // console.log(
        //     {
        //        marketdata: transformResponse(marketdata),
        //        securities: transformResponse(securities),
        //      }, 'CORPORATES'
        // )
        return {
               marketdata: transformResponse(marketdata),
               securities: transformResponse(securities),
             }
    })
    
    
    // ({
    //   marketdata: transformResponse(marketdata),
    //   securities: transformResponse(securities),
    // }))
    .then(({marketdata, securities}) => {
        return fusionTransform(marketdata, securities)
    })
    .then(obj => transformSecurity(obj))
}