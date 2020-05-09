import FakeParser from "../../src/utils/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 1; i <= 12; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'g', i.toString());
            parser.parseSymbol('g');

            expect(parser.hours).toBe(null);
            expect(parser.divideHours).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '32', '0', 'f', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'g', value);
            try {
                parser.parseSymbol('g');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
