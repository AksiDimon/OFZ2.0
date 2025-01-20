import {yearsToMaturity} from '../calcsFuncs/yearsToMaturity';
export function transformReplays(arr) {
    
    const result = [];
    let num = 1


    for(let bond of arr) {
        // console.log(bond, '&&&&')
            const myObj = {
        // '№': '',
        // 'SECID': '-',
        // 'name':'-',
        // 'endDate' : '-',
        // 'yearsToEnd': '?',
        // 'percent': '-',
        // 'couponPersent' : '-',
        // // 'getCouponYield' : '?',
        // 'marketPrice' : '-',
        // 'couponRub' : '-',
        // 'paymentsInYear' : '-',
        // 'NKD': '-',
        // 'durartion' : '-',
        // 'nextCoupon' : '-',
        // 'ISIN'  : '-',
        // 'lotValue'  : '-',
    }

        myObj['№'] = num
        myObj['SECID'] = bond.SECID
        myObj['name'] = bond.SHORTNAME
        myObj['nextCoupon'] = bond.COUPONDATE
        myObj['endDate'] = bond.MATDATE
        myObj['yearsToEnd'] = yearsToMaturity(bond.MATDATE)
        myObj['percent'] = bond.COUPONPERCENT
        myObj['priceCoupon'] = bond.COUPONVALUE
        myObj["PRICE_RUB"] = bond.PRICE_RUB
        myObj['currency'] = bond.FACEUNIT
        myObj['paymentsInYear'] = bond.COUPONFREQUENCY
        myObj['durartion'] = bond.DURATION ?? '-'
        myObj['lotValue'] = bond.FACEVALUE

        result.push(myObj);
        num += 1
        
    }
    // console.log(arr,result, '&&&&')
    return result
}





const response = [
    {
        "SECID": "RU000A1056U0",
        "SHORTNAME": "ГазКЗ-27Д",
        "NAME": "Газпром капитал ООО ЗО27-1-Д",
        "TYPENAME": "Корпоративные облигации",
        "ISIN": "RU000A1056U0",
        "REGNUMBER": "4-07-36400-R",
        "LISTLEVEL": "3",
        "FACEVALUE": 1000,
        "FACEUNIT": "USD",
        "ISSUESIZE": 402348,
        "IS_COLLATERAL": 1,
        "IS_EXTERNAL": 0,
        "PRIMARY_BOARDID": "TQOD",
        "PRIMARY_BOARD_TITLE": "Т+: Облигации (USD) - безадрес.",
        "MATDATE": "2027-03-23",
        "IS_RII": null,
        "INCLUDEDBYMOEX": null,
        "DURATION": null,
        "IS_QUALIFIED_INVESTORS": 0,
        "HIGH_RISK": 0,
        "COUPONFREQUENCY": 2,
        "EVENINGSESSION": 1,
        "MORNINGSESSION": 0,
        "WAPRICE": 92.37,
        "YIELDATWAP": 8.95,
        "COUPONDATE": "2025-03-23",
        "COUPONPERCENT": 4.95,
        "COUPONVALUE": 24.75,
        "COUPONDAYSPASSED": 116,
        "COUPONDAYSREMAIN": 65,
        "COUPONLENGTH": 181,
        "ISSUEDATE": "2022-09-20",
        "INITIALFACEVALUE": 1000,
        "SECSUBTYPE": null,
        "STARTDATEMOEX": "2022-09-23",
        "REPLBOND": true,
        "DAYSTOREDEMPTION": 795,
        "OFFERDATE": null,
        "EMITENTNAME": "Общество с ограниченной ответственностью \"Газпром капитал\"",
        "INN": "7726588547",
        "LOTSIZE": 1,
        "PRICE": 91.06,
        "PRICE_RUB": 94905.75,
        "RTL1": 79720.83,
        "RTH1": 110090.67,
        "RTL2": 76873.66,
        "RTH2": 112937.84,
        "RTL3": 74026.49,
        "RTH3": 115785.02,
        "DISCOUNT1": 16,
        "LIMIT1": 8046,
        "DISCOUNT2": 19,
        "LIMIT2": 40230,
        "DISCOUNT3": 22,
        "DISCOUNTL0": 16,
        "DISCOUNTH0": 10,
        "FULLCOVERED": 0
    },
    {
        "SECID": "RU000A1059N9",
        "SHORTNAME": "ЛУКОЙЛ 26",
        "NAME": "ПАО \"ЛУКОЙЛ\" ЗО-26",
        "TYPENAME": "Корпоративные облигации",
        "ISIN": "RU000A1059N9",
        "REGNUMBER": "4-17-00077-A",
        "LISTLEVEL": "3",
        "FACEVALUE": 1000,
        "FACEUNIT": "USD",
        "ISSUESIZE": 315760,
        "IS_COLLATERAL": 1,
        "IS_EXTERNAL": 0,
        "PRIMARY_BOARDID": "TQCB",
        "PRIMARY_BOARD_TITLE": "Т+: Облигации - безадрес.",
        "MATDATE": "2026-11-02",
        "IS_RII": null,
        "INCLUDEDBYMOEX": null,
        "DURATION": 625,
        "IS_QUALIFIED_INVESTORS": 0,
        "HIGH_RISK": 0,
        "COUPONFREQUENCY": 2,
        "EVENINGSESSION": 1,
        "MORNINGSESSION": 0,
        "WAPRICE": 94.7858,
        "YIELDATWAP": 7.96,
        "COUPONDATE": "2025-05-02",
        "COUPONPERCENT": 4.75,
        "COUPONVALUE": 23.75,
        "COUPONDAYSPASSED": 76,
        "COUPONDAYSREMAIN": 105,
        "COUPONLENGTH": 181,
        "ISSUEDATE": "2022-10-04",
        "INITIALFACEVALUE": 1000,
        "SECSUBTYPE": null,
        "STARTDATEMOEX": "2022-11-07",
        "REPLBOND": true,
        "DAYSTOREDEMPTION": 654,
        "OFFERDATE": null,
        "EMITENTNAME": "Публичное акционерное общество \"Нефтяная компания \"ЛУКОЙЛ\"",
        "INN": "7708004767",
        "LOTSIZE": 1,
        "PRICE": 94.75,
        "PRICE_RUB": 98090.82,
        "RTL1": 82396.29,
        "RTH1": 113785.35,
        "RTL2": 79453.56,
        "RTH2": 116728.08,
        "RTL3": 76510.84,
        "RTH3": 119670.8,
        "DISCOUNT1": 16,
        "LIMIT1": 6315,
        "DISCOUNT2": 19,
        "LIMIT2": 31575,
        "DISCOUNT3": 22,
        "DISCOUNTL0": 13,
        "DISCOUNTH0": 12,
        "FULLCOVERED": 0
    },
    {
        "SECID": "RU000A1059P4",
        "SHORTNAME": "ЛУКОЙЛ 27",
        "NAME": "ПАО \"ЛУКОЙЛ\" ЗО-27",
        "TYPENAME": "Корпоративные облигации",
        "ISIN": "RU000A1059P4",
        "REGNUMBER": "4-18-00077-A",
        "LISTLEVEL": "3",
        "FACEVALUE": 1000,
        "FACEUNIT": "USD",
        "ISSUESIZE": 257441,
        "IS_COLLATERAL": 1,
        "IS_EXTERNAL": 0,
        "PRIMARY_BOARDID": "TQCB",
        "PRIMARY_BOARD_TITLE": "Т+: Облигации - безадрес.",
        "MATDATE": "2027-04-26",
        "IS_RII": null,
        "INCLUDEDBYMOEX": null,
        "DURATION": 799,
        "IS_QUALIFIED_INVESTORS": 0,
        "HIGH_RISK": 0,
        "COUPONFREQUENCY": 2,
        "EVENINGSESSION": 1,
        "MORNINGSESSION": 0,
        "WAPRICE": 89.2437,
        "YIELDATWAP": 8.13,
        "COUPONDATE": "2025-04-26",
        "COUPONPERCENT": 2.8,
        "COUPONVALUE": 14,
        "COUPONDAYSPASSED": 83,
        "COUPONDAYSREMAIN": 99,
        "COUPONLENGTH": 182,
        "ISSUEDATE": "2022-10-04",
        "INITIALFACEVALUE": 1000,
        "SECSUBTYPE": null,
        "STARTDATEMOEX": "2022-10-31",
        "REPLBOND": true,
        "DAYSTOREDEMPTION": 829,
        "OFFERDATE": null,
        "EMITENTNAME": "Публичное акционерное общество \"Нефтяная компания \"ЛУКОЙЛ\"",
        "INN": "7708004767",
        "LOTSIZE": 1,
        "PRICE": 89.32,
        "PRICE_RUB": 92144.68,
        "RTL1": 78322.98,
        "RTH1": 105966.38,
        "RTL2": 75558.64,
        "RTH2": 108730.72,
        "RTL3": 72794.3,
        "RTH3": 111495.06,
        "DISCOUNT1": 15,
        "LIMIT1": 5148,
        "DISCOUNT2": 18,
        "LIMIT2": 25740,
        "DISCOUNT3": 21,
        "DISCOUNTL0": 15,
        "DISCOUNTH0": 13,
        "FULLCOVERED": 0
    },
   
]

// console.log(transformReplays(response))