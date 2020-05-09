import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../../src/utils/FakeParser";

describe('correct', () => {
    for (let i = 0; i <= 365; i += 3) {
        it(i.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'z', i.toString());
            parser.parseSymbol('z');

            expect(parser.day).toBe(null);
            expect(parser.dayOfWeek).toBe(null);
            expect(parser.dayOfYear).toBe(i);
        });
    }
});

describe('not correct', () => {
    const days = ['a', 'b', '366', '-1'];

    for (const dayIndex of days) {
        it(dayIndex, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'z', dayIndex);

            try {
                parser.parseSymbol('z');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
