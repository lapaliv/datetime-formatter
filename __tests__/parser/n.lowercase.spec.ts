import FakeParser from "../FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 1; i <= 12; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'n', i.toString());
            parser.parseSymbol('n');

            expect(parser.month).toBe(i - 1);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '13', '0', 'f', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'n', value);
            try {
                parser.parseSymbol('n');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
