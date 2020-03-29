import {builder} from "./utils/builder";
import {isLeapYear} from "./utils/isLeapYear";
import {parser} from "./utils/parser";
import {dayOnFirstWeekInYear} from "./utils/dayOnFirstWeekInYear";
import {Translation} from "./types/Translation";
import {countDaysInMonth} from "./utils/countDaysInMonth";
import {defineTranslations} from "./utils/defineTranslations";

export class DateTimeFormatter {
    public static globalMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    public static globalShortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public static globalDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public static globalShortDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    /**
     * Creates an instance with the current time
     */
    static now(): DateTimeFormatter {
        return new DateTimeFormatter();
    }

    /**
     * Creates an instance with the date in the format
     * @param format
     * @param date
     */
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

    /**
     * Set the translations
     * @param payload
     */
    static setGlobalTranslations(payload: Translation): void {
        const result = defineTranslations(payload);

        DateTimeFormatter.globalMonthNames = result.monthNames;
        DateTimeFormatter.globalShortMonthNames = result.shortMonthNames;
        DateTimeFormatter.globalDayNames = result.dayNames;
        DateTimeFormatter.globalShortDayNames = result.shortDayNames;
    }

    public year: number = 0;
    public month: number = 0;
    public day: number = 0;
    public hours: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;
    public microseconds: number = 0;
    public offset: number = 0;

    public monthNames: string[] = [];
    public shortMonthNames: string[] = [];
    public dayNames: string[] = [];
    public shortDayNames: string[] = [];

