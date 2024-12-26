//функция помогающая прибавить один год, к коректной дате example('2024-12-22')
export function plusOneAge(date) {
  const [year, month, day] = date.split('-').map((val) => Number(val));

  return [year + 1, month, day]
    .map((x) => x.toString().padStart(2, '0'))
    .join('-');
}

//функция преобразования в нужную хорму  сегодняшней(текущей) даты; example('2024-12-22')

export const getTodayDate = () => {
    const today = new Date();
    return [today.getFullYear(), today.getMonth() + 1, today.getDate()]
      .map((x) => x.toString().padStart(2, '0'))
      .join('-');
  };



//Функция вычисляет последнюю дату, начиная с текущей даты, которая больше или равна самой поздней дате в массиве.
 export function calculateLastDate(todayDate, sortedDates, plusOneAge) {
    let year = todayDate;
    while (year < sortedDates.at(-1)) {
        year = plusOneAge(year);
        // console.log(year, '%%%%%%%%%%')
    }
    return year;
}

// const lastDate = calculateLastDate(todayDate, sortedDates, plusOneAge);



//Функция превращает корректную дату в милисекунды
export function date2ms (date) {
    const [y, m, d] = date.split("-").map(Number);
    return +new Date(y, m - 1, d);
}


// функция возвращающая клличество дней в определенном месяце.
export function daysInMonth (month, year) {
    const arry =  [0,2,4,6,7,9,11];
    const arr = [1,3,5,7,8,10,12] //массив был создан для тестирования функции whoWork
    if(arry.includes(month)) {
        return 31 
    } 
    if(month !== 1) {
        return 30
    }
    if(year % 400 === 0) {
        return 29
    }
    if(year % 100 === 0) {
        return 28
    }
    if(year % 4 === 0) {
        return 29
    }
    return 28

}
