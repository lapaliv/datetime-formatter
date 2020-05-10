import {builder} from "./utils/builder";
import {isLeapYear} from "./utils/isLeapYear";
import {Parser} from "./classes/Parser";
import {dayOnFirstWeekInYear} from "./utils/dayOnFirstWeekInYear";
import {Translation} from "./types/Translation";
import {countDaysInMonth} from "./utils/countDaysInMonth";
import {defineTranslations} from "./utils/defineTranslations";
import {getIndexOfPeriodOnWhichDateIsIncluded} from "./utils/getIndexOfPeriodOnWhichDateIsIncluded";

export class DateTimeFormatter {
    public static globalMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    public static globalShortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public static globalDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public static globalShortDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

    /**
     * Creates an instance with the current time
     */
    static now(): DateTimeFormatter {
        return new DateTimeFormatter();
    }

    /**
     * Parse date from custom string
     * @param target
     */
    static parse(target: string | Date | number | DateTimeFormatter | any): DateTimeFormatter {
        if (target instanceof DateTimeFormatter) {
            return target;
        } else if (typeof target === 'string') {
            try {
                const timestamp: number = Date.parse(target);
                if (!isNaN(timestamp)) {
                    return new DateTimeFormatter(new Date(target));
                }
            } catch (e) {
                // ignoring
            }
        } else if (target instanceof Date) {
            return new DateTimeFormatter(target);
        } else if (typeof target === 'number') {
            return new DateTimeFormatter(target);
        }

        throw new Error('Invalid date');
    }

