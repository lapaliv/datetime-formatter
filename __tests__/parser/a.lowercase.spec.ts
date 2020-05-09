import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../FakeParser";

describe('correct', () => {
    for (const item of ['am', 'pm']) {
        it(item, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'a', item);
            parser.parseSymbol('a');

            expect(parser.am).toBe(item === 'am');
        });
    }
});

describe('not correct', () => {
    const days = ['ab', 'pa', '11', '-1'];

    for (const dayIndex of days) {
        it(dayIndex, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'a', dayIndex);

            try {
                parser.parseSymbol('a');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }

            expect(parser.am).toBe(null);
        });
    }
});
