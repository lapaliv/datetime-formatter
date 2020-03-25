const {SHORT_DAYS, DAYS, MONTHS, SHORT_MONTHS} = require('./consts');

const builder = function (formatter) {
    this.formatter = formatter;
};

builder.prototype.to = function (format) {
    const symbols = format.match(/\\?./g);
    let result = '';

    for (const symbol of symbols) {
        if (typeof this[symbol] === 'function' && symbol.length === 1) {
            result += this[symbol]();
        } else {
            result += symbol;
        }
    }

    return result;
};

builder.prototype.toDate = function () {
    return new Date(
        this.formatter.year,
        this.formatter.month,
        this.formatter.day,
        this.formatter.hours,
        this.formatter.minutes,
        this.formatter.seconds,
    );
};

builder.prototype.getTimestamp = function () {
    const date = this.toDate();
    const timestamp = date.getTime();

    return timestamp - date.getTimezoneOffset() * 60000;
};

builder.prototype.d = function () {
    const day = this.formatter.day;
    return `0${day}`.slice(-2);
};

builder.prototype.D = function () {
    const date = this.toDate();

    return date.getDay()
        ? SHORT_DAYS[date.getDay() - 1]
        : SHORT_DAYS[SHORT_DAYS.length - 1];
};

builder.prototype.j = function () {
    return `${this.formatter.day}`;
};

builder.prototype.l = function () {
    const date = this.toDate();

    return date.getDay()
        ? DAYS[date.getDay() - 1]
        : DAYS[DAYS.length - 1];
};

builder.prototype.N = function () {
    const date = this.toDate();
    return date.getDay() ? date.getDay() : 7;
};

builder.prototype.S = function () {
    if (`${this.formatter.day}`.slice(-1) === '1' && `${this.formatter.day}`.slice(-2) !== '11') {
        return 'st';
    }

    if (`${this.formatter.day}`.slice(-1) === '2' && `${this.formatter.day}`.slice(-2) !== '12') {
        return 'nd';
    }

    if (`${this.formatter.day}`.slice(-1) === '3' && `${this.formatter.day}`.slice(-2) !== '13') {
        return 'rd';
    }

    return 'th';
};

builder.prototype.w = function () {
    return this.toDate().getDay();
};

builder.prototype.z = function () {
    let result = 0;
    for (let month = 0; month < this.formatter.month; month++) {
        result += this.formatter.getCountDaysInMonth();
    }

    return result + this.formatter.day - 1;
};

builder.prototype.W = function () {
    let days = 0;
    for (let month = 0; month < this.formatter.month; month++) {
        days += this.formatter.getCountDaysInMonth();
    }

    days += this.formatter.day - this.formatter.getDayOnFirstWeekInYear();

    return Math.ceil(days / 7);
};

builder.prototype.F = function () {
    return MONTHS[this.formatter.month];
};

builder.prototype.m = function () {
    const month = this.formatter.month + 1;
    return `0${month}`.slice(-2);
};

builder.prototype.M = function () {
    return SHORT_MONTHS[this.formatter.month];
};

builder.prototype.n = function () {
    return `${this.formatter.month + 1}`;
};

builder.prototype.t = function () {
    return this.formatter.getCountDaysInMonth();
};

builder.prototype.L = function () {
    return this.formatter.isLeapYear ? '1' : '0';
};

builder.prototype.o = function () {
    return this.Y();
};

builder.prototype.Y = function () {
    const abs = Math.abs(this.formatter.year);
    const result = `0000${abs}`.slice(-4);
    return (this.formatter.year < 0 ? '-' : '') + result;
};

builder.prototype.y = function () {
    return `00${this.formatter.year}`.slice(-2);
};

builder.prototype.a = function () {
    return this.formatter.hours < 12 ? 'am' : 'pm';
};

builder.prototype.A = function () {
    return this.a().toUpperCase();
};

builder.prototype.B = function () {
    const maxSeconds = 24 * 60 * 60 + 60 * 60 + 60;
    const actualSeconds = this.formatter.hours * 60 * 60 + this.formatter.minutes * 60 + this.formatter.seconds;
    const result = Math.floor(actualSeconds * 999 / maxSeconds);

    return `00${result}`.slice(-3);
};

builder.prototype.g = function () {
    return this.formatter.hours < 13
        ? `${this.formatter.hours}`
        : `${this.formatter.hours - 12}`;
};

builder.prototype.G = function () {
    return `${this.formatter.hours}`;
};

builder.prototype.h = function () {
    const result = parseInt(this.g());
    return `0${result}`.slice(-2);
};

builder.prototype.H = function () {
    return `0${this.formatter.hours}`.slice(-2);
};

builder.prototype.i = function () {
    return `0${this.formatter.minutes}`.slice(-2);
};

builder.prototype.s = function () {
    return `0${this.formatter.seconds}`.slice(-2);
};

builder.prototype.u = function () {
    return `000000${this.formatter.microseconds}`.slice(-6);
};

builder.prototype.v = function () {
    return `000${this.formatter.microseconds}`.slice(-6, 3);
};


builder.prototype.c = function () {
    return [
        [
            this.Y(),
            this.m(),
            this.d(),
        ].join('-'),
        'T',
        [
            this.H(),
            this.i(),
            this.s(),
        ].join(':'),
        '+00:00',
    ].join('');
};

builder.prototype.r = function () {
    return [
        this.D() + ',',
        this.d(),
        this.M(),
        this.Y(),
        [
            this.H(),
            this.i(),
            this.s(),
        ].join(':'),
        '+0000',
    ].join(' ');
};

builder.prototype.U = function () {
    return Math.floor(this.getTimestamp() / 1000);;
};

module.exports = builder;
