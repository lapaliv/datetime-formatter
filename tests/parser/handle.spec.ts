import {Parser} from "../../src/classes/Parser";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
    it('Y-m-d H:i:s (year + month + day + hours + minutes + seconds)', () => {
        const formatter = new DateTimeFormatter();
        const parser = new Parser(formatter, 'Y-m-d H:i:s', '2020-05-09 01:02:03');
        let {year, month, day, hours, minutes, seconds, microseconds, offset} = parser.handle();

        expect(year).toEqual(2020);
        expect(month).toEqual(4);
        expect(day).toEqual(9);
        expect(hours).toEqual(1);
        expect(minutes).toEqual(2);
        expect(seconds).toEqual(3);
        expect(microseconds).toEqual(0);
        expect(offset).toEqual(0);
    });

    it('y D jS F (short name of month + 12 hour format)', () => {
        const formatter = new DateTimeFormatter();
        const parser = new Parser(formatter, 'y D jS F', '33 Mon 7th February');
        let {year, month, day, hours, minutes, seconds, microseconds, offset} = parser.handle();

        expect(year).toEqual(2033);
        expect(month).toEqual(1);
        expect(day).toEqual(7);
        expect(hours).toEqual(0);
        expect(minutes).toEqual(0);
        expect(seconds).toEqual(0);
        expect(microseconds).toEqual(0);
        expect(offset).toEqual(0);
    });

    it('Y M z hA u (day of year + microseconds)', () => {
        const formatter = new DateTimeFormatter();
        const parser = new Parser(formatter, 'Y M z hA u', '2008 May 139 01pm 123456');
        let {year, month, day, hours, minutes, seconds, microseconds, offset} = parser.handle();

        expect(year).toEqual(2008);
        expect(month).toEqual(4);
        expect(day).toEqual(19);
        expect(hours).toEqual(13);
        expect(minutes).toEqual(0);
        expect(seconds).toEqual(0);
        expect(microseconds).toEqual(123456);
        expect(offset).toEqual(0);
    });

    it('Y w:W v (day of week + week of year + milliseconds)', () => {
        const formatter = new DateTimeFormatter();
        const parser = new Parser(formatter, 'Y w:W v', '2029 2:40 123');
        let {year, month, day, hours, minutes, seconds, microseconds, offset} = parser.handle();

        expect(year).toEqual(2029);
        expect(month).toEqual(9);
        expect(day).toEqual(2);
        expect(hours).toEqual(0);
        expect(minutes).toEqual(0);
        expect(seconds).toEqual(0);
        expect(microseconds).toEqual(123000);
        expect(offset).toEqual(0);
    });

    it('U (timestamp)', () => {
        const formatter = new DateTimeFormatter();
        const parser = new Parser(formatter, 'U', '1616850855');
        let {year, month, day, hours, minutes, seconds, microseconds, offset} = parser.handle();

        expect(year).toEqual(2021);
        expect(month).toEqual(2);
        expect(day).toEqual(27);
        expect(hours).toEqual(13);
        expect(minutes).toEqual(14);
        expect(seconds).toEqual(15);
        expect(microseconds).toEqual(0);
        expect(offset).toEqual(0);
    });

    it('Ymd H:i:s P (offset)', () => {
        const formatter = new DateTimeFormatter();
        const parser = new Parser(formatter, 'Ymd H:i:s P', '20200501 17:13:20 +03:33');
        let {year, month, day, hours, minutes, seconds, microseconds, offset} = parser.handle();

        expect(year).toEqual(2020);
        expect(month).toEqual(4);
        expect(day).toEqual(1);
        expect(hours).toEqual(17);
        expect(minutes).toEqual(13);
        expect(seconds).toEqual(20);
        expect(microseconds).toEqual(0);
        expect(offset).toEqual(213);
    });

    it('Ymd H:i:s O (offset)', () => {
        const formatter = new DateTimeFormatter();
        const parser = new Parser(formatter, 'Ymd H:i:s O', '20200501 17:13:20 -0814');
        let {year, month, day, hours, minutes, seconds, microseconds, offset} = parser.handle();

        expect(year).toEqual(2020);
        expect(month).toEqual(4);
        expect(day).toEqual(1);
        expect(hours).toEqual(17);
        expect(minutes).toEqual(13);
        expect(seconds).toEqual(20);
        expect(microseconds).toEqual(0);
        expect(offset).toEqual(-494);
    });
});

