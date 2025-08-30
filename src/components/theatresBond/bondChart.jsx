import { useDispatch, useSelector } from 'react-redux'
import s from './theatresBond.module.css'
import { theatresBondSlice } from '../../redux/theatresBondSlice';
import { validateDate } from './halperFuncs';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fixedDate } from './halperFuncs';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
export function BondChart({ points, divRef, hoverX, hoverPoint, handleMouseMove, handleMouseLeave, horizontalData, verticalData, handleRubCheckBox, handlePercentCheckBox }) {
    const dispatch = useDispatch();
    const { bondId } = useParams();

    useEffect(() => {
        return () => {
            dispatch(theatresBondSlice.actions.setInputDates({
                from: null,
                till: null,
              }))
        }
    }, []) //при размонтировании компонента изменяю данные в редаксе, что бы в inut date всегда стояли актуальные даты о начале и тек дате облигации.
    
    // const {inputDates} = useSelector(state => state.theatresBond)

    const selectedCurrency = useSelector(state => state.theatresBond.currency.selectedCurrency)
    const { from, till } = useSelector(state => state.theatresBond.inputDates)
    const startDate = new Date(points[0].obj.end.split(' ')[0])
    const endDate = new Date(points.at(-1).obj.end.split(' ')[0])
    //   console.log(inputDates, '☂️')

    function handleStartDate(date) {
        const correctDate = fixedDate(date)

        //   console.log('Выбранная дата:', correctDate);


        console.log(date, '🔥')
        // const correctDateCheck = validateDate(enteredDate, startDate, endDate)
        // console.log(correctDate, '🍒')
        dispatch(theatresBondSlice.actions.setInputDates({ from: correctDate }))
    }

    function handleEndDate(date) {
        const correctDate = fixedDate(date)
        // const correctDateCheck = validateDate(enteredDate, startDate, endDate)
        // console.log(correctDate, '🍒')
        dispatch(theatresBondSlice.actions.setInputDates({ till: correctDate }))
    }

    return (
        <div className={s.grafik}  >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }} >
                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-around' }}>
                    <label style={{ textAlign: 'center' }}>
                        Дата от

                        <DatePicker
                            selected={from ?? startDate}
                            dateFormat="yyyy-MM-dd" // Указываем формат YYYY-MM-DD
                            placeholderText="YYYY-MM-DD" // Подсказка для поля
                            onChange={handleStartDate}
                        // defaultValue={startDate} // Начальное значение
                        />
                        {/* <input
                    type="date" // Указываем тип date
                    defaultValue={startDate} // Начальное значение
                    onChange = {handleStartDate} 
                /> */}
                    </label>
                    <label style={{ textAlign: 'center' }}>
                        Дата до
                        <DatePicker
                            selected={till ?? endDate}
                            dateFormat="yyyy-MM-dd" // Указываем формат YYYY-MM-DD
                            placeholderText="YYYY-MM-DD" // Подсказка для поля
                            onChange={handleEndDate}
                        // defaultValue={endDate} // Начальное значение
                        />
                        {/* <input
                    type="date"
                    defaultValue={endDate} // Начальное значение
                    onChange = {handleEndDate}
                /> */}
                    </label>
                </div>

                {/* Чекбоксы */}
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    {bondId.startsWith('SU') ? (
                        <label style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="ofz in Usd"
                                name='currency'
                                checked={selectedCurrency === 'ofz in Usd'}
                                onChange={handleRubCheckBox}
                            />
                            <span style={{ marginLeft: '5px' }}>Usd</span>
                        </label>
                    ) : (
                        <label style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value="RUB"
                                name='currency'
                                checked={selectedCurrency === 'RUB'}
                                onChange={handleRubCheckBox}
                            />
                            <span style={{ marginLeft: '5px' }}>Рубли</span>
                        </label>
                    )}

                    <label style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="radio"
                            value='% от Номинала'
                            name='currency'
                            checked={selectedCurrency === '% от Номинала'}
                            onChange={handlePercentCheckBox}
                        />
                        <span style={{ marginLeft: '5px' }}>% от Номинала</span>
                    </label>
                </div>
            </div>



            <div className={s.grid}>
                {horizontalData.map(({ percent, y }, index) => {
                    // console.log(typeof percent )
                    return (
                        <div key={index}>
                            <span
                                className={s.horizontalValue}
                                style={{
                                    bottom: `${y * 100}%`,
                                    // left: percent.length > 3 ? '30px' : '0px'
                                }}
                            >
                                {percent > 200 
    ? percent.toString().slice(0, 2) + ',' + percent.toString().slice(2) 
    : percent < 20 
        ? percent.toString().split('.')[0] + ',' + percent.toString().split('.')[1].slice(0,2) // Добавляем два знака в дробной части
        : percent}
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
                    ref={divRef}
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
                                <div style={{ whiteSpace: 'nowrap' }} >Дата: {hoverPoint.obj.end.split(' ')[0]}</div>
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