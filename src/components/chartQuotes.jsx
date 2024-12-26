import s from './list.module.css';
import { fetchOfzBonds } from '../requests/fetchList';
import { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { plusOneAge, getTodayDate, calculateLastDate, date2ms } from '../calcsFuncs/calcsQuotes/halperDates';
import { generateHorizontalData, generateVerticalData } from '../calcsFuncs/calcsQuotes/printCordinates';



const todayDate = getTodayDate();


export function ChartQuotes() {
    const [ListData, setListData] = useState([])
    const [restMap, setRestMap] = useState([])
    const [startPosition, setStartPosition] = useState(null)
    const [selectionBox, setSelectionBox] = useState(null);
    const [increasedData, setIncreasedData] = useState({});

    const [calcsStrips, setCalcsStrips] = useState(null);
    const [counterZoom, setCounterZoom] = useState(0); //стэйт для процентов по Y скольконулей должно быть после запятой.

    console.log(calcsStrips, '😍', counterZoom)
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

                const sortedDates = data.map(ofz => ofz.endDate).sort();
                const sortedPercents = data.map(ofz => ofz.percent).sort((a, b) => a - b);


                //вычисляет последнюю дату, начиная с текущей даты, которая больше или равна самой поздней дате в массиве.
                const lastDate = calculateLastDate(todayDate, sortedDates, plusOneAge);
                


                setCalcsStrips({
                    minDate: todayDate,
                    maxDate: lastDate,
                    minPercent: Math.floor(sortedPercents[0]),
                    maxPercent: Math.ceil(sortedPercents.at(-1)),
                })

                setRestMap({
                    minDate: todayDate,
                    maxDate: lastDate,
                    minPercent: Math.floor(sortedPercents[0]),
                    maxPercent: Math.ceil(sortedPercents.at(-1)),
                })
            })
    }, [])


    if (ListData.length === 0 || calcsStrips === null) {
        return <div>...Loading</div>
    }



    const points = ListData
    .filter(obj => obj.percent >= calcsStrips.minPercent && obj.percent <= calcsStrips.maxPercent && obj.endDate >= calcsStrips.minDate && obj.endDate <= calcsStrips.maxDate )
    .map(ofz => ({
        ofz,
        x: (date2ms(ofz.endDate) - date2ms(calcsStrips.minDate)) / (date2ms(calcsStrips.maxDate) - date2ms(calcsStrips.minDate)),
        y: (ofz.percent - calcsStrips.minPercent) / (calcsStrips.maxPercent - calcsStrips.minPercent),
    }));

    console.log(
        // { sortedDates, sortedPercents, points },
        calcsStrips,
        ListData,
        points,
        '***'
    )


    const horizontalData = generateHorizontalData(calcsStrips.minPercent, calcsStrips.maxPercent, counterZoom)

    const verticalData = generateVerticalData(calcsStrips.minDate, calcsStrips.maxDate, date2ms, plusOneAge);










    //Обработчики выделения координат
    function getCordinates(event) {
        const rect = divRef.current.getBoundingClientRect();

        // console.log(rect, '🎃')
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
        const endPoint = getCordinates(event)

        //данные выделеного окна 
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
        const minDateNew = minDateMs + (maxDateMs - minDateMs) * x
        const maxDateNew = minDateMs + (maxDateMs - minDateMs) * (x + width);


        // Новые границы по X (даты)
        const minDateAfter = new Date(minDateNew).toISOString().split('T')[0];
        const maxDateAfter = new Date(maxDateNew).toISOString().split('T')[0];


        // // Новые границы по Y (проценты)
        let newMinPercent = minPercent + (maxPercent - minPercent) *  (1 - (y + height));
        let newMaxPercent = minPercent + (maxPercent - minPercent) * (1 - y)

        setCalcsStrips((prev) => {
            return {
                
                minDate: minDateAfter,
                maxDate: maxDateAfter,
                minPercent: newMinPercent,
                maxPercent: newMaxPercent,
            }
        })

        // const sortedDates = ListData.map(ofz => ofz.endDate).sort();
        // const lastDate = calculateLastDate(todayDate, sortedDates, plusOneAge);
         console.log(calcsStrips, '🥲')

        setStartPosition(null);
    }


function handleRestMap () {
     setCalcsStrips(restMap)
     setCounterZoom(0) //сбрасываю точки после запятой в процентах, так как это не сделать здесь, они останутся, при сбрасывании. 
}


    return (
        <>
        <button
            onClick={handleRestMap}
            > rest</button>
            <div className={s.grid}
             
                // onPointerDown = {handlePointerDown}
                // onPointerUp = {handlePointerUp}
                // onPointerMove = {handlePointerMove}
                ref={divRef}
            >
                
                {/* Горизонтальные линии и значения процентов */}
                {horizontalData.map(({ percent, y }, index) => (
                    <div key={index}>
                        <span className={s.horizontalValue} style={{ bottom: `${y * 100}%` }}>
                            {percent}%
                        </span>
                        <div className={s.horizontalLine} style={{ bottom: `${y * 100}%` }} />
                    </div>
                ))}

                {/* Вертикальные линии и значения годов */}
                {verticalData.map(({ year, x, date}, index) => (
                    <div key={index}>
                        <span className={s.verticalValue} style={{ left: `${x * 100}%` }}>
                            {year}<br />
                            <span style={{ fontSize: '7px', transform: 'rotate(-40deg)',display: 'inline-block' }}>{date}</span>
                        </span>
                        <div className={s.verticalLine} style={{ left: `${x * 100}%` }} />
                    </div>
                ))}

                <div
                    className={s.zoomableContent}
                    onClick = {() => setCounterZoom((prev) => prev === 3 ? prev : prev + 1) }
                    // style={{
                    //     transform: `scale(${increasedData.scaleX || 1}, ${increasedData.scaleY || 1}) translate(${increasedData.translateX || 0}px, ${increasedData.translateY || 0}px)`,
                    //     transformOrigin: '0 0',
                    // }}
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
                                    <div> {`Дата погаш. ${obj.ofz.endDate}`}</div>
                                </div>
                                <span className={s.nameOfPoint} >{obj.ofz.name}</span>
                            </span>
                        )
                    })}
                </div>

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


