import FakeParser from "../../src/utils/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 1; i <= 31; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'j', i.toString());
            parser.parseSymbol('j');

            expect(parser.day).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '32', '0', 'f', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'j', value);
            try {
                parser.parseSymbol('j');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
