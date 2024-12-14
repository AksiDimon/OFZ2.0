import { positionX, positionY } from "../calcsFuncs/calcsQuotes/positionX"

test('тестирование позиции X  для вычисления положения облигации в контейнере с posotion: relative', () => {
    const params = ['2025-01-21', '2055-01-21', '2024-12-12'];
   expect(positionX(...params)).toEqual(-0.3650634297709227);
    expect(positionX('2025-01-29','2044-07-20','2033-03-23')).toBeCloseTo(41.83095373402778, 10)
    
});

test('тестирование позиции Y для высчитывания точного положения облигации в нашем контейнере(где отображаются облигации)', () => {
    expect(positionY(17.5, 24, 14)).toEqual(35)
})


