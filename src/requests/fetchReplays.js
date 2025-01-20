import {fusionTransform, transformSecurity, transformResponse} from '../transformHelpers/transformSecurity.js';
import { transformReplays } from '../transformHelpers/transformReplays.js';
// 'https://iss.moex.com/iss/apps/infogrid/emission/rates.json?_=1737046331693&lang=ru&iss.meta=off&sort_order=asc&sort_column=SECID&start=0&limit=100&repl_bond=1'

// 'https://iss.moex.com/iss/securities/RU000A1056U0/bondization.json?iss.json=extended&iss.meta=off&iss.only=coupons&lang=ru&limit=unlimited' // ссылка где есть данные про даты выплаты купонов.
export function fetchReplays () {
    const url = 'https://iss.moex.com/iss/apps/infogrid/emission/rates.json?_=1737046331693&lang=ru&iss.meta=off&sort_order=asc&sort_column=SECID&start=0&limit=100&repl_bond=1'
    return fetch(url)
    .then(data => data.json())
    .then(data => data.rates)
    .then(datas => transformResponse(datas))
    .then(arr => transformReplays(arr))
    .then(arr => {
        const filterWhithoutEnd = arr.filter(obj => obj.endDate !== null)
        return filterWhithoutEnd
    })
}


export function fetchPrivetReplays () {
    const url = 'https://iss.moex.com/iss/apps/infogrid/emission/rates.json?_=1737046331693&lang=ru&iss.meta=off&sort_order=asc&sort_column=SECID&start=0&limit=100&repl_bond=1'
    return fetch(url)
    .then(data => data.json())
    .then(data => data.rates)
    .then(datas => transformResponse(datas))
}