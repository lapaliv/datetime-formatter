import DateTimeFormatter from '@lapaliv/datetime-formatter';

it('parse correct date', () => {
    const formatter = DateTimeFormatter.parse(
        new Date(2020, 4, 6, 7, 8, 9, 345)
    );
    expect(formatter.getYear()).toBe(2020);
    expect(formatter.getMonth()).toBe(5);
    expect(formatter.getDay()).toBe(6);
    expect(formatter.getHours()).toBe(7);
    expect(formatter.getMinutes()).toBe(8);
    expect(formatter.getSeconds()).toBe(9);
    expect(formatter.getMicroseconds()).toBe(345000);
});

it('parse correct date in string', () => {
    const formatter = DateTimeFormatter.parse('2020-01-03 04:05:06.123');
    expect(formatter.getYear()).toBe(2020);
    expect(formatter.getMonth()).toBe(1);
    expect(formatter.getDay()).toBe(3);
    expect(formatter.getHours()).toBe(4);
    expect(formatter.getMinutes()).toBe(5);
    expect(formatter.getSeconds()).toBe(6);
    expect(formatter.getMicroseconds()).toBe(123000);
});

it('parse not correct date in string', () => {
    try {
        const formatter = DateTimeFormatter.parse('2020-13-03 04:05:06.123');
        expect(false).toBe(true);
    } catch (e) {
        expect(true).toBe(true);
    }
});

it('parse timestamp', () => {
    const formatter = DateTimeFormatter.parse(1585517413);
    expect(formatter.getYear()).toBe(2020);
    expect(formatter.getMonth()).toBe(3);
    expect(formatter.getDay()).toBe(29);
    expect(formatter.getHours()).toBe(21);
    expect(formatter.getMinutes()).toBe(30);
    expect(formatter.getSeconds()).toBe(13);
    expect(formatter.getMicroseconds()).toBe(0);
});
