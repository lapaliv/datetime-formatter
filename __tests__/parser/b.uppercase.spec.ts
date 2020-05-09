import FakeParser from "../../src/utils/FakeParser";
import {leadingZeroNumber} from "../../src/utils/leadingZeroNumber";
import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import {convertSecondsToTime} from "../../src/utils/convertSecondsToTime";

describe('correct', () => {
    for (let i = 0; i <= 999; i += 99) {
        it(leadingZeroNumber(i, 3), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'B', leadingZeroNumber(i, 3));
            parser.parseSymbol('B');

            expect(parser.internetTime).toBe(i);
            parser.defineTimeByInternetTime();

            const {hours, minutes, seconds} = convertSecondsToTime(Math.floor(i * 86400 / 999));

            expect(parser.hours).toBe(hours + 1);
            expect(parser.minutes).toBe(minutes);
            expect(parser.seconds).toBe(seconds);
        });
    }
});

describe('not correct', () => {
    for (const value of ['---', '-01', '1000', '-1', '0', '00', '11', '99', '9999']) {
        it(value.toString(), () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'B', value);
            try {
                parser.parseSymbol('B');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
