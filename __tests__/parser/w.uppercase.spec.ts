import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../FakeParser";
import {doubleNumber} from "../../src/utils/doubleNumber";

describe('correct', () => {
    for (let i = 1; i <= 52; i++) {
        it(doubleNumber(i), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'W', doubleNumber(i));
            parser.parseSymbol('W');

            expect(parser.day).toBe(null);
            expect(parser.weekOfYear).toBe(i);
        });
    }
});

describe('not correct', () => {
    const numbers = ['0', '00', '53', '99', 'aa', 'a', 'bb'];

    for (const number of numbers) {
        it(number, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'W', number);

            try {
                parser.parseSymbol('W');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
