
import { yearsToMaturity} from '../calcsFuncs/yearsToMaturity';
import { getCouponYield} from '../calcsFuncs/getCouponYield';
import {fusionTransform, transformSecurity, transformResponse} from '../transformHelpers/transformSecurity.js';
const listDatas = {
  SECID: '',
  SHORTNAME: '',
  MATDATE: '',
  YIELDATPREVWAPRICE: '',
  COUPONPERCENT: '',
  PREVWAPRICE: '',
  ISSUESIZE: '',
  COUPONVALUE: '',
  COUPONPERIOD: '',
  ACCRUEDINT: '',
  DURATION: '',
  NEXTCOUPON: '',
  ISIN: '',
  LOTVALUE: '',
};

const item = {
  SECID: 'SU25085RMFS0',
  BOARDID: 'TQOB',
  SHORTNAME: 'ОФЗ 25085',
  PREVWAPRICE: null,
  YIELDATPREVWAPRICE: 0,
  COUPONVALUE: 31.91,
  NEXTCOUPON: '2025-03-26',
  ACCRUEDINT: 11.4,
  PREVPRICE: null,
  LOTSIZE: 1,
  FACEVALUE: 1000,
  BOARDNAME: 'Т+: Гособлигации - безадрес.',
  STATUS: 'A',
  MATDATE: '2025-09-24',
  DECIMALS: 4,
  COUPONPERIOD: 182,
  ISSUESIZE: 15000000,
  PREVLEGALCLOSEPRICE: null,
  PREVDATE: '2024-11-27',
  SECNAME: 'ОФЗ-ПД 25085 24/09/2025',
  REMARKS: null,
  MARKETCODE: 'FNDT',
  INSTRID: 'GOFZ',
  SECTORID: null,
  MINSTEP: 0.001,
  FACEUNIT: 'SUR',
  BUYBACKPRICE: null,
  BUYBACKDATE: '0000-00-00',
  ISIN: 'RU000A103BQ2',
  LATNAME: 'OFZ-PD 25085',
  REGNUMBER: '25085RMFS',
  CURRENCYID: 'SUR',
  ISSUESIZEPLACED: 15000000,
  LISTLEVEL: 1,
  SECTYPE: '3',
  COUPONPERCENT: 6.4,
  OFFERDATE: null,
  SETTLEDATE: '2024-11-29',
  LOTVALUE: 1000,
  FACEVALUEONSETTLEDATE: 1000,
};

// // 1) достаю данные и привожу их в порядок давая каждому значению ключ
// function transformResponse({ columns, data }) {
//   const arr = [];

//   for (const values of data) {
//     const obj = {};
//     let i = 0;
//     for (const column of columns) {
//       obj[column] = values[i];
//       i += 1;
//     }
//     arr.push(obj);
//   }
//   return arr;
// }

export function fetchOfzBonds() {
  const url =
    'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQOB/securities.json';
  return fetch(url)
    .then((response) => response.json())
    .then(({ marketdata, securities }) => {
        console.log(
            {
               marketdata: transformResponse(marketdata),
               securities: transformResponse(securities),
             }
        )
        return {
               marketdata: transformResponse(marketdata),
               securities: transformResponse(securities),
             }
    })
    
    
    // ({
    //   marketdata: transformResponse(marketdata),
    //   securities: transformResponse(securities),
    // }))
    .then(({marketdata, securities}) => {
        return fusionTransform(marketdata, securities)
    })
    .then(obj => transformSecurity(obj))
}

fetchOfzBonds().then(console.log);





// //2) 
// // у меня  два разных массива, дальше каждый из этих массивов переделать в объект где ключем будет SECID, и потом можно будет их мержить
// function fusionTransform (marketdata, securities) {
//     const obj = {}
//     for(let i = 0; i < marketdata.length; i += 1 ) {
//         obj[marketdata[i].SECID] = {...marketdata[i], ...securities[i]}
//     // console.log(marketdata[i].SECID)
//     }
//       console.log(obj, 'fusionTransform')
//     return obj
// }

// fetchOfzBonds().then(({marketdata, securities}) => {
//     // const obj = {}
//     // for(let i = 0; i < marketdata.length; i += 1 ) {
//     //     obj[marketdata[i].SECID] = {...marketdata[i], ...securities[i]}
//     // // console.log(marketdata[i].SECID)
//     // }
//     //   console.log(obj)
//     // return obj
//     return fusionTransform(marketdata, securities)
    
// })
// .then(obj =>  {
// //     const result = [];
// //     let num = 0
// //   for (let bond in obj) {
// //     const myObj = {
// //         '№': '',
// //         'SECID': '-',
// //         'Имя':'-',
// //         'Погашение' : '-',
// //         'Лет до погашения': '?',
// //         'Доходность': '-',
// //         'Год. куп. дох' : '-',
// //         'Куп. дох. посл' : '?',
// //         'Цена' : '-',
// //         'Купон, руб' : '-',
// //         'Частота раз в год' : '-',
// //         'НКД': '-',
// //         'Дюрация' : '-',
// //         'Дата купона' : '-',
// //         'ISIN'  : '-',
// //         'Номинал облигации'  : '-',
// //     }; 

// //     myObj['№'] = num
// //     myObj['SECID'] = bond
// //     myObj['Имя'] = obj[bond].SHORTNAME
// //     myObj['Погашение'] = obj[bond].MATDATE
// //     myObj['Лет до погашения'] = yearsToMaturity(obj[bond].MATDATE) // функция yearsToMaturity(obj[bond].MATDATE)
// //     myObj['Доходность'] = `${obj[bond].YIELD}%` 
// //     myObj['Год. куп. дох'] =  `${obj[bond].COUPONPERCENT}%` 
// //     myObj['Куп. дох. посл'] =  getCouponYield(obj[bond].MARKETPRICE, obj[bond].COUPONPERCENT)
// //     myObj['Цена'] = obj[bond].MARKETPRICE
// //     myObj['Купон, руб'] = obj[bond].COUPONVALUE
// //     myObj['Частота раз в год'] = (365/  obj[bond].COUPONPERIOD).toFixed()
// //     myObj['НКД'] = obj[bond].ACCRUEDINT
// //     myObj['Дюрация'] = obj[bond].DURATION
// //     myObj['Дата купона'] = obj[bond].NEXTCOUPON
// //     myObj['ISIN'] = obj[bond].ISIN
// //     myObj['Номинал облигации'] = obj[bond].LOTVALUE
// //     result.push(myObj)
// //     num += 1

    
// //   }
// //   console.log(result, 'transformSecurity')
// //   return result
// return transformSecurity(obj)
// })

// function transformSecurity(obj) { // заготовка что бы верхний then, логику вынести в функцию 
//     const result = [];
//     let num = 1
//   for (let bond in obj) {
//     const myObj = {
//         '№': '',
//         'SECID': '-',
//         'Имя':'-',
//         'Погашение' : '-',
//         'Лет до погашения': '?',
//         'Доходность': '-',
//         'Год. куп. дох' : '-',
//         'Куп. дох. посл' : '?',
//         'Цена' : '-',
//         'Купон, руб' : '-',
//         'Частота раз в год' : '-',
//         'НКД': '-',
//         'Дюрация' : '-',
//         'Дата купона' : '-',
//         'ISIN'  : '-',
//         'Номинал облигации'  : '-',
//     }; 

//     myObj['№'] = num
//     myObj['SECID'] = bond
//     myObj['Имя'] = obj[bond].SHORTNAME
//     myObj['Погашение'] = obj[bond].MATDATE
//     myObj['Лет до погашения'] = yearsToMaturity(obj[bond].MATDATE) // функция yearsToMaturity(obj[bond].MATDATE)
//     myObj['Доходность'] = `${obj[bond].YIELD}%` 
//     myObj['Год. куп. дох'] =  `${obj[bond].COUPONPERCENT}%` 
//     myObj['Куп. дох. посл'] =  getCouponYield(obj[bond].MARKETPRICE, obj[bond].COUPONPERCENT)
//     myObj['Цена'] = obj[bond].MARKETPRICE
//     myObj['Купон, руб'] = obj[bond].COUPONVALUE
//     myObj['Частота раз в год'] = (365/  obj[bond].COUPONPERIOD).toFixed()
//     myObj['НКД'] = obj[bond].ACCRUEDINT
//     myObj['Дюрация'] = obj[bond].DURATION
//     myObj['Дата купона'] = obj[bond].NEXTCOUPON
//     myObj['ISIN'] = obj[bond].ISIN
//     myObj['Номинал облигации'] = obj[bond].LOTVALUE
//     result.push(myObj)
//     num += 1

    
//   }
//   console.log(result, 'transformSecurity')
//   return result

