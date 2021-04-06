import DateTimeFormatter from '@lapaliv/datetime-formatter';

it('equalWithoutMonths with clone', () => {
    const formatter = new DateTimeFormatter();
    expect(formatter.equalWithoutMonths(formatter.clone().subMonth())).toBe(true);
});

it('not equalWithoutMonths with clone', () => {
    const formatter = new DateTimeFormatter();
    const clone = formatter.clone().subYear();

    expect(formatter.equalWithoutMonths(clone)).toBe(false);
});

it('equalWithoutMonths with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMonths('2006-06-05 04:05:05')).toBe(true);
});

it('not equalWithoutMonths with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMonths('2007-05-04 03:02:01')).toBe(false);
});

it('equalWithoutMonths with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMonths(new Date('2006-06-05 04:05:05'))).toBe(true);
});

it('not equalWithoutMonths with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1);
    expect(formatter.equalWithoutMonths(new Date('2007-05-04 03:02:01'))).toBe(false);
});
