

function halperPositionX(date) {
    const [year, month, day] = date.split('-').map(data => Number(data))
    
    const ms = Number(new Date(year, month - 1, day));
    // console.log(year, month, day, ms);
    return ms
}

// console.log(halperPositionX('2025-04-23'))


export function positionX (minDate, maxDate, currentDate) {
    return (halperPositionX(currentDate) - halperPositionX(minDate)) / (halperPositionX(maxDate)  - halperPositionX(minDate)) * 100  
}

// startDate = '2025-04-23' → start = new Date(2025, 3, 23) → Number(...)
// endDate
// date

// console.log(positionX('2025-01-29','2044-07-20','2033-03-23'))
// const params = ['2025-01-21', '2055-01-21', '2024-12-12'];
// console.log(positionX(...params))


export function positionY (rateBond, maxRate, minRate) {
   return (rateBond - minRate) / (maxRate - minRate) * 100
 }

 //console.log(positionY(17.5, 24, 14))