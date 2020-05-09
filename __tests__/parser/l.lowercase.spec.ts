import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../../src/utils/FakeParser";

describe('correct', () => {
    const allDayNames = [
        DateTimeFormatter.globalDayNames,
        ['0', '1', '22', '333', '4444', '55555', '666666']
    ];

    for (const dayNames of allDayNames) {
        const formatter = new DateTimeFormatter();
        formatter.setTranslations({
            monthNames: DateTimeFormatter.globalMonthNames,
            shortMonthNames: DateTimeFormatter.globalShortMonthNames,
            dayNames: dayNames,
            shortDayNames: DateTimeFormatter.globalShortDayNames,
        });

        for (let i = 0; i < formatter.dayNames.length; i++) {
            const dayName = formatter.dayNames[i];

            it(formatter.dayNames[i], () => {
                const parser = new FakeParser(formatter, 'l', dayName);
                parser.parseSymbol('l');

                expect(parser.day).toBe(null);
                expect(parser.dayOfWeek).toBe(i + 1);
            });
        }
    }
});

describe('not correct', () => {
    const dayNames = ['bla', 'abra', '111', '', 'null', 'undefined'];

    for (const dayName of dayNames) {
        it(dayName, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'l', dayName);

            try {
                parser.parseSymbol('l');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
