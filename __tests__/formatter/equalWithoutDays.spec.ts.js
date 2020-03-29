import DateTimeFormatter from '@lapaliv/datetime-formatter';

it('equalWithoutDays with clone', () => {
    const formatter = new DateTimeFormatter(2020, 2, 18, 15, 1, 2);
    expect(formatter.equalWithoutDays(formatter.clone().subDay())).toBe(true);
});

it('not equalWithoutDays with clone', () => {
    const formatter = new DateTimeFormatter(2020, 2, 18, 15, 1, 2);
    const clone = formatter.clone().subMonth();

    expect(formatter.equalWithoutDays(clone)).toBe(false);
});

it('equalWithoutDays with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutDays('2006-05-05 04:05:05')).toBe(true);
});

it('not equalWithoutDays with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutDays('2006-06-04 03:02:01')).toBe(false);
});

it('equalWithoutDays with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutDays(new Date('2006-05-05 04:05:05'))).toBe(true);
});

it('not equalWithoutDays with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutDays(new Date('2006-06-05 03:02:01'))).toBe(false);
});
