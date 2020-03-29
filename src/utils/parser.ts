import {DateTimeFormatter} from "../DateTimeFormatter";
import {pascalCase} from "./pascalCase";

type ParserResult = {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    microseconds: number;
    offset: number,
};

export function parser(format: string, target: string): ParserResult {
    let year: number | null = null,
        month: number | null = null,
        day: number | null = null,
        hours: number | null = null,
        minutes: number | null = null,
        seconds: number | null = null,
        microseconds: number | null = null,
        offset: number | null = null,
        dayOfWeek: number | null = null,
        dayOfYear: number | null = null,
        weekOfYear: number | null = null,
        leap: boolean | null = null,
        am: boolean | null = null,
        internetTime: number | null = null,
        divideHours: number | null = null,
        suffix: string | null = null;

    const symbols = format.match(/\\?./g);

    if (Array.isArray(symbols)) {
        for (let index = 0; index < symbols.length; index++) {
            const symbol = symbols[index];
            let match: Array<string> | null,
                regexp,
                regexps,
                complex: ParserResult,
                needBreak = false;

            switch (symbol) {
                case 'd':
                    if (target.match(/^(0[1-9]|[1-2][0-9]|3[0-1])/)) {
                        day = parseInt(target.slice(0, 2));
                        target = target.slice(2);
                        break;
                    }
                    throw new Error('Date format is not correct');
                case 'D':
                    regexp = new RegExp(`^(${DateTimeFormatter.globalShortDayNames.join('|')})`, 'i');
                    match = target.match(regexp);

                    if (match) {
                        dayOfWeek = DateTimeFormatter.globalShortDayNames.indexOf(pascalCase(match[1])) + 1;
                        target = target.slice(match[1].length);
                        break;
                    }
                    throw new Error('Date format is not correct');
                case 'j':
                    if (target.match(/^([1-2][0-9]|3[0-1])/)) {
                        day = parseInt(target.slice(0, 2));
                        target = target.slice(2);
                        break;
                    } else if (target.match(/^[1-9]/)) {
                        day = parseInt(target.slice(0, 1));
                        target = target.slice(1);
                        break;
                    }
                    throw new Error('Date format is not correct');
                case 'l':
                    regexp = new RegExp(`^(${DateTimeFormatter.globalDayNames.join('|')})`, 'i');
                    match = target.match(regexp);

                    if (match) {
                        dayOfWeek = DateTimeFormatter.globalDayNames.indexOf(pascalCase(match[1])) + 1;
                        target = target.slice(match[1].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'N':
                    match = target.match(/^[1-7]/);

                    if (match) {
                        dayOfWeek = parseInt(match[0]);
                        target = target.slice(1);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'S':
                    match = target.match(/^(st|nd|rd|th)/);

                    if (match) {
                        suffix = match[1];
                        target = target.slice(2);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'w':
                    match = target.match(/^[0-6]/);

                    if (match) {
                        dayOfWeek = parseInt(match[1]) + 1;
                        target = target.slice(1);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'z':
                    regexps = [
                        /^([1-2][0-9]{2}|3[0-5][0-9]|36[0-5])/,
                        /^([1-9]{2})/,
                        /^([1-9])/,
                    ];

                    for (const item of regexps) {
                        match = target.match(item);

                        if (match) {
                            dayOfYear = parseInt(match[1]);
                            target = target.slice(match[1].length);
                            needBreak = true;
                            break;
                        }
                    }

                    if (needBreak) {
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'W':
                    match = target.match(/^([0-4][0-9]|5[0-2])/);
                    if (match) {
                        weekOfYear = parseInt(match[0]);
                        target = target.slice(match[0].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'F':
                    regexp = new RegExp(`^(${DateTimeFormatter.globalMonthNames.join('|')})`, 'i');
                    match = target.match(regexp);

                    if (match) {
                        month = DateTimeFormatter.globalMonthNames.indexOf(pascalCase(match[1]));
                        target = target.slice(match[1].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'm':
                    match = target.match(/^(0[1-9]|1[0-2])/);

                    if (match) {
                        month = parseInt(match[0]) - 1;
                        target = target.slice(match[0].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'M':
                    regexp = new RegExp(`^(${DateTimeFormatter.globalShortMonthNames.join('|')})`, 'i');
                    match = target.match(regexp);

                    if (match && match.length) {
                        month = DateTimeFormatter.globalShortMonthNames.indexOf(pascalCase(match[1]));
                        target = target.slice(match[1].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'n':
                    regexps = [/^1[0-2]/, /^[1-9]/];

                    for (const item of regexps) {
                        const match = target.match(item);
                        if (match) {
                            month = parseInt(match[1]);
                            target = target.slice(match[1].length);
                            break;
                        }
                    }

                    throw new Error('Date format is not correct');
                case 't':
                    regexps = [/^([1-2][0-9]|3[0-1])/, /^[1-9]/];

                    for (const item of regexps) {
                        match = target.match(item);
                        if (match) {
                            month = parseInt(match[1]);
                            target = target.slice(match[1].length);
                            break;
                        }
                    }

                    throw new Error('Date format is not correct');
                case 'L':
                    match = target.match(/^[0-1]/);

                    if (match) {
                        leap = !!parseInt(match[1]);
                        target = target.slice(1);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'o':
                case 'Y':
                    match = target.match(/^-?[0-9]{4}/);

                    if (match) {
                        year = parseInt(match[0]);
                        target = target.slice(match[0].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'y':
                    match = target.match(/^-?[0-9]{2}/);

                    if (match) {
                        let matchNumber = parseInt(match[0]);
                        let currentYear = new Date().getFullYear();
                        let firstSymbolsOfCurrentYear = Math.floor(currentYear / 100);
                        year = parseInt(`${matchNumber < 0 ? '-' : ''}${firstSymbolsOfCurrentYear - (Math.abs(matchNumber) < 70 ? 0 : 1)}${matchNumber}`);
                        target = target.slice(match[0].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'a':
                case 'A':
                    match = target.match(/^(am|pm)/i);

                    if (match) {
                        am = match[1].toLowerCase() === 'am';
                        target = target.slice(match[1].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'B':
                    match = target.match(/^[0-9]{3}/);

                    if (match) {
                        internetTime = parseInt(match[1]);
                        target = target.slice(match[1].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'g':
                    regexps = [/^1[0-2]/, /^[0-9]/];

                    for (const item of regexps) {
                        match = target.match(item);
                        if (match) {
                            divideHours = parseInt(match[1]);
                            target = target.slice(match[1].length);
                            break;
                        }
                    }

                    throw new Error('Date format is not correct');
                case 'G':
                    regexps = [/^(1[0-9]|2[0-3])/, /^[0-9]/];

                    for (const item of regexps) {
                        match = target.match(item);
                        if (match) {
                            hours = parseInt(match[1]);
                            target = target.slice(match[1].length);
                            break;
                        }
                    }

                    throw new Error('Date format is not correct');
                case 'h':
                    if (target.match(/^(0[0-9]|1[0-2])/)) {
                        hours = parseInt(target.slice(0, 2));
                        target = target.slice(2);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'H':
                    if (target.match(/^([0-1][0-9]|2[0-3])/)) {
                        hours = parseInt(target.slice(0, 2));
                        target = target.slice(2);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'i':
                    if (target.match(/^([0-5][0-9])/)) {
                        minutes = parseInt(target.slice(0, 2));
                        target = target.slice(2);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 's':
                    if (target.match(/^([0-5][0-9])/)) {
                        seconds = parseInt(target.slice(0, 2));
                        target = target.slice(2);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'u':
                    if (target.match(/^([0-9]{6})/)) {
                        microseconds = parseInt(target.slice(0, 6));
                        target = target.slice(6);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'v':
                    if (target.match(/^([0-9]{3})/)) {
                        microseconds = parseInt(target.slice(0, 3)) * Math.pow(10, 3);
                        target = target.slice(3);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'O':
                    match = target.match(/^[-+]([0-1][0-9]|2[0-3])([0-5][0-9])/);

                    if (match) {
                        offset = parseInt(match[1]) * 60 + parseInt(match[2]);
                        target = target.slice(5);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'P':
                    match = target.match(/^[-+]([0-1][0-9]|2[0-3]):([0-5][0-9])/);

                    if (match) {
                        offset = parseInt(match[1]) * 60 + parseInt(match[2]);
                        target = target.slice(5);
                        break;
                    }

                    throw new Error('Date format is not correct');
                case 'c':
                    complex = parser('Y-m-dTH:i:sP', target);
                    year = complex.year;
                    month = complex.month;
                    day = complex.day;
                    hours = complex.hours;
                    minutes = complex.minutes;
                    seconds = complex.seconds;
                    offset = complex.offset;
                    target = target.slice(-1);
                    break;
                case 'r':
                    complex = parser('D, d M Y H:i:s O', target);
                    year = complex.year;
                    month = complex.month;
                    day = complex.day;
                    hours = complex.hours;
                    minutes = complex.minutes;
                    seconds = complex.seconds;
                    offset = complex.offset;
                    target = target.slice(-1);
                    break;
                case 'U':
                    match = target.match(/^(-?[0-9]+)/);
                    if (match) {
                        const date = new Date(match[0]);

                        year = date.getUTCFullYear();
                        month = date.getUTCMonth();
                        day = date.getUTCDate();
                        hours = date.getUTCHours();
                        minutes = date.getUTCMinutes();
                        seconds = date.getUTCSeconds();
                        microseconds = 0;
                        target = target.slice(match[1].length);
                        break;
                    }

                    throw new Error('Date format is not correct');
                default:
                    target = target.slice(1);
            }
        }
    }

    if (!day) {
        if (year) {
            // @ts-ignore
            const formatter = new DateTimeFormatter(year, month === null ? 1 : (month + 1), 1);

            if (weekOfYear !== null || dayOfWeek !== null) {
                if (weekOfYear !== null && weekOfYear > 1) {
                    formatter.startOfYear();

                    formatter.addWeeks(weekOfYear - 1);

                    if (formatter.getFirstDayInYearOnFullWeek() > 1) {
                        formatter.subDay();
                    }

                    if (formatter.isLeapYear()) {
                        formatter.subDay();
                    }
                }

                if (dayOfWeek) {
                    if (formatter.getDayOfWeekIso() > dayOfWeek) {
                        formatter.addDays((7 - formatter.getDayOfWeekIso()) + dayOfWeek);
                    } else if (formatter.getDayOfWeekIso() < dayOfWeek) {
                        formatter.addDays(dayOfWeek - formatter.getDayOfWeekIso());
                    }
                }
            } else if (dayOfYear) {
                formatter.startOfYear().addDays(dayOfYear - 1);
            } else if (suffix) {
                switch (suffix) {
                    case 'st':
                        formatter.setDay(1);
                        break;
                    case 'nd':
                        formatter.setDay(2);
                        break;
                    case 'rd':
                        formatter.setDay(3);
                        break;
                    case 'th':
                        formatter.setDay(4);
                        break;
                }
            }

            if (month !== null && formatter.month !== month) {
                throw new Error('Date is invalid');
            }

            month = formatter.month;
            day = formatter.day;
            hours = hours === null ? formatter.hours : hours;
            minutes = minutes === null ? formatter.minutes : minutes;
            seconds = seconds === null ? formatter.seconds : seconds;
        }

        if (am !== null && divideHours !== null) {
            hours = am ? divideHours : divideHours + 12;
        }
    }

    if (internetTime !== null && (hours === null || minutes === null || seconds === null)) {
        const result = Math.floor(internetTime * 24 * 60 * 60 / 999);
        hours = Math.floor(result / 60 / 60);
        minutes = Math.floor((result - hours * 60 * 60) / 60);
        seconds = result - hours * 60 * 60 + minutes * 60;
    }

    const formatter = new DateTimeFormatter();

    return {
        year: year || formatter.year,
        month: month === null ? formatter.month : month,
        day: day || 1,
        hours: hours || 0,
        minutes: minutes || 0,
        seconds: seconds || 0,
        microseconds: microseconds || 0,
        offset: offset || 0,
    };
}
