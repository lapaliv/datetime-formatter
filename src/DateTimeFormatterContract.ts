export interface DateTimeFormatterContract {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly microseconds: number;

    // new(date: Date): this;
    // new(timestamp: number): this;
    // new(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, microseconds?: number): this;
    // new(): this;

    getMicroseconds(): number;
    getSeconds(): number;
    getMinutes(): number;
    getHours(): number;
    getDay(): number;
    getMonth(): number;
    getYear(): number;

    setMicroseconds(value: number): this;
    setSeconds(value: number): this;
    setMinutes(value: number): this;
    setHours(value: number): this;
    setDay(value: number): this;
    setMonth(value: number): this;
    setYear(value: number): this;

    addSecond(): this;
    addSeconds(count: number): this;
    subSecond(): this;
    subSeconds(count: number): this;

    addMinute(): this;
    addMinutes(count: number): this;
    subMinute(): this;
    subMinutes(count: number): this;

    addHour(): this;
    addHours(count: number): this;
    subHour(): this;
    subHours(count: number): this;

    addDay(): this;
    addDays(count: number): this;
    subDay(): this;
    subDays(count: number): this;

    addMonth(): this;
    addMonths(count: number): this;
    subMonth(): this;
    subMonths(count: number): this;

    addYear(): this;
    addYears(count: number): this;
    subYear(): this;
    subYears(count: number): this;

    startOfMinute(): this;
    startOfHour(): this;
    startOfDay(): this;
    startOfMonth(): this;
    startOfYear(): this;

    endOfMinute(): this;
    endOfHour(): this;
    endOfDay(): this;
    endOfMonth(): this;
    endOfYear(): this;

    isFuture(): boolean;
    isPast(): boolean;
    isLeapYear(): boolean;
    isToday(): boolean;
    isYesterday(): boolean;
    isTomorrow(): boolean;
    isNextMonth(): boolean;
    isNextYear(): boolean;
    isPrevMonth(): boolean;
    isPrevYear(): boolean;

    diffInSeconds(date: this): number;
    diffInMinutes(date: this): number;
    diffInHours(date: this): number;
    diffInDays(date: this): number;
    diffInMonths(date: this): number;
    diffInYears(date: this): number;

    clone(): DateTimeFormatterContract;

    format(target: string): string;
    toDateTimeString(): string;
    toDateString(): string;
    toTimestamp(): number;
    toJsTimestamp(): number;
    toDate(): Date;
}
