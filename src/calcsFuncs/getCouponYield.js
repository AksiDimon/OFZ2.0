
//доходность купона относительно текущей рыночной цены 
export function getCouponYield (MARKETPRICE, COUPONPERCENT) {
     if(MARKETPRICE === null || COUPONPERCENT === null) {
        return '-'
     }
    const price = Number(MARKETPRICE * 10).toFixed(2);
    const yieldPersent = Number(COUPONPERCENT) * 10;
    const result = ((yieldPersent / price) * 100).toFixed(1)
    return  `${result}%` 
}


//console.log(KupDoxPosL(79.187, 8.15))
//console.log(getCouponYield(null, 8.15))

// const price = Number((resultAllBonds[i][7] * 10).toFixed(2)); // price
// const yieldPersent = Number(resultAllBonds[i][6].slice(0, -1)) * 10;
// // console.log(price,yieldPersent)
// const KupDoxPosL = ((yieldPersent / price) * 100).toFixed(1);
// resultAllBonds[i][7] =
//   resultAllBonds[i][7] !== null ? `${KupDoxPosL}%` : '-';