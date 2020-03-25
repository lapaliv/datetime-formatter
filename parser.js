const parser = function (format, date) {
    this.year = null;
    this.month = null;
    this.day = null;
    this.hours = null;
    this.minutes = null;
    this.seconds = null;
    this.microseconds = null;
    this.timezone = null;
};

module.exports = parser;
