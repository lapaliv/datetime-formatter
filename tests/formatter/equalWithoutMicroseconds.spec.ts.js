import DateTimeFormatter from '@lapaliv/datetime-formatter';

it('equalWithoutMicroseconds with clone', () => {
    const formatter = new DateTimeFormatter();
    expect(formatter.equalWithoutMicroseconds(formatter.clone())).toBe(true);
});

it('not equalWithoutMicroseconds with clone', () => {
    const formatter = new DateTimeFormatter();
    const clone = formatter.clone().subSecond();

    expect(formatter.equalWithoutMicroseconds(clone)).toBe(false);
});

it('equalWithoutMicroseconds with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMicroseconds('2006-05-04 03:02:01')).toBe(true);
});

it('not equalWithoutMicroseconds with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMicroseconds('2006-05-04 03:02:02')).toBe(false);
});

it('equalWithoutMicroseconds with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMicroseconds(new Date('2006-05-04 03:02:01'))).toBe(true);
});

it('not equalWithoutMicroseconds with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMicroseconds(new Date('2006-05-04 03:02:02'))).toBe(false);
});
