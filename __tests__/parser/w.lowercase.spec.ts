import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../../src/classes/FakeParser";

describe('correct', () => {
    for (let i = 0; i <= 6; i++) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'w', i.toString());
            parser.parseSymbol('w');

            expect(parser.day).toBe(null);
            expect(parser.dayOfWeek).toBe(i === 0 ? 7 : i + 1);
        });
    }
});

describe('not correct', () => {
    const dayNames = ['7', '8', '9', 'a', 'b'];

    for (const dayName of dayNames) {
        it(dayName, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'w', dayName);

            try {
                parser.parseSymbol('w');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
