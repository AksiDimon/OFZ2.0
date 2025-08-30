import { getTodayDate } from "../../calcsFuncs/calcsQuotes/halperDates";
export function fetchCurrencyUsdRub() {
    const todayDate = getTodayDate();
    const url = `https://iss.moex.com/iss/statistics/engines/futures/markets/indicativerates/securities/USD/RUB.json?lang=ru&from=2024-12-23&till=${todayDate}&iss.meta=off&iss.json=extended&iss.meta=off&limit=100&start=0&sort_order=DESC&iss.meta=off&iss.json=extended&callback=JSON_CALLBACK&lang=ru`;
    return fetch(url)
    .then(data => data.json())
    .then(arr => {
        return {
            rate: arr[1].securities[0].rate, // здесь  курс 1 доллара в руб
            secid: arr[1].securities[0].secid, //"USD/RUB"
            tradedate: arr[1].securities[0].tradedate, // текущая дата
        }
    } ) 
}