import FakeParser from "../../src/classes/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 0; i <= 23; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'G', i.toString());
            parser.parseSymbol('G');

            expect(parser.hours).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '24', 'fb', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'G', value);
            try {
                parser.parseSymbol('G');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
