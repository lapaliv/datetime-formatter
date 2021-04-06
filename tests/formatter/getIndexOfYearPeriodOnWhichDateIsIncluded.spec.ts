import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('3/6 from 2019-01-01 to 2020-01-01', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1);
        const result = formatter.getIndexOfYearPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2019, 1, 1),
            [3, 6]
        );
        expect(result).toBe(0);
    });
    it('4/2 from 2020-01-01 to 2024-01-10', () => {
        const formatter = new DateTimeFormatter(2024, 1, 10);
        const result = formatter.getIndexOfYearPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [4, 2]
        );
        expect(result).toBe(1);
    });
    it('1/2/3 from 2020-01-01 to 2025-02-02', () => {
        const formatter = new DateTimeFormatter(2025, 2, 2);
        const result = formatter.getIndexOfYearPeriodOnWhichDateIsIncluded(new DateTimeFormatter(2020, 1, 1), 1, 2, 3);
        expect(result).toBe(2);
    });
});
