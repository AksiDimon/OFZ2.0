// import s from './list.module.css';
// import { fetchOfzBonds } from '../requests/fetchList';
// import { useState, useEffect, useRef } from 'react';

// export function ChartQuotesGpt() {
//     const [ListData, setListData] = useState([]);
//     const [selectionBox, setSelectionBox] = useState(null);
//     const [startPosition, setStartPosition] = useState(null);

//     const divRef = useRef(null);

//     // Получаем данные об облигациях
//     useEffect(() => {
//         fetchOfzBonds().then(data => {
//             const ofzsSqueezeData = data
//                 .map(obj => ({
//                     name: obj.name,
//                     percent: obj.yield,
//                     endDate: obj.endDate,
//                     yearsToEnd: obj.yearsToEnd,
//                 }))
//                 .filter(({ name }) => name.startsWith("ОФЗ 26"))
//                 .filter(({ percent }) => percent > 0);

//             setListData(ofzsSqueezeData);
//         });
//     }, []);

//     if (ListData.length === 0) {
//         return <div>...Loading</div>;
//     }

//     // Сортировка данных
//     const sortedDates = ListData.map(ofz => ofz.endDate).sort();
//     const sortedPercents = ListData.map(ofz => ofz.percent).sort((a, b) => a - b);

//     const today = new Date();
//     const todayDate = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
//         .map(x => x.toString().padStart(2, '0'))
//         .join('-');

//     function plusOneAge(date) {
//         const [year, month, day] = date.split('-').map(Number);
//         return [year + 1, month, day]
//             .map(x => x.toString().padStart(2, '0'))
//             .join('-');
//     }

//     const lastDate = (() => {
//         let year = todayDate;
//         while (year < sortedDates.at(-1)) {
//             year = plusOneAge(year);
//         }
//         return year;
//     })();

//     const minDate = todayDate;
//     const maxDate = lastDate;

//     const minPercent = Math.floor(sortedPercents[0]);
//     const maxPercent = Math.ceil(sortedPercents.at(-1));

//     const date2ms = date => {
//         const [y, m, d] = date.split("-").map(Number);
//         return +new Date(y, m - 1, d);
//     };

//     const points = ListData.map(ofz => ({
//         ofz,
//         x: (date2ms(ofz.endDate) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate)),
//         y: (ofz.percent - minPercent) / (maxPercent - minPercent),
//     }));

//     // Горизонтальные линии
//     const generateHorizontalData = (minPercent, maxPercent) => {
//         const data = [];
//         for (let i = 0; i <= maxPercent - minPercent; i++) {
//             const percent = minPercent + i;
//             const y = (percent - minPercent) / (maxPercent - minPercent);
//             data.push({ percent, y });
//         }
//         return data;
//     };
//     const horizontalData = generateHorizontalData(minPercent, maxPercent);

//     // Вертикальные линии
//     const generateVerticalData = (minDate, maxDate, date2ms, plusOneAge) => {
//         const data = [];
//         for (let date = minDate, year = 0; date < plusOneAge(maxDate); date = plusOneAge(date), year += 1) {
//             const x = (date2ms(date) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate));
//             data.push({ year, x });
//         }
//         return data;
//     };
//     const verticalData = generateVerticalData(minDate, maxDate, date2ms, plusOneAge);

//     // Получаем координаты
//     function getCoordinates(event) {
//         const rect = divRef.current.getBoundingClientRect();
//         const x = (event.clientX - rect.left) / rect.width;
//         const y = (event.clientY - rect.top) / rect.height;
//         return { x, y };
//     }

//     // Обработчики событий
//     function handlePointerDown(event) {
//         const position = getCoordinates(event);
//         setStartPosition(position);
//         setSelectionBox({ x: position.x, y: position.y, width: 0, height: 0 });
//     }

//     function handlePointerMove(event) {
//         if (!startPosition) return;

//         const currentPosition = getCoordinates(event);
//         const x = Math.min(startPosition.x, currentPosition.x);
//         const y = Math.min(startPosition.y, currentPosition.y);
//         const width = Math.abs(currentPosition.x - startPosition.x);
//         const height = Math.abs(currentPosition.y - startPosition.y);

