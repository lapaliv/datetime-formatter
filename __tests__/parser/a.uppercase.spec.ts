import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../FakeParser";

describe('correct', () => {
    for (const item of ['AM', 'PM']) {
        it(item, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'A', item);
            parser.parseSymbol('A');

            expect(parser.am).toBe(item === 'AM');
        });
    }
});

describe('not correct', () => {
    const days = ['AB', 'PA', '11', '-1'];

    for (const dayIndex of days) {
        it(dayIndex, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'A', dayIndex);

            try {
                parser.parseSymbol('A');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }

            expect(parser.am).toBe(null);
        });
    }
});
