declare module '@lapaliv/datetime-formatter' {
    export default class DateTimeFormatter {
        static globalMonthNames: string[];
        static globalShortMonthNames: string[];
        static globalDayNames: string[];
        static globalShortDayNames: string[];
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
        /**
         * Creates an instance with the current time
         */
        static now(): DateTimeFormatter;
        /**
         * Parse date from custom string
         * @param target
         */
        static parse(target: string | Date | number | DateTimeFormatter | any): DateTimeFormatter;
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
        /**
         * Parses the date from the transmitted timestamp
         * @param timestamp
         */
        static createFromTimestamp(timestamp: number): DateTimeFormatter;
        /**
         * Parses the date from the transmitted Date object
         * @param date
         */
        static createFromDate(date: Date): DateTimeFormatter;
        constructor();
        constructor(date: Date);
        constructor(timestamp: number);
        constructor(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, microseconds?: number);
        /**
         * Adds one second to the date
         */
        addSecond(): DateTimeFormatter;
        /**
         * Adds many seconds to the date
         * @param count
         */
        addSeconds(count: number): DateTimeFormatter;
        /**
         * Adds one minute to the date
         */
        addMinute(): DateTimeFormatter;
        /**
         * Adds many minutes to the date
         * @param count
         */
        addMinutes(count: number): DateTimeFormatter;
        /**
         * Adds one hour to the date
         */
        addHour(): DateTimeFormatter;
        /**
         * Adds many hours to the date
         * @param count
         */
        addHours(count: number): DateTimeFormatter;
        /**
         * Adds one day to the date
         */
        addDay(): DateTimeFormatter;
        /**
         * Adds many days to the date
         * @param count
         */
        addDays(count: number): DateTimeFormatter;
        /**
         * Adds one week to the date
         */
        addWeek(): DateTimeFormatter;
        /**
         * Adds many weeks to the date
         * @param count
         */
        addWeeks(count: number): DateTimeFormatter;
        /**
         * Adds one month to the date
         */
        addMonth(): DateTimeFormatter;
        /**
         * Adds many months to the date
         * @param count
         */
        addMonths(count: number): DateTimeFormatter;
        /**
         * Adds one year to the date
         */
        addYear(): DateTimeFormatter;
        /**
         * Adds many years to the date
         * @param count
         */
        addYears(count: number): DateTimeFormatter;
        /**
         * Adds one decade to the date
         */
        addDecade(): DateTimeFormatter;
        /**
         * Adds many decades to the date
         * @param count
         */
        addDecades(count: number): DateTimeFormatter;
        /**
         * Adds one decade to the date
         */
        addCentury(): DateTimeFormatter;
        /**
         * Adds many centuries to the date
         * @param count
         */
        addCenturies(count: number): DateTimeFormatter;
        /**
         * Subtracts one second from the current date
         */
        subSecond(): DateTimeFormatter;
        /**
         * Subtracts many seconds from the current date
         * @param count
         */
        subSeconds(count: number): DateTimeFormatter;
        /**
         * Subtracts one minute from the current date
         */
        subMinute(): DateTimeFormatter;
        /**
         * Subtracts many minutes from the current date
         * @param count
         */
        subMinutes(count: number): DateTimeFormatter;
        /**
         * Subtracts one hour from the current date
         */
        subHour(): DateTimeFormatter;
        /**
         * Subtracts many hours from the current date
         * @param count
         */
        subHours(count: number): DateTimeFormatter;
        /**
         * Subtracts one day from the current date
         */
        subDay(): DateTimeFormatter;
        /**
         * Subtracts many days from the current date
         * @param count
         */
        subDays(count: number): DateTimeFormatter;
        /**
         * Subtracts one week from the current date
         */
        subWeek(): DateTimeFormatter;
        /**
         * Subtracts many weeks from the current date
         * @param count
         */
        subWeeks(count: number): DateTimeFormatter;
        /**
         * Subtracts one month from the current date
         */
        subMonth(): DateTimeFormatter;
        /**
         * Subtracts many months from the current date
         * @param count
         */
        subMonths(count: number): DateTimeFormatter;
        /**
         * Subtracts one year from the current date
         */
        subYear(): DateTimeFormatter;
        /**
         * Subtracts many years from the current date
         * @param count
         */
        subYears(count: number): DateTimeFormatter;
        /**
         * Subtracts one decade from the current date
         */
        subDecade(): DateTimeFormatter;
        /**
         * Subtracts many decades from the current date
         */
        subDecades(count: number): DateTimeFormatter;
        /**
         * Subtracts one century from the current date
         */
        subCentury(): DateTimeFormatter;
        /**
         * Subtracts many centuries from the current date
         */
        subCenturies(count: number): DateTimeFormatter;
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
         * Returns the count of full microseconds between the current date and the transmitted date
         * @param date
         */
        diffInMicroseconds(date: DateTimeFormatter): number;
        /**
         * Returns the count of full milliseconds between the current date and the transmitted date
         * @param date
         */
        diffInMilliseconds(date: DateTimeFormatter): number;
        /**
         * Returns the count of full seconds between the current date and the transmitted date
         * @param date
         */
        diffInSeconds(date: DateTimeFormatter): number;
        /**
         * Returns the count of full minutes between the current date and the transmitted date
         * @param date
         */
        diffInMinutes(date: DateTimeFormatter): number;
        /**
         * Returns the count of full hours between the current date and the transmitted date
         * @param date
         */
        diffInHours(date: DateTimeFormatter): number;
        /**
         * Returns the count of full days between the current date and the transmitted date
         * @param date
         */
        diffInDays(date: DateTimeFormatter): number;
        /**
         * Returns the count of full months between the current date and the transmitted date
         * @param date
         */
        diffInMonths(date: DateTimeFormatter): number;
        /**
         * Returns the count of full years between the current date and the transmitted date
         * @param date
         */
        diffInYears(date: DateTimeFormatter): number;
        /**
         * Returns the count of full decades between the current date and the transmitted date
         * @param date
         */
        diffInDecades(date: DateTimeFormatter): number;
        /**
         * Returns the count of full centuries between the current date and the transmitted date
         * @param date
         */
        diffInCenturies(date: DateTimeFormatter): number;
        /**
         * Converts the date to the target format
         * @param target
         */
        format(target: string): string;
        /**
         * Goes to the beginning of the millisecond
         */
        startOfMillisecond(): DateTimeFormatter;
        /**
         * Goes to the beginning of the second
         */
        startOfSecond(): DateTimeFormatter;
        /**
         * Goes to the beginning of the minute
         */
        startOfMinute(): DateTimeFormatter;
        /**
         * Goes to the beginning of the hour
         */
        startOfHour(): DateTimeFormatter;
        /**
         * Goes to the beginning of the day
         */
        startOfDay(): DateTimeFormatter;
        /**
         * Goes to the beginning of the week
         */
        startOfWeek(): DateTimeFormatter;
        /**
         * Goes to the beginning of the month
         */
        startOfMonth(): DateTimeFormatter;
        /**
         * Goes to the beginning of the half year
         */
        startOfHalfYear(): DateTimeFormatter;
        /**
         * Goes to the beginning of the year
         */
        startOfYear(): DateTimeFormatter;
        /**
         * Goes to the beginning of the decade
         */
        startOfDecade(): DateTimeFormatter;
        /**
         * Goes to the beginning of the decade
         */
        startOfCentury(): DateTimeFormatter;
        /**
         * Goes to the end of the millisecond
         */
        endOfMillisecond(): DateTimeFormatter;
        /**
         * Goes to the end of the minute
         */
        endOfSecond(): DateTimeFormatter;
        /**
         * Goes to the end of the minute
         */
        endOfMinute(): DateTimeFormatter;
        /**
         * Goes to the end of the hour
         */
        endOfHour(): DateTimeFormatter;
        /**
         * Goes to the end of the day
         */
        endOfDay(): DateTimeFormatter;
        /**
         * Goes to the end of the week
         */
        endOfWeek(): DateTimeFormatter;
        /**
         * Goes to the end of the day
         */
        endOfMonth(): DateTimeFormatter;
        /**
         * Goes to the end of the year
         */
        endOfHalfYear(): DateTimeFormatter;
        /**
         * Goes to the end of the year
         */
        endOfYear(): DateTimeFormatter;
        /**
         * Goes to the end of decade
         */
        endOfDecade(): DateTimeFormatter;
        /**
         * Goes to the end of century
         */
        endOfCentury(): DateTimeFormatter;
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
         * Returns `true` if the current date is in current microsecond
         */
        isCurrentMicrosecond(): boolean;
        /**
         * Returns `true` if the current date is in current millisecond
         */
        isCurrentMillisecond(): boolean;
        /**
         * Returns `true` if the current date is in current second
         */
        isCurrentSecond(): boolean;
        /**
         * Returns `true` if the current date is in current minute
         */
        isCurrentMinute(): boolean;
        /**
         * Returns `true` if the current date is in current hour
         */
        isCurrentHour(): boolean;
        /**
         * Returns `true` if the current date is in current day
         */
        isCurrentDay(): boolean;
        /**
         * Returns `true` if the current date is in current month
         */
        isCurrentMonth(): boolean;
        /**
         * Returns `true` if the current date is in current year
         */
        isCurrentYear(): boolean;
        /**
         * Returns 'true' if the current date is in the current decade
         */
        isCurrentDecade(): boolean;
        /**
         * Returns 'true' if the current date is in the current century
         */
        isCurrentCentury(): boolean;
        /**
         * Returns `true` if the current month is January
         */
        isJanuary(): boolean;
        /**
         * Returns `true` if the current month is February
         */
        isFebruary(): boolean;
        /**
         * Returns `true` if the current month is March
         */
        isMarch(): boolean;
        /**
         * Returns `true` if the current month is April
         */
        isApril(): boolean;
        /**
         * Returns `true` if the current month is May
         */
        isMay(): boolean;
        /**
         * Returns `true` if the current month is June
         */
        isJune(): boolean;
        /**
         * Returns `true` if the current month is July
         */
        isJuly(): boolean;
        /**
         * Returns `true` if the current month is August
         */
        isAugust(): boolean;
        /**
         * Returns `true` if the current month is September
         */
        isSeptember(): boolean;
        /**
         * Returns `true` if the current month is October
         */
        isOctober(): boolean;
        /**
         * Returns `true` if the current month is November
         */
        isNovember(): boolean;
        /**
         * Returns `true` if the current month is December
         */
        isDecember(): boolean;
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
        setMicroseconds(value: number): DateTimeFormatter;
        /**
         * Setter for milliseconds
         * @param value
         */
        setMilliseconds(value: number): DateTimeFormatter;
        /**
         * Setter for seconds
         * @param value
         */
        setSeconds(value: number): DateTimeFormatter;
        /**
         * Setter for minutes
         * @param value
         */
        setMinutes(value: number): DateTimeFormatter;
        /**
         * Setter for hours
         * @param value
         */
        setHours(value: number): DateTimeFormatter;
        /**
         * Setter for day
         * @param value
         */
        setDay(value: number): DateTimeFormatter;
        /**
         * Setter for month
         * @param value
         */
        setMonth(value: number): DateTimeFormatter;
        /**
         * Setter for year
         * @param value
         */
        setYear(value: number): DateTimeFormatter;
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
        setTranslations(payload: Translation): DateTimeFormatter;
        /**
         * Returns `true` if the current date equals the transmitted date
         * @param target
         */
        equal(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without microseconds
         * @param target
         */
        equalWithoutMicroseconds(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without milliseconds
         * @param target
         */
        equalWithoutMilliseconds(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without seconds and microseconds
         * @param target
         */
        equalWithoutSeconds(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without minutes, seconds and microseconds
         * @param target
         */
        equalWithoutMinutes(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without hours, minutes, seconds and microseconds
         * @param target
         */
        equalWithoutHours(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without days, hours, minutes, seconds and microseconds
         * @param target
         */
        equalWithoutDays(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without months, days, hours, minutes, seconds and microseconds
         * @param target
         */
        equalWithoutMonths(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * @param target
         */
        notEqual(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without microseconds
         * @param target
         */
        notEqualWithoutMicroseconds(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without milliseconds
         * @param target
         */
        notEqualWithoutMilliseconds(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without seconds and microseconds
         * @param target
         */
        notEqualWithoutSeconds(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without minutes, seconds and microseconds
         * @param target
         */
        notEqualWithoutMinutes(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without hours, minutes, seconds and microseconds
         * @param target
         */
        notEqualWithoutHours(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without days, hours, minutes, seconds and microseconds
         * @param target
         */
        notEqualWithoutDays(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns `true` if the current date equals the transmitted date
         * without months, days, hours, minutes, seconds and microseconds
         * @param target
         */
        notEqualWithoutMonths(target: DateTimeFormatter | number | Date): boolean;
        /**
         * Returns the number of the day in the year
         */
        getDayOfYear(): number;
        /**
         * Returns the index of microsecond in which date is included
         * @param startedFrom
         * @param microseconds
         */
        getIndexOfMicrosecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...microseconds: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of millisecond in which date is included
         * @param startedFrom
         * @param milliseconds
         */
        getIndexOfMillisecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...milliseconds: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of second in which date is included
         * @param startedFrom
         * @param seconds
         */
        getIndexOfSecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...seconds: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of minute in which date is included
         * @param startedFrom
         * @param minutes
         */
        getIndexOfMinutePeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...minutes: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of hour in which date is included
         * @param startedFrom
         * @param hours
         */
        getIndexOfHourPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...hours: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of day in which date is included
         * @param startedFrom
         * @param days
         */
        getIndexOfDayPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...days: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of month in which date is included
         * @param startedFrom
         * @param months
         */
        getIndexOfMonthPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...months: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of year in which date is included
         * @param startedFrom
         * @param years
         */
        getIndexOfYearPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...years: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of decade in which date is included
         * @param startedFrom
         * @param decades
         */
        getIndexOfDecadePeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...decades: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the index of century in which date is included
         * @param startedFrom
         * @param centuries
         */
        getIndexOfCenturyPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...centuries: Array<number> | Array<Array<number>>): number;
        /**
         * Returns the Unix-timestamp with a precision
         * @param precision
         * @example getPreciseTimestamp()   1589833741123456
         * @example getPreciseTimestamp(6)  1589833741123456
         * @example getPreciseTimestamp(5)  158983374112345
         * @example getPreciseTimestamp(4)  158983374112345
         * @example getPreciseTimestamp(3)  15898337411234
         * @example getPreciseTimestamp(2)  1589833741123
         * @example getPreciseTimestamp(1)  158983374112
         * @example getPreciseTimestamp(0)  15898337411
         */
        getPreciseTimestamp(precision?: number): number;
        /**
         * Returns `true` if the current date is greater than the transmitted date
         * @param date
         */
        greaterThan(date: DateTimeFormatter): boolean;
        /**
         * Returns `true` if the current date is greater than or equal to the transmitted date
         * @param date
         */
        greaterThanOrEqualTo(date: DateTimeFormatter): boolean;
        /**
         * Returns `true` if the current date is less than the transmitted date
         * @param date
         */
        lessThan(date: DateTimeFormatter): boolean;
        /**
         * Returns `true` if the current date is less than or equal to the transmitted date
         * @param date
         */
        lessThanOrEqualTo(date: DateTimeFormatter): boolean;
        /**
         * Parses the date from the transmitted Date object
         * @param date
         */
        private parseFromDate;
        /**
         * Parses the date from the transmitted Date object without offset
         * @param date
         */
        private parseFromUTCDate;
        /**
         * Parses the date from the transmitted timestamp
         * @param timestamp
         */
        private parseFromTimestamp;
        /**
         * Adds the custom values to the current date
         * @param years
         * @param months
         * @param days
         * @param hours
         * @param minutes
         * @param seconds
         */
        private add;
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
        private set;
    }

    export type Translation = Object & {
        monthNames: string[];
        shortMonthNames?: string[];
        dayNames: string[];
        shortDayNames?: string[];
    };
}
