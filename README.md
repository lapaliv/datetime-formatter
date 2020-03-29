## API

### Constructors
```
// Create an DateTimeFormatter with current datetime
new DateTimeFormatter()
new DateTimeFormatter(date: Date)
new DateTimeFormatter(timestamp: number)
new DateTimeFormatter(year: number, month: number, day: number, hours: number = 0, minutes: number = 0, seconds: number = 0, microseconds: number = 0)

// Create an DateTimeFormatter with current datetime
DateTimeFormatter.now(): DateTimeFormatter;
DateTimeFormatter.createFromFormat(format: string, date: string): DateTimeFormatter;
// Parse date from the custom format
DateTimeFormatter.parse(format: string): DateTimeFormatter;
```

#### Getters
```
getMicroseconds(): number;
getMilliseconds(): number;
getSeconds(): number;
getMinutes(): number;
getHours(): number;
getDay(): number;
getMonth(): number;
getYear(): number;
```

#### Setters
```
setMicroseconds(value: number): DateTimeFormatter;
setSeconds(value: number): DateTimeFormatter;
setMinutes(value: number): DateTimeFormatter;
setHours(value: number): DateTimeFormatter;
setDay(value: number): DateTimeFormatter;
setMonth(value: number): DateTimeFormatter;
setYear(value: number): DateTimeFormatter;
```

#### Methods for change date manually
```
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
```

#### Methods for change date automatically
```
startOfMinute(): DateTimeFormatter;
startOfHour(): DateTimeFormatter;
startOfDay(): DateTimeFormatter;
startOfWeek(): DateTimeFormatter;
startOfMonth(): DateTimeFormatter;
startOfYear(): DateTimeFormatter;

endOfMinute(): DateTimeFormatter;
endOfHour(): DateTimeFormatter;
endOfDay(): DateTimeFormatter;
endOfWeek(): DateTimeFormatter;
endOfMonth(): DateTimeFormatter;
endOfYear(): DateTimeFormatter;
```

#### Methods for checks
```
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
```

### Methods for compare
```
diffInDays(date: DateTimeFormatter): number;
diffInHours(date: DateTimeFormatter): number;
diffInMinutes(date: DateTimeFormatter): number;
diffInMonths(date: DateTimeFormatter): number;
diffInSeconds(date: DateTimeFormatter): number;
diffInYears(date: DateTimeFormatter): number;

equal(date: DateTimeFormatter | Date | number | string): boolean;
// compare year, month, day, hours, minutes and seconds
equalWithoutMicroseconds(date: DateTimeFormatter | Date | number | string): boolean;
// compare year, month, day, hours and minutes
equalWithoutSeconds(date: DateTimeFormatter | Date | number | string): boolean;
// compare year, month, day and hours
equalWithoutMinutes(date: DateTimeFormatter | Date | number | string): boolean;
// compare year, month and day
equalWithoutHours(date: DateTimeFormatter | Date | number | string): boolean;
// compare year and month
equalWithoutDays(date: DateTimeFormatter | Date | number | string): boolean;
// compare years
equalWithoutMonths(date: DateTimeFormatter | Date | number | string): boolean;

notEqual(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutMicroseconds(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutSeconds(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutMinutes(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutHours(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutDays(date: DateTimeFormatter | Date | number | string): boolean;
notEqualWithoutMonths(date: DateTimeFormatter | Date | number | string): boolean;
```

### Methods for convert
```
format(format: string): string;
// An alternative for format('Y-m-d')
toDateString(): string;
// An alternative for format('Y-m-d H:i:s')
toDateTimeString(): string;
// Returns a unix timestamp with milliseconds
toJsTimestamp(): number;
// Returns a unix timestamp
toTimestamp(): number;
toDate(): Date;
```

### Translations
##### Global
```js
DateTimeFormatter.setGlobalTranslations({
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dateNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    shortDateNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
});
```
##### Local
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
```
getFirstDayInYearOnFullWeek:() number;
getCountDaysInMonth:() number;
getDayOfWeek:() number;
getDayOfWeekIso:() number;
getDayOfYear:() number;
clone(): DateTimeFormatter;
```
