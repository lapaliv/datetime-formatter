import {DateTimeFormatter} from "../DateTimeFormatter";
import {countDaysInMonth} from "./countDaysInMonth";
import {dayOnFirstWeekInYear} from "./dayOnFirstWeekInYear";

export function builder(formatter: DateTimeFormatter, format: string): string {
    const symbols: Array<string> | null = format.match(/\\?./g);
    let result = '';

    if (Array.isArray(symbols)) {
        for (const symbol of symbols) {
            switch (symbol) {
                case 'd':
                    result += `0${formatter.day}`.slice(-2);
                    break;
                case 'D':
                    result += formatter.toDate().getDay()
                        ? DateTimeFormatter.SHORT_DAYS[formatter.toDate().getDay() - 1]
                        : DateTimeFormatter.SHORT_DAYS[DateTimeFormatter.SHORT_DAYS.length - 1];
                    break;
                case 'j':
                    result += `${formatter.day}`;
                    break;
                case 'l':
                    result += formatter.toDate().getDay()
                        ? DateTimeFormatter.DAYS[formatter.toDate().getDay() - 1]
                        : DateTimeFormatter.DAYS[DateTimeFormatter.DAYS.length - 1];
                    break;
                case 'N':
                    result += formatter.toDate().getDay() ? formatter.toDate().getDay() : 7;
                    break;
                case 'S':
                    if (`${formatter.day}`.slice(-1) === '1' && `${formatter.day}`.slice(-2) !== '11') {
                        result += 'st';
                    } else if (`${formatter.day}`.slice(-1) === '2' && `${formatter.day}`.slice(-2) !== '12') {
                        result += 'nd';
                    } else if (`${formatter.day}`.slice(-1) === '3' && `${formatter.day}`.slice(-2) !== '13') {
                        result += 'rd';
                    } else {
                        result += 'th';
                    }
                    break;
                case 'w':
                    result += `${formatter.toDate().getDay()}`;
                    break;
                case 'z':
                    let daysForZ = 0;
                    for (let month = 0; month < formatter.month; month++) {
                        daysForZ += countDaysInMonth(formatter.year, month);
                    }

                    result += `${daysForZ + formatter.day - 1}`;
                    break;
                case 'W':
                    let daysForW = 0;
                    for (let month = 0; month < formatter.month; month++) {
                        daysForW += countDaysInMonth(formatter.year, month);
                    }

                    daysForW += formatter.day - dayOnFirstWeekInYear(formatter.year);
                    result += `${Math.ceil(daysForW / 7)}`;
                    break;
                case 'F':
                    result += DateTimeFormatter.MONTHS[formatter.month];
                    break;
                case 'm':
                    result += `0${formatter.month + 1}`.slice(-2);
                    break;
                case 'M':
                    result += DateTimeFormatter.SHORT_MONTHS[formatter.month];
                    break;
                case 'n':
                    result += `${formatter.month + 1}`;
                    break;
                case 't':
                    result += `${countDaysInMonth(formatter.year, formatter.month)}`;
                    break;
                case 'L':
                    result += `${formatter.isLeapYear() ? 1 : 0}`;
                    break;
                case 'o':
                case 'Y':
                    result += (formatter.year < 0 ? '-' : '') + `0000${Math.abs(formatter.year)}`.slice(-4);
                    break;
                case 'y':
                    result += (formatter.year < 0 ? '-' : '') + `00${Math.abs(formatter.year)}`.slice(-2);
                    break;
                case 'a':
                    result += formatter.hours < 12 ? 'am' : 'pm';
                    break;
                case 'A':
                    result += formatter.hours < 12 ? 'AM' : 'PM';
                    break;
                case 'B':
                    const maxSecondsForB = 24 * 60 * 60 + 60 * 60 + 60;
                    const actualSeconds = formatter.hours * 60 * 60 + formatter.minutes * 60 + formatter.seconds;
                    const resultForB = Math.floor(actualSeconds * 999 / maxSecondsForB);
                    result += `00${result}`.slice(-3);
                    break;
                case 'g':
                    result += `${formatter.hours < 13 ? formatter.hours : formatter.hours - 12}`;
                    break;
                case 'G':
                    result += `${formatter.hours}`;
                    break;
                case 'h':
                    result += `0${formatter.hours < 13 ? formatter.hours : formatter.hours - 12}`.slice(-2);
                    break;
                case 'H':
                    result += `0${formatter.hours}`.slice(-2);
                    break;
                case 'i':
                    result += `0${formatter.minutes}`.slice(-2);
                    break;
                case 's':
                    result += `0${formatter.seconds}`.slice(-2);
                    break;
                case 'u':
                    result += `000000${formatter.microseconds}`.slice(-6);
                    break;
                case 'v':
                    result += `000${formatter.microseconds}`.slice(-6, 3);
                    break;
                case 'c':
                    result += builder(formatter, 'Y-m-dTH:i:s+00:00');
                    break;
                case 'r':
                    result += builder(formatter, 'D, d M Y H:i:s +0000');
                    break;
                case 'U':
                    result += `${formatter.toTimestamp()}`;
                    break;
                default:
                    result += symbol;
            }
        }
    }

    return result;
}
