import {DateTimeFormatter} from "../DateTimeFormatter";
import {pascalCase} from "./pascalCase";
import {doubleNumber} from "./doubleNumber";

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

export class Parser {
    protected year: number | null = null;
    protected month: number | null = null;
    protected day: number | null = null;
    protected hours: number | null = null;
    protected minutes: number | null = null;
    protected seconds: number | null = null;
    protected microseconds: number | null = null;
    protected offset: number | null = null;
    protected dayOfWeek: number | null = null;
    protected dayOfYear: number | null = null;
    protected weekOfYear: number | null = null;
    protected leap: boolean | null = null;
    protected am: boolean | null = null;
    protected internetTime: number | null = null;
    protected divideHours: number | null = null;
    protected suffix: string | null = null;
    protected daysInMonth: number | null = null;

    protected formatter: DateTimeFormatter;
    protected format: string;
    protected target: string;

    constructor(formatter: DateTimeFormatter, format: string, target: string) {
        this.formatter = formatter;
        this.format = format;
        this.target = target;
    }

    public handle(): ParserResult {
        const symbols = this.format.match(/\\?./g);

        if (!Array.isArray(symbols)) {
            throw new Error('Date format is invalid');
        }

        this.parseSymbols(symbols);
        this.findLostValues();

        return this.toObject();
    }

    /**
     * Parse many symbols
     * @param symbols
     */
    protected parseSymbols(symbols: Array<string>) {
        for (let index = 0; index < symbols.length; index++) {
            this.parseSymbol(symbols[index]);
        }
    }

    /**
     * Parse a symbol
     * @param symbol
     */
    protected parseSymbol(symbol: string): void {
        let match: Array<string> | null,
            regexp,
            regexps,
            complex: ParserResult,
            needBreak = false;

        switch (symbol) {
            case 'd':
                if (this.target.match(/^(0[1-9]|[1-2][0-9]|3[0-1])/)) {
                    this.day = Number(this.target.slice(0, 2));
                    this.target = this.target.slice(2);
                    break;
                }
                throw new Error('Date format is not correct');
            case 'D':
                regexp = new RegExp(`^(${this.formatter.shortDayNames.join('|')})`, 'i');
                match = this.target.match(regexp);

                if (match) {
                    this.dayOfWeek = this.getIndex(this.formatter.shortDayNames, match[1]) + 1;
                    this.target = this.target.slice(match[1].length);
                    break;
                }
                throw new Error('Date format is not correct');
            case 'j':
                if (this.target.match(/^([1-2][0-9]|3[0-1])/)) {
                    this.day = Number(this.target.slice(0, 2));
                    this.target = this.target.slice(2);
                    break;
                } else if (this.target.match(/^[1-9]/)) {
                    this.day = Number(this.target.slice(0, 1));
                    this.target = this.target.slice(1);
                    break;
                }
                throw new Error('Date format is not correct');
            case 'l':
                regexp = new RegExp(`^(${this.formatter.dayNames.join('|')})`, 'i');
                match = this.target.match(regexp);

                if (match) {
                    this.dayOfWeek = this.getIndex(this.formatter.dayNames, match[1]);
                    this.target = this.target.slice(match[1].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'N':
                match = this.target.match(/^[1-7]/);

                if (match) {
                    this.dayOfWeek = Number(match[0]);
                    this.target = this.target.slice(1);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'S':
                match = this.target.match(/^(st|nd|rd|th)/);

                if (match) {
                    this.suffix = match[1];
                    this.target = this.target.slice(2);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'w':
                match = this.target.match(/^([0-6])/);

                if (match) {
                    this.dayOfWeek = Number(match[1]) === 0 ? 7 : Number(match[1]) + 1;
                    this.target = this.target.slice(1);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'z':
                regexps = [
                    /^([1-2][0-9]{2}|3[0-5][0-9]|36[0-5])/,
                    /^([1-9][0-9])/,
                    /^([0-9])/,
                ];

                for (const item of regexps) {
                    match = this.target.match(item);

                    if (match) {
                        this.dayOfYear = Number(match[1]);
                        this.target = this.target.slice(match[1].length);
                        needBreak = true;
                        break;
                    }
                }

                if (needBreak) {
                    break;
                }

                throw new Error('Date format is not correct');
            case 'W':
                match = this.target.match(/^([0-4][0-9]|5[0-2])/);
                if (match) {
                    this.weekOfYear = Number(match[0]);
                    this.target = this.target.slice(match[0].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'F':
                regexp = new RegExp(`^(${this.formatter.monthNames.join('|')})`, 'i');
                match = this.target.match(regexp);

                if (match) {
                    this.month = this.getIndex(this.formatter.monthNames, match[1]);
                    this.target = this.target.slice(match[1].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'm':
                match = this.target.match(/^(0[1-9]|1[0-2])/);

                if (match) {
                    this.month = Number(match[0]) - 1;
                    this.target = this.target.slice(match[0].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'M':
                regexp = new RegExp(`^(${this.formatter.shortMonthNames.join('|')})`, 'i');
                match = this.target.match(regexp);

                if (match && match.length) {
                    this.month = this.getIndex(this.formatter.shortMonthNames, match[1]);
                    this.target = this.target.slice(match[1].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'n':
                regexps = [/^(1[0-2])/, /^([1-9])/];

                for (const item of regexps) {
                    const match = this.target.match(item);
                    if (match) {
                        this.month = Number(match[1]) - 1;
                        this.target = this.target.slice(match[1].length);
                        needBreak = true;
                        break;
                    }
                }

                if (needBreak) {
                    break;
                }

                throw new Error('Date format is not correct');
            case 't':
                match = this.target.match(/^(2[8-9]|3[0-1])/);
                if (match) {
                    this.daysInMonth = Number(match[1]);
                    this.target = this.target.slice(match[1].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'L':
                match = this.target.match(/^([0-1])/);

                if (match) {
                    this.leap = !!Number(match[1]);
                    this.target = this.target.slice(1);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'o':
            case 'Y':
                match = this.target.match(/^[0-9]{4}/);

                if (match) {
                    this.year = Number(match[0]);
                    this.target = this.target.slice(match[0].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'y':
                match = this.target.match(/^[0-9]{2}/);

                if (match) {
                    let matchNumber = Number(match[0]);
                    let currentYear = DateTimeFormatter.now().getYear();
                    let firstSymbolsOfCurrentYear = Math.floor(currentYear / 100);
                    this.year = matchNumber < 70
                        ? Number(`${firstSymbolsOfCurrentYear}${doubleNumber(matchNumber)}`)
                        : Number(`${firstSymbolsOfCurrentYear - 1}${doubleNumber(matchNumber)}`);
                    this.target = this.target.slice(match[0].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'a':
            case 'A':
                match = this.target.match(/^(am|pm)/i);

                if (match) {
                    this.am = match[1].toLowerCase() === 'am';
                    this.target = this.target.slice(match[1].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'B':
                match = this.target.match(/^[0-9]{3}/);

                if (match) {
                    this.internetTime = Number(match[1]);
                    this.target = this.target.slice(match[1].length);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'g':
                regexps = [/^1[0-2]/, /^[0-9]/];

                for (const item of regexps) {
                    match = this.target.match(item);
                    if (match) {
                        this.divideHours = Number(match[1]);
                        this.target = this.target.slice(match[1].length);
                        break;
                    }
                }

                throw new Error('Date format is not correct');
            case 'G':
                regexps = [/^(1[0-9]|2[0-3])/, /^[0-9]/];

                for (const item of regexps) {
                    match = this.target.match(item);
                    if (match) {
                        this.hours = Number(match[1]);
                        this.target = this.target.slice(match[1].length);
                        break;
                    }
                }

                throw new Error('Date format is not correct');
            case 'h':
                if (this.target.match(/^(0[0-9]|1[0-2])/)) {
                    this.hours = Number(this.target.slice(0, 2));
                    this.target = this.target.slice(2);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'H':
                if (this.target.match(/^([0-1][0-9]|2[0-3])/)) {
                    this.hours = Number(this.target.slice(0, 2));
                    this.target = this.target.slice(2);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'i':
                if (this.target.match(/^([0-5][0-9])/)) {
                    this.minutes = Number(this.target.slice(0, 2));
                    this.target = this.target.slice(2);
                    break;
                }

                throw new Error('Date format is not correct');
            case 's':
                if (this.target.match(/^([0-5][0-9])/)) {
                    this.seconds = Number(this.target.slice(0, 2));
                    this.target = this.target.slice(2);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'u':
                if (this.target.match(/^([0-9]{6})/)) {
                    this.microseconds = Number(this.target.slice(0, 6));
                    this.target = this.target.slice(6);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'v':
                if (this.target.match(/^([0-9]{3})/)) {
                    this.microseconds = Number(this.target.slice(0, 3)) * Math.pow(10, 3);
                    this.target = this.target.slice(3);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'O':
                match = this.target.match(/^[-+]([0-1][0-9]|2[0-3])([0-5][0-9])/);

                if (match) {
                    this.offset = Number(match[1]) * 60 + Number(match[2]);
                    this.target = this.target.slice(5);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'P':
                match = this.target.match(/^[-+]([0-1][0-9]|2[0-3]):([0-5][0-9])/);

                if (match) {
                    this.offset = Number(match[1]) * 60 + Number(match[2]);
                    this.target = this.target.slice(5);
                    break;
                }

                throw new Error('Date format is not correct');
            case 'c':
                complex = new Parser(this.formatter, 'Y-m-dTH:i:sP', this.target).handle();
                this.year = complex.year;
                this.month = complex.month;
                this.day = complex.day;
                this.hours = complex.hours;
                this.minutes = complex.minutes;
                this.seconds = complex.seconds;
                this.offset = complex.offset;
                this.target = this.target.slice(-1);
                break;
            case 'r':
                complex = new Parser(this.formatter, 'D, d M Y H:i:s O', this.target).handle();
                this.year = complex.year;
                this.month = complex.month;
                this.day = complex.day;
                this.hours = complex.hours;
                this.minutes = complex.minutes;
                this.seconds = complex.seconds;
                this.offset = complex.offset;
                this.target = this.target.slice(-1);
                break;
            case 'U':
                match = this.target.match(/^(-?[0-9]+)/);
                if (match) {
                    const date = new Date(match[0]);

                    this.year = date.getUTCFullYear();
                    this.month = date.getUTCMonth();
                    this.day = date.getUTCDate();
                    this.hours = date.getUTCHours();
                    this.minutes = date.getUTCMinutes();
                    this.seconds = date.getUTCSeconds();
                    this.microseconds = 0;
                    this.target = this.target.slice(match[1].length);
                    break;
                }

                throw new Error('Date format is not correct');
            default:
                this.target = this.target.slice(1);
        }
    }

    protected findLostValues() {
        if (!this.day) {
            if (this.year) {
                // @ts-ignore
                const formatter = new DateTimeFormatter(this.year, this.month === null ? 1 : (this.month + 1), 1);

                if (this.weekOfYear !== null || this.dayOfWeek !== null) {
                    if (this.weekOfYear !== null && this.weekOfYear > 1) {
                        formatter.startOfYear();
                        formatter.addWeeks(this.weekOfYear - 1);

                        if (formatter.getFirstDayInYearOnFullWeek() > 1) {
                            formatter.subDay();
                        }

                        if (formatter.isLeapYear()) {
                            formatter.subDay();
                        }
                    }

                    if (this.dayOfWeek) {
                        if (formatter.getDayOfWeekIso() > this.dayOfWeek) {
                            formatter.addDays((7 - formatter.getDayOfWeekIso()) + this.dayOfWeek);
                        } else if (formatter.getDayOfWeekIso() < this.dayOfWeek) {
                            formatter.addDays(this.dayOfWeek - formatter.getDayOfWeekIso());
                        }
                    }
                } else if (this.dayOfYear) {
                    formatter.startOfYear().addDays(this.dayOfYear - 1);
                } else if (this.suffix) {
                    switch (this.suffix) {
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

                if (this.month !== null && formatter.month !== this.month) {
                    throw new Error('Date is invalid');
                }

                this.month = formatter.month;
                this.day = formatter.day;
                this.hours = this.hours === null ? formatter.hours : this.hours;
                this.minutes = this.minutes === null ? formatter.minutes : this.minutes;
                this.seconds = this.seconds === null ? formatter.seconds : this.seconds;
            }

            if (this.am !== null && this.divideHours !== null) {
                this.hours = this.am ? this.divideHours : this.divideHours + 12;
            }
        }

        if (this.internetTime !== null && (this.hours === null || this.minutes === null || this.seconds === null)) {
            const result = Math.floor(this.internetTime * 24 * 60 * 60 / 999);
            this.hours = Math.floor(result / 60 / 60);
            this.minutes = Math.floor((result - this.hours * 60 * 60) / 60);
            this.seconds = result - this.hours * 60 * 60 + this.minutes * 60;
        }
    }

    protected toObject(): ParserResult {
        return {
            year: this.year || DateTimeFormatter.now().getYear(),
            month: this.month === null ? DateTimeFormatter.now().getMonth() : this.month,
            day: this.day || 1,
            hours: this.hours || 0,
            minutes: this.minutes || 0,
            seconds: this.seconds || 0,
            microseconds: this.microseconds || 0,
            offset: this.offset || 0,
        };
    }

    private getIndex(array: Array<string>, target: string): number {
        target = target.toLowerCase();

        for (let index = 0; index < array.length; index++) {
            if (array[index].toLowerCase() === target) {
                return index;
            }
        }

        throw new Error(`Internal error. Could not find element [${target}] in array: ${array.join(',')}`);
    }
}
