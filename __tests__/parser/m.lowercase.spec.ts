import FakeParser from "../../src/classes/FakeParser";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 1; i <= 12; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'm', leadingZeroNumber(i));
            parser.parseSymbol('m');

            expect(parser.month).toBe(i - 1);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '13', '0', 'f', '-1']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'm', value);
            try {
                parser.parseSymbol('m');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
