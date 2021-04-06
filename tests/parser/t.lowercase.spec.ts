import FakeParser from "../../src/classes/FakeParser";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 28; i <= 31; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 't', leadingZeroNumber(i));
            parser.parseSymbol('t');

            expect(parser.daysInMonth).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '32', '0', 'f', '-3', '27', '11']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 't', value);
            try {
                parser.parseSymbol('t');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
