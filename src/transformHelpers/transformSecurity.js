import {yearsToMaturity} from '../calcsFuncs/yearsToMaturity';
import {getCouponYield} from '../calcsFuncs/getCouponYield.js';

// 1) достаю данные и привожу их в порядок давая каждому значению ключ
export function transformResponse({ columns, data }) {
  const arr = [];

  for (const values of data) {
    const obj = {};
    let i = 0;
    for (const column of columns) {
      obj[column] = values[i];
      i += 1;
    }
    arr.push(obj);
  }
  return arr;
}



//2)Для слияния в один объект из marketdata и securities для каждой офз
export function fusionTransform (marketdata, securities) {
  const obj = {}
  for(let i = 0; i < marketdata.length; i += 1 ) {
      obj[marketdata[i].SECID] = {...marketdata[i], ...securities[i]}
  // console.log(marketdata[i].SECID)
  }
    console.log(obj, 'fusionTransform')
  return obj
}

//3) даю ключам русские названия
export function transformSecurity(obj) { // заготовка что бы верхний then, логику вынести в функцию 
  const result = [];
  let num = 1
for (let bond in obj) {
  const myObj = {
      '№': '',
      'SECID': '-',
      'name':'-',
      'endDate' : '-',
      'yearsToEnd': '?',
      'yield': '-',
      'couponPersent' : '-',
      'getCouponYield' : '?',
      'marketPrice' : '-',
      'couponRub' : '-',
      'paymentsInYear' : '-',
      'NKD': '-',
      'durartion' : '-',
      'nextCoupon' : '-',
      'ISIN'  : '-',
      'lotValue'  : '-',
  }; 

  myObj['№'] = num
  myObj['SECID'] = bond
  myObj['name'] = obj[bond].SHORTNAME  //Имя
  myObj['endDate'] = obj[bond].MATDATE //Погашение
  myObj['yearsToEnd'] = yearsToMaturity(obj[bond].MATDATE) // Лет до погашения
  myObj['yield'] = obj[bond].YIELD //Доходность %
  myObj['couponPersent'] =  obj[bond].COUPONPERCENT //Год. куп. дох.
  myObj['getCouponYield'] =  getCouponYield(obj[bond].MARKETPRICE, obj[bond].COUPONPERCENT) //Куп. дох. посл.
  myObj['marketPrice'] = obj[bond].MARKETPRICE //Цена
  myObj['couponRub'] = obj[bond].COUPONVALUE //Купон, руб.
  myObj['paymentsInYear'] = (365/  obj[bond].COUPONPERIOD).toFixed() //Частота раз в год
  myObj['NKD'] = obj[bond].ACCRUEDINT //НКД
  myObj['durartion'] = (obj[bond].DURATION / 365).toFixed(2) //Дюрация
  myObj['nextCoupon'] = obj[bond].NEXTCOUPON //Дата купона
  myObj['ISIN'] = obj[bond].ISIN
  myObj['lotValue'] = obj[bond].LOTVALUE //Номинал облигации
  result.push(myObj)
  num += 1

  
}

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
]

//для вывода нужного мне порядка в объекте
const mainObj = []
for(const obj of result) {
  const orderedEntries = headerNamesRUS.map(key => [key, obj[key]])
  const orderedObj = Object.fromEntries(orderedEntries)
  mainObj.push(orderedObj)
}

 console.log(result, 'transformSecurity')
return result

}

