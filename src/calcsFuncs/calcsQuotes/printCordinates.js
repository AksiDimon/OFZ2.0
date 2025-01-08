import { getTodayDate, plusOneAge, yearsToMaturityUpdate } from './halperDates';
import { date2ms } from './halperDates';

//данные для горизонтальной линии и %
//помогает создать массив объектов с процентами и  пикселями по оси Y . пример ({percent: 12, y: 0,12049378443})
// моя версия
//  export const generateHorizontalData = (minPercent, maxPercent) => {
//     const data = [];

//     //Добавляем начальный процент
//     data.push(
//         {
//             percent: minPercent.toFixed(2),
//             y: (minPercent - minPercent) / (maxPercent - minPercent),
//         }
//     )

//     //добавляем промежуточные профенты до maxPercent
//     let currentPercent = minPercent + 1;
//     while(true) {

//         if(currentPercent >= maxPercent) {
//             break
//         }
//         data.push(
//             {
//                 percent: currentPercent.toFixed(2),
//                 y: (currentPercent - minPercent) / (maxPercent - minPercent),
//             }
//         )
//         currentPercent += 1
//     }

//     //Добавляем конечный процент выбранного диапазона
//     data.push({
//         percent: maxPercent.toFixed(2),
//         y: (maxPercent - minPercent) / (maxPercent - minPercent),
//     })
//     // let coof = 1
//     // for (let i = 0; i <= maxPercent - minPercent; i += 1/coof) {
//     //     const percent = minPercent + i;
//     //     const y = (percent - minPercent) / (maxPercent - minPercent);
//     //     data.push({ percent, y });
//     // }
//      // условие для пересчета если data.length < 6
//     if(data.length < 6) {
//         const arr = []

//        const breakPart = (maxPercent - minPercent) / 6;
//        console.log(breakPart, '🥸')
//        arr.push(
//         {
//             percent: minPercent.toFixed(2),
//             y: (minPercent - minPercent) / (maxPercent - minPercent),
//         })
//         let currentPercent = minPercent + breakPart;
//         while(true) {
//             if(currentPercent >= maxPercent) {
//                 break
//             }

//             arr.push({
//                 percent: currentPercent.toFixed(3),
//                 y: (currentPercent - minPercent) / (maxPercent - minPercent),
//             })
//             currentPercent += breakPart;
//         }

//         arr.push({
//             percent: maxPercent.toFixed(2),
//             y: (maxPercent - minPercent) / (maxPercent - minPercent)
//         })
//         console.log(arr, '😛2')
//         return arr

//     }
//     console.log(data, '😛1')
//     return data;
// };

//gptVersion
export const generateHorizontalData = (minPercent, maxPercent, counterZoom) => {
  const calculateData = (start, end, steps, precision) => {
    const result = [];
    const step = (end - start) / (steps - 1); // Равномерное деление диапазона
    for (let i = 0; i < steps; i++) {
      const percent = start + i * step;
      result.push({
        percent: percent.toFixed(precision),
        y: (percent - minPercent) / (maxPercent - minPercent),
      });
    }
    return result;
  };

  // Базовое деление с шагом 1
  let data = calculateData(
    minPercent,
    maxPercent,
    Math.ceil(maxPercent - minPercent) + 1,
    counterZoom
  );

  // Пересчёт, если точек меньше 6
  if (data.length < 6) {
    data = calculateData(minPercent, maxPercent, 6, counterZoom);
  }
  // if (data.length < 2) {
  //     data = calculateData(minPercent, maxPercent, 4, 3);
  // }
  // if (data.length = ) {
  //     data = calculateData(minPercent, maxPercent, 6, 2);
  // }
  // console.log(data,counterZoom, '😎')
  return data;
};


