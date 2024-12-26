

import { generateVerticalData } from "./printCordinates";

describe("generateVerticalData", () => {
    // Mock функция для преобразования дат в миллисекунды
    const mockDate2ms = (date) => new Date(date).getTime();

    test("Добавление текущей даты в этом году, если она попадает в диапазон", () => {
        const todayDate = "2024-12-23";
        const minDate = "2028-03-04";
        const maxDate = "2034-08-18";

        const result = generateVerticalData(minDate, maxDate, mockDate2ms, todayDate);

        expect(result).toEqual([
            { year: 2028, x: 0, date: "2028-03-04" },
            { year: 2028, x: expect.any(Number), date: "2028-12-23" },
            { year: 2029, x: expect.any(Number), date: "2029-12-23" },
            { year: 2030, x: expect.any(Number), date: "2030-12-23" },
            { year: 2031, x: expect.any(Number), date: "2031-12-23" },
            { year: 2032, x: expect.any(Number), date: "2032-12-23" },
            { year: 2033, x: expect.any(Number), date: "2033-12-23" },
            { year: 2034, x: expect.any(Number), date: "2034-08-18" },
        ]);
    });

    test("Добавление текущей даты с другим todayDate", () => {
        const todayDate = "2024-06-23";
        const minDate = "2028-03-04";
        const maxDate = "2032-08-18";

        const result = generateVerticalData(minDate, maxDate, mockDate2ms, todayDate);

        expect(result).toEqual([
            { year: 2028, x: 0, date: "2028-03-04" },
            { year: 2028, x: expect.any(Number), date: "2028-06-23" },
            { year: 2029, x: expect.any(Number), date: "2029-06-23" },
            { year: 2030, x: expect.any(Number), date: "2030-06-23" },
            { year: 2031, x: expect.any(Number), date: "2031-06-23" },
            { year: 2032, x: expect.any(Number), date: "2032-06-23" },
            { year: 2032, x: expect.any(Number), date: "2032-08-18" },
        ]);
    });

    test("Если текущая дата выходит за диапазон maxDate, она не добавляется", () => {
        const todayDate = "2024-12-23";
        const minDate = "2028-03-04";
        const maxDate = "2029-06-23";

        const result = generateVerticalData(minDate, maxDate, mockDate2ms, todayDate);

        expect(result).toEqual([
            { year: 2028, x: 0, date: "2028-03-04" },
            { year: 2028, x: expect.any(Number), date: "2028-12-23" },
            { year: 2029, x: expect.any(Number), date: "2029-06-23" },
        ]);
    });

    

    test("Если minDate раньше todayDate, todayDate всё равно учитывается корректно", () => {
        const todayDate = "2028-06-23";
        const minDate = "2027-12-01";
        const maxDate = "2030-12-31";

        const result = generateVerticalData(minDate, maxDate, mockDate2ms, todayDate);

        expect(result).toEqual([
            { year: 2027, x: 0, date: "2027-12-01" },
            { year: 2028, x: expect.any(Number), date: "2028-06-23" },
            { year: 2029, x: expect.any(Number), date: "2029-06-23" },
            { year: 2030, x: expect.any(Number), date: "2030-06-23" },
            { year: 2030, x: expect.any(Number), date: "2030-12-31" },
        ]);
    });

    test("Если todayDate не попадает в диапазон, она не добавляется", () => {
        const todayDate = "2024-12-23";
        const minDate = "2025-01-01";
        const maxDate = "2026-12-31";

        const result = generateVerticalData(minDate, maxDate, mockDate2ms, todayDate);

        expect(result).toEqual([
            { year: 2025, x: 0, date: "2025-01-01" },
            { year: 2025, x: expect.any(Number), date: "2025-12-23" },
            { year: 2026, x: expect.any(Number), date: '2026-12-23' },
            { year: 2026, x: 1, date: "2026-12-31" },
        ]);
    });
});
