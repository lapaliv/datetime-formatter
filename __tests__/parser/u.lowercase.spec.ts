import FakeParser from "../../src/utils/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";

describe('correct', () => {
    for (let i = 0; i < Math.pow(10, 6); i += 497) {
        it(leadingZeroNumber(i, 6), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'u', leadingZeroNumber(i, 6));
            parser.parseSymbol('u');

            expect(parser.microseconds).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '60', 'fb', '-3', 'null', 'undefined', '33344']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'u', value);
            try {
                parser.parseSymbol('u');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
