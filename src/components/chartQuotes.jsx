import s from './list.module.css';
import { fetchOfzBonds } from '../requests/fetchList';
import { computeStripAgeAndPercentQuotes } from '../calcsFuncs/calcsQuotes/computYears&%';
import { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';

export function ChartQuotes() {
    const [ListData, setListData] = useState([])
    const [startPosition, setStartPosition] = useState(null)
    const [selectionBox, setSelectionBox] = useState(null);
    const [increasedData, setIncreasedData] = useState({})

    const divRef = useRef(null);
    useEffect(() => {
        fetchOfzBonds().then(data => {
            const ofzsSqueezeData = data.map(obj => {
                return {
                    name: obj.name,
                    percent: obj.yield,
                    endDate: obj.endDate,
                    yearsToEnd: obj.yearsToEnd,
                }
            })
                .filter(({ name }) => name.startsWith("ОФЗ 26"))
                .filter(({ percent }) => percent > 0);

            return ofzsSqueezeData
        })
            .then(data => {
                console.log(data, 'Squeeze')
                setListData(data)
            })
    }, [])


    if (ListData.length === 0) {
        return <div>...Loading</div>
    }

    const { points, horizontalData, verticalData } = computeStripAgeAndPercentQuotes(ListData)

    console.log(computeStripAgeAndPercentQuotes(ListData), '👄')

    // const sortedDates = ListData.map(ofz => ofz.endDate).sort();
    // const sortedPercents = ListData.map(ofz => ofz.percent).sort((a, b) => a - b);

    // const today = new Date();
    // const todayDate = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
    //     .map(x => x.toString().padStart(2, '0'))
    //     .join('-');


    // function plusOneAge(date) {
    //     const [year, month, day] = date.split('-').map(val => Number(val));

    //     return [year + 1, month, day]
    //         .map(x => x.toString().padStart(2, '0'))
    //         .join('-')
    // }

    // const lastDate = (() => {
    //     let year = todayDate;
    //     while (year < sortedDates.at(-1)) {
    //         year = plusOneAge(year);
    //     }
    //     return year;
    // })();

    // const minDate = todayDate; // sortedDates[0];
    // const maxDate = lastDate; // sortedDates.at(-1);

    // const minPercent = Math.floor(sortedPercents[0]);
    // const maxPercent = Math.ceil(sortedPercents.at(-1));

    // const date2ms = date => {
    //     const [y, m, d] = date.split("-").map(Number);
    //     return +new Date(y, m - 1, d);
    // };

    // const points = ListData.map(ofz => ({
    //     ofz,
    //     x: (date2ms(ofz.endDate) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate)),
    //     y: (ofz.percent - minPercent) / (maxPercent - minPercent),
    // }));

    // console.log(
    //     { sortedDates, sortedPercents, points },
    //     '***'
    // )

    // //данные для горизонтальной линии и %
    // const generateHorizontalData = (minPercent, maxPercent) => {
    //     const data = [];
    //     for (let i = 0; i <= maxPercent - minPercent; i++) {
    //         const percent = minPercent + i;
    //         const y = (percent - minPercent) / (maxPercent - minPercent);
    //         data.push({ percent, y });
    //     }
    //     return data;
    // };
    // const horizontalData = generateHorizontalData(minPercent, maxPercent)


    // //данне для вертикальной линии и годов
    // const generateVerticalData = (minDate, maxDate, date2ms, plusOneAge) => {
    //     const data = [];
    //     for (let date = minDate, year = 0; date < plusOneAge(maxDate); date = plusOneAge(date), year += 1) {
    //         const x = (date2ms(date) - date2ms(minDate)) / (date2ms(maxDate) - date2ms(minDate));
    //         data.push({ year, x });
    //     }
    //     return data;
    // };
    // const verticalData = generateVerticalData(minDate, maxDate, date2ms, plusOneAge);










    //Обработчики выделения координат
    function getCordinates(event) {
        const rect = divRef.current.getBoundingClientRect();

        console.log(rect, '🎃')
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        return { x, y }

    }
    function handlePointerDown(event) {
        // console.log(getCordinates(event), '||||')
        const position = getCordinates(event)
        setStartPosition(position)
        setSelectionBox({ x: position.x, y: position.y, width: 0, height: 0 }); // Начальная область
    }

    function handlePointerMove(event) {
        if (!startPosition) {
            return
        }
        const currentPosition = getCordinates(event)
        // console.log(currentPosition, '💄')
        const x = Math.min(startPosition.x, currentPosition.x);
        const y = Math.min(startPosition.y, currentPosition.y);
        const width = Math.abs(currentPosition.x - startPosition.x); // делаю Mathc.abs что бы всегда было положительным число, и не уходило в отрицательность
        const height = Math.abs(currentPosition.y - startPosition.y);

        setSelectionBox({ x: x, y: y, width, height })
    }


    function handlePointerUp(event) {
        const position = getCordinates(event)

        //данные выделеного окна
        const { x, y, width, height } = selectionBox;


        const scaleX = 1 / width; // Увеличение по горизонтали.
        const scaleY = 1 / height; // Увеличение по вертикали.

        // Сдвиг содержимого относительно выделенной области.
        const translateX = -(x * divRef.current.offsetWidth);
        const translateY = -(y * divRef.current.offsetHeight);

        setIncreasedData({ scaleX, scaleY, translateX, translateY });
        setStartPosition(null);


    }



    return (
        <>
            <div className={s.grid}

                // onPointerDown = {handlePointerDown}
                // onPointerUp = {handlePointerUp}
                // onPointerMove = {handlePointerMove}
                ref={divRef}
            >
                <div
                    className={s.zoomableContent}
                    style={{
                        transform: `scale(${increasedData.scaleX || 1}, ${increasedData.scaleY || 1}) translate(${increasedData.translateX || 0}px, ${increasedData.translateY || 0}px)`,
                        transformOrigin: '0 0',
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                >
                    {points.map(obj => {
                        //console.log(obj.x * 100, obj.y * 100 )
                        return (
                            <span
                                className={s.printPoint}
                                style={{
                                    left: `${obj.x * 100}%`,
                                    bottom: `${obj.y * 100}%`
                                }}
                            >
                                <div className={s.printInformation}>
                                    <h3>{obj.ofz.name}</h3>
                                    <div>{`Лет до погаш: ${obj.ofz.yearsToEnd}`}</div>
                                    <div>{`Доходнсть: ${obj.ofz.percent}%`}</div>
                                </div>
                                <span className={s.nameOfPoint} >{obj.ofz.name}</span>
                            </span>
                        )

                    })}


                </div>
                {/* Горизонтальные линии и значения процентов */}
                {horizontalData.map(({ percent, y }) => (
                    <div key={percent}>
                        <span className={s.horizontalValue} style={{ bottom: `${y * 100}%` }}>
                            {percent}%
                        </span>
                        <div className={s.horizontalLine} style={{ bottom: `${y * 100}%` }} />
                    </div>
                ))}

                {/* Вертикальные линии и значения годов */}
                {verticalData.map(({ year, x }) => (
                    <div key={year}>
                        <span className={s.verticalValue} style={{ left: `${x * 100}%` }}>
                            {year}
                        </span>
                        <div className={s.verticalLine} style={{ left: `${x * 100}%` }} />
                    </div>
                ))}
                {startPosition !== null && (
                    // <div style={{background: 'red', height: '4px', width: '4px', position: 'absolute', left: `${startPosition.x * 100}%`, top: `${startPosition.y * 100}%`, transform: 'translate(-50%, -50%)'}} ></div>
                    <div
                        style={{
                            position: 'absolute',
                            left: `${selectionBox.x * 100}%`,
                            top: `${selectionBox.y * 100}%`,
                            width: `${selectionBox.width * 100}%`,
                            height: `${selectionBox.height * 100}%`,
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            border: '1px dashed #007bff',
                            pointerEvents: 'none',
                        }}
                    ></div>
                )}


                <div style={{ position: 'absolute', top: '110%', left: '40%', whiteSpace: 'nowrap' }} > Лет до погашения </div>
                <div style={{ position: 'absolute', left: '-120px', top: '45%', transform: 'rotate(-90deg)' }} > Доходность % </div>
            </div>

        </>
    )
}




// return (
//     <div className={s.grid} ref={divRef}>
//         <div
//             className={s.zoomableContent}
//             style={{
//                 transform: `scale(${increasedData.scaleX || 1}, ${increasedData.scaleY || 1}) translate(${increasedData.translateX || 0}px, ${increasedData.translateY || 0}px)`,
//                 transformOrigin: '0 0',
//             }}
//             onPointerDown={handlePointerDown}
//             onPointerMove={handlePointerMove}
//             onPointerUp={handlePointerUp}
//         >
//             {points.map(obj => (
//                 <span
//                     className={s.printPoint}
//                     style={{
//                         left: `${obj.x * 100}%`,
//                         bottom: `${obj.y * 100}%`,
//                     }}
//                 >
//                     <div className={s.printInformation}>
//                         <h3>{obj.ofz.name}</h3>
//                         <div>{`Лет до погашения: ${obj.ofz.yearsToEnd}`}</div>
//                         <div>{`Доходность: ${obj.ofz.percent}%`}</div>
//                     </div>
//                     <span className={s.nameOfPoint}>{obj.ofz.name}</span>
//                 </span>
//             ))}

//             {horizontalData.map(({ percent, y }) => (
//                 <div key={percent}>
//                     <span className={s.horizontalValue} style={{ bottom: `${y * 100}%` }}>
//                         {percent}%
//                     </span>
//                     <div className={s.horizontalLine} style={{ bottom: `${y * 100}%` }} />
//                 </div>
//             ))}

//             {verticalData.map(({ year, x }) => (
//                 <div key={year}>
//                     <span className={s.verticalValue} style={{ left: `${x * 100}%` }}>
//                         {year}
//                     </span>
//                     <div className={s.verticalLine} style={{ left: `${x * 100}%` }} />
//                 </div>
//             ))}
//         </div>
//         {startPosition !== null && (
//             <div
//                 style={{
//                     position: 'absolute',
//                     left: `${selectionBox.x * 100}%`,
//                     top: `${selectionBox.y * 100}%`,
//                     width: `${selectionBox.width * 100}%`,
//                     height: `${selectionBox.height * 100}%`,
//                     backgroundColor: 'rgba(0, 123, 255, 0.1)',
//                     border: '1px dashed #007bff',
//                     pointerEvents: 'none',
//                 }}
//             ></div>
//         )}
//     </div>
// );