//         setSelectionBox({ x, y, width, height });
//     }

//     function handlePointerUp(event) {
//         console.log("Выделенная область:", selectionBox);
//         setStartPosition(null);
//     }

//     return (
//         <div
//             className={s.grid}
//             onPointerDown={handlePointerDown}
//             onPointerMove={handlePointerMove}
//             onPointerUp={handlePointerUp}
//             ref={divRef}
//         >
//             {/* Область выделения */}
//             {selectionBox && (
//                 <div
//                     style={{
//                         position: 'absolute',
//                         left: `${selectionBox.x * 100}%`,
//                         top: `${selectionBox.y * 100}%`,
//                         width: `${selectionBox.width * 100}%`,
//                         height: `${selectionBox.height * 100}%`,
//                         backgroundColor: 'rgba(0, 123, 255, 0.3)',
//                         border: '1px dashed #007bff',
//                         pointerEvents: 'none',
//                     }}
//                 ></div>
//             )}

//             {/* Точки данных */}
//             {points.map(obj => (
//                 <span
//                     className={s.printPoint}
//                     style={{
//                         left: `${obj.x * 100}%`,
//                         bottom: `${obj.y * 100}%`,
//                     }}
//                     key={obj.ofz.name}
//                 >
//                     <div className={s.printInformation}>
//                         <h3>{obj.ofz.name}</h3>
//                         <div>{`Лет до погаш: ${obj.ofz.yearsToEnd}`}</div>
//                         <div>{`Доходность: ${obj.ofz.percent}%`}</div>
//                     </div>
//                     <span className={s.nameOfPoint}>{obj.ofz.name}</span>
//                 </span>
//             ))}

//             {/* Горизонтальные линии */}
//             {horizontalData.map(({ percent, y }) => (
//                 <div key={percent}>
//                     <span className={s.horizontalValue} style={{ bottom: `${y * 100}%` }}>
//                         {percent}%
//                     </span>
//                     <div className={s.horizontalLine} style={{ bottom: `${y * 100}%` }} />
//                 </div>
//             ))}

//             {/* Вертикальные линии */}
//             {verticalData.map(({ year, x }) => (
//                 <div key={year}>
//                     <span className={s.verticalValue} style={{ left: `${x * 100}%` }}>
//                         {year}
//                     </span>
//                     <div className={s.verticalLine} style={{ left: `${x * 100}%` }} />
//                 </div>
//             ))}

//             {/* Оси подписей */}
//             <div style={{ position: 'absolute', top: '110%', left: '40%', whiteSpace: 'nowrap' }}>
//                 Лет до погашения
//             </div>
//             <div style={{ position: 'absolute', left: '-120px', top: '45%', transform: 'rotate(-90deg)' }}>
//                 Доходность %
//             </div>
//         </div>
//     );
// }



import s from './list.module.css';
import { fetchOfzBonds } from '../requests/fetchList';
import { useState, useEffect, useRef } from 'react';
import { computeStripAgeAndPercentQuotes } from '../calcsFuncs/calcsQuotes/computYears&%';
export function ChartQuotesGpt() {
    const [ListData, setListData] = useState([]);
    const [selectionBox, setSelectionBox] = useState(null);
    const [startPosition, setStartPosition] = useState(null);

    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [minPercent, setMinPercent] = useState(null);
    const [maxPercent, setMaxPercent] = useState(null);

    const originalRange = useRef({}); // Для хранения исходных диапазонов

    const divRef = useRef(null);

    // Получаем данные об облигациях
    useEffect(() => {
        fetchOfzBonds().then(data => {
            const ofzsSqueezeData = data
                .map(obj => ({
                    name: obj.name,
                    percent: obj.yield,
                    endDate: obj.endDate,
                    yearsToEnd: obj.yearsToEnd,
                }))
                .filter(({ name }) => name.startsWith("ОФЗ 26"))
                .filter(({ percent }) => percent > 0);

            setListData(ofzsSqueezeData);

            // Устанавливаем исходные диапазоны
            const sortedDates = ofzsSqueezeData.map(ofz => ofz.endDate).sort();
            const sortedPercents = ofzsSqueezeData.map(ofz => ofz.percent).sort((a, b) => a - b);

            const today = new Date();
            const todayDate = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
                .map(x => x.toString().padStart(2, '0'))
                .join('-');

            function plusOneAge(date) {
                const [year, month, day] = date.split('-').map(Number);
                return [year + 1, month, day]
                    .map(x => x.toString().padStart(2, '0'))
                    .join('-');
            }

            const lastDate = (() => {
                let year = todayDate;
                while (year < sortedDates.at(-1)) {
                    year = plusOneAge(year);
                }
                return year;
            })();

            const minP = Math.floor(sortedPercents[0]);
            const maxP = Math.ceil(sortedPercents.at(-1));

            setMinDate(todayDate);
            setMaxDate(lastDate);
            setMinPercent(minP);
            setMaxPercent(maxP);

            // Сохраняем оригинальные значения для сброса
            originalRange.current = {
                minDate: todayDate,
                maxDate: lastDate,
                minPercent: minP,
                maxPercent: maxP,
            };
        });
    }, []);

    const date2ms = date => {
        const [y, m, d] = date.split("-").map(Number);
        return +new Date(y, m - 1, d);
    };

    // Получаем координаты
    function getCoordinates(event) {
        const rect = divRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        return { x, y };
    }

    // Обработчики событий
    function handlePointerDown(event) {
        const position = getCoordinates(event);
        setStartPosition(position);
        setSelectionBox({ x: position.x, y: position.y, width: 0, height: 0 });
    }

    function handlePointerMove(event) {
        if (!startPosition) return;

        const currentPosition = getCoordinates(event);
        const x = Math.min(startPosition.x, currentPosition.x);
        const y = Math.min(startPosition.y, currentPosition.y);
        const width = Math.abs(currentPosition.x - startPosition.x);
        const height = Math.abs(currentPosition.y - startPosition.y);

        setSelectionBox({ x, y, width, height });
    }

    function handlePointerUp() {
        if (!selectionBox) return;

        // Обновляем диапазон на основе выделенной области
        const newMinDate = date2ms(minDate) + selectionBox.x * (date2ms(maxDate) - date2ms(minDate));
        const newMaxDate = date2ms(minDate) + (selectionBox.x + selectionBox.width) * (date2ms(maxDate) - date2ms(minDate));
        const newMinPercent = minPercent + selectionBox.y * (maxPercent - minPercent);
        const newMaxPercent = minPercent + (selectionBox.y + selectionBox.height) * (maxPercent - minPercent);

        setMinDate(new Date(newMinDate).toISOString().split('T')[0]);
        setMaxDate(new Date(newMaxDate).toISOString().split('T')[0]);
        setMinPercent(newMinPercent);
        setMaxPercent(newMaxPercent);

        // Сброс состояния выделения
        setStartPosition(null);
        setSelectionBox(null);
    }

    function resetZoom() {
        setMinDate(originalRange.current.minDate);
        setMaxDate(originalRange.current.maxDate);
        setMinPercent(originalRange.current.minPercent);
        setMaxPercent(originalRange.current.maxPercent);
    }

    const points = ListData.map(ofz => ({
        ofz,
        x: (date2ms(ofz.endDate) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate)),
        y: (ofz.percent - minPercent) / (maxPercent - minPercent),
    }));

    return (
        <div
            className={s.grid}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            ref={divRef}
        >
            {/* Область выделения */}
            {selectionBox && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${selectionBox.x * 100}%`,
                        top: `${selectionBox.y * 100}%`,
                        width: `${selectionBox.width * 100}%`,
                        height: `${selectionBox.height * 100}%`,
                        backgroundColor: 'rgba(0, 123, 255, 0.3)',
                        border: '1px dashed #007bff',
                        pointerEvents: 'none',
                    }}
                ></div>
            )}

            {/* Кнопка сброса масштаба */}
            <button
                style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
                onClick={resetZoom}
            >
                Сбросить масштаб
            </button>

            {/* Точки данных */}
            {points.map(obj => (
                <span
                    key={obj.ofz.name}
                    className={s.printPoint}
                    style={{
                        left: `${obj.x * 100}%`,
                        bottom: `${obj.y * 100}%`,
                    }}
                ></span>
            ))}
        </div>
    );
}