// }













//_____________________________________________________ Обработка данных из API через массивы 
export function fetchList() {
  const uri =
    'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQOB/securities.json';
  return fetch(uri)
    .then((val) => val.json())
    .then((data) => {
      // console.log(data)
      return [data.securities.data, data.marketdata.data];
    })
    .then((arrBondsData) => {
      // for(let i = 0; i < arrColumns.length - 1; i += 1) {
      //     if(arrColumns[i] in listDatas) {
      //         listDatas[arrColumns[i]] = i
      //     }

      // }

      //Достаю данные для остальных полей
      const resultAllBonds = [];
      let num = 1;
      for (const arrBond of arrBondsData[0]) {
        const resultOneBond = [];
        resultOneBond.push(
          num,
          arrBond[0],
          arrBond[2],
          arrBond[13],
          yearsToMaturity(arrBond[13]),
          'Profitability', //текущая доходность в %
          `${arrBond[35] !== null ? arrBond[35] : 0}%`,
          arrBond[3],
          arrBond[16],
          arrBond[5],
          (365 / arrBond[15]).toFixed(),
          arrBond[7],
          '-',
          arrBond[6],
          arrBond[28],
          arrBond[38]
        );
        resultAllBonds.push(resultOneBond);
        num += 1;
      }
      let i = 0;
      for (const arrBond of arrBondsData[1]) {
        //достаю данные для цены и дюрации
        resultAllBonds[i][12] =
          arrBond[36] === null ? '-' : (arrBond[36] / 365).toFixed(2); //Дюрация  | index 12
        resultAllBonds[i][8] =
          arrBond[27] === null ? '-' : arrBond[27].toFixed(2); //Цена | index 8
        resultAllBonds[i][5] = `${arrBond[16]}%`; //Доходность | index 5

        const price = Number((resultAllBonds[i][7] * 10).toFixed(2)); // price
        const yieldPersent = Number(resultAllBonds[i][6].slice(0, -1)) * 10;
        // console.log(price,yieldPersent)
        const KupDoxPosL = ((yieldPersent / price) * 100).toFixed(1);
        resultAllBonds[i][7] =
          resultAllBonds[i][7] !== null ? `${KupDoxPosL}%` : '-';
        i += 1;
      }

      return resultAllBonds;
    });
}

//  console.log(listDatas)

//Имя               Погашение       Лет до погашения  Доходность               Год. куп. дох       Куп. дох. посл.                 Цена                 Купон, руб        Частота раз в год        НКД, руб            самСчитать          Дата купона     ISIN                 Номинал облигации
//SHORTNAME         MATDATE         MATDATE         YIELDATPREVWAPRICE        COUPONPERCENT        PREVWAPRICE(PREVPRICE)          ISSUESIZE           COUPONVALUE         COUPONPERIOD            ACCRUEDINT          Дюрация             NEXTCOUPON      ISIN                 LOTVALUE
//ОФЗ 25085         2025-09-24
//ОФЗ 52005         2033-05-11    2033-05-11(расчитать)|  9.69                  2.500             60.034                          350000000           14.16               182                     0.39                                    2025-05-21      RU000A105XV1          1135.03

export function headers() {
  const uri =
    'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQOB/securities.json';
  return fetch(uri)
    .then((data) => data.json())
    .then((data) => data.securities.columns)
    .then(
      (arr) => {
        return arr;
        // let count = 0;
        // const result = []
        // while(count < arr.length) {
        //     result.push(count,arr[count])
        //     count += 1
        // }
        // return result
      },
      (reason) => console.error(`OPS! ${reason} `)
    );
}

// headers().then(console.log)

export function durationReqest() {
  return fetch(
    'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQOB/securities.json'
  )
    .then((data) => data.json())
    .then((data) => data.marketdata)
    .then((obj) => {
      const indexDuration = 36;
      const indexOfDuration = obj.columns.findIndex(
        (name) => name === 'DURATION'
      );
      const durations = obj.data.map((arr) =>
        (arr[indexOfDuration] / 365).toFixed(2)
      );
      return durations;
    });
}

// durationReqest().then(console.log)
