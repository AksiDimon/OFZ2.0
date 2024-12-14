import s from './list.module.css';

import { calculateAge } from '../calcsFuncs/calcsQuotes/calculateAge';
import { ofzResponseMock } from '../ofzResponseMock';
import { fetchOfzBonds } from '../requests/fetchList';
import { useState, useEffect } from 'react';
import { positionX, positionY } from '../calcsFuncs/calcsQuotes/positionX';
import { generateStripX } from '../calcsFuncs/calcsQuotes/plusOneAge';
import { ofzs26 } from '../transformHelpers/filterOfz26';
import { findMaxMinPersents, generateStripY } from '../calcsFuncs/calcsQuotes/findMaxMinPersents';
import { Route } from 'react-router-dom';
export function ChartQuotes() {
    const [ListData, setListData] = useState([])

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

    console.log(
        console.log({ sortedDates, sortedPercents, points }),
        '***'
    )

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


    return (
        <>
            <div className={s.grid}>
                {points.map(obj => {
                    console.log(obj.x * 100, obj.y * 100 )
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
<div style={{ position: 'absolute', top: '110%', left: '40%',  whiteSpace: 'nowrap' }} > Лет до погашения </div>
<div style={{ position: 'absolute', left: '-120px', top: '45%', transform: 'rotate(-90deg)'}} > Доходность % </div>
            </div>
            
        </>
    )
}