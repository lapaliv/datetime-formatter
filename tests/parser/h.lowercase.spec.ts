import FakeParser from "../../src/classes/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";

describe('correct', () => {
    for (let i = 1; i <= 12; i++) {
        it(leadingZeroNumber(i), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'h', leadingZeroNumber(i));
            parser.parseSymbol('h');

            expect(parser.divideHours).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '32', '00', 'fb', '-3', '13', '0']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'h', value);
            try {
                parser.parseSymbol('h');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
