import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('2/3 from 1900-01-01 to 2099-01-01', () => {
        const formatter = new DateTimeFormatter(2099, 1, 1);
        const result = formatter.getIndexOfCenturyPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(1900, 1, 1),
            [2, 3]
        );
        expect(result).toBe(0);
    });
    it('2/3 from 1900-01-01 to 2100-01-01', () => {
        const formatter = new DateTimeFormatter(2100, 1, 1);
        const result = formatter.getIndexOfCenturyPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(1900, 1, 1),
            [2, 3]
        );
        expect(result).toBe(1);
    });
    it('1/2/3 from 1900-01-01 to 2200-01-01', () => {
        const formatter = new DateTimeFormatter(2200, 1, 1);
        const result = formatter.getIndexOfCenturyPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(1900, 1, 1),
            [1, 2, 3]
        );
        expect(result).toBe(2);
    });
});
