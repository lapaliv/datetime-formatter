import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('50000/50000 from 2020-01-01 00:00:00.000000 to 2020-01-01 00:00:00.100000', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 100000);
        const result = formatter.getIndexOfMicrosecondPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [50000, 50000]
        );
        expect(result).toBe(0);
    });
    it('50001/50001 from 2020-01-01 00:00:00.000000 to 2020-01-01 00:00:00.100000', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 100000);
        const result = formatter.getIndexOfMicrosecondPeriodOnWhichDateIsIncluded(
            new DateTimeFormatter(2020, 1, 1),
            [50001, 50001]
        );
        expect(result).toBe(1);
    });
    it('50001/50001 from 2020-01-01 00:00:00.000000 to 2020-01-01 00:00:00.100000', () => {
        const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 100000);
        const result = formatter.getIndexOfMicrosecondPeriodOnWhichDateIsIncluded(new DateTimeFormatter(2020, 1, 1), 50001, 50001);
        expect(result).toBe(1);
    });
});
