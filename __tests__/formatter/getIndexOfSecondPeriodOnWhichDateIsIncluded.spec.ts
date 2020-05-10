import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('30/25 from 2020-01-01 00:00:00 to 2020-01-01 00:00:29', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 29);
        const result = formatter.getIndexOfSecondPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [30, 25]
        );
        expect(result).toBe(0);
    });
    it('30/25 from 2020-01-01 00:00:00 to 2020-01-01 00:00:40', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 40);
        const result = formatter.getIndexOfSecondPeriodOnWhichDateIsIncluded(new DateTimeFormatter(2020, 1, 1), 30, 25);
        expect(result).toBe(1);
    });
});
