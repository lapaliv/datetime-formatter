declare module 'datetime-formatter' {
    export default class DateTimeFormatter {
        static globalMonthNames: string[];
        static globalShortMonthNames: string[];
        static globalDayNames: string[];
        static globalShortDayNames: string[];
        /**
         * Creates an instance with the current time
         */
        static now(): DateTimeFormatter;
        /**
         * Creates an instance with the date in the format
         * @param format
         * @param date
         */
        static createFromFormat(format: string, date: string): DateTimeFormatter;
        /**
         * Set the translations
         * @param payload
         */
        static setGlobalTranslations(payload: Translation): void;

        year: number;
        month: number;
        day: number;
        hours: number;
        minutes: number;
        seconds: number;
        microseconds: number;
        offset: number;
        monthNames: string[];
        shortMonthNames: string[];
        dayNames: string[];
        shortDayNames: string[];

        constructor();
        constructor(date: Date);
        constructor(timestamp: number);
        constructor(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, microseconds?: number);

        /**
         * Adds one second to the date
         */
        addSecond(): this;
        /**
         * Adds many seconds to the date
         * @param count
         */
        addSeconds(count: number): this;
        /**
         * Adds one minute to the date
         */
        addMinute(): this;
        /**
         * Adds many minutes to the date
         * @param count
         */
        addMinutes(count: number): this;
        /**
         * Adds one hour to the date
         */
        addHour(): this;
        /**
         * Adds many hours to the date
         * @param count
         */
        addHours(count: number): this;
        /**
         * Adds one day to the date
         */
        addDay(): this;
        /**
         * Adds many days to the date
         * @param count
         */
        addDays(count: number): this;
        /**
         * Adds one week to the date
         */
        addWeek(): this;
        /**
         * Adds many weeks to the date
         * @param count
         */
        addWeeks(count: number): this;
        /**
         * Adds one month to the date
         */
        addMonth(): this;
        /**
         * Adds many months to the date
         * @param count
         */
        addMonths(count: number): this;
        /**
         * Adds one year to the date
         */
        addYear(): this;
        /**
         * Adds many years to the date
         * @param count
         */
        addYears(count: number): this;
        /**
         * Subtracts one second from the current date
         */
        subSecond(): this;
        /**
         * Subtracts many seconds from the current date
         * @param count
         */
        subSeconds(count: number): this;
        /**
         * Subtracts one minute from the current date
         */
        subMinute(): this;
        /**
         * Subtracts many minutes from the current date
         * @param count
         */
        subMinutes(count: number): this;
        /**
         * Subtracts one hour from the current date
         */
        subHour(): this;
        /**
         * Subtracts many hours from the current date
         * @param count
         */
        subHours(count: number): this;
        /**
         * Subtracts one day from the current date
         */
        subDay(): this;
        /**
         * Subtracts many days from the current date
         * @param count
         */
        subDays(count: number): this;
        /**
         * Subtracts one week from the current date
         */
        subWeek(): this;
        /**
         * Subtracts many weeks from the current date
         * @param count
         */
        subWeeks(count: number): this;
        /**
         * Subtracts one month from the current date
         */
        subMonth(): this;
        /**
         * Subtracts many months from the current date
         * @param count
         */
        subMonths(count: number): this;
        /**
         * Subtracts one year from the current date
         */
        subYear(): this;
        /**
         * Subtracts many years from the current date
         * @param count
         */
        subYears(count: number): this;
        /**
         * Converts to the `Y-m-d` format
         */
        toDateString(): string;
        /**
         * Converts to the `Y-m-d H:i:s` format
         */
        toDateTimeString(): string;
        /**
         * Converts to the Unix timestamp with milliseconds
         */
        toJsTimestamp(): number;
        /**
         * Converts to the Unix timestamp (without milliseconds)
         */
        toTimestamp(): number;
        /**
         * Converts to the Date object
         */
        toDate(): Date;
        /**
         * Clones an instance and returns it
         */
        clone(): DateTimeFormatter;
        /**
         * Returns the count of full seconds between the current date and the transmitted date
         * @param date
         */
        diffInSeconds(date: this): number;
        /**
         * Returns the count of full minutes between the current date and the transmitted date
         * @param date
         */
        diffInMinutes(date: this): number;
        /**
         * Returns the count of full hours between the current date and the transmitted date
         * @param date
         */
        diffInHours(date: this): number;
        /**
         * Returns the count of full days between the current date and the transmitted date
         * @param date
         */
        diffInDays(date: this): number;
        /**
         * Returns the count of full months between the current date and the transmitted date
         * @param date
         */
        diffInMonths(date: this): number;
        /**
         * Returns the count of full years between the current date and the transmitted date
         * @param date
         */
        diffInYears(date: this): number;
        /**
         * Converts the date to the target format
         * @param target
         */
        format(target: string): string;
        /**
         * Goes to the beginning of the minute
         */
        startOfMinute(): this;
        /**
         * Goes to the beginning of the hour
         */
        startOfHour(): this;
        /**
         * Goes to the beginning of the day
         */
        startOfDay(): this;
        /**
         * Goes to the beginning of the month
         */
        startOfMonth(): this;
        /**
         * Goes to the beginning of the year
         */
        startOfYear(): this;
        /**
         * Goes to the end of the minute
         */
        endOfMinute(): this;
        /**
         * Goes to the end of the hour
         */
        endOfHour(): this;
        /**
         * Goes to the end of the day
         */
        endOfDay(): this;
        /**
         * Goes to the end of the day
         */
        endOfMonth(): this;
        /**
         * Goes to the end of the year
         */
        endOfYear(): this;
        /**
         * Returns `true` if the date in future
         */
        isFuture(): boolean;
        /**
         * Returns `true` if the year is a leap year
         */
        isLeapYear(): boolean;
        /**
         * Returns `true` if the date in past
         */
        isPast(): boolean;
        /**
         * Returns `true` if the month is next from the current
         */
        isNextMonth(): boolean;
        /**
         * Returns `true` if the year is next from the current
         */
        isNextYear(): boolean;
        /**
         * Returns `true` if the month is previous from the current
         */
        isPrevMonth(): boolean;
        /**
         * Returns `true` if the year is previous from the current
         */
        isPrevYear(): boolean;
        /**
         * Returns `true` if the date equals now
         */
        isToday(): boolean;
        /**
         * Returns `true` if the date is tomorrow
         */
        isTomorrow(): boolean;
        /**
         * Returns `true` if the date is yesterday
         */
        isYesterday(): boolean;
        /**
         * Returns the microseconds
         */
        getMicroseconds(): number;
        /**
         * Returns the milliseconds
         */
        getMilliseconds(): number;
        /**
         * Returns the seconds
         */
        getSeconds(): number;
        /**
         * Returns the minutes
         */
        getMinutes(): number;
        /**
         * Returns the hours
         */
        getHours(): number;
        /**
         * Returns the day
         */
        getDay(): number;
        /**
         * Returns the month
         */
        getMonth(): number;
        /**
         * Returns the year
         */
        getYear(): number;
        /**
         * Setter for microseconds
         * @param value
         */
        setMicroseconds(value: number): this;
        /**
         * Setter for seconds
         * @param value
         */
        setSeconds(value: number): this;
        /**
         * Setter for minutes
         * @param value
         */
        setMinutes(value: number): this;
        /**
         * Setter for hours
         * @param value
         */
        setHours(value: number): this;
        /**
         * Setter for day
         * @param value
         */
        setDay(value: number): this;
        /**
         * Setter for month
         * @param value
         */
        setMonth(value: number): this;
        /**
         * Setter for year
         * @param value
         */
        setYear(value: number): this;
        /**
         * Returns the first day in year on full week
         */
        getFirstDayInYearOnFullWeek(): number;
        /**
         * Returns count days in the month
         */
        getCountDaysInMonth(): number;
        /**
         * Returns the number of the day on week (monday - 1, ..., saturday - 6, sunday - 0)
         */
        getDayOfWeek(): number;
        /**
         * * Returns the number of the day on week (monday - 1, ..., saturday - 6, sunday - 7)
         */
        getDayOfWeekIso(): number;
        /**
         * Set the translations
         * @param payload
         */
        setTranslations(payload: Translation): this;
    }

    export type Translation = Object & {
        monthNames: string[];
        shortMonthNames?: string[];
        dayNames: string[];
        shortDayNames?: string[];
    };
}
