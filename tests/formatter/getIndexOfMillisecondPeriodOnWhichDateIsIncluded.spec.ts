import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('50/50 from 2020-01-01 00:00:00.000 to 2020-01-01 00:00:00.100', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 100000);
        const result = formatter.getIndexOfMillisecondPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [50, 50]
        );
        expect(result).toBe(0);
    });
    it('51/51 from 2020-01-01 00:00:00.000 to 2020-01-01 00:00:00.100', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 100000);
        const result = formatter.getIndexOfMillisecondPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [51, 51]
        );
        expect(result).toBe(1);
    });
    it('51/51 from 2020-01-01 00:00:00.000 to 2020-01-01 00:00:00.100', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 100000);
        const result = formatter.getIndexOfMillisecondPeriodOnWhichDateIsIncluded(new DateTimeFormatter(2020, 1, 1), 51, 51);
        expect(result).toBe(1);
    });
});
