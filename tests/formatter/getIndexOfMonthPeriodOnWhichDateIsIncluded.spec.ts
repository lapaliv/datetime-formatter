import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('2/5 from 2020-01-01 to 2020-02-09', () => {
        const formatter = new DateTimeFormatter(2020, 2, 1);
        const result = formatter.getIndexOfMonthPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [2, 5]
        );
        expect(result).toBe(0);
    });
    it('5/2 from 2020-01-01 to 2020-06-10', () => {
        const formatter = new DateTimeFormatter(2020, 6, 10);
        const result = formatter.getIndexOfMonthPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [5, 2]
        );
        expect(result).toBe(1);
    });
    it('1/2/3 from 2020-01-01 to 2020-04-15', () => {
        const formatter = new DateTimeFormatter(2020, 4, 15);
        const result = formatter.getIndexOfMonthPeriodOnWhichDateIsIncluded(new DateTimeFormatter(2020, 1, 1), 1, 2, 3);
        expect(result).toBe(2);
    });
});
