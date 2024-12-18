 import { ofzResponseMock } from "../../ofzResponseMock";








//1) Найти минимальную и максимальную ; срок жизни облигации в массиве.  нужно найти сколько осталось

//вариант с самой первой функцией, дописываю дни.  ЛЮБИМАЯ ФУНКЦИЯ!!! можно посмотреть в формате сколько осталось до года месяца и дня
function yearsToMaturity(matDate) {
    const today = new Date();

    const yearNow = today.getFullYear();
    const monthNow = today.getMonth() ; // Месяцы начинаются с 0, поэтому добавляем 1
    const dayNow = today.getDate();

    const finishYear = Number(matDate.split('-')[0]);
    const finishMonth = Number(matDate.split('-')[1]) - 1;
    const finishDay = Number(matDate.split('-')[2]);
    // console.log({finishDay,finishMonth,finishYear}, '❯')

    const restYear = finishYear - yearNow;
    const restMonth = finishMonth - monthNow;
    const restDays = finishDay - dayNow;

    let halperYear = restYear
    let halperMonth = restMonth;
    let halperDay = restDays;

    if(restDays < 0) {
        const previousMonthDays = new Date(finishYear, finishMonth, 0).getDate();
        halperDay += previousMonthDays;
        halperMonth -= 1;
    }
    if(restMonth < 0) {
        halperMonth += 12
        halperYear -= 1
    }
    //console.log(halperYear, halperMonth, halperDay)
    const result = halperYear + (halperMonth / 12) + (halperDay / 365)
   
    return result
}

// // Пример вызова
//console.log(yearsToMaturity("2033-03-23"), 'yearsToMaturity'); // Ожидаемый результат: 8.32418









 //2 вариант 
    function isLeapYear(year) {
   if (year % 400 === 0 ) {
    return true
  } 
    if (year % 100 === 0) {
      return false;
    }
    if(year % 4 === 0) {
      return true;
    } 
    return false;
  }

function calculateYearsLeft(endDate) {
    const todayDate = new Date();
    const endBondDate = new Date(endDate);
    
    let diffMs = endBondDate - todayDate; // Разница в миллисекундах
    let diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // Перевод в оставшиеся дни

    const currentYear = todayDate.getFullYear();
    const endYear = endBondDate.getFullYear();

    let fullYears = 0;

    // Учитываем полные годы
    for (let year = currentYear; year < endYear; year++) {
        const daysInYear = isLeapYear(year) ? 366 : 365;
        if (diffDays >= daysInYear) {
            diffDays -= daysInYear;
            fullYears += 1;
        } else {
            break; // Если оставшихся дней меньше чем в году, выходим из цикла
        }
    }

    
    const restMonth = new Date(endDate).getMonth();
    const todayMonth = new Date().getMonth();

    
    // Учитываем месяцы
    function daysInMonth (year, month) {
        //  console.log(year,month, new Date(year, month + 1, 0).getDate())
        return new Date(year, month + 1, 0).getDate(); // Последний день месяца
    };

    let remainingDays = diffDays; // Оставшиеся дни после вычитания полных лет
    let months = 0;

    let currentMonth = todayDate.getMonth(); // Начинаем с текущего месяца
    let yearForMonths = currentYear + fullYears; // Год для расчёта месяцев

    while (remainingDays > 0) {
        // console.log(yearForMonths, currentMonth)
        const daysInCurrentMonth = daysInMonth(yearForMonths, currentMonth);
        if (remainingDays >= daysInCurrentMonth) {
            remainingDays -= daysInCurrentMonth;
            months++;
            currentMonth++;

            // Переход на новый год
            if (currentMonth > 11) {
                currentMonth = 0; // Январь
                yearForMonths++; // Следующий год
            }
        } else {
            break;
        }
    }

    // Дни в текущем году для точного расчёта
    const daysInCurrentYear = isLeapYear(yearForMonths) ? 366 : 365;

    // Итоговые дробные годы
    
    const totalYears = fullYears + months / 12 + remainingDays / daysInCurrentYear;

    return totalYears; // Округляем до 5 знаков после запятой
}

// Пример вызова
// console.log(calculateYearsLeft("2033-03-23")); 




































