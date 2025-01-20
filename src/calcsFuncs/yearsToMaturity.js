export function yearsToMaturity (matDate) {
    if(matDate === null) return '-'
    const yearNow = new Date().getFullYear();
    const monthNow = new Date().getMonth() + 1;
   // console.log(yearNow,monthNow)
    // const yearNow = Number(nowDate.split('-')[0])
    // const monthNow = Number(nowDate.split('-')[1])
    // console.log(yearNow,monthNow)
    const finishYear = Number(matDate.split('-')[0]);
    const finishMonth = Number(matDate.split('-')[1]);
    
    const gapRestYear = finishYear - yearNow;
    const gapRestMonth = finishMonth - monthNow;

    const yearsToMaturity = gapRestYear + (gapRestMonth / 12);
  //  console.log(yearsToMaturity.toFixed(1), '№№№№№№№')
    return yearsToMaturity.toFixed(1)
}

//console.log(yearsToMaturity('2025-09-24'))
// console.log(yearsToMaturity('2033-05-11'))
// '2024-10'