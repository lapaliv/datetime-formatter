import DateTimeFormatter from '@lapaliv/datetime-formatter';

it('equal with clone', () => {
    const formatter = new DateTimeFormatter();
    expect(formatter.equal(formatter.clone())).toBe(true);
});

it('not equal with clone', () => {
    const formatter = new DateTimeFormatter();
    const clone = formatter.clone()
        .setMicroseconds(formatter.getMicroseconds() - 1);

    expect(formatter.equal(clone)).toBe(false);
});

it('equal with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1, 123000);
    expect(formatter.equal('2006-05-04 03:02:01.123000')).toBe(true);
});

it('not equal with string', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1, 345000);
    expect(formatter.equal('2006-05-04 03:02:01.34600')).toBe(false);
});

it('equal with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1, 111000);
    expect(formatter.equal(new Date('2006-05-04 03:02:01.111000'))).toBe(true);
});

it('not equal with date', () => {
    const formatter = new DateTimeFormatter(2006, 5, 4, 3, 2, 1, 222222);
    expect(formatter.equal(new Date('2006-05-04 03:02:01.222000'))).toBe(false);
});
