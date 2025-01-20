import s from './theatresBond.module.css'
import { useEffect, useState } from 'react'
import { fetchDaysPoints } from './fetch'
import { generateHorizontalData, generateVerticalData } from '../../calcsFuncs/calcsQuotes/printCordinates'
import { date2ms } from '../../calcsFuncs/calcsQuotes/halperDates'
export function TheatresBond() {
    const [pointsDays, setPointsDays] = useState([])
    const [hoverX, setHoverX] = useState(null) // Позиция мыши по оси X
    const [hoverPoint, setHoverPoint] = useState(null) // Ближайшая точка на графике

    useEffect(() => {
        //    setPointsDays()
        fetchDaysPoints().then(val => setPointsDays(val))
    }, [])

    if (pointsDays.length === 0) {
        return (
            <div> ...Wait</div>
        )
    }
    // function calcBordersPrivetBond() {}


    const sortedСost = pointsDays.map(day => day.close).sort((a, b) => a - b);
    const sortedDates = pointsDays.map(day => day.end.split(' ')[0]).sort();

    const points = pointsDays.map((obj) => {
        return {
             obj,
            x:
                (date2ms(obj.end.split(' ')[0]) - date2ms(sortedDates[0])) /
                (date2ms(sortedDates.at(-1)) - date2ms(sortedDates[0])),
            y:
                (obj.close - sortedСost[0]) /
                (sortedСost.at(-1) - sortedСost[0]),
        }
    })

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect(); // Границы графика
        const mouseX = e.clientX - rect.left; // Позиция мыши относительно графика
        const graphWidth = rect.width;

        // Нормализуем позицию мыши (от 0 до 1)
        const xRatio = mouseX / graphWidth;

        // Находим ближайшую точку на графике
        const closestPoint = points.reduce((prev, curr) => {
            // console.log(prev, curr)
            return Math.abs(curr.x - xRatio) < Math.abs(prev.x - xRatio) ? curr : prev
        }
            
        );
        // console.log(closestPoint, '🌈')
        setHoverX(mouseX); // Сохраняем позицию мыши
        setHoverPoint(closestPoint); // Сохраняем ближайшую точку
    };

    const handleMouseLeave = () => {
        setHoverX(null); // Скрываем курсор
        setHoverPoint(null);
    };


    const horizontalData = generateHorizontalData(
        sortedСost[0],
        sortedСost.at(-1)
    );
    const verticalData = generateVerticalData(
        sortedDates[0],
        sortedDates.at(-1),
        date2ms
    )
        .filter((obj, index, arr) => index === 0 || index === arr.length - 1 || index % 2 === 0 )




    // console.log(pointsDays, sortedDates, verticalData, horizontalData)
    return (
        <div className={s.grafik}  >
            <div className={s.grid}>
            {horizontalData.map(({ percent, y }, index) => {
                return (
                    <div key={index}>
                        <span
                            className={s.horizontalValue}
                            style={{ bottom: `${y * 100}%` }}
                        >
                            {percent}
                        </span>
                        <div
                            className={s.horizontalLine}
                            style={{ bottom: `${y * 100}%` }}
                        />
                    </div>
                )
            })}

            {verticalData.map(({ year, x, date }, index) => (
                <div key={index}>
                    <span className={s.verticalValue}
                        style={{ left: `${x * 100}%` }}>

                        <span
                            style={{
                                marginTop: '10px',
                                whiteSpace: 'nowrap',
                                fontSize: '10px',
                                transform: 'rotate(-40deg)',
                                display: 'inline-block',
                            }}
                        >
                            {date}
                        </span>
                    </span>
                </div>
            ))}
            <div className={s.zoomableContent}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
            >
                {/* {points.map(obj => {
                    return (
                        <span
                        className={s.printPoint}
                        style = {{left: `${obj.x * 100}%`,
                                top: `${obj.y * 100}%`}}
                        >
                        </span>
                    )
                })} */}

                 {/* Динамический курсор */}
                {hoverX !== null && hoverPoint && (
                    <>
                        {/* Вертикальная линия */}
                        <div
                            className={s.cursorLine}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: `${hoverPoint.x * 100}%`,
                                height: '100%',
                                width: '1px',
                                backgroundColor: 'black',
                            }}
                        />

                        {/* Круг на графике */}
                        <div
                            className={s.cursorCircle}
                            style={{
                                position: 'absolute',
                                left: `${hoverPoint.x * 100}%`,
                                top: `${100 - hoverPoint.y * 100}%`,
                                width: '10px',
                                height: '10px',
                                backgroundColor: 'blue',
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        />

                        {/* Tooltip */}
                        <div
                            className={s.tooltip}
                            style={{
                                position: 'absolute',
                                left: `${hoverPoint.x * 100}%`,
                                top: `${100 - hoverPoint.y * 100}%`,
                                backgroundColor: 'white',
                                padding: '5px',
                                border: '1px solid black',
                                borderRadius: '5px',
                                transform: 'translate(-50%, -120%)',
                                zIndex: '2'
                            }}
                        >
                            <div style={{whiteSpace: 'nowrap'}} >Дата: {hoverPoint.obj.end.split(' ')[0]}</div>
                            <div>Цена: {hoverPoint.obj.close}</div>
                        </div>
                    </>
                )}
                <svg className={s.zoomableContent} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    {points.map((point, index) => {
                        if (index === 0) return null; // Нет предыдущей точки для первой точки
                        const prevPoint = points[index - 1];
                        return (
                            <line
                                key={index}
                                x1={`${prevPoint.x * 100}%`}
                                y1={`${100 - prevPoint.y * 100}%`}
                                x2={`${point.x * 100}%`}
                                y2={`${100 - point.y * 100}%`}
                                stroke="rgb(0, 179, 255)"
                                strokeWidth="1"
                            />
                        );
                    })}

                   

                    {/* {points.map((point, index) => (
                        <circle
                            key={index}
                            cx={`${point.x * 100}%`}
                            cy={`${100 - point.y * 100}%`}
                            r="3"
                            fill="red"
                        />
                    ))} */}
                </svg>
            </div>
        </div>
        </div>
        
    )
}