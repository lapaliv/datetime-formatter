import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('3/2 from 2020-01-01 to 2020-01-01', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [3, 2]
        );
        expect(result).toBe(0);
    });
    it('3/2 from 2020-01-01 to 2020-01-02', () => {
        const formatter = new DateTimeFormatter(2020, 1, 2);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [3, 2]
        );
        expect(result).toBe(0);
    });
    it('3/2 from 2020-01-01 to 2020-01-03', () => {
        const formatter = new DateTimeFormatter(2020, 1, 3);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [3, 2]
        );
        expect(result).toBe(0);
    });
    it('3/2 from 2020-01-01 to 2020-01-04', () => {
        const formatter = new DateTimeFormatter(2020, 1, 4);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [3, 2]
        );
        expect(result).toBe(1);
    });
    it('3/2 from 2020-01-01 to 2020-01-05', () => {
        const formatter = new DateTimeFormatter(2020, 1, 5);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [3, 2]
        );
        expect(result).toBe(1);
    });
    it('3/2 from 2020-01-01 to 2020-01-06', () => {
        const formatter = new DateTimeFormatter(2020, 1, 6);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [3, 2]
        );
        expect(result).toBe(0);
    });
    it('3/2 from 2020-01-01 to 2020-04-05', () => {
        const formatter = new DateTimeFormatter(2020, 4, 5);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [3, 2]
        );
        expect(result).toBe(0);
    });
    it('3/2 from 2020-01-01 to 2020-04-08', () => {
        const formatter = new DateTimeFormatter(2020, 4, 8);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [3, 2]
        );
        expect(result).toBe(1);
    });
    it('5/2 from 2010-02-01 to 2019-10-17', () => {
        const formatter = new DateTimeFormatter(2019, 10, 17);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2010, 2, 1),
            [5, 2]
        );
        expect(result).toBe(0);
    });
    it('5/2 from 2010-02-01 to 2019-10-19', () => {
        const formatter = new DateTimeFormatter(2019, 10, 19);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2010, 2, 1),
            [5, 2]
        );
        expect(result).toBe(1);
    });
    it('5/2 from 2010-02-01 to 2019-10-19', () => {
        const formatter = new DateTimeFormatter(2019, 10, 19);
        const result = formatter.getIndexOfDayPeriodOnWhichDateIsIncluded(new DateTimeFormatter(2010, 2, 1), 5, 2);
        expect(result).toBe(1);
    });
});
