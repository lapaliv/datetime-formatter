import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('50/5 from 2020-01-01 00:00:00 to 2020-01-01 00:10:00', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 10, 0);
        const result = formatter.getIndexOfMinutePeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [50, 5]
        );
        expect(result).toBe(0);
    });
    it('40/120 from 2020-01-01 00:00:00 to 2020-01-01 00:55:00', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 55, 0);
        const result = formatter.getIndexOfMinutePeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [40, 120]
        );
        expect(result).toBe(1);
    });
    it('10/20/30 from 2020-01-01 00:00:00 to 2020-01-01 00:31:00', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 31, 0);
        const result = formatter.getIndexOfMinutePeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [10, 20, 30]
        );
        expect(result).toBe(2);
    });
    it('10/20/30 from 2020-01-01 00:00:00 to 2020-01-01 00:31:00', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 31, 0);
        const result = formatter.getIndexOfMinutePeriodOnWhichDateIsIncluded(new DateTimeFormatter(2020, 1, 1), 10, 20, 30);
        expect(result).toBe(2);
    });
});
