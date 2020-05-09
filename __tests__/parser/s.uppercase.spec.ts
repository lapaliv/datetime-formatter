import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../FakeParser";

describe('correct', () => {
    for (let i = 1; i <= 31; i++) {
        let suffix: string;
        switch (i) {
            case 1:
            case 21:
            case 31:
                suffix = 'st';
                break;
            case 2:
            case 22:
                suffix = 'nd';
                break;
            case 3:
            case 23:
                suffix = 'rd';
                break;
            default:
                suffix = 'th';
        }

        it(`${i}${suffix}`, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'S', suffix);
            parser.parseSymbol('S');

            expect(parser.day).toBe(null);
            expect(parser.suffix).toBe(suffix);
        });
    }
});

describe('not correct', () => {
    const suffixes = ['a', 'b', 'ab', '1', '33', 'av'];

    for (const suffix of suffixes) {
        it(suffix, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'S', suffix);

            try {
                parser.parseSymbol('S');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
