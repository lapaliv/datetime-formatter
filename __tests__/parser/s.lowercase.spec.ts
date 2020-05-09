import FakeParser from "../../src/utils/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";

describe('correct', () => {
    for (let i = 0; i <= 59; i++) {
        it(leadingZeroNumber(i), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 's', leadingZeroNumber(i));
            parser.parseSymbol('s');

            expect(parser.seconds).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '60', 'fb', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 's', value);
            try {
                parser.parseSymbol('s');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
