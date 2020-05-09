import FakeParser from "../FakeParser";
import {doubleNumber} from "../../src/utils/doubleNumber";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 1; i <= 31; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'd', doubleNumber(i));
            parser.parseSymbol('d');

            expect(parser.day).toBe(i);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '32', '0', 'f', '-3']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'd', value);
            try {
                parser.parseSymbol('d');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
