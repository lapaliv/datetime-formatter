import {DateTimeFormatterContract} from "./DateTimeFormatterContract";
import {builder} from "./utils/builder";
import {isLeapYear} from "./utils/isLeapYear";
import {parser} from "./utils/parser";
import {countDaysInMonth} from "./utils/countDaysInMonth";
import {dayOnFirstWeekInYear} from "./utils/dayOnFirstWeekInYear";

export class DateTimeFormatter implements DateTimeFormatterContract {
    public static readonly MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    public static readonly SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public static readonly DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public static readonly SHORT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    static now(): DateTimeFormatter {
        return new DateTimeFormatter();
    }

    static createFromFormat(format: string, date: string): DateTimeFormatter {
        const result = parser(format, date);
        const formatter = new DateTimeFormatter();
        formatter.year = result.year;
        formatter.month = result.month;
        formatter.day = result.day;
        formatter.hours = result.hours;
        formatter.minutes = result.minutes;
        formatter.seconds = result.seconds;
        formatter.microseconds = result.microseconds;

        return formatter;
    }

    public year: number = 0;
    public month: number = 0;
    public day: number = 0;
    public hours: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;
    public microseconds: number = 0;
    public offset: number = 0;

    // @ts-ignore
    constructor()
    constructor(date: Date)
    constructor(timestamp: number)
    constructor(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, microseconds?: number) {
        if (arguments.length === 1) {
            if (arguments[0] instanceof Date) {
                this.parseFromDate(arguments[0]);
            } else if (Number(arguments[0]) === arguments[0]) {
                this.parseFromTimestamp(arguments[0]);
            } else {
                throw new Error('Argument is undefined');
            }

            return this;
        } else if (arguments.length >= 3) {
            for (let index = 0; index < Math.min(arguments.length, 7); index++) {
                if (Number(arguments[index]) !== arguments[index]) {
                    throw new Error(`Argument ${index} is undefined`);
                }
            }

            this.setYear(arguments[0]);
            this.setMonth(arguments[1]);
            this.setDay(arguments[2]);
            this.setHours(arguments[3] || 0);
            this.setMinutes(arguments[4] || 0);
            this.setSeconds(arguments[5] || 0);
            this.setMicroseconds(arguments[6] || 0);
        } else if (!arguments.length) {
            this.parseFromDate(new Date());
            if (typeof process === 'object' && typeof process.hrtime === 'function') {
                const hrtime = process.hrtime();
                this.microseconds = Math.floor(hrtime[0] * Math.pow(1, 6) + hrtime[1] / 1000);
            }
        } else {
            throw new Error(`Arguments are undefined`);
        }
    }

    addDay(): this {
        return this.addDays(1);
    }

    addDays(count: number): this {
        return this.add(0, 0, count);
    }

    addWeek(): this {
        return this.addDays(7);
    }

    addWeeks(count: number): this {
        return this.addDays(7 * count);
    }

    addHour(): this {
        return this.addHours(1);
    }

    addHours(count: number): this {
        return this.add(0, 0, 0, count);
    }

    addMinute(): this {
        return this.addMinutes(1);
    }

    addMinutes(count: number): this {
        return this.add(0, 0, 0, 0, count);
    }

    addMonth(): this {
        return this.addMonths(1);
    }

    addMonths(count: number): this {
        return this.add(0, count);
    }

    addSecond(): this {
        return this.addSeconds(1);
    }

    addSeconds(count: number): this {
        return this.add(0, 0, 0, 0, 0, count);
    }

    addYear(): this {
        return this.addYears(1);
    }

    addYears(count: number): this {
        return this.add(count);
    }

    clone(): DateTimeFormatterContract {
        const formatter = new DateTimeFormatter();
        formatter.year = this.year;
        formatter.month = this.month;
        formatter.day = this.day;
        formatter.hours = this.hours;
        formatter.minutes = this.minutes;
        formatter.seconds = this.seconds;
        formatter.microseconds = this.microseconds;

        return formatter;
    }

    diffInDays(date: this): number {
        return Math.floor(this.diffInHours(date) / 24);
    }

    diffInHours(date: this): number {
        return Math.floor(this.diffInMinutes(date) / 60);
    }

