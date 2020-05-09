import FakeParser from "../FakeParser";
import {doubleNumber} from "../../src/utils/doubleNumber";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    for (let i = 1; i <= 12; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'm', doubleNumber(i));
            parser.parseSymbol('m');

            expect(parser.month).toBe(i - 1);
        });
    }
});

describe('not correct', () => {
    for (const value of ['a', '13', '0', 'f', '-1']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'm', value);
            try {
                parser.parseSymbol('m');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
