import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../../src/utils/FakeParser";

describe('correct', () => {
    const offsets: {[key: string]: number} = {
        '+00:00': 0,
        '-12:00': -720,
        '-11:57': -717,
        '-05:32': -332,
        '-00:00': -0,
        '+03:14': 194,
        '+09:22': 562,
        '+13:45': 825,
        '+14:00': 840,
    };

    for (const offset in offsets) {
        it(offset, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'P', offset);
            parser.parseSymbol('P');

            expect(parser.offset).toEqual(offsets[offset]);
        });
    }
});

describe('not correct', () => {
    const offsets = [
        '+0a:00',
        '00:00',
        '-00:0b',
        '+0000',
        '-12:01',
        '+14:01',
    ];

    for (const offset of offsets) {
        it(offset, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'P', offset);

            try {
                parser.parseSymbol('P');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
