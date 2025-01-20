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
 function daysInMonth (month, year) {
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


//функция для убирания 0 после запятой в годах в десятичной дроби
export function integerNumber (num) {
    if(num === 0 || num === '0') return num
    console.log(num, '👿')
    const arr = num.split('.');
    // if(arr[1].length > 1) return num
    console.log(arr, arr[1][0])
    if(Number(arr[1][0]) === 0) {
      return arr[0]
    }
    return num
  }

  //функция подсчета до конца от сегодняшний даты до любой в будущем, возвращает в десятичной дроби.
export function calculateDecimalYears(todayDay, endDay, counterZoom) {
    if(todayDay === endDay) return 0
    // Преобразуем строки в объекты Date
    const startDate = new Date(todayDay);
    const endDate = new Date(endDay);
  
    // Получаем разницу в днях между двумя датами
    const diffInMs = endDate - startDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    // Функция для определения количества дней в году
    const getDaysInYear = (year) => (new Date(year, 11, 31) - new Date(year, 0, 0)) / (1000 * 60 * 60 * 24);
  
    // Рассчитываем полные годы между датами
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
  
    let remainingDays = diffInDays;
    let fullYears = 0;
  
    for (let year = startYear; year < endYear; year++) {
      const daysInYear = getDaysInYear(year);
      if (remainingDays >= daysInYear) {
        fullYears++;
        remainingDays -= daysInYear;
      } else {
        break;
      }
    }
  
    // Вычисляем дробную часть, представляющую месяцы
    const currentYearDays = getDaysInYear(startYear + fullYears);
    const decimalPart = remainingDays / currentYearDays;


    // Итоговый результат
    const result = fullYears + decimalPart;
    if(counterZoom === 3) {
      return result.toFixed(2)
    }
    
    return result.toFixed(1); 
  }




export function halperRestMap(arr, todayDate) {
    console.log({arr, todayDate})

    const sortedDates = arr.map(ofz => ofz.endDate).sort();
    const sortedPercents = arr.map(ofz => ofz.percent).sort((a, b) => a - b);


    //вычисляет последнюю дату, начиная с текущей даты, которая больше или равна самой поздней дате в массиве.
    const lastDate = calculateLastDate(todayDate, sortedDates, plusOneAge);

    return {
        minDate: todayDate,
        maxDate: lastDate,
        minPercent: Math.floor(sortedPercents[0]),
        maxPercent: Math.ceil(sortedPercents.at(-1)),
    }
    
}

//функция фильтрует и оставляет данные которые вышли за придели годов и процентов от min до max.
export function filterPointsWithinBorder(listData, calcsStrips) {
return listData.filter(
    (obj) =>
      obj.percent >= calcsStrips.minPercent &&
      obj.percent <= calcsStrips.maxPercent &&
      obj.endDate >= calcsStrips.minDate &&
      obj.endDate <= calcsStrips.maxDate
  )

}

// оборачиваю вычисления в функции handlePointerUp  созданная в компоненте.
export function calcEmphasizeSquare ( calcsStrips, selectionBox) {
    console.log(calcsStrips, selectionBox, '^^^')
    const { x, y, width, height } = selectionBox;
    const { minDate, maxDate, minPercent, maxPercent } = calcsStrips;

     // 2030     ↓                                   2050
    // |--------×-----------------------------------|
    // 0px      100px                               500px

    // 2030 + (2050 -2030) × 0.2 = 2034

    // Преобразуем даты в миллисекунды
    const minDateMs = date2ms(minDate);
    const maxDateMs = date2ms(maxDate);
    //вычисление для годов по оси x,  ms умножаен на проценты (но это не проценты. а дробь 0.185 = 18.5%)
    const minDateNew = minDateMs + (maxDateMs - minDateMs) * x;
    const maxDateNew = minDateMs + (maxDateMs - minDateMs) * (x + width);

    // Новые границы по X (даты)
    const minDateAfter = new Date(minDateNew).toISOString().split('T')[0];
    const maxDateAfter = new Date(maxDateNew).toISOString().split('T')[0];

    // // Новые границы по Y (проценты)
    let newMinPercent =
      minPercent + (maxPercent - minPercent) * (1 - (y + height));
    let newMaxPercent = minPercent + (maxPercent - minPercent) * (1 - y);

    return {
        minDate: minDateAfter,
        maxDate: maxDateAfter,
        minPercent: newMinPercent,
        maxPercent: newMaxPercent,
      }

}