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

//функция для подсчета остатка лет в десятичной дроби.
export function yearsToMaturityUpdate(today, maturityDate) {
    const  todayMs = date2ms(today);
    const endDayMs = date2ms(maturityDate);

    const difference = endDayMs - todayMs;

    const daysDifference = difference / (1000 * 60 * 60 * 24);

    const result = daysDifference / 365;
    if(result % 1 === 0) {
      return result
    }

    // //достаю первуюцифру после запятой
    // const checkFraction1 = Number(result.toString().split('.')[1][0]);
    // const checkFraction2 = Number(result.toString().split('.')[1][1])
    // console.log(result, checkFraction1, checkFraction2)
    
    // if(checkFraction1 > 0 && checkFraction2 === 0) {
    //  return result.toFixed(1);
    // }
    // if(checkFraction1 > 0 && checkFraction2 > 0) {
    //   return result.toFixed(2)
    // }
    // //  return result.toFixed(0)
      // Извлекаем дробную часть
  const fraction = result.toString().split('.')[1]; // Берем дробную часть
  const firstDigit = Number(fraction[0]); // Первая цифра после запятой
  const secondDigit = Number(fraction[1] || 0); // Вторая цифра после запятой (или 0, если ее нет)

  console.log(result, firstDigit, secondDigit, 'QQ'); // Для отладки

  if(firstDigit === 0 && secondDigit === 0) {
    return result.toFixed(0)
  }
  if (firstDigit > 1 && secondDigit === 0) {
      // Если первая цифра > 1, а вторая = 0, оставляем 1 знак после запятой
      return result.toFixed(1);
  } else if (firstDigit > 1 && secondDigit > 0) {
      // Если обе цифры больше 0, оставляем 2 знака после запятой
      return result.toFixed(2);
  } else {
      // Если первая цифра не подходит под условия, оставляем 1 знак после запятой
      return result.toFixed(1);
  }
}

console.log(yearsToMaturityUpdate('2024-12-27', '2026-12-27'), 'UPDATE')




export function halperRestMap(arr, todayDate) {

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
export function calcEmphasizeSquare ( calcsStrips, sizeDiv) {
    const { x, y, width, height } = sizeDiv;
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