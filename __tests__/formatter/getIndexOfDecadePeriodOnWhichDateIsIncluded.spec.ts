import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('10/20 from 2010-01-01 to 2019-12-31', () => {
        const formatter = new DateTimeFormatter(2019, 12, 31);
        const result = formatter.getIndexOfDecadePeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2010, 1, 1),
            [10, 20]
        );
        expect(result).toBe(0);
    });
    it('1/2 from 2020-01-01 to 2030-01-01', () => {
        const formatter = new DateTimeFormatter(2030, 1, 1);
        const result = formatter.getIndexOfDecadePeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [1, 2]
        );
        expect(result).toBe(1);
    });
    it('1/2/3 from 2020-01-01 to 2050-01-01', () => {
        const formatter = new DateTimeFormatter(2050, 1, 1);
        const result = formatter.getIndexOfDecadePeriodOnWhichDateIsIncluded(new DateTimeFormatter(2020, 1, 1), 1, 2, 3);
        expect(result).toBe(2);
    });
});
