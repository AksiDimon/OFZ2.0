import { useParams } from "react-router-dom";
const detalesData = {
    "Котировка облигации, %": '',
    'Доходность': '',
    'Изм за день, %': '',
    'Объем день, млн. руб': '',
    'Объем день, штук': '',
    'Лет до погашения': '',
    'Дата размещения': '',
    'Дата погашения': '',
    'Дюрация, дней': '',
    'Номинал': '',
    'Валюта': '',
}

export function DetalesBond() {
    const { id } = useParams() //получаю id из URL;


    return (
        <>
            Detales
            <div>
                <h2>Облигация ОФЗ 26229 (SU26229RMFS3) Доходность, Цена </h2>
                <div style={{border: '1px solid black', borderRadius: '5px', width: '700px'}}>
                    <div>Облигация ОФЗ 26229 стоит сейчас 884.0 руб или 88.40% от номинала. Облигация будет полностью погашена по номиналу 2025-11-12. Если вы купите одну облигацию сейчас, то вы заплатите продавцу накопленный купонный доход 3.13 руб, а следующий купон вам будет выплачен 2025-05-14 в размере 35.65руб.</div>
                    <div>При этом первая купонная выплата для вас составит 32.52 руб, что подразумевает доходность первого купона 3.7%.</div>
                    <div>Доходность* облигации к погашению составляет 22.33% годовых.</div>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1'}}>
                        {Object.entries(detalesData).map(([key, value]) => {
                            return (
                                <div style={{display: 'flex'}}>
                                    <div style={{flex: '1'}} >{key}</div>
                                    <div style={{flex: '1'}} >{value}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}