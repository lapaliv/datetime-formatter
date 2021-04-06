import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../../src/classes/FakeParser";

describe('correct', () => {
    const allShortDayNames = [
        DateTimeFormatter.globalShortDayNames,
        ['0', '1', '22', '333', '44C44', '55B5', '6a666']
    ];

    for (const shortDayNames of allShortDayNames) {
        const formatter = new DateTimeFormatter();
        formatter.setTranslations({
            monthNames: DateTimeFormatter.globalMonthNames,
            shortMonthNames: DateTimeFormatter.globalShortMonthNames,
            dayNames: DateTimeFormatter.globalDayNames,
            shortDayNames: shortDayNames,
        });

        for (let i = 0; i < formatter.shortDayNames.length; i++) {
            const dayName = formatter.shortDayNames[i];

            it(formatter.shortDayNames[i], () => {
                const parser = new FakeParser(formatter, 'D', dayName);
                parser.parseSymbol('D');

                expect(parser.day).toBe(null);
                expect(parser.dayOfWeek).toBe(i + 1);
            });
        }
    }
});

describe('not correct', () => {
    const shortDayNames = ['bla', 'abra', '111', '', 'null', 'undefined'];

    for (const dayName of shortDayNames) {
        it(dayName, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'D', dayName);

            try {
                parser.parseSymbol('D');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
