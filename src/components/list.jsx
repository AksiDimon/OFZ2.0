import s from './list.module.css'
import { fetchOfzBonds, fetchList, headers, durationReqest } from '../requests/fetchList.js'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import { calculateAge } from '../calcsFuncs/calcsQuotes/calculateAge';


const headerNamesRUS = [
    '№',
    'SECID',
    'Имя',
    'Погашение',
    'Лет до погашения',
    'Доходность',
    'Год. куп. дох.',
    'Куп. дох. посл.',
    'Цена',
    'Купон, руб.',
    'Частота раз в год',
    'НКД',
    'Дюрация',
    'Дата купона',
    'ISIN',
    'Номинал облигации',
];
const headerNamesEN = ['№', 'SECID', 'SHORTNAME', 'MATDATE', 'YIELDATPREVWAPRICE', 'Profitability', 'COUPONPERCENT', 'PREVWAPRICE', 'ISSUESIZE', 'COUPONVALUE', 'COUPONPERIOD', 'ACCRUEDINT', 'DURATION', 'NEXTCOUPON', 'ISIN', 'LOTVALUE']

export function List() {
    // const [headerNames, setHeaderNames] = useState([]);

    const [ListData, setListData] = useState([])
    const [durationReqest, setDurationReqest] = useState()
    useEffect(() => {
        // headers().then(data => setHeaderNames(data))
        // durationReqest().then(val => setDurationReqest(val))
        fetchOfzBonds().then(val => setListData(val))
    }, [])

    console.log(ListData, '👹')
    return (
        <div className={s.tableContainer}>
            <table className={s.table} style={{ width: '50vh' }}>
                <thead>
                    <tr>
                        {headerNamesRUS.map((name, index) => (

                            <th key={index}>{name}</th>
                        ))}
                    </tr>
                    <tr>
                        {headerNamesEN.map((name, index) => (
                            <th key={index}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {ListData.map(objBond => {
                        return (
                            // console.log(objBond,' ___')
                            <tr>
                                {Object.entries(objBond).map(([key, val], index) => {
                                    if (index === 2) {
                                        return (
                                            <td>
                                                <Link to={`/detales`} style={{ display: 'inline' }}>
                                                    {val}
                                                </Link>
                                            </td>

                                        )
                                    }
                                    if (index === 5 || index === 6) {
                                        return (
                                            <td> {val === null ? `${0}%` : (`${val}%`)} </td>
                                        )
                                    }
                                    else {
                                        return <td>{val}</td>
                                    }
                                })}
                            </tr>
                        )

                    })}
                    {/* <tr>
                        <td>List</td>
                        <td>cecec</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );


}