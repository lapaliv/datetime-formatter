import DateTimeFormatter from '@lapaliv/datetime-formatter';

it('equalWithoutSeconds with clone', () => {
    const formatter = new DateTimeFormatter();
    expect(formatter.equalWithoutSeconds(formatter.clone().subSecond())).toBe(true);
});

it('not equalWithoutSeconds with clone', () => {
    const formatter = new DateTimeFormatter();
    const clone = formatter.clone().subMinute();

    expect(formatter.equalWithoutSeconds(clone)).toBe(false);
});

it('equalWithoutSeconds with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutSeconds('2006-05-04 03:02:05')).toBe(true);
});

it('not equalWithoutSeconds with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutSeconds('2006-05-04 03:03:01')).toBe(false);
});

it('equalWithoutSeconds with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutSeconds(new Date('2006-05-04 03:02:05'))).toBe(true);
});

it('not equalWithoutSeconds with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutSeconds(new Date('2006-05-04 03:03:01'))).toBe(false);
});
