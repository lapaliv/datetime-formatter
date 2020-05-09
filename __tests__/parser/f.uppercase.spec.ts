import {DateTimeFormatter} from "../../src/DateTimeFormatter";
import FakeParser from "../FakeParser";

describe('correct', () => {
    const allMonthNames = [
        DateTimeFormatter.globalMonthNames,
        ['0', '1', '22', '333', '44F4', '55555', '66A666', '777', '8888', '99999', 'aaa', 'BBB']
    ];

    for (const monthNames of allMonthNames) {
        const formatter = new DateTimeFormatter();
        formatter.setTranslations({
            monthNames: monthNames,
            shortMonthNames: DateTimeFormatter.globalShortMonthNames,
            dayNames: DateTimeFormatter.globalDayNames,
            shortDayNames: DateTimeFormatter.globalShortDayNames,
        });

        for (let i = 0; i < monthNames.length; i++) {
            const monthName = monthNames[i];

            it(monthName, () => {
                const parser = new FakeParser(formatter, 'F', monthName.toLowerCase());
                parser.parseSymbol('F');

                expect(parser.month).toBe(i);
            });
        }
    }
});

describe('not correct', () => {
    const shortDayNames = ['bla', 'abra', '111', '', 'null', 'undefined'];

    for (const dayName of shortDayNames) {
        it(dayName, () => {
            const parser = new FakeParser(new DateTimeFormatter(), 'F', dayName);

            try {
                parser.parseSymbol('F');
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });
    }
});
