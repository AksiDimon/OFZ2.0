

function plusOneAge (date) {
    const [year, month, day] = date.split('-').map(val => Number(val));

    return [year + 1, month, day]
      .map(x => x.toString().padStart(2, '0'))
      .join('-')
}



// console.log(plusOneAge('2024-12-07'))

//Функция которая помогает создать полоску по оси x с годами в промежуток 1 год
export function generateStripX(start, end) {
    // const startYear = Number(start.split('-')[0]) 
    // const endYear = Number(end.split('-')[0]);
    // const gap = endYear - startYear;
    // let 

    const dates = [];

    end = plusOneAge(end)
    for(let date = start; date < end; date = plusOneAge(date)) {
      dates.push(date);
    }

    return dates;
}

// console.log(generateStripX('2024-12-07', '2044-08-07'))
// console.log(generateStrip('2024-12-07', '2044-12-07'))