import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('50/5 from 2020-01-01 00:00:00 to 2020-01-01 10:00:00', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 10, 0, 0);
        const result = formatter.getIndexOfHourPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [50, 5]
        );
        expect(result).toBe(0);
    });
    it('2/5 from 2020-01-01 00:00:00 to 2020-01-01 03:00:00', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 3, 0, 0);
        const result = formatter.getIndexOfHourPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [2, 5]
        );
        expect(result).toBe(1);
    });
    it('1/2/3 from 2020-01-01 00:00:00 to 2020-01-01 04:00:00', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 4, 0, 0);
        const result = formatter.getIndexOfHourPeriodOnWhichDateIsIncluded(new DateTimeFormatter(2020, 1, 1), 1, 2, 3);
        expect(result).toBe(2);
    });
});
