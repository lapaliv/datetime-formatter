import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../FakeParser";

describe('correct', () => {
    for (let i = 1; i <= 7; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'N', i.toString());
            parser.parseSymbol('N');

            expect(parser.day).toBe(null);
            expect(parser.dayOfWeek).toBe(i);
        });
    }
});

describe('not correct', () => {
    const dayNames = ['0', '8', '9', 'a', 'b'];

    for (const dayName of dayNames) {
        it(dayName, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'N', dayName);

            try {
                parser.parseSymbol('N');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
