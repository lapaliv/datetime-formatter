import FakeParser from "../../src/classes/FakeParser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('2004-02-12T15:19:21+00:00', () => {
        const parser = new FakeParser(new DateTimeFormatter(), 'c', '2004-02-12T15:19:21+00:00');
        parser.parseSymbol('c');

        expect(parser.year).toBe(2004);
        expect(parser.month).toBe(1);
        expect(parser.day).toBe(12);
        expect(parser.hours).toBe(15);
        expect(parser.minutes).toBe(19);
        expect(parser.seconds).toBe(21);
        expect(parser.microseconds).toBe(null);
        expect(parser.offset).toBe(0);
    });

    it('2020-05-09T12:22:43+03:45', () => {
        const parser = new FakeParser(new DateTimeFormatter(), 'c', '2020-05-09T12:22:43+03:45');
        parser.parseSymbol('c');

        expect(parser.year).toBe(2020);
        expect(parser.month).toBe(4);
        expect(parser.day).toBe(9);
        expect(parser.hours).toBe(12);
        expect(parser.minutes).toBe(22);
        expect(parser.seconds).toBe(43);
        expect(parser.microseconds).toBe(null);
        expect(parser.offset).toBe(225);
    });

    it('1970-01-02T03:04:05-06:07', () => {
        const parser = new FakeParser(new DateTimeFormatter(), 'c', '1970-01-02T03:04:05-06:07');
        parser.parseSymbol('c');

        expect(parser.year).toBe(1970);
        expect(parser.month).toBe(0);
        expect(parser.day).toBe(2);
        expect(parser.hours).toBe(3);
        expect(parser.minutes).toBe(4);
        expect(parser.seconds).toBe(5);
        expect(parser.microseconds).toBe(null);
        expect(parser.offset).toBe(-367);
    });
});

describe('not correct', () => {
    const dates = [
        '197a-01-02T03:04:05-06:07',
        '1970-0b-02T03:04:05-06:07',
        '1970-01-0cT03:04:05-06:07',
        '1970-01-02T0d:04:05-06:07',
        '1970-01-02T03:0e:05-06:07',
        '1970-01-02T03:04:0f-06:07',
        '1970-01-02T03:04:0f-0g:07',
        '1970-01-02T03:04:05-06:07',
        '1970-01-02T03:04:05-06:0h',
        '1970-13-02T03:04:05-06:07',
        '1970-01-32T03:04:05-06:07',
        '1970-01-02T24:04:05-06:07',
        '1970-01-02T03:60:05-06:07',
        '1970-01-02T03:04:60-06:07',
        '1970-01-02T03:04:05-06:07',
    ];

    for (const date of dates) {
        it(date, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'c', date);

            try {
                parser.parseSymbol('c');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        })
    }
});
