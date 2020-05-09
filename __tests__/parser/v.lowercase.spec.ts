import FakeParser from "../../src/utils/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";

describe('correct', () => {
    for (let i = 0; i < Math.pow(10, 3); i += 98) {
        it(leadingZeroNumber(i, 3), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'v', leadingZeroNumber(i, 3));
            parser.parseSymbol('v');

            expect(parser.microseconds).toBe(i * Math.pow(10, 3));
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '60', 'fb', '-301', 'null', 'undefined', '345']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'v', value);
            try {
                parser.parseSymbol('v');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
