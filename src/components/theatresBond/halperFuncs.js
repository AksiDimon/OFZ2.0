import { getTodayDate } from "../../calcsFuncs/calcsQuotes/halperDates";
export function validateDate(inputDate, minDate, maxDate) {
  const inputDateMs = new Date(inputDate);
  const minDateMs = new Date(minDate);
  const maxDateMs = new Date(maxDate);

  if (inputDateMs < minDateMs) {
    return minDate;
  }
  if (inputDateMs > maxDateMs) {
    return maxDate;
  }
  if (maxDate.slice('-')[2].includes('00')) {
    console.log(maxDate.slice('-')[2]);
    return maxDate;
  }
  return inputDate;
}




export function calculateCalasStrips(pointsDays, rate, selectedCurrency,) {
    // console.log(pointsDays, rate, selectedCurrency, '🍎')
  const sortedСostInPercents = pointsDays
    .map((day) => day.close)
    .sort((a, b) => a - b);

  const sortedDates = pointsDays.map((day) => day.end.split(' ')[0]).sort();

  if (selectedCurrency === 'RUB') {
    const sortedСostInRub = sortedСostInPercents.map((percent) => {
      return (percent / 100) * 1000 * rate;
    });

    const result = {
      minDate: sortedDates[0],
      maxDate: sortedDates.at(-1),
      minPercent: Number(sortedСostInRub[0].toFixed(0)),
      maxPercent: Number(sortedСostInRub.at(-1).toFixed(0)),
    };
    console.log(result, sortedDates, '🥝')
    return result
  } else if (selectedCurrency === '% от Номинала') {
    const result = {
      minDate: sortedDates[0],
      maxDate: sortedDates.at(-1),
      minPercent: sortedСostInPercents[0],
      maxPercent: sortedСostInPercents.at(-1),
    }

    return result
  } else if (selectedCurrency = 'ofz in Usd') {
    const costOfzInUsd = sortedСostInPercents.map((percent) => {
        const costInRub = (percent / 100) * 1000 
        return  costInRub / rate
    })

    const result = {
        minDate: sortedDates[0],
        maxDate: sortedDates.at(-1),
        minPercent: costOfzInUsd[0],
        maxPercent: costOfzInUsd.at(-1),
    }
    console.log('🥩', costOfzInUsd[0],costOfzInUsd.at(-1) )
    return result
    }

  return {}
}



export function fixedDate (date) {
   if(date === null)  return getTodayDate();
   
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((x) => x.toString().padStart(2, '0')) // Добавляем ведущие нули
    .join('-'); // Преобразуем массив в строку через '-'
}


//Тимофей Валерьевич Мартынов — создатель сайта «Смарт-Лаб», посвящённого биржевой торговле

// Опыт 1.5 года

// Разработка приложения для мониторинга финансовых инструментов (облигации, акции). Интеграция с API Московской биржи. Графики (с возможностью выбора отображения), калькуляторы доходности, личный кабинет с сохранением избранных инструментов.

// Команда из 5¹⁄₂ человек: продукт оунер, два бэкендера (фулстека), дизайнер, тестировщик (шарили с другой командой), я был основныи и единственым фронтендером

// Технологии:
// React, Redux (redux-toolkit), CSS-modules
// Тесты: jest + react-react-tesing-library     //Unit-Testing/Jest
// Задачи в Jira, макеты в Figma
// Gitlab CI/CD


//О себе:
// Знание Английского, Работа по скраму были и такие и такие встечи




//Вопросы_______________________
// если спросят про то что сколько комнанд вообще работало, и и как сказать за какую часть я отвечал ?  за создания ui kit с графиками ?







//3. Разработал и внедрил общий boilerplate для ускорения разработки новых проектов;
//, RTK Query,  Styled-Components, Sass modules, React-Hook-Form, Zod,  Bitbucked, Сonfluence, Jira,  JQuery • AJAX • Kendo UI ,Jade, jenkins, nest


//может быть можно такое напистаь ? Информационные технологии, системная интеграция, интернет Разработка программного обеспечения
//Исправил баги валидации в формах, что позволило увеличить выручку компании;


//Для связи можно использовать:
// Telegram (предпочтительно), WhatsApp - 8(995)169-61-97