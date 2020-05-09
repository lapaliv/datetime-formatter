import FakeParser from "../../src/utils/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";

describe('correct', () => {
    for (let i = 0; i <= 23; i++) {
        it(leadingZeroNumber(i), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'H', leadingZeroNumber(i));
            parser.parseSymbol('H');

            expect(parser.hours).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '24', 'fb', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'H', value);
            try {
                parser.parseSymbol('H');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