    // @ts-ignore
    constructor()
    constructor(date: Date)
    constructor(timestamp: number)
    constructor(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, microseconds?: number) {
        this.monthNames = DateTimeFormatter.globalMonthNames;
        this.dayNames = DateTimeFormatter.globalDayNames;
        this.shortMonthNames = DateTimeFormatter.globalShortMonthNames;
        this.shortDayNames = DateTimeFormatter.globalShortDayNames;

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

            this.set(
                arguments[0],
                arguments[1] - 1,
                arguments[2],
                arguments[3] || 0,
                arguments[4] || 0,
                arguments[5] || 0,
                arguments[6] || 0,
            );
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

    /**
     * Adds one second to the date
     */
    addSecond(): this {
        return this.addSeconds(1);
    }

    /**
     * Adds many seconds to the date
     * @param count
     */
    addSeconds(count: number): this {
        return this.add(0, 0, 0, 0, 0, count);
    }

    /**
     * Adds one minute to the date
     */
    addMinute(): this {
        return this.addMinutes(1);
    }

    /**
     * Adds many minutes to the date
     * @param count
     */
    addMinutes(count: number): this {
        return this.add(0, 0, 0, 0, count);
    }

    /**
     * Adds one hour to the date
     */
    addHour(): this {
        return this.addHours(1);
    }

    /**
     * Adds many hours to the date
     * @param count
     */
    addHours(count: number): this {
        return this.add(0, 0, 0, count);
    }

    /**
     * Adds one day to the date
     */
    addDay(): this {
        return this.addDays(1);
    }

    /**
     * Adds many days to the date
     * @param count
     */
    addDays(count: number): this {
        return this.add(0, 0, count);
    }

    /**
     * Adds one week to the date
     */
    addWeek(): this {
        return this.addDays(7);
    }

    /**
     * Adds many weeks to the date
     * @param count
     */
    addWeeks(count: number): this {
        return this.addDays(7 * count);
    }

    /**
     * Adds one month to the date
     */
    addMonth(): this {
        return this.addMonths(1);
    }

    /**
     * Adds many months to the date
     * @param count
     */
    addMonths(count: number): this {
        return this.add(0, count);
    }

    /**
     * Adds one year to the date
     */
    addYear(): this {
        return this.addYears(1);
    }

    /**
     * Adds many years to the date
     * @param count
     */
    addYears(count: number): this {
        return this.add(count);
    }

    /**
     * Subtracts one second from the current date
     */
    subSecond(): this {
        return this.addSeconds(-1);
    }

    /**
     * Subtracts many seconds from the current date
     * @param count
     */
    subSeconds(count: number): this {
        return this.addSeconds(count * -1);
    }

    /**
     * Subtracts one minute from the current date
     */
    subMinute(): this {
        return this.addMinutes(-1);
    }

    /**
     * Subtracts many minutes from the current date
     * @param count
     */
    subMinutes(count: number): this {
        return this.addMinutes(count * -1);
    }

    /**
     * Subtracts one hour from the current date
     */
    subHour(): this {
        return this.addHours(-1);
    }

    /**
     * Subtracts many hours from the current date
     * @param count
     */
    subHours(count: number): this {
        return this.addHours(count * -1);
    }

    /**
     * Subtracts one day from the current date
     */
    subDay(): this {
        return this.addDays(-1);
    }

    /**
     * Subtracts many days from the current date
     * @param count
     */
    subDays(count: number): this {
        return this.addDays(count * -1);
    }

    /**
     * Subtracts one week from the current date
     */
    subWeek(): this {
        return this.addDays(-7);
    }

    /**
     * Subtracts many weeks from the current date
     * @param count
     */
    subWeeks(count: number): this {
        return this.addDays(count * -7);
    }

    /**
     * Subtracts one month from the current date
     */
    subMonth(): this {
        return this.addMonths(-1);
    }

    /**
     * Subtracts many months from the current date
     * @param count
     */
    subMonths(count: number): this {
        return this.addMonths(count * -1);
    }

    /**
     * Subtracts one year from the current date
     */
    subYear(): this {
        return this.addYears(-1);
    }

    /**
     * Subtracts many years from the current date
     * @param count
     */
    subYears(count: number): this {
        return this.addYears(count * -1);
    }

    /**
     * Converts to the `Y-m-d` format
     */
    toDateString(): string {
        return builder(this, 'Y-m-d');
    }

    /**
     * Converts to the `Y-m-d H:i:s` format
     */
    toDateTimeString(): string {
        return builder(this, 'Y-m-d H:i:s');
    }

    /**
     * Converts to the Unix timestamp with milliseconds
     */
    toJsTimestamp(): number {
        return this.toDate().getTime();
    }

    /**
     * Converts to the Unix timestamp (without milliseconds)
     */
    toTimestamp(): number {
        return Math.floor(this.toDate().getTime() / 1000);
    }

    /**
     * Converts to the Date object
     */
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

    /**
     * Clones an instance and returns it
     */
    clone(): DateTimeFormatter {
        const formatter = new DateTimeFormatter();

        formatter.year = this.year;
        formatter.month = this.month;
        formatter.day = this.day;
        formatter.hours = this.hours;
        formatter.minutes = this.minutes;
        formatter.seconds = this.seconds;
        formatter.microseconds = this.microseconds;

        formatter.dayNames = this.dayNames;
        formatter.shortDayNames = this.shortDayNames;
        formatter.monthNames = this.monthNames;
        formatter.shortMonthNames = this.shortMonthNames;

        return formatter;
    }

    /**
     * Returns the count of full seconds between the current date and the transmitted date
     * @param date
     */
    diffInSeconds(date: this): number {
        return Math.abs(date.toTimestamp() - this.toTimestamp());
    }

    /**
     * Returns the count of full minutes between the current date and the transmitted date
     * @param date
     */
    diffInMinutes(date: this): number {
        return Math.floor(this.diffInSeconds(date) / 60);
    }

    /**
     * Returns the count of full hours between the current date and the transmitted date
     * @param date
     */
    diffInHours(date: this): number {
        return Math.floor(this.diffInMinutes(date) / 60);
    }

    /**
     * Returns the count of full days between the current date and the transmitted date
     * @param date
     */
    diffInDays(date: this): number {
        return Math.floor(this.diffInHours(date) / 24);
    }

    /**
     * Returns the count of full months between the current date and the transmitted date
     * @param date
     */
    diffInMonths(date: this): number {
        return this.diffInYears(date) * 12 + Math.abs(date.month - this.month);
    }

    /**
     * Returns the count of full years between the current date and the transmitted date
     * @param date
     */
    diffInYears(date: this): number {
        return Math.abs(date.year - this.year);
    }

    /**
     * Converts the date to the target format
     * @param target
     */
    format(target: string): string {
        return builder(this, target);
    }

    /**
     * Goes to the beginning of the minute
     */
    startOfMinute(): this {
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    /**
     * Goes to the beginning of the hour
     */
    startOfHour(): this {
        this.minutes = 0;
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    /**
     * Goes to the beginning of the day
     */
    startOfDay(): this {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    /**
     * Goes to the beginning of the week
     */
    startOfWeek(): this {
        this.startOfDay();
        this.subDays(this.getDayOfWeekIso() - 1);

        return this;
    }

    /**
     * Goes to the beginning of the month
     */
    startOfMonth(): this {
        this.day = 1;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    /**
     * Goes to the beginning of the year
     */
    startOfYear(): this {
        this.month = 0;
        this.day = 1;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.microseconds = 0;

        return this;
    }

    /**
     * Goes to the end of the minute
     */
    endOfMinute(): this {
        this.seconds = 59;
        this.microseconds = 999999;

        return this;
    }

    /**
     * Goes to the end of the hour
     */
    endOfHour(): this {
        this.endOfMinute();
        this.minutes = 59;

        return this;
    }

    /**
     * Goes to the end of the day
     */
    endOfDay(): this {
        this.endOfHour();
        this.hours = 23;

        return this;
    }

    /**
     * Goes to the end of the week
     */
    endOfWeek(): this {
        this.endOfDay();
        this.addDays(7 - this.getDayOfWeekIso());

        return this;
    }

    /**
     * Goes to the end of the day
     */
    endOfMonth(): this {
        this.endOfDay();
        this.day = countDaysInMonth(this.year, this.month);

        return this;
    }

    /**
     * Goes to the end of the year
     */
    endOfYear(): this {
        this.endOfMonth();
        this.month = 11;

        return this;
    }

    /**
     * Returns `true` if the date in future
     */
    isFuture(): boolean {
        return this.toTimestamp() - DateTimeFormatter.now().toTimestamp() > 0;
    }

    /**
     * Returns `true` if the year is a leap year
     */
    isLeapYear(): boolean {
        return isLeapYear(this.year);
    }

    /**
     * Returns `true` if the date in past
     */
    isPast(): boolean {
        return DateTimeFormatter.now().toTimestamp() - this.toTimestamp() > 0;
    }

    /**
     * Returns `true` if the month is next from the current
     */
    isNextMonth(): boolean {
        const now = DateTimeFormatter.now();

        if (now.month === 11 && this.isNextYear() && this.month === 0) {
            return true;
        }

        return this.year === now.year && now.month === this.month - 1;
    }

    /**
     * Returns `true` if the year is next from the current
     */
    isNextYear(): boolean {
        return DateTimeFormatter.now().year === this.year - 1;
    }

    /**
     * Returns `true` if the month is previous from the current
     */
    isPrevMonth(): boolean {
        const now = DateTimeFormatter.now();

        if (now.month === 0 && this.isPrevYear() && this.month === 11) {
            return true;
        }

        return now.year === this.year && now.month === this.month + 1;
    }

    /**
     * Returns `true` if the year is previous from the current
     */
    isPrevYear(): boolean {
        return DateTimeFormatter.now().year === this.year + 1;
    }

    /**
     * Returns `true` if the date equals now
     */
    isToday(): boolean {
        const now = DateTimeFormatter.now();

        return now.year === this.year
            && now.month === this.month
            && now.day === this.day;
    }

    /**
     * Returns `true` if the date is tomorrow
     */
    isTomorrow(): boolean {
        const now = DateTimeFormatter.now();

        if (now.day === countDaysInMonth(now.year, now.month)) {
            return this.isNextMonth() && this.day === 1;
        }

        return now.year === this.year
            && now.month === this.month
            && now.day === this.day - 1;
    }

    /**
     * Returns `true` if the date is yesterday
     */
    isYesterday(): boolean {
        const now = DateTimeFormatter.now();

        if (now.day === 1) {
            return this.isPrevMonth() && this.day === countDaysInMonth(this.year, this.month);
        }

        return now.year === this.year
            && now.month === this.month
            && now.day === this.day + 1;
    }

    /**
     * Returns the microseconds
     */
    getMicroseconds(): number {
        return this.microseconds;
    }

    /**
     * Returns the milliseconds
     */
    getMilliseconds(): number {
        return Math.floor(this.microseconds / 1000);
    }

    /**
     * Returns the seconds
     */
    getSeconds(): number {
        return this.seconds;
    }

    /**
     * Returns the minutes
     */
    getMinutes(): number {
        return this.minutes;
    }

    /**
     * Returns the hours
     */
    getHours(): number {
        return this.hours;
    }

    /**
     * Returns the day
     */
    getDay(): number {
        return this.day;
    }

    /**
     * Returns the month
     */
    getMonth(): number {
        return this.month + 1;
    }

    /**
     * Returns the year
     */
    getYear(): number {
        return this.year;
    }

    /**
     * Setter for microseconds
     * @param value
     */
    setMicroseconds(value: number): this {
        return this.set(
            this.year,
            this.month,
            this.day,
            this.hours,
            this.minutes,
            this.seconds,
            value
        );
    }

    /**
     * Setter for seconds
     * @param value
     */
    setSeconds(value: number): this {
        return this.set(
            this.year,
            this.month,
            this.day,
            this.hours,
            this.minutes,
            value,
            this.microseconds
        );
    }

    /**
     * Setter for minutes
     * @param value
     */
    setMinutes(value: number): this {
        return this.set(
            this.year,
            this.month,
            this.day,
            this.hours,
            value,
            this.seconds,
            this.microseconds
        );
    }

    /**
     * Setter for hours
     * @param value
     */
    setHours(value: number): this {
        return this.set(
            this.year,
            this.month,
            this.day,
            value,
            this.minutes,
            this.seconds,
            this.microseconds
        );
    }

    /**
     * Setter for day
     * @param value
     */
    setDay(value: number): this {
        return this.set(
            this.year,
            this.month,
            value,
            this.hours,
            this.minutes,
            this.seconds,
            this.microseconds
        );
    }

    /**
     * Setter for month
     * @param value
     */
    setMonth(value: number): this {
        return this.set(
            this.year,
            value,
            this.day,
            this.hours,
            this.minutes,
            this.seconds,
            this.microseconds
        );
    }

    /**
     * Setter for year
     * @param value
     */
    setYear(value: number): this {
        return this.set(
            value,
            this.month,
            this.day,
            this.hours,
            this.minutes,
            this.seconds,
            this.microseconds
        );
    }

    /**
     * Returns the first day in year on full week
     */
    getFirstDayInYearOnFullWeek(): number {
        return dayOnFirstWeekInYear(this.year);
    }

    /**
     * Returns count days in the month
     */
    getCountDaysInMonth(): number {
        return countDaysInMonth(this.year, this.month);
    }

    /**
     * Returns the number of the day on week (monday - 1, ..., saturday - 6, sunday - 0)
     */
    getDayOfWeek(): number {
        return this.toDate().getDay();
    }

    /**
     * * Returns the number of the day on week (monday - 1, ..., saturday - 6, sunday - 7)
     */
    getDayOfWeekIso(): number {
        return this.toDate().getUTCDay() || 7;
    }

    /**
     * Set the translations
     * @param payload
     */
    setTranslations(payload: Translation): this {
        const result = defineTranslations(payload);

        this.monthNames = result.monthNames;
        this.shortMonthNames = result.shortMonthNames;
        this.dayNames = result.dayNames;
        this.shortDayNames = result.shortDayNames;

        return this;
    }

    /**
     * Parses the date from the transmitted Date object
     * @param date
     */
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

    /**
     * Parses the date from the transmitted timestamp
     * @param timestamp
     */
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

    /**
     * Adds the custom values to the current date
     * @param years
     * @param months
     * @param days
     * @param hours
     * @param minutes
     * @param seconds
     */
    private add(years: number = 0, months: number = 0, days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0) {
        return this.set(
            this.year + years,
            this.month + months,
            this.day + days,
            this.hours + hours,
            this.minutes + minutes,
            this.seconds + seconds,
            this.microseconds,
        );
    }

    /**
     * Sets the custom values to the current date
     * @param year
     * @param month
     * @param day
     * @param hours
     * @param minutes
     * @param seconds
     * @param microseconds
     */
    private set(year: number = 0, month: number = 0, day: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0, microseconds: number = 0) {
        const safelyMicroseconds = microseconds % Math.pow(10, 6);
        seconds += (microseconds - safelyMicroseconds) / Math.pow(10, 6);

        const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
        this.year = year < 100 ? year : date.getUTCFullYear();
        this.month = date.getUTCMonth();
        this.day = date.getUTCDate();
        this.hours = date.getUTCHours();
        this.minutes = date.getUTCMinutes();
        this.seconds = date.getUTCSeconds();
        this.microseconds = safelyMicroseconds;
        this.offset = 0;

        return this;
    }
}