export const generateVerticalData = (minDate, maxDate, date2ms, counterZoom) => {
  const todayDate = getTodayDate(); // Например, '2024-12-23'
  // const todayDate = "2024-06-23"
  //    const todayDate = "2024-12-23"
  const [todayMonth, todayDay] = todayDate.split('-').slice(1).map(Number);

  const data = [];

  // Добавляем начальную дату 
  if(counterZoom === 1) {
    data.push({
    year: Number(minDate.split('-')[0]),
    x:
      (date2ms(minDate) - date2ms(minDate)) /
      (date2ms(maxDate) - date2ms(minDate)),
    date: minDate,
  });

  data.push({
    year: Number(maxDate.split('-')[0]),
    x:
      (date2ms(maxDate) - date2ms(minDate)) /
      (date2ms(maxDate) - date2ms(minDate)),
    date: maxDate,
  });
  }
  

  const [minYear, minMonth, minDay] = minDate.split('-').map(Number);
  const currentYearTodayDate = [minYear, todayMonth, todayDay]
    .map((x) => x.toString().padStart(2, '0'))
    .join('-');

  // Если текущая дата (месяц/день) в этом году попадает в диапазон, добавляем её
  if (
    date2ms(currentYearTodayDate) > date2ms(minDate) && date2ms(currentYearTodayDate) < date2ms(maxDate)
  ) {
    data.push({
      year: minYear,
      x:
        (date2ms(currentYearTodayDate) - date2ms(minDate)) /
        (date2ms(maxDate) - date2ms(minDate)),
      date: currentYearTodayDate,
    });
  }

  // Переходим к следующему году
  let currentYear = minYear + 1;
  while (true) {
    const nextDate = [currentYear, todayMonth, todayDay]
      .map((x) => x.toString().padStart(2, '0'))
      .join('-');

    // Если превышаем maxDate, останавливаем
    if (date2ms(nextDate) > date2ms(maxDate)) {
      break;
    }

    data.push({
        // year:  yearsToMaturityUpdate(todayDate, nextDate),
      year: currentYear,
      x:
        (date2ms(nextDate) - date2ms(minDate)) /
        (date2ms(maxDate) - date2ms(minDate)),
      date: nextDate,
    });

    currentYear++;
  }

  // Добавляем maxDate, если она ещё не была добавлена
//   if (data.length === 0 || data.at(-1).date !== maxDate) {
//     data.push({
//       year: Number(maxDate.split('-')[0]),
//       x:
//         (date2ms(maxDate) - date2ms(minDate)) /
//         (date2ms(maxDate) - date2ms(minDate)),
//       date: maxDate,
//     });
//   }
  

  //добавляю месяца.
  if (data.length < 5) {
    const monthlyData = generateMonthlyData(minDate, maxDate, date2ms);

    const fusionYearsAndMonth = [...data, ...monthlyData].sort(
      (a, b) => date2ms(a.date) - date2ms(b.date)
    );
    const startEndDates = [
      fusionYearsAndMonth.at(0),
      fusionYearsAndMonth.at(-1),
    ];
    //фильтр убирающий месяца по бокам от нового года приувеличении
    // const filter = fusionYearsAndMonth.filter(obj => {
    //     return obj.month !== 1 && obj.month !== 12 && obj.x > 0
    // })
    const filter = fusionYearsAndMonth.filter((obj, i) => {
      return Object.values(obj).length !== 3 && obj.x > 0;
    });
    const result = [
    //   fusionYearsAndMonth.at(0),
      ...filter,
    //   fusionYearsAndMonth.at(-1),
    ];

    // if (data.length < 3) {
    //     const daysData = generateDaysData(minDate, maxDate, date2ms);
    //     const fusionMonthAndDays = [...monthlyData, ...daysData].sort(
    //         (a, b) => date2ms(a.date) - date2ms(b.date)
    //       )
    //       .filter(obj => Object.values(obj).length !== 4)
    //       console.log(fusionMonthAndDays, 'POPS');
    //       return fusionMonthAndDays;
      
    // }
    console.log(filter, '!!!@👹');
    return result;
  }

  console.log(data,
    data.filter((obj, i) => i !== 0  && i !== obj.length - 1),
    counterZoom,
     '!!!@!');

// if(counterZoom > 1) {
// return data.filter((obj, i) => i !== 1  && i !== obj.length - 2)
// }
return data
};


// Функция для добавления дат по месяцам
const generateMonthlyData = (minDate, maxDate, date2ms) => {
  const todayDate = getTodayDate();
  const [todayMonth, todayDay] = todayDate.split('-').slice(1).map(Number);
  const [minYear, minMonth, minDay] = minDate.split('-').map(Number);


  const data = [];
  let currentYear = minYear;
  let currentMonth = minMonth;

  while (true) {
    const nextDate = [currentYear, currentMonth, todayDay]
      .map((x) => x.toString().padStart(2, '0'))
      .join('-');

    if (date2ms(nextDate) > date2ms(maxDate)) {
      break;
    }

    data.push({
      year: currentYear,
      month: currentMonth,
      x:
        (date2ms(nextDate) - date2ms(minDate)) /
        (date2ms(maxDate) - date2ms(minDate)),
      date: nextDate,
    });

    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  return data;
};



// Функция для добавления дат по дням.
function generateDaysData(minDate, maxDate, date2ms) {

  const [minYear, minMonth, minDay] = minDate.split('-').map(Number);

  const data = [];
  let currentYear = minYear;
  let currentMonth = minMonth;
  let currentDay = minDay;


  while (true) {
    const quantityDays = new Date(currentYear, currentMonth, 0).getDate(); // узнаю количество дней в месяце
    const nextDate = [currentYear, currentMonth, currentDay]
      .map((x) => x.toString().padStart(2, '0'))
      .join('-');
      
    if (date2ms(nextDate) > date2ms(maxDate)) {
      break;
    }

    data.push({
      x: (date2ms(nextDate) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate)),
      date: nextDate,
      day: currentDay,
    });
    currentDay += 1
    if (currentDay > quantityDays) {
        currentDay = 1
        currentMonth += 1;
      
      if(currentMonth > 12) {
        currentMonth = 1
        currentYear += 1
      }
    }
    
  }

  console.log(data,  'QWER')
  return data;
}




