


export function computeStripAgeAndPercentQuotes(ListData) {

    const sortedDates = ListData.map(ofz => ofz.endDate).sort();
    const sortedPercents = ListData.map(ofz => ofz.percent).sort((a, b) => a - b);
    
    const today = new Date();
    const todayDate = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
        .map(x => x.toString().padStart(2, '0'))
        .join('-');


    function plusOneAge(date) {
        const [year, month, day] = date.split('-').map(val => Number(val));

        return [year + 1, month, day]
            .map(x => x.toString().padStart(2, '0'))
            .join('-')
    }

    const lastDate = (() => {
        let year = todayDate;
        while (year < sortedDates.at(-1)) {
            year = plusOneAge(year);
        }
        return year;
    })();

    const minDate = todayDate; // sortedDates[0];
    const maxDate = lastDate; // sortedDates.at(-1);

    const minPercent = Math.floor(sortedPercents[0]);
    const maxPercent = Math.ceil(sortedPercents.at(-1));

    const date2ms = date => {
        const [y, m, d] = date.split("-").map(Number);
        return +new Date(y, m - 1, d);
    };

    const points = ListData.map(ofz => ({
        ofz,
        x: (date2ms(ofz.endDate) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate)),
        y: (ofz.percent - minPercent) / (maxPercent - minPercent),
    }));

    // console.log(
    //     { sortedDates, sortedPercents, points },
    //     '***'
    // )

    //данные для горизонтальной линии и %
    const generateHorizontalData = (minPercent, maxPercent) => {
        const data = [];
        for (let i = 0; i <= maxPercent - minPercent; i++) {
            const percent = minPercent + i;
            const y = (percent - minPercent) / (maxPercent - minPercent);
            data.push({ percent, y });
        }
        return data;
    };
    const horizontalData = generateHorizontalData(minPercent, maxPercent)


    //данне для вертикальной линии и годов
    const generateVerticalData = (minDate, maxDate, date2ms, plusOneAge) => {
        const data = [];
        for (let date = minDate, year = 0; date < plusOneAge(maxDate); date = plusOneAge(date), year += 1) {
            const x = (date2ms(date) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate));
            data.push({ year, x });
        }
        return data;
    };
    const verticalData = generateVerticalData(minDate, maxDate, date2ms, plusOneAge);

 return {points, horizontalData, verticalData}
}
// // Функция для запроса данных
// export  function fetchAndProcessOfzData(fetchFunction) {
//     return fetchFunction().then(data => {
//         // Обработка данных
//     return data
//         .map(obj => ({
//             name: obj.name,
//             percent: obj.yield,
//             endDate: obj.endDate,
//             yearsToEnd: obj.yearsToEnd,
//         }))
//         .filter(({ name }) => name.startsWith("ОФЗ 26"))
//         .filter(({ percent }) => percent > 0);
//     })
    

    
// }

// // Вспомогательная функция для преобразования даты в миллисекунды
// export const date2ms = (date) => {
//     const [y, m, d] = date.split("-").map(Number);
//     return +new Date(y, m - 1, d);
// };

// // Функция для вычисления следующей даты
// export const plusOneAge = (date) => {
//     const [year, month, day] = date.split('-').map(Number);
//     return [year + 1, month, day]
//         .map(x => x.toString().padStart(2, '0'))
//         .join('-');
// };

// // Функция для генерации горизонтальных линий
// export const generateHorizontalData = (minPercent, maxPercent) => {
//     const data = [];
//     for (let i = 0; i <= maxPercent - minPercent; i++) {
//         const percent = minPercent + i;
//         const y = (percent - minPercent) / (maxPercent - minPercent);
//         data.push({ percent, y });
//     }
//     return data;
// };

// // Функция для генерации вертикальных линий
// export const generateVerticalData = (minDate, maxDate, date2ms, plusOneAge) => {
//     const data = [];
//     for (let date = minDate, year = 0; date < plusOneAge(maxDate); date = plusOneAge(date), year += 1) {
//         const x = (date2ms(date) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate));
//         data.push({ year, x });
//     }
//     return data;
// };
