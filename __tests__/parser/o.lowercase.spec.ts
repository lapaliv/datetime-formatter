import FakeParser from "../../src/utils/FakeParser";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (const year of [1999, 2003, 2056, 1531, 3567, 8901]) {
        it(year.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'o', year.toString());
            parser.parseSymbol('o');

            expect(parser.year).toBe(year);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a001', 'abcd', '----', '-900', '-3a34']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'o', value);
            try {
                parser.parseSymbol('o');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
