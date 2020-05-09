import FakeParser from "../../src/classes/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 0; i <= 1; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'L', i.toString());
            parser.parseSymbol('L');

            expect(parser.leap).toBe(!!i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '2', '0', 'f', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'L', value);
            try {
                parser.parseSymbol('L');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
