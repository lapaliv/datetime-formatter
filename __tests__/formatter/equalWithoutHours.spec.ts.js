import DateTimeFormatter from '@lapaliv/datetime-formatter';

it('equalWithoutHours with clone', () => {
    const formatter = new DateTimeFormatter(2020, 2, 18, 15, 1, 2);
    expect(formatter.equalWithoutHours(formatter.clone().subHour())).toBe(true);
});

it('not equalWithoutHours with clone', () => {
    const formatter = new DateTimeFormatter(2020, 2, 18, 15, 1, 2);
    const clone = formatter.clone().subDay();

    expect(formatter.equalWithoutHours(clone)).toBe(false);
});

it('equalWithoutHours with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutHours('2006-05-04 04:05:05')).toBe(true);
});

it('not equalWithoutHours with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutHours('2006-05-05 03:02:01')).toBe(false);
});

it('equalWithoutHours with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutHours(new Date('2006-05-04 04:05:05'))).toBe(true);
});

it('not equalWithoutHours with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutHours(new Date('2006-05-05 03:02:01'))).toBe(false);
});
