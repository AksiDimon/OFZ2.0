import s from './list.module.css'
import { Link } from 'react-router-dom';



 const headerNamesRUS = [
    '№',
    'SECID',
    'Имя',
    'Дата купона',
    'Конец',
    'Лет до конца',
    'Купон %',
    'цена купона',
    'цена в руб',
    'валюта',
    'Платежей в год',
    'Дюрация',
    'Номинал облигации',
];
export function ListReplays ({ListData}) {
    return (
        <div className={s.tableContainer}>
            <table className={s.table} style={{ width: '50vh' }}>
                <thead>
                    <tr>
                        {headerNamesRUS.map((name, index) => {
                            return (
                                <th key={index}> {name}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                {ListData.map(objBond => {
                    return (
                        <tr>
                            {Object.entries(objBond).map(([key, value], index) => {
                                if (index === 1) {
                                    // console.log(key ,value)
                                    return (
                                        <td>
                                            <Link to={`/detales/${value}`} style={{ display: 'inline' }}>
                                                {value}
                                            </Link>
                                        </td>

                                    )
                                }
                                
                                if(key === 'percent') {
                                    return (<td>{value}%</td>)
                                }
                                else {
                                    return (
                                    <td style={{whiteSpace: 'nowrap'}} >{value}</td>
                                )
                                }
                                
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}