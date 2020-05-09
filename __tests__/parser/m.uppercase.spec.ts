import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../../src/utils/FakeParser";

describe('correct', () => {
    const allMonthNames = [
        DateTimeFormatter.globalShortMonthNames,
        ['0', '1', '22', '333', '44F4', '55555', '66A666', '777', '8888', '99999', 'aaa', 'BBB']
    ];

    for (const monthNames of allMonthNames) {
        const formatter = new DateTimeFormatter();
        formatter.setTranslations({
            monthNames: DateTimeFormatter.globalMonthNames,
            shortMonthNames: monthNames,
            dayNames: DateTimeFormatter.globalDayNames,
            shortDayNames: DateTimeFormatter.globalShortDayNames,
        });

        for (let i = 0; i < monthNames.length; i++) {
            const monthName = monthNames[i];

            it(monthName, () => {
                const parser = new FakeParser(formatter, 'M', monthName.toLowerCase());
                parser.parseSymbol('M');

                expect(parser.month).toBe(i);
            });
        }
    }
});

describe('not correct', () => {
    const shortMonthNames = ['bla', 'abra', '111', '', 'null', 'undefined'];

    for (const monthName of shortMonthNames) {
        it(monthName, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'M', monthName);

            try {
                parser.parseSymbol('M');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