    /**
     * Creates an instance with the date in the format
     * @param format
     * @param date
     */
    static createFromFormat(format: string, date: string): DateTimeFormatter {
        const formatter = new DateTimeFormatter();
        const result = new Parser(formatter, format, date).handle();

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

    /**
     * Parses the date from the transmitted timestamp
     * @param timestamp
     */
    static createFromTimestamp(timestamp: number) {
        const formatter = new DateTimeFormatter();
        formatter.parseFromTimestamp(timestamp);

        return formatter;
    }

    /**
     * Parses the date from the transmitted Date object
     * @param date
     */
    static createFromDate(date: Date) {
        const formatter = new DateTimeFormatter();
        return formatter.parseFromDate(date);
    }

    constructor();
    constructor(date: Date);
    constructor(timestamp: number);
    constructor(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, microseconds?: number);

    constructor(year?: Date | number, month?: number, day?: number, hours?: number, minutes?: number, seconds?: number, microseconds?: number) {
        this.monthNames = DateTimeFormatter.globalMonthNames;
        this.dayNames = DateTimeFormatter.globalDayNames;
        this.shortMonthNames = DateTimeFormatter.globalShortMonthNames;
        this.shortDayNames = DateTimeFormatter.globalShortDayNames;

        if (arguments.length === 1) {
            if (arguments[0] instanceof Date) {
                this.parseFromDate(arguments[0]);
            } else if (['string', 'number'].includes(typeof arguments[0]) && Number(arguments[0]).toString() === arguments[0].toString()) {
                this.parseFromTimestamp(arguments[0]);
            } else {
                throw new Error(`Argument #0 [${arguments[0]}] is not correct`);
            }

            return this;
        } else if (arguments.length >= 3) {
            for (let index = 0; index < Math.min(arguments.length, 7); index++) {
                if (!['string', 'number'].includes(typeof arguments[0]) || Number(arguments[index]).toString() !== arguments[index].toString()) {
                    throw new Error(`Argument #${index} [${arguments[index]}] is not correct`);
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
    addSecond(): DateTimeFormatter {
        return this.addSeconds(1);
    }

    /**
     * Adds many seconds to the date
     * @param count
     */
    addSeconds(count: number): DateTimeFormatter {
        return this.add(0, 0, 0, 0, 0, count);
    }

    /**
     * Adds one minute to the date
     */
    addMinute(): DateTimeFormatter {
        return this.addMinutes(1);
    }

    /**
     * Adds many minutes to the date
     * @param count
     */
    addMinutes(count: number): DateTimeFormatter {
        return this.add(0, 0, 0, 0, count);
    }

    /**
     * Adds one hour to the date
     */
    addHour(): DateTimeFormatter {
        return this.addHours(1);
    }

    /**
     * Adds many hours to the date
     * @param count
     */
    addHours(count: number): DateTimeFormatter {
        return this.add(0, 0, 0, count);
    }

    /**
     * Adds one day to the date
     */
    addDay(): DateTimeFormatter {
        return this.addDays(1);
    }

    /**
     * Adds many days to the date
     * @param count
     */
    addDays(count: number): DateTimeFormatter {
        return this.add(0, 0, count);
    }

    /**
     * Adds one week to the date
     */
    addWeek(): DateTimeFormatter {
        return this.addDays(7);
    }

    /**
     * Adds many weeks to the date
     * @param count
     */
    addWeeks(count: number): DateTimeFormatter {
        return this.addDays(7 * count);
    }

    /**
     * Adds one month to the date
     */
    addMonth(): DateTimeFormatter {
        return this.addMonths(1);
    }

    /**
     * Adds many months to the date
     * @param count
     */
    addMonths(count: number): DateTimeFormatter {
        return this.add(0, count);
    }

    /**
     * Adds one year to the date
     */
    addYear(): DateTimeFormatter {
        return this.addYears(1);
    }

    /**
     * Adds many years to the date
     * @param count
     */
    addYears(count: number): DateTimeFormatter {
        return this.add(count);
    }

    /**
     * Adds one decade to the date
     */
    addDecade(): DateTimeFormatter {
        return this.addYears(10);
    }

    /**
     * Adds many decades to the date
     * @param count
     */
    addDecades(count: number): DateTimeFormatter {
        return this.addYears(count * 10);
    }

    /**
     * Adds one decade to the date
     */
    addCentury(): DateTimeFormatter {
        return this.addYears(100);
    }

    /**
     * Adds many centuries to the date
     * @param count
     */
    addCenturies(count: number): DateTimeFormatter {
        return this.addYears(count * 100);
    }

    /**
     * Subtracts one second from the current date
     */
    subSecond(): DateTimeFormatter {
        return this.addSeconds(-1);
    }

    /**
     * Subtracts many seconds from the current date
     * @param count
     */
    subSeconds(count: number): DateTimeFormatter {
        return this.addSeconds(count * -1);
    }

    /**
     * Subtracts one minute from the current date
     */
    subMinute(): DateTimeFormatter {
        return this.addMinutes(-1);
    }

    /**
     * Subtracts many minutes from the current date
     * @param count
     */
    subMinutes(count: number): DateTimeFormatter {
        return this.addMinutes(count * -1);
    }

    /**
     * Subtracts one hour from the current date
     */
    subHour(): DateTimeFormatter {
        return this.addHours(-1);
    }

    /**
     * Subtracts many hours from the current date
     * @param count
     */
    subHours(count: number): DateTimeFormatter {
        return this.addHours(count * -1);
    }

    /**
     * Subtracts one day from the current date
     */
    subDay(): DateTimeFormatter {
        return this.addDays(-1);
    }

    /**
     * Subtracts many days from the current date
     * @param count
     */
    subDays(count: number): DateTimeFormatter {
        return this.addDays(count * -1);
    }

    /**
     * Subtracts one week from the current date
     */
    subWeek(): DateTimeFormatter {
        return this.addDays(-7);
    }

    /**
     * Subtracts many weeks from the current date
     * @param count
     */
    subWeeks(count: number): DateTimeFormatter {
        return this.addDays(count * -7);
    }

    /**
     * Subtracts one month from the current date
     */
    subMonth(): DateTimeFormatter {
        return this.addMonths(-1);
    }

    /**
     * Subtracts many months from the current date
     * @param count
     */
    subMonths(count: number): DateTimeFormatter {
        return this.addMonths(count * -1);
    }

    /**
     * Subtracts one year from the current date
     */
    subYear(): DateTimeFormatter {
        return this.addYears(-1);
    }

    /**
     * Subtracts many years from the current date
     * @param count
     */
    subYears(count: number): DateTimeFormatter {
        return this.addYears(count * -1);
    }

    /**
     * Subtracts one decade from the current date
     */
    subDecade(): DateTimeFormatter {
        return this.subYears(10);
    }

    /**
     * Subtracts many decades from the current date
     */
    subDecades(count: number): DateTimeFormatter {
        return this.subYears(10 * count);
    }

    /**
     * Subtracts one century from the current date
     */
    subCentury(): DateTimeFormatter {
        return this.subYears(100);
    }

    /**
     * Subtracts many centuries from the current date
     */
    subCenturies(count: number): DateTimeFormatter {
        return this.subYears(100 * count);
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
     * Returns the count of full microseconds between the current date and the transmitted date
     * @param date
     */
    diffInMicroseconds(date: DateTimeFormatter): number {
        const multiplier = Math.pow(10, 3);
        const dateTimestamp = date.toJsTimestamp() * multiplier + date.getMicroseconds() % multiplier;
        const thisTimestamp = this.toJsTimestamp() * multiplier + this.getMicroseconds() % multiplier;

        return Math.abs(dateTimestamp - thisTimestamp);
    }

    /**
     * Returns the count of full milliseconds between the current date and the transmitted date
     * @param date
     */
    diffInMilliseconds(date: DateTimeFormatter): number {
        return Math.abs(date.toJsTimestamp() - this.toJsTimestamp());
    }

    /**
     * Returns the count of full seconds between the current date and the transmitted date
     * @param date
     */
    diffInSeconds(date: DateTimeFormatter): number {
        return Math.abs(date.toTimestamp() - this.toTimestamp());
    }

    /**
     * Returns the count of full minutes between the current date and the transmitted date
     * @param date
     */
    diffInMinutes(date: DateTimeFormatter): number {
        return Math.floor(this.diffInSeconds(date) / 60);
    }

    /**
     * Returns the count of full hours between the current date and the transmitted date
     * @param date
     */
    diffInHours(date: DateTimeFormatter): number {
        return Math.floor(this.diffInMinutes(date) / 60);
    }

    /**
     * Returns the count of full days between the current date and the transmitted date
     * @param date
     */
    diffInDays(date: DateTimeFormatter): number {
        return Math.floor(this.diffInHours(date) / 24);
    }

    /**
     * Returns the count of full months between the current date and the transmitted date
     * @param date
     */
    diffInMonths(date: DateTimeFormatter): number {
        return this.diffInYears(date) * 12 + Math.abs(date.month - this.month);
    }

    /**
     * Returns the count of full years between the current date and the transmitted date
     * @param date
     */
    diffInYears(date: DateTimeFormatter): number {
        return Math.abs(date.year - this.year);
    }

    /**
     * Returns the count of full decades between the current date and the transmitted date
     * @param date
     */
    diffInDecades(date: DateTimeFormatter): number {
        return Math.floor(this.diffInYears(date) / 10);
    }

    /**
     * Returns the count of full centuries between the current date and the transmitted date
     * @param date
     */
    diffInCenturies(date: DateTimeFormatter): number {
        return Math.floor(this.diffInYears(date) / 100);
    }

    /**
     * Converts the date to the target format
     * @param target
     */
    format(target: string): string {
        return builder(this, target);
    }

    /**
     * Goes to the beginning of the second
     */
    startOfSecond(): DateTimeFormatter {
        this.microseconds = 0;

        return this;
    }

    /**
     * Goes to the beginning of the minute
     */
    startOfMinute(): DateTimeFormatter {
        this.seconds = 0;
        return this.startOfSecond();
    }

    /**
     * Goes to the beginning of the hour
     */
    startOfHour(): DateTimeFormatter {
        this.minutes = 0;
        return this.startOfMinute();
    }

    /**
     * Goes to the beginning of the day
     */
    startOfDay(): DateTimeFormatter {
        this.hours = 0;
        return this.startOfHour();
    }

    /**
     * Goes to the beginning of the week
     */
    startOfWeek(): DateTimeFormatter {
        this.startOfDay();
        this.subDays(this.getDayOfWeekIso() - 1);

        return this;
    }

    /**
     * Goes to the beginning of the month
     */
    startOfMonth(): DateTimeFormatter {
        this.day = 1;
        return this.startOfDay();
    }

    /**
     * Goes to the beginning of the half year
     */
    startOfHalfYear(): DateTimeFormatter {
        return this.subMonths(this.month % 6).startOfMonth();
    }

    /**
     * Goes to the beginning of the year
     */
    startOfYear(): DateTimeFormatter {
        this.month = 0;
        return this.startOfMonth();
    }

    /**
     * Goes to the beginning of the decade
     */
    startOfDecade(): DateTimeFormatter {
        return this.subYears(this.year % 10).startOfYear()
    }

    /**
     * Goes to the beginning of the decade
     */
    startOfCentury(): DateTimeFormatter {
        return this.subYears(this.year % 100 - 1).startOfYear()
    }

    /**
     * Goes to the end of the minute
     */
    endOfSecond(): DateTimeFormatter {
        this.microseconds = 999999;

        return this;
    }

    /**
     * Goes to the end of the minute
     */
    endOfMinute(): DateTimeFormatter {
        this.seconds = 59;
        return this.endOfSecond();
    }

    /**
     * Goes to the end of the hour
     */
    endOfHour(): DateTimeFormatter {
        this.minutes = 59;
        return this.endOfMinute();
    }

    /**
     * Goes to the end of the day
     */
    endOfDay(): DateTimeFormatter {
        this.hours = 23;
        return this.endOfHour();
    }

    /**
     * Goes to the end of the week
     */
    endOfWeek(): DateTimeFormatter {
        return this.endOfDay().addDays(7 - this.getDayOfWeekIso());
    }

    /**
     * Goes to the end of the day
     */
    endOfMonth(): DateTimeFormatter {
        this.day = countDaysInMonth(this.year, this.month);
        return this.endOfDay();
    }

    /**
     * Goes to the end of the year
     */
    endOfHalfYear(): DateTimeFormatter {
        return this.startOfHalfYear().addMonths(6).endOfMonth();
    }

    /**
     * Goes to the end of the year
     */
    endOfYear(): DateTimeFormatter {
        this.month = 11;
        return this.endOfMonth();
    }

    /**
     * Goes to the end of decade
     */
    endOfDecade(): DateTimeFormatter {
        return this.startOfDecade().addYears(9).endOfYear();
    }

    /**
     * Goes to the end of century
     */
    endOfCentury(): DateTimeFormatter {
        return this.startOfCentury().addYears(99).endOfYear();
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
     * Returns `true` if the current date is in current microsecond
     */
    isCurrentMicrosecond(): boolean {
        const now = DateTimeFormatter.now();
        return this.isCurrentSecond()
            && this.getMicroseconds() === now.getMicroseconds();
    }

    /**
     * Returns `true` if the current date is in current millisecond
     */
    isCurrentMillisecond(): boolean {
        const now = DateTimeFormatter.now();
        return this.isCurrentSecond()
            && this.getMilliseconds() === now.getMilliseconds();
    }

    /**
     * Returns `true` if the current date is in current second
     */
    isCurrentSecond(): boolean {
        return this.notEqualWithoutMilliseconds(DateTimeFormatter.now());
    }

    /**
     * Returns `true` if the current date is in current minute
     */
    isCurrentMinute(): boolean {
        return this.notEqualWithoutSeconds(DateTimeFormatter.now());
    }

    /**
     * Returns `true` if the current date is in current hour
     */
    isCurrentHour(): boolean {
        return this.notEqualWithoutMinutes(DateTimeFormatter.now());
    }

    /**
     * Returns `true` if the current date is in current day
     */
    isCurrentDay(): boolean {
        return this.notEqualWithoutHours(DateTimeFormatter.now());
    }

    /**
     * Returns `true` if the current date is in current month
     */
    isCurrentMonth(): boolean {
        return this.notEqualWithoutDays(DateTimeFormatter.now());
    }

    /**
     * Returns `true` if the current date is in current year
     */
    isCurrentYear(): boolean {
        return this.notEqualWithoutMonths(DateTimeFormatter.now());
    }

    /**
     * Returns 'true' if the current date is in the current decade
     */
    isCurrentDecade(): boolean {
        const now = DateTimeFormatter.now();
        return this.getYear() >= now.startOfDecade().getYear()
            && this.getYear() <= now.endOfDecade().getYear();
    }

    /**
     * Returns 'true' if the current date is in the current century
     */
    isCurrentCentury(): boolean {
        const now = DateTimeFormatter.now();
        return this.getYear() >= now.startOfCentury().getYear()
            && this.getYear() <= now.endOfCentury().getYear();
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
    setMicroseconds(value: number): DateTimeFormatter {
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
     * Setter for milliseconds
     * @param value
     */
    setMilliseconds(value: number): DateTimeFormatter {
        return this.set(
            this.year,
            this.month,
            this.day,
            this.hours,
            this.minutes,
            this.seconds,
            value * 1000
        );
    }

    /**
     * Setter for seconds
     * @param value
     */
    setSeconds(value: number): DateTimeFormatter {
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
    setMinutes(value: number): DateTimeFormatter {
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
    setHours(value: number): DateTimeFormatter {
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
    setDay(value: number): DateTimeFormatter {
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
    setMonth(value: number): DateTimeFormatter {
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
    setYear(value: number): DateTimeFormatter {
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
    setTranslations(payload: Translation): DateTimeFormatter {
        const result = defineTranslations(payload);

        this.monthNames = result.monthNames;
        this.shortMonthNames = result.shortMonthNames;
        this.dayNames = result.dayNames;
        this.shortDayNames = result.shortDayNames;

        return this;
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * @param target
     */
    equal(target: DateTimeFormatter | number | Date): boolean {
        const date = DateTimeFormatter.parse(target);
        return this.equalWithoutMicroseconds(date)
            && this.microseconds === date.microseconds;
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without microseconds
     * @param target
     */
    equalWithoutMicroseconds(target: DateTimeFormatter | number | Date): boolean {
        const date = DateTimeFormatter.parse(target);
        return this.equalWithoutSeconds(date)
            && this.seconds === date.seconds
            && this.getMilliseconds() === date.getMilliseconds();
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without milliseconds
     * @param target
     */
    equalWithoutMilliseconds(target: DateTimeFormatter | number | Date): boolean {
        const date = DateTimeFormatter.parse(target);
        return this.equalWithoutSeconds(date)
            && this.seconds === date.seconds;
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without seconds and microseconds
     * @param target
     */
    equalWithoutSeconds(target: DateTimeFormatter | number | Date): boolean {
        const date = DateTimeFormatter.parse(target);
        return this.equalWithoutMinutes(date)
            && this.minutes === date.minutes;
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without minutes, seconds and microseconds
     * @param target
     */
    equalWithoutMinutes(target: DateTimeFormatter | number | Date): boolean {
        const date = DateTimeFormatter.parse(target);
        return this.equalWithoutHours(date)
            && this.hours === date.hours;
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without hours, minutes, seconds and microseconds
     * @param target
     */
    equalWithoutHours(target: DateTimeFormatter | number | Date): boolean {
        const date = DateTimeFormatter.parse(target);
        return this.equalWithoutDays(date)
            && this.day === date.day;
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without days, hours, minutes, seconds and microseconds
     * @param target
     */
    equalWithoutDays(target: DateTimeFormatter | number | Date): boolean {
        const date = DateTimeFormatter.parse(target);
        return this.equalWithoutMonths(date)
            && this.month === date.month;
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without months, days, hours, minutes, seconds and microseconds
     * @param target
     */
    equalWithoutMonths(target: DateTimeFormatter | number | Date): boolean {
        const date = DateTimeFormatter.parse(target);
        return this.year === date.year;
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * @param target
     */
    notEqual(target: DateTimeFormatter | number | Date): boolean {
        return !this.equal(target);
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without microseconds
     * @param target
     */
    notEqualWithoutMicroseconds(target: DateTimeFormatter | number | Date): boolean {
        return !this.equalWithoutMicroseconds(target);
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without milliseconds
     * @param target
     */
    notEqualWithoutMilliseconds(target: DateTimeFormatter | number | Date): boolean {
        return !this.equalWithoutMilliseconds(target);
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without seconds and microseconds
     * @param target
     */
    notEqualWithoutSeconds(target: DateTimeFormatter | number | Date): boolean {
        return !this.equalWithoutSeconds(target);
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without minutes, seconds and microseconds
     * @param target
     */
    notEqualWithoutMinutes(target: DateTimeFormatter | number | Date): boolean {
        return !this.equalWithoutMinutes(target);
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without hours, minutes, seconds and microseconds
     * @param target
     */
    notEqualWithoutHours(target: DateTimeFormatter | number | Date): boolean {
        return !this.equalWithoutHours(target);
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without days, hours, minutes, seconds and microseconds
     * @param target
     */
    notEqualWithoutDays(target: DateTimeFormatter | number | Date): boolean {
        return !this.equalWithoutDays(target);
    }

    /**
     * Returns `true` if the current date equals the transmitted date
     * without months, days, hours, minutes, seconds and microseconds
     * @param target
     */
    notEqualWithoutMonths(target: DateTimeFormatter | number | Date): boolean {
        return !this.equalWithoutMonths(target);
    }

    /**
     * Returns the number of the day in the year
     */
    getDayOfYear(): number {
        let countBeforeDays = 0;
        for (let month = 0; month < this.month; month++) {
            countBeforeDays += countDaysInMonth(this.year, month);
        }

        return countBeforeDays + this.day;
    }

    /**
     * Returns the index of microsecond in which date is included
     * @param startedFrom
     * @param microseconds
     */
    getIndexOfMicrosecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...microseconds: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInMicroseconds(startedFrom), microseconds);
    }

    /**
     * Returns the index of millisecond in which date is included
     * @param startedFrom
     * @param milliseconds
     */
    getIndexOfMillisecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...milliseconds: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInMilliseconds(startedFrom), milliseconds);
    }

    /**
     * Returns the index of second in which date is included
     * @param startedFrom
     * @param seconds
     */
    getIndexOfSecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...seconds: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInSeconds(startedFrom), seconds);
    }

    /**
     * Returns the index of minute in which date is included
     * @param startedFrom
     * @param minutes
     */
    getIndexOfMinutePeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...minutes: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInMinutes(startedFrom), minutes);
    }

    /**
     * Returns the index of hour in which date is included
     * @param startedFrom
     * @param hours
     */
    getIndexOfHourPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...hours: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInHours(startedFrom), hours);
    }

    /**
     * Returns the index of day in which date is included
     * @param startedFrom
     * @param days
     */
    getIndexOfDayPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...days: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInDays(startedFrom), days);
    }

    /**
     * Returns the index of month in which date is included
     * @param startedFrom
     * @param months
     */
    getIndexOfMonthPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...months: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInMonths(startedFrom), months);
    }

    /**
     * Returns the index of year in which date is included
     * @param startedFrom
     * @param years
     */
    getIndexOfYearPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...years: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInYears(startedFrom), years);
    }

    /**
     * Returns the index of decade in which date is included
     * @param startedFrom
     * @param decades
     */
    getIndexOfDecadePeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...decades: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInDecades(startedFrom), decades);
    }

    /**
     * Returns the index of century in which date is included
     * @param startedFrom
     * @param centuries
     */
    getIndexOfCenturyPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...centuries: Array<number> | Array<Array<number>>): number {
        return getIndexOfPeriodOnWhichDateIsIncluded(this.diffInCenturies(startedFrom), centuries);
    }

    /**
     * Parses the date from the transmitted Date object
     * @param date
     */
    private parseFromDate(date: Date): DateTimeFormatter {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.microseconds = date.getMilliseconds() * Math.pow(10, 3);
        this.offset = date.getTimezoneOffset();

        return this;
    }

    /**
     * Parses the date from the transmitted Date object without offset
     * @param date
     */
    private parseFromUTCDate(date: Date): DateTimeFormatter {
        this.year = date.getUTCFullYear();
        this.month = date.getUTCMonth();
        this.day = date.getUTCDate();
        this.hours = date.getUTCHours();
        this.minutes = date.getUTCMinutes();
        this.seconds = date.getUTCSeconds();
        this.microseconds = date.getUTCMilliseconds() * Math.pow(10, 3);
        this.offset = 0;

        return this;
    }

    /**
     * Parses the date from the transmitted timestamp
     * @param timestamp
     */
    private parseFromTimestamp(timestamp: number): DateTimeFormatter {
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

        this.parseFromUTCDate(new Date(timestamp));
        this.microseconds = microseconds;

        return this;
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

        this.parseFromUTCDate(
            new Date(Date.UTC(year, month, day, hours, minutes, seconds))
        );

        if (year < 100) {
            this.year = year;
        }

        this.microseconds = safelyMicroseconds;

        return this;
    }
}
