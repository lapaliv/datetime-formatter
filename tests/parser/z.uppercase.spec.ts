import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../../src/classes/FakeParser";

describe('correct', () => {
    const offsets: { [key: string]: number } = {
        '-43200': -720,
        '-43199': -720,
        '-42000': -700,
        '-12000': -200,
        '-5000': -83,
        '-999': -17,
        '-50': -1,
        '-1': -0,
        '0': 0,
        '70': 1,
        '789': 13,
        '1234': 21,
        '2345': 39,
        '3456': 58,
        '9999': 167,
        '23456': 391,
        '45678': 761,
        '50399': 840,
        '50400': 840,
    };

    for (const offset in offsets) {
        it(offset, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'Z', offset);
            parser.parseSymbol('Z');

            expect(parser.offset).toEqual(offsets[offset]);
        });
    }
});

describe('not correct', () => {
    const offsets = [
        '50401',
        '50410',
        '50500',
        '51400',
        '60400',
        '-43201',
        '-43210',
        '-43300',
        '-44200',
        '-53200',
        'abc',
        '-abc',
        '-3.000',
    ];

    for (const offset of offsets) {
        it(offset, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'Z', offset);

            try {
                parser.parseSymbol('Z');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
