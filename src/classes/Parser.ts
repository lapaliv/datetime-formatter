import {DateTimeFormatter} from "../DateTimeFormatter";
import {convertSecondsToTime} from "../utils/convertSecondsToTime";

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

    /**
     * Constructor
     *
     * @param formatter
     * @param format Format of target
     * @param target Target for parse
     */
    constructor(formatter: DateTimeFormatter, format: string, target: string) {
        this.formatter = formatter;
        this.format = format;
        this.target = target;
    }

    /**
     * Parse target by format
     */
    public handle(): ParserResult {
        const symbols = this.format.match(/\\?./g);

        if (!Array.isArray(symbols)) {
            throw new Error('Date format is invalid');
        }

        this.parseSymbols(symbols);
        this.defineDay();
        this.defineTimeByInternetTime();

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
        switch (symbol) {
            case 'd':
                this.computeNumberValue('day', [/^(0[1-9]|[1-2][0-9]|3[0-1])/]);
                break;
            case 'D':
                this.computeIndexValueFromArray('dayOfWeek', this.formatter.shortDayNames, (index: number) => index + 1);
                break;
            case 'j':
                this.computeNumberValue('day', [/^([1-2][0-9]|3[0-1])/, /^([1-9])/]);
                break;
            case 'l':
                this.computeIndexValueFromArray('dayOfWeek', this.formatter.dayNames, (index: number) => index + 1);
                break;
            case 'N':
                this.computeNumberValue('dayOfWeek', [/^([1-7])/]);
                break;
            case 'S':
                this.computeValueFromArray('suffix', ['st', 'nd', 'rd', 'th']);
                break;
            case 'w':
                this.computeNumberValue('dayOfWeek', [/^([0-6])/], (number: number) => number === 0 ? 7 : number);
                break;
            case 'z':
                this.computeNumberValue('dayOfYear', [
                    /^([1-2][0-9]{2}|3[0-5][0-9]|36[0-5])/,
                    /^([1-9][0-9])/,
                    /^([0-9])/,
                ]);
                break;
            case 'W':
                this.computeNumberValue('weekOfYear', [/^([0-4][0-9]|5[0-2])/]);
                break;
            case 'F':
                this.computeIndexValueFromArray('month', this.formatter.monthNames);
                break;
            case 'm':
                this.computeNumberValue('month', [/^(0[1-9]|1[0-2])/], (number: number) => number - 1);
                break;
            case 'M':
                this.computeIndexValueFromArray('month', this.formatter.shortMonthNames);
                break;
            case 'n':
                this.computeNumberValue('month', [/^(1[0-2])/, /^([1-9])/], (number: number) => number - 1);
                break;
            case 't':
                this.computeNumberValue('daysInMonth', [/^(2[8-9]|3[0-1])/]);
                break;
            case 'L':
                this.computeNumberValue('leap', [/^([0-1])/], (number: number) => !!number);
                break;
            case 'o':
            case 'Y':
                this.computeNumberValue('year', [/^([0-9]{4})/]);
                break;
            case 'y':
                this.computeNumberValue('year', [/^([0-9]{2})/], (number: number) => {
                    const currentYear = DateTimeFormatter.now().startOfCentury().subYear().getYear();
                    return number < 70
                        ? currentYear + number
                        : currentYear - 100 + number;
                });
                break;
            case 'a':
                this.computeValueFromArray('am', ['am', 'pm'], (value: string) => value === 'am');
                break;
            case 'A':
                this.computeValueFromArray('am', ['AM', 'PM'], (value: string) => value === 'AM');
                break;
            case 'B':
                this.computeNumberValue('internetTime', [/^([0-9]{3})/]);
                break;
            case 'g':
                this.computeNumberValue('divideHours', [/^(1[0-2])/, /^([0-9])/]);
                break;
            case 'G':
                this.computeNumberValue('hours', [/^(1[0-9]|2[0-3])/, /^([0-9])/]);
                break;
            case 'h':
                this.computeNumberValue('divideHours', [/^(0[0-9]|1[0-2])/]);
                break;
            case 'H':
                this.computeNumberValue('hours', [/^([0-1][0-9]|2[0-3])/]);
                break;
            case 'i':
                this.computeNumberValue('minutes', [/^([0-5][0-9])/]);
                break;
            case 's':
                this.computeNumberValue('seconds', [/^([0-5][0-9])/]);
                break;
            case 'u':
                this.computeNumberValue('microseconds', [/^([0-9]{6})/]);
                break;
            case 'v':
                this.computeNumberValue('microseconds', [/^([0-9]{3})/], (number: number) => number * Math.pow(10, 3));
                break;
            case 'O':
                this.computeOffset([
                    /^(-)(0[0-9]|1[0-1])([0-5][0-9])/,
                    /^(-)(12)(00)/,
                    /^(\+)(0[0-9]|1[0-3])([0-5][0-9])/,
                    /^(\+)(14)(00)/,
                ]);
                break;
            case 'P':
                this.computeOffset([
                    /^(-)(0[0-9]|1[0-1]):([0-5][0-9])/,
                    /^(-)(12):(00)/,
                    /^(\+)(0[0-9]|1[0-3]):([0-5][0-9])/,
                    /^(\+)(14):(00)/,
                ]);
                break;
            case 'Z':
                this.computeOffsetFromSeconds([
                    /^(-(?:43200|43[0-1][0-9]{2}|4[0-2][0-9]{3}|[1-3][0-9]{4}|[1-9][0-9]{0,4}))/,
                    /^(50400|50[0-3][0-9]{2}|[1-4][0-9]{4}|[0-9]{1,4})/,
                ]);
                break;
            case 'c':
                this.computeFromComplex('Y-m-dTH:i:sP');
                break;
            case 'r':
                this.computeFromComplex('D, d M Y H:i:s O');
                break;
            case 'U':
                const match = this.target.match(/^([0-9]+)/);
                if (match) {
                    const formatter = DateTimeFormatter.createFromTimestamp(Number(match[1]));
                    this.copyDataFromParserOrFormatter(formatter);
                    this.microseconds = 0;
                    break;
                }

                Parser.throwError();
                break;
            default:
                this.target = this.target.slice(1);
        }
    }

    /**
     * Defines the day by different parsed values
     */
    protected defineDay() {
        if (!this.day) {
            if (this.year) {
                const formatter = new DateTimeFormatter(this.year, this.month === null ? 1 : (this.month + 1), 1);

                if (this.weekOfYear !== null || this.dayOfWeek !== null) {
                    if (this.weekOfYear !== null && this.weekOfYear > 1) {
                        formatter.startOfYear();
                        formatter.addWeeks(this.weekOfYear - 1);

                        if (formatter.getFirstDayInYearOnFullWeek() > 1) {
                            formatter.subDay();
                        }

                        if (formatter.isLeapYear() && formatter.getMonth() > 2) {
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
                    formatter.startOfYear().addDays(this.dayOfYear);
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
    }

    /**
     * Defines hours, minutes and seconds by internet time
     */
    protected defineTimeByInternetTime() {
        if (this.internetTime !== null && (this.hours === null || this.minutes === null || this.seconds === null)) {
            const {hours, minutes, seconds} = convertSecondsToTime(Math.floor(this.internetTime * 86400 / 999))

            this.hours = hours + 1;
            this.minutes = minutes;
            this.seconds = seconds;
        }
    }

    /**
     * Converts parsed data from current parser to object
     */
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

    /**
     * Searches offset in target
     * @param regexps
     */
    private computeOffset(regexps: Array<RegExp>) {
        for (const regexp of regexps) {
            const match = this.target.match(regexp);

            if (match) {
                this.offset = (Number(match[2]) * 60 + Number(match[3])) * (match[1] === '-' ? -1 : 1);
                this.target = this.target.slice(5);
                return true;
            }
        }

        return false;
    }

    /**
     * Searches offset in seconds in target
     * @param regexps
     */
    private computeOffsetFromSeconds(regexps: Array<RegExp>) {
        for (const regexp of regexps) {
            const match = this.target.match(regexp);

            if (match) {
                this.offset = Math.round(Number(match[1]) / 60);
                this.target = this.target.slice(match[1].length);
                return;
            }
        }

        Parser.throwError();
    }

    /**
     * Computes date from complex format
     * @param format
     */
    private computeFromComplex(format: string) {
        const complex = new Parser(this.formatter, format, this.target).handle();
        this.copyDataFromParserOrFormatter(complex);
        this.target = this.target.slice(-1);
    }

    /**
     * Computes a simple number by many regexps from target
     * @param field
     * @param regexps
     * @param callback
     */
    private computeNumberValue(field: FieldList, regexps: Array<RegExp>, callback?: Function) {
        this.computeValue(field, regexps, (match: Array<string>) => {
            const result = Number(match[1]);
            return typeof callback === 'function'
                ? callback(result)
                : result;
        });
    }

    /**
     * Computes the index of item from list
     * @param field
     * @param list
     * @param callback
     */
    private computeIndexValueFromArray(field: FieldList, list: Array<string>, callback?: Function) {
        const regexp = new RegExp(`^(${list.join('|')})`, 'i');

        this.computeValue(field, [regexp], (match: Array<string>) => {
            const target = match[1].toLowerCase();
            for (let index = 0; index < list.length; index++) {
                if (list[index].toLowerCase() === target) {
                    return typeof callback === 'function' ? callback(index) : index;
                }
            }

            throw new Error(`Internal error. Could not find element [${target}] in array: ${list.join(',')}`);
        });
    }

    /**
     * Computes the item from list
     * @param field
     * @param list
     * @param callback
     */
    private computeValueFromArray(field: FieldList, list: Array<string>, callback?: Function) {
        const regexp = new RegExp(`^(${list.join('|')})`, 'i');

        this.computeValue(field, [regexp], (match: Array<string>) => {
            const target = match[1].toLowerCase();
            for (let index = 0; index < list.length; index++) {
                if (list[index].toLowerCase() === target) {
                    return typeof callback === 'function' ? callback(list[index]) : list[index];
                }
            }

            throw new Error(`Internal error. Could not find element [${target}] in array: ${list.join(',')}`);
        });
    }

    /**
     * Computes a simple number by many regexps from target
     * @param field
     * @param regexps
     * @param callback
     */
    private computeValue(field: FieldList, regexps: Array<RegExp>, callback: Function) {
        for (const regexp of regexps) {
            const match = this.target.match(regexp);

            if (match) {
                this[field] = callback(match);
                this.target = this.target.slice(match[1].length);
                return;
            }
        }

        Parser.throwError();
    }

    /**
     * Copying data from parser or formatter to current parser
     * @param parserOrFormatter
     */
    private copyDataFromParserOrFormatter(parserOrFormatter: ParserOrFormatter) {
        this.year = parserOrFormatter.year;
        this.month = parserOrFormatter.month;
        this.day = parserOrFormatter.day;
        this.hours = parserOrFormatter.hours;
        this.minutes = parserOrFormatter.minutes;
        this.seconds = parserOrFormatter.seconds;
        this.offset = parserOrFormatter.offset;
    }

    /**
     * Throw exception with error
     */
    private static throwError() {
        throw new Error('Date format is not correct');
    }
}

type FieldList =
    'year'
    | 'month'
    | 'day'
    | 'hours'
    | 'minutes'
    | 'seconds'
    | 'microseconds'
    | 'offset'
    | 'dayOfWeek'
    | 'dayOfYear'
    | 'weekOfYear'
    | 'leap'
    | 'am'
    | 'internetTime'
    | 'divideHours'
    | 'suffix'
    | 'daysInMonth';

type ParserOrFormatter = Object & {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    microseconds: number;
    offset: number;
}
