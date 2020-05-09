import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../../src/classes/FakeParser";

describe('correct', () => {
    const offsets: {[key: string]: number} = {
        '+0000': 0,
        '-1200': -720,
        '-1157': -717,
        '-0532': -332,
        '-0000': -0,
        '+0314': 194,
        '+0922': 562,
        '+1345': 825,
        '+1400': 840,
    };

    for (const offset in offsets) {
        it(offset, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'O', offset);
            parser.parseSymbol('O');

            expect(parser.offset).toEqual(offsets[offset]);
        });
    }
});

describe('not correct', () => {
    const offsets = [
        '+0a00',
        '0000',
        '-000b',
        '+0000',
        '-1201',
        '+1401',
    ];

    for (const offset of offsets) {
        it(offset, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'O', offset);

            try {
                parser.parseSymbol('O');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
