import s from './list.module.css';
import { fetchOfzBonds } from '../requests/fetchList';
import { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import {
  plusOneAge,
  getTodayDate,
  calculateLastDate,
  date2ms,
  halperRestMap,
  calcEmphasizeSquare
} from '../calcsFuncs/calcsQuotes/halperDates';
import {
  generateHorizontalData,
  generateVerticalData,
} from '../calcsFuncs/calcsQuotes/printCordinates';
import { useDispatch, useSelector } from 'react-redux';
import { chartQuotesSlice, fetchListData} from '../redux/ofzSlice';
import { store } from '../redux/store';
 import { useMouseSelector } from '../calcsFuncs/calcsQuotes/myHook';



// function useMouseSelector(onPointerUp) {
//   const [startPosition, setStartPosition] = useState(null); //запоминаю начальную координату выделения
//   const [selectionBox, setSelectionBox] = useState(null);
//   const divRef = useRef(null);
  
//   function getCordinates(event) {
//     const rect = divRef.current.getBoundingClientRect();

//     // console.log(rect, '🎃')
//     const x = (event.clientX - rect.left) / rect.width;
//     const y = (event.clientY - rect.top) / rect.height;
//     return { x, y };
//   }
//   function handlePointerDown(event) {
//     // console.log(getCordinates(event), '||||')
//     const position = getCordinates(event);
//     setStartPosition(position);

   
//     setSelectionBox({ x: position.x, y: position.y, width: 0, height: 0 }); // Начальная область
//   }

//   function handlePointerMove(event) {
//     if (!startPosition) {
//       return;
//     }
//     const currentPosition = getCordinates(event);
//     // console.log(currentPosition, '💄')
//     const x = Math.min(startPosition.x, currentPosition.x);
//     const y = Math.min(startPosition.y, currentPosition.y);
//     const width = Math.abs(currentPosition.x - startPosition.x); // делаю Mathc.abs что бы всегда было положительным число, и не уходило в отрицательность
//     const height = Math.abs(currentPosition.y - startPosition.y);

   
//     setSelectionBox({ x: x, y: y, width, height });
//   }

//   function handlePointerUp(event) {
//     const endPoint = getCordinates(event);

//     onPointerUp(selectionBox);

    
//     //данные выделеного окна
//     // const { x, y, width, height } = selectionBox;
//     // const { minDate, maxDate, minPercent, maxPercent } = calcsStrips;

//     // 2030     ↓                                   2050
//     // |--------×-----------------------------------|
//     // 0px      100px                               500px

//     // 2030 + (2050 -2030) × 0.2 = 2034

//     // // Преобразуем даты в миллисекунды
//     // const minDateMs = date2ms(minDate);
//     // const maxDateMs = date2ms(maxDate);
//     // //вычисление для годов по оси x,  ms умножаен на проценты (но это не проценты. а дробь 0.185 = 18.5%)
//     // const minDateNew = minDateMs + (maxDateMs - minDateMs) * x;
//     // const maxDateNew = minDateMs + (maxDateMs - minDateMs) * (x + width);

//     // // Новые границы по X (даты)
//     // const minDateAfter = new Date(minDateNew).toISOString().split('T')[0];
//     // const maxDateAfter = new Date(maxDateNew).toISOString().split('T')[0];

//     // // // Новые границы по Y (проценты)
//     // let newMinPercent =
//     //   minPercent + (maxPercent - minPercent) * (1 - (y + height));
//     // let newMaxPercent = minPercent + (maxPercent - minPercent) * (1 - y);

//     // dispatch(
//     //   chartQuotesSlice.actions.setCalcsStrips({
//     //     minDate: minDateAfter,
//     //     maxDate: maxDateAfter,
//     //     minPercent: newMinPercent,
//     //     maxPercent: newMaxPercent,
//     //   })
//     // );

//     // const sortedDates = ListData.map(ofz => ofz.endDate).sort();
//     // const lastDate = calculateLastDate(todayDate, sortedDates, plusOneAge);

//     setStartPosition(null);
//   }


//   return { divRef, handlePointerDown, handlePointerMove, handlePointerUp, selectionBox: startPosition === null ? null : selectionBox };
// }

export function ChartQuotes({ListData, calcsStrips, onPointerUp, handleRestMap, counterZoom, setCounterZoom}) {
//   const [counterZoom, setCounterZoom] = useState(1); //стэйт для процентов по Y скольконулей должно быть после запятой.
//   const dispatch = useDispatch();

//   const onPointerUp = selectionBox => {
//     console.log(">>>>>", selectionBox);
//     dispatch(chartQuotesSlice.actions.setCalcsStrips(selectionBox))
//   }
  const { divRef, handlePointerDown, handlePointerMove, handlePointerUp, selectionBox} = useMouseSelector(onPointerUp);

//   const { ListData, status, calcsStrips: calcsStripsFromRedux,  filterPointsWithinBorder } = useSelector((state) => state.chartQuotes);
//   const calcsStrips = calcsStripsFromRedux ?? halperRestMap(ListData, todayDate);

//   useEffect(() => {
//     dispatch(fetchListData()); 
//   }, []);

  console.log('✅', ListData, calcsStrips);

  if (ListData.length === 0) {
    return <div>...Loading</div>;
  }

  const points = 
  ListData.filter(
    (obj) =>
      obj.percent >= calcsStrips.minPercent &&
      obj.percent <= calcsStrips.maxPercent &&
      obj.endDate >= calcsStrips.minDate &&
      obj.endDate <= calcsStrips.maxDate
  )
//   filterPointsWithinBorder
  .map((ofz) => ({
    ofz,
    x:
      (date2ms(ofz.endDate) - date2ms(calcsStrips.minDate)) /
      (date2ms(calcsStrips.maxDate) - date2ms(calcsStrips.minDate)),
    y:
      (ofz.percent - calcsStrips.minPercent) /
      (calcsStrips.maxPercent - calcsStrips.minPercent),
  }));


  const horizontalData = generateHorizontalData(
    calcsStrips.minPercent,
    calcsStrips.maxPercent,
  
  );

  const verticalData = generateVerticalData(
    calcsStrips.minDate,
    calcsStrips.maxDate,
    date2ms,
   // counterZoom
  );

  //Обработчики выделения координат

//   function handleRestMap() {
//     dispatch(chartQuotesSlice.actions.setRestMap());
//     setCounterZoom(1); //сбрасываю точки после запятой в процентах, так как это не сделать здесь, они останутся, при сбрасывании.
//   }

  return (
    <>
      <button onClick={handleRestMap}> rest</button>
      <div
        className={s.grid}
        // onPointerDown = {handlePointerDown}
        // onPointerUp = {handlePointerUp}
        // onPointerMove = {handlePointerMove}
        ref={divRef}
      >
        {/* Горизонтальные линии и значения процентов */}
        {horizontalData.map(({ percent, y }, index) => (
          <div key={index}>
            <span
              className={s.horizontalValue}
              style={{ bottom: `${y * 100}%` }}
            >
              {percent}%
            </span>
            <div
              className={s.horizontalLine}
              style={{ bottom: `${y * 100}%` }}
            />
          </div>
        ))}

        {/* Вертикальные линии и значения годов */}
        {verticalData.map(({ year, x, date }, index) => (
          <div key={index}>
            <span className={s.verticalValue}
             style={{ left: `${x * 100}%`,  fontSize: verticalData.length > 21 ? ' 0.7rem' : '1rem'}}>
              <span>{year}</span> <br />
              <span
                style={{
                    marginTop: '10px',
                    whiteSpace: 'nowrap',
                  fontSize: '7px',
                  transform: 'rotate(-40deg)',
                  display: 'inline-block',
                }}
              >
                {date}
              </span>
            </span>
            <div className={s.verticalLine} style={{ left: `${x * 100}%` }} />
          </div>
        ))}

        <div
          className={s.zoomableContent}
          // onClick={() =>
          //   setCounterZoom((prev) => (prev === 3 ? prev : prev + 1))
          // }
          
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {points.map((obj) => {
            //console.log(obj.x * 100, obj.y * 100 )
            return (
              <span
                className={s.printPoint}
                style={{
                  left: `${obj.x * 100}%`,
                  bottom: `${obj.y * 100}%`,
                }}
              >
                <div className={s.printInformation}>
                  <h3>{obj.ofz.name}</h3>
                  <div>{`Лет до погаш: ${obj.ofz.yearsToEnd}`}</div>
                  <div>{`Доходнсть: ${obj.ofz.percent}%`}</div>
                  <div> {`Дата погаш. ${obj.ofz.endDate}`}</div>
                </div>
                <span className={s.nameOfPoint}>{obj.ofz.name}</span>
              </span>
            );
          })}
        </div>

        {selectionBox !== null && (
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
        <div
          style={{
            position: 'absolute',
            top: '115%',
            left: '40%',
            whiteSpace: 'nowrap',
          }}
        >
          {' '}
          Лет до погашения{' '}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '-120px',
            top: '45%',
            transform: 'rotate(-90deg)',
          }}
        >
          {' '}
          Доходность %{' '}
        </div>
      </div>
    </>
  );
}