    diffInMinutes(date: this): number {
        return Math.floor(this.diffInSeconds(date) / 60);
    }

    diffInMonths(date: this): number {
        return this.diffInYears(date) * 12 + Math.abs(date.month - this.month);
    }

    diffInSeconds(date: this): number {
        return Math.abs(date.toTimestamp() - this.toTimestamp());
    }

    diffInYears(date: this): number {
        return Math.abs(date.year - this.year);
    }

    format(target: string): string {
        return builder(this, target);
    }

    isFuture(): boolean {
        return this.toTimestamp() - DateTimeFormatter.now().toTimestamp() > 0;
    }

    isLeapYear(): boolean {
        return isLeapYear(this.year);
    }

    isPast(): boolean {
        return DateTimeFormatter.now().toTimestamp() - this.toTimestamp() > 0;
    }

    startOfDay(): this {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    startOfHour(): this {
        this.minutes = 0;
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    startOfMinute(): this {
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    startOfMonth(): this {
        this.day = 1;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    startOfYear(): this {
        this.month = 0;
        this.day = 1;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    subDay(): this {
        return this.addDays(-1);
    }

    subDays(count: number): this {
        return this.addDays(count * -1);
    }

    subWeek(): this {
        return this.addDays(-7);
    }

    subWeeks(count: number): this {
        return this.addDays(count * -7);
    }

    subHour(): this {
        return this.addHours(-1);
    }

    subHours(count: number): this {
        return this.addHours(count * -1);
    }

    subMinute(): this {
        return this.addMinutes(-1);
    }

    subMinutes(count: number): this {
        return this.addMinutes(count * -1);
    }

    subMonth(): this {
        return this.addMonths(-1);
    }

    subMonths(count: number): this {
        return this.addMonths(count * -1);
    }

    subSecond(): this {
        return this.addSeconds(-1);
    }

    subSeconds(count: number): this {
        return this.addSeconds(count * -1);
    }

    subYear(): this {
        return this.addYears(-1);
    }

    subYears(count: number): this {
        return this.addYears(count * -1);
    }

    toDateString(): string {
        return builder(this, 'Y-m-d');
    }

    toDateTimeString(): string {
        return builder(this, 'Y-m-d H:i:s');
    }

    toJsTimestamp(): number {
        return this.toDate().getTime();
    }

    toTimestamp(): number {
        return Math.floor(this.toDate().getTime() / 1000);
    }

    toDate(): Date {
        return new Date(
            Date.UTC(
                this.year,
                this.month,
                this.day,
                this.hours,
                this.minutes,
                this.seconds,
                Math.floor(this.microseconds / 1000),
            )
        );
    }

    private parseFromDate(date: Date) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.microseconds = date.getMilliseconds() * 1000;
        this.offset = date.getTimezoneOffset();
    }

    private parseFromTimestamp(timestamp: number) {
        let timestampAsString = `${timestamp}`;
        let microseconds = 0;

        if (timestamp % 1 !== 0) {
            const fractionalLength = `${timestamp}`.split('.').reverse()[0].length;
            timestamp = timestamp * Math.pow(10, fractionalLength);
            timestampAsString = `${timestamp}`;
        }

        if (timestampAsString.length >= 16) {
            const float = timestamp / Math.pow(10, 6);
            timestamp = Math.floor(float) * Math.pow(10, 3);
            if (float % 1 === 0) {
                microseconds = 0;
            } else {
                microseconds = parseInt(`${float}`.split('.').reverse()[0]);
            }
        } else if (timestampAsString.length >= 13) {
            const float = timestamp / Math.pow(10, 3);
            if (float % 1 === 0) {
                microseconds = 0;
            } else {
                microseconds = parseInt(`${float}`.split('.').reverse()[0]) * Math.pow(10, 3);
            }
        } else if (timestampAsString.length >= 10) {
            timestamp *= Math.pow(10, 3);
            microseconds = 0;
        } else {
            microseconds = 0;
        }

        const date = new Date(timestamp);
        this.year = date.getUTCFullYear();
        this.month = date.getUTCMonth();
        this.day = date.getUTCDate();
        this.hours = date.getUTCHours();
        this.minutes = date.getUTCMinutes();
        this.seconds = date.getUTCSeconds();
        this.microseconds = microseconds;
    }

    private add(years: number = 0, months: number = 0, days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0) {
        const date = this.toDate();
        date.setFullYear(this.year + years);
        date.setMonth(this.month + months);
        date.setDate(this.day + days);
        date.setHours(this.hours + hours);
        date.setMinutes(this.minutes + minutes);
        date.setSeconds(this.seconds + seconds);

        this.parseFromDate(date);

        return this;
    }

    endOfDay(): this {
        this.hours = 23;
        this.minutes = 59;
        this.seconds = 59;
        this.microseconds = 999999;

        return this;
    }

    endOfHour(): this {
        this.minutes = 59;
        this.seconds = 59;
        this.microseconds = 999999;

        return this;
    }

    endOfMinute(): this {
        this.seconds = 59;
        this.microseconds = 999999;

        return this;
    }

    endOfMonth(): this {
        this.day = countDaysInMonth(this.year, this.month);
        this.hours = 23;
        this.minutes = 59;
        this.seconds = 59;
        this.microseconds = 999999;

        return this;
    }

    endOfYear(): this {
        this.month = 11;
        this.day = countDaysInMonth(this.year, this.month);
        this.hours = 23;
        this.minutes = 59;
        this.seconds = 59;
        this.microseconds = 999999;

        return this;
    }

    isNextMonth(): boolean {
        const now = DateTimeFormatter.now();

        if (now.month === 11 && this.isNextYear() && this.month === 0) {
            return true;
        }

        return this.year === now.year && now.month === this.month - 1;
    }

    isNextYear(): boolean {
        return DateTimeFormatter.now().year === this.year - 1;
    }

    isPrevMonth(): boolean {
        const now = DateTimeFormatter.now();

        if (now.month === 0 && this.isPrevYear() && this.month === 11) {
            return true;
        }

        return now.year === this.year && now.month === this.month + 1;
    }

    isPrevYear(): boolean {
        return DateTimeFormatter.now().year === this.year + 1;
    }

    isToday(): boolean {
        const now = DateTimeFormatter.now();

        return now.year === this.year
            && now.month === this.month
            && now.day === this.day;
    }

    isTomorrow(): boolean {
        const now = DateTimeFormatter.now();

        if (now.day === countDaysInMonth(now.year, now.month)) {
            return this.isNextMonth() && this.day === 1;
        }

        return now.year === this.year
            && now.month === this.month
            && now.day === this.day - 1;
    }

    isYesterday(): boolean {
        const now = DateTimeFormatter.now();

        if (now.day === 1) {
            return this.isPrevMonth() && this.day === countDaysInMonth(this.year, this.month);
        }

        return now.year === this.year
            && now.month === this.month
            && now.day === this.day + 1;
    }

    getMicroseconds(): number {
        return this.microseconds;
    }

    getMilliseconds(): number {
        return Math.floor(this.microseconds / 1000);
    }

    getSeconds(): number {
        return this.seconds;
    }

    getMinutes(): number {
        return this.minutes;
    }

    getHours(): number {
        return this.hours;
    }

    getDay(): number {
        return this.day;
    }

    getMonth(): number {
        return this.month + 1;
    }

    getYear(): number {
        return this.year;
    }

    setMicroseconds(value: number): this {
        this.microseconds = value;

        return this;
    }

    setSeconds(value: number): this {
        this.seconds = value;

        return this;
    }

    setMinutes(value: number): this {
        this.minutes = value;

        return this;
    }

    setHours(value: number): this {
        this.hours = value;

        return this;
    }

    setDay(value: number): this {
        this.day = value;

        return this;
    }

    setMonth(value: number): this {
        this.month = value - 1;

        return this;
    }

    setYear(value: number): this {
        this.year = value;

        return this;
    }

    getFirstDayInYearOnFullWeek(): number {
        return dayOnFirstWeekInYear(this.year);
    }

    getCountDaysInMonth(): number {
        return countDaysInMonth(this.year, this.month);
    }

    getDayOfWeek(): number {
        return this.toDate().getDay();
    }

    getDayOfWeekIso(): number {
        return this.toDate().getDay() || 7;
    }
}
