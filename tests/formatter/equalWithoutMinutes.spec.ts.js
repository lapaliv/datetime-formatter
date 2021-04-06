import DateTimeFormatter from '@lapaliv/datetime-formatter';

it('equalWithoutMinutes with clone', () => {
    const formatter = new DateTimeFormatter();
    expect(formatter.equalWithoutMinutes(formatter.clone().subMinute())).toBe(true);
});

it('not equalWithoutMinutes with clone', () => {
    const formatter = new DateTimeFormatter();
    const clone = formatter.clone().subHour();

    expect(formatter.equalWithoutMinutes(clone)).toBe(false);
});

it('equalWithoutMinutes with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMinutes('2006-05-04 03:05:05')).toBe(true);
});

it('not equalWithoutMinutes with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMinutes('2006-05-04 04:02:01')).toBe(false);
});

it('equalWithoutMinutes with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMinutes(new Date('2006-05-04 03:05:05'))).toBe(true);
});

it('not equalWithoutMinutes with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMinutes(new Date('2006-05-04 04:02:01'))).toBe(false);
});
