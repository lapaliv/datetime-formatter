const builder = require('./builder');
const parser = require('./parser');

const formatter = function (
    year,
    month = undefined,
    day = undefined,
    hours = undefined,
    minutes = undefined,
    seconds = undefined,
    microseconds = undefined,
    timezone = undefined
) {
    this._set(year, month, day, hours, minutes, seconds, microseconds, timezone);
};

formatter.prototype._builder = function () {
    return new builder(this);
};

formatter.prototype.format = function (format) {
    return this._builder().to(format);
};

formatter.prototype.toDateString = function () {
    return this.format('Y-m-d');
};

formatter.prototype.toDateTimeString = function () {
    return this.format('Y-m-d H:i:s');
};

formatter.prototype.toTimestamp = function () {
    return this.format('U');
};

formatter.prototype.toDate = function () {
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
};

formatter.prototype.isLeapYear = function () {
    return this.year % 400 === 0 || (this.year % 100 !== 0 && this.year % 4 === 0);
};

formatter.prototype.getCountDaysInMonth = function () {
    return [31, this.isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.month];
};

formatter.prototype.addSecond = function () {
    return this.addSeconds(1);
};

formatter.prototype.addSeconds = function (count) {
    return this.add(0, 0, 0, 0, 0, count);
};

formatter.prototype.subSecond = function () {
    return this.subSeconds(1);
};

formatter.prototype.subSeconds = function (count) {
    return this.add(0, 0, 0, 0, 0, -count);
};

formatter.prototype.addMinute = function () {
    return this.addMinutes(1);
};

formatter.prototype.addMinutes = function (count) {
    return this.add(0, 0, 0, 0, count, 0);
};

formatter.prototype.subMinute = function () {
    return this.subMinutes(1);
};

formatter.prototype.subMinutes = function (count) {
    return this.add(0, 0, 0, 0, -count, 0);
};

formatter.prototype.addHour = function () {
    return this.addHours(1);
};

formatter.prototype.addHours = function (count) {
    return this.add(0, 0, 0, count, 0, 0);
};

formatter.prototype.subHour = function () {
    return this.subHours(1);
};

formatter.prototype.subHours = function (count) {
    return this.add(0, 0, 0, -count, 0, 0);
};

formatter.prototype.addDay = function () {
    return this.addDays(1);
};

formatter.prototype.addDays = function (count) {
    return this.add(0, 0, count, 0, 0, 0);
};

formatter.prototype.subDay = function () {
    return this.subDays(1);
};

formatter.prototype.subDays = function (count) {
    return this.add(0, 0, -count, 0, 0, 0);
};

formatter.prototype.addWeek = function () {
    return this.addWeeks(1);
};

formatter.prototype.addWeeks = function (count) {
    return this.add(0, 0, 7 * count, 0, 0, 0);
};

formatter.prototype.subWeek = function () {
    return this.subWeeks(1);
};

formatter.prototype.subWeeks = function (count) {
    return this.add(0, 0, -7 * count, 0, 0, 0);
};

formatter.prototype.addMonth = function () {
    return this.addMonths(1);
};

formatter.prototype.addMonths = function (count) {
    return this.add(0, count, 0, 0, 0, 0);
};

formatter.prototype.subMonth = function () {
    return this.subMonths(1);
};

formatter.prototype.subMonths = function (count) {
    return this.add(0, -count, 0, 0, 0, 0);
};

formatter.prototype.addYear = function () {
    return this.addYears(1);
};

formatter.prototype.addYears = function (count) {
    return this.add(count, 0, 0, 0, 0, 0);
};

formatter.prototype.subYear = function () {
    return this.subYears(1);
};

formatter.prototype.subYears = function (count) {
    return this.add(-count, 0, 0, 0, 0, 0);
};

formatter.prototype.getDayOnFirstWeekInYear = function () {
    const date = new Date(this.year, 0, 1);
    const dateDay = date.getDay() || 0;

    if (dateDay === 1) {
        return 1;
    } else if (dateDay === 0) {
        return 2;
    }

    return 9 - dateDay;
};

formatter.prototype.add = function (years, months, days, hours, minutes, seconds) {
    const date = this.toDate();
    date.setFullYear(this.year + years);
    date.setMonth(this.month + months);
    date.setDate(this.day + days);
    date.setHours(this.hours + hours);
    date.setMinutes(this.minutes + minutes);
    date.setSeconds(this.seconds + seconds);

    this._set(date);

    return this;
};

formatter.createFromFormat = function (format, date) {
    const result = parser(format, date);
    return new formatter(
        result.year,
        result.month,
        result.day,
        result.hours,
        result.minutes,
        result.seconds,
        result.microseconds,
        result.timezone,
    );
};

formatter.prototype._set = function (
    year,
    month = undefined,
    day = undefined,
    hours = undefined,
    minutes = undefined,
    seconds = undefined,
    microseconds = undefined,
    timezone = undefined
) {
    if (typeof year === 'number' && typeof month === 'undefined') {
        let timestamp = year;
        let timestampAsString = `${timestamp}`;

        if (timestamp % 1 !== 0) {
            const fractionalLength = `${timestamp}`.split('.').reverse()[0].length;
            timestamp = timestamp * Math.pow(10, fractionalLength);
            timestampAsString = `${timestamp}`;
        }

        let date = null;
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

        date = new Date(timestamp);

        year = date.getUTCFullYear();
        month = date.getUTCMonth();
        day = date.getUTCDate();
        hours = date.getUTCHours();
        minutes = date.getUTCMinutes();
        seconds = date.getUTCSeconds();
        timezone = 'UTC';
    } else if (year instanceof Date) {
        const date = year;
        year = date.getFullYear();
        month = date.getMonth();
        day = date.getDate();
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        microseconds = date.getMilliseconds() * 1000;
        timezone = 'UTC';
    }

    this.year = year;
    this.month = month;
    this.day = day;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.microseconds = microseconds;
    this.timezone = timezone || 'UTC';
};

module.exports = formatter;
