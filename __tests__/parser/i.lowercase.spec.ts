import FakeParser from "../../src/classes/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";

describe('correct', () => {
    for (let i = 0; i <= 59; i++) {
        it(leadingZeroNumber(i), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'i', leadingZeroNumber(i));
            parser.parseSymbol('i');

            expect(parser.minutes).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '60', 'fb', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'i', value);
            try {
                parser.parseSymbol('i');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
