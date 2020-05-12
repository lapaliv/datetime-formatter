# DateTimeFormatter

![npm licence](https://img.shields.io/npm/l/@lapaliv/datetime-formatter)

## Import
```typescript
// ES6
import DateTimeFormatter from '@lapaliv/datetime-formatter';
// Node.js/ES5
var DateTimeFormatter = require('@lapaliv/datetime-formatter').default;
```

## API

### Constructors
```typescript
// Create an DateTimeFormatter with current datetime
new DateTimeFormatter()
new DateTimeFormatter(date: Date)
new DateTimeFormatter(timestamp: number)
new DateTimeFormatter(year: number, month: number, day: number, hours: number = 0, minutes: number = 0, seconds: number = 0, microseconds: number = 0)

// Create an DateTimeFormatter with current datetime
DateTimeFormatter.now(): DateTimeFormatter;
DateTimeFormatter.createFromFormat(format: string, date: string): DateTimeFormatter;
DateTimeFormatter.createFromDate(date: Date): DateTimeFormatter;
DateTimeFormatter.createFromTimestamp(timestamp: number): DateTimeFormatter;
// Parse date from the custom format
DateTimeFormatter.parse(format: string): DateTimeFormatter;
```

### Getters
```typescript
getMicroseconds(): number;
getMilliseconds(): number;
getSeconds(): number;
getMinutes(): number;
getHours(): number;
getDay(): number;
getMonth(): number;
getYear(): number;
```

### Setters
```typescript
setMicroseconds(value: number): DateTimeFormatter;
setMilliseconds(value: number): DateTimeFormatter;
setSeconds(value: number): DateTimeFormatter;
setMinutes(value: number): DateTimeFormatter;
setHours(value: number): DateTimeFormatter;
setDay(value: number): DateTimeFormatter;
setMonth(value: number): DateTimeFormatter;
setYear(value: number): DateTimeFormatter;
```

### Methods for change date manually
```typescript
addSecond(): DateTimeFormatter;
addSeconds(count: number): DateTimeFormatter;
addMinute(): DateTimeFormatter;
addMinutes(count: number): DateTimeFormatter;
addHour(): DateTimeFormatter;
addHours(count: number): DateTimeFormatter;
addDay(): DateTimeFormatter;
addDays(count: number): DateTimeFormatter;
addWeek(): DateTimeFormatter;
addWeeks(count: number): DateTimeFormatter;
addMonth(): DateTimeFormatter;
addMonths(count: number): DateTimeFormatter;
addYear(): DateTimeFormatter;
addYears(count: number): DateTimeFormatter;
addDecade(): DateTimeFormatter;
addDecades(count: number): DateTimeFormatter;
addCentury(): DateTimeFormatter;
addCenturies(count: number): DateTimeFormatter;

subSecond(): DateTimeFormatter;
subSeconds(count: number): DateTimeFormatter;
subMinute(): DateTimeFormatter;
subMinutes(count: number): DateTimeFormatter;
subHour(): DateTimeFormatter;
subHours(count: number): DateTimeFormatter;
subDay(): DateTimeFormatter;
subDays(count: number): DateTimeFormatter;
subWeek(): DateTimeFormatter;
subWeeks(count: number): DateTimeFormatter;
subMonth(): DateTimeFormatter;
subMonths(count: number): DateTimeFormatter;
subYear(): DateTimeFormatter;
subYears(count: number): DateTimeFormatter;
subDecade(): DateTimeFormatter;
subDecades(count: number): DateTimeFormatter;
subCentury(): DateTimeFormatter;
subCenturies(count: number): DateTimeFormatter;
```

### Methods for change date automatically
```typescript
startOfMinute(): DateTimeFormatter;
startOfHour(): DateTimeFormatter;
startOfDay(): DateTimeFormatter;
startOfWeek(): DateTimeFormatter;
startOfMonth(): DateTimeFormatter;
startOfHalfYear(): DateTimeFormatter;
startOfYear(): DateTimeFormatter;
startOfDecade(): DateTimeFormatter;
startOfCentury(): DateTimeFormatter;

endOfMinute(): DateTimeFormatter;
endOfHour(): DateTimeFormatter;
endOfDay(): DateTimeFormatter;
endOfWeek(): DateTimeFormatter;
endOfMonth(): DateTimeFormatter;
endOfHalfYear(): DateTimeFormatter;
endOfYear(): DateTimeFormatter;
endOfDecade(): DateTimeFormatter;
endOfCentury(): DateTimeFormatter;
```

### Methods for checks
```typescript
isFuture(): boolean;
isLeapYear(): boolean;
isPast(): boolean;
isNextMonth(): boolean;
isNextYear(): boolean;
isPrevMonth(): boolean;
isPrevYear(): boolean;
isToday(): boolean;
isTomorrow(): boolean;
isYesterday(): boolean;

isJanuary(): boolean;
isFebruary(): boolean;
isMarch(): boolean;
isApril(): boolean;
isMay(): boolean;
isJune(): boolean;
isJuly(): boolean;
isAugust(): boolean;
isSeptember(): boolean;
isOctober(): boolean;
isNovember(): boolean;
isDecember(): boolean;

isCurrentMicrosecond(): boolean;
isCurrentMillisecond(): boolean;
isCurrentSecond(): boolean;
isCurrentMinute(): boolean;
isCurrentHour(): boolean;
isCurrentDay(): boolean;
isCurrentMonth(): boolean;
isCurrentYear(): boolean;
isCurrentDecade(): boolean;
isCurrentCentury(): boolean;
```

### Methods for compare
```typescript
diffInMicroseconds(date: DateTimeFormatter): number;
diffInMilliseconds(date: DateTimeFormatter): number;
diffInSeconds(date: DateTimeFormatter): number;
diffInMinutes(date: DateTimeFormatter): number;
diffInHours(date: DateTimeFormatter): number;
diffInDays(date: DateTimeFormatter): number;
diffInMonths(date: DateTimeFormatter): number;
diffInYears(date: DateTimeFormatter): number;
diffInDecades(date: DateTimeFormatter): number;
diffInCenturies(date: DateTimeFormatter): number;

equal(date: DateTimeFormatter | Date | number | string): boolean;
// Compare year, month, day, hours, minutes, seconds and milliseconds
equalWithoutMicroseconds(date: DateTimeFormatter | Date | number | string): boolean;
// Compare year, month, day, hours, minutes and seconds
equalWithoutMilliseconds(target: DateTimeFormatter | number | Date): boolean;
// Compare year, month, day, hours and minutes
equalWithoutSeconds(date: DateTimeFormatter | Date | number | string): boolean;
// Compare year, month, day and hours
equalWithoutMinutes(date: DateTimeFormatter | Date | number | string): boolean;
// Compare year, month and day
equalWithoutHours(date: DateTimeFormatter | Date | number | string): boolean;
// Compare year and month
equalWithoutDays(date: DateTimeFormatter | Date | number | string): boolean;
// Compare years
equalWithoutMonths(date: DateTimeFormatter | Date | number | string): boolean;

notEqual(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutMicroseconds(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutMilliseconds(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutSeconds(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutMinutes(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutHours(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutDays(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutMonths(date: DateTimeFormatter | Date | number | string): boolean;
```

### Methods for convert
```typescript
format(format: string): string;
// An alternative for format('Y-m-d')
toDateString(): string;
// An alternative for format('Y-m-d H:i:s')
toDateTimeString(): string;
// Returns a Unix timestamp with milliseconds
toJsTimestamp(): number;
// Returns a Unix timestamp
toTimestamp(): number;
toDate(): Date;
```

### Translations
#### Global
```js
DateTimeFormatter.setGlobalTranslations({
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dateNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    shortDateNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
});
```
#### Local
```js
const formatter = new DateTimeFormatter();
formatter.setTranslations({
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dateNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    shortDateNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
});
```

### Other methods
```typescript
getFirstDayInYearOnFullWeek(): number;
getCountDaysInMonth(): number;
getDayOfWeek(): number;
getDayOfWeekIso(): number;
getDayOfYear(): number;
clone(): DateTimeFormatter;

// See below
getIndexOfMicrosecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...microseconds: Array<number> | Array<Array<number>>): number;
getIndexOfMillisecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...milliseconds: Array<number> | Array<Array<number>>): number;
getIndexOfSecondPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...seconds: Array<number> | Array<Array<number>>): number;
getIndexOfMinutePeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...minutes: Array<number> | Array<Array<number>>): number;
getIndexOfHourPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...hours: Array<number> | Array<Array<number>>): number;
getIndexOfDayPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...days: Array<number> | Array<Array<number>>): number;
getIndexOfMonthPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...months: Array<number> | Array<Array<number>>): number;
getIndexOfYearPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...years: Array<number> | Array<Array<number>>): number;
getIndexOfDecadePeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...decades: Array<number> | Array<Array<number>>): number;
getIndexOfCenturyPeriodOnWhichDateIsIncluded(startedFrom: DateTimeFormatter, ...centuries: Array<number> | Array<Array<number>>): number;
```
Please see the [doc](https://github.com/lapaliv/datetime-formatter/wiki/Methods-getIndexOf*PeriodOnWhichDateIsIncluded) about `getIndexOf*PeriodOnWhichDateIsIncluded` methods

## Format parameters

The following characters are recognized in the format parameter string.
The table was copied from [php.net](https://www.php.net/manual/en/function.date.php)

### Day
| Format character    | Description                                                                                                      | Example returned values                       |
|---------------------|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `d`                 | Day of the month, 2 digits with leading zeros                                                                    | `01` to `31`                                  |
| `D`                 | A textual representation of a day, three letters                                                                 | `Mon` through `Sun`                           |
| `j`                 | Day of the month without leading zeros                                                                           | `1` to `31`                                   |
| `l` (lowercase 'L') | A full textual representation of the day of the week                                                             | `Sunday` through `Saturday`                   |
| `N`                 | [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) numeric representation of the day of the week | `1` (for Monday) through `7` (for Sunday)     |
| `S`                 | English ordinal suffix for the day of the month, 2 characters                                                    | `st`, `nd`, `rd` or `th`. Works well with `j` |
| `w`                 | Numeric representation of the day of the week                                                                    | `0` (for Sunday) through `6` (for Saturday)   |
| `z`                 | The day of the year (starting from 0)                                                                            | `0` through `365`                             |

### Week
| Format character | Description                                                                                                      | Example returned values                             |
|------------------|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| `W`              | [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) week number of year, weeks starting on Monday | `42` (the 42nd week in the year). `00` through `52` |

### Month
| Format character | Description                                                        | Example returned values      |
|------------------|--------------------------------------------------------------------|------------------------------|
| `F`              | A full textual representation of a month, such as January or March | `January` through `December` |
| `m`              | Numeric representation of a month, with leading zeros              | `01` through `12`            |
| `M`              | A short textual representation of a month, three letters           | `Jan` through `Dec`          |
| `n`              | Numeric representation of a month, without leading zeros           | `1` through `12`             |
| `t`              | Number of days in the given month                                  | `28` through `31`            |


### Year
| Format character | Description                                                                                                                                                                                                                    | Example returned values |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| `L`              | Whether it's a leap year `1` if it is a leap year, `0` otherwise.                                                                                                                                                              |                         |
| `o`              | [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) week-numbering year. This has the same value as Y, except that if the ISO week number (`W`) belongs to the previous or next year, that year is used instead | `1999` or `2003`        |
| `Y`              | A full numeric representation of a year, 4 digits                                                                                                                                                                              | `1999` or `2003`        |
| `y`              | A two digit representation of a year                                                                                                                                                                                           | `99` or `03`            |

### Time
| Format character | Description                                     | Example returned values |
|------------------|-------------------------------------------------|-------------------------|
| `a`              | Lowercase Ante meridiem and Post meridiem       | `am` or `pm`            |
| `A`              | Uppercase Ante meridiem and Post meridiem       | `AM` or `PM`            |
| `B`              | Swatch Internet time                            | `000` through `999`     |
| `g`              | 12-hour format of an hour without leading zeros | `1` through `12`        |
| `G`              | 24-hour format of an hour without leading zeros | `0` through `23`        |
| `h`              | 12-hour format of an hour with leading zeros    | `01` through `12`       |
| `H`              | 24-hour format of an hour with leading zeros    | `00` through `23`       |
| `i`              | Minutes with leading zeros                      | `00` to `59`            |
| `s`              | Seconds with leading zeros                      | `00` through `59`       |
| `u`              | Microseconds                                    | `654321`                |
| `v`              | Milliseconds. Same note applies as for `u`.     | `654`                   |

### Full datetime
| Format character | Description                                                             | Example returned values           |
|------------------|-------------------------------------------------------------------------|-----------------------------------|
| `c`              | [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) date | `2004-02-12T15:19:21+00:00`       |
| `r`              | [RFC 2822](http://www.faqs.org/rfcs/rfc2822) formatted date             | `Thu, 21 Dec 2000 16:01:07 +0000` |
| `U`              | Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)              | `1585517413`                      |

## Tests
```shell script
yarn test
```
