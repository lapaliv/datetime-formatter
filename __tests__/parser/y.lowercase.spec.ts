import FakeParser from "../../src/utils/FakeParser";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    const data: { [key: string]: number } = {
        '69': 2069,
        '70': 1970,
        '71': 1971,
        '03': 2003,
        '15': 2015,
        '33': 2033,
        '57': 2057,
        '00': 2000,
    };

    for (const year in data) {
        it(year, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'y', year);
            parser.parseSymbol('y');

            expect(parser.year).toBe(data[year]);
        });
    }
});

describe('not correct', () => {
    for (const value of ['aa', 'a1', '1b', '-1', '+3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'y', value);
            try {
                parser.parseSymbol('y');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
