import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
  it('2020-01-01 vs 2020-02-01', () => {
    const date1 = new DateTimeFormatter(2020, 1, 1);
    const date2 = new DateTimeFormatter(2020, 2, 1);

    expect(date1.lessThanOrEqualTo(date2)).toBe(true);
  });

  it('2020-01-01 00:00:00 vs 2020-01-01 00:00:01', () => {
    const date1 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0);
    const date2 = new DateTimeFormatter(2020, 1, 1, 0, 0, 1);

    expect(date1.lessThanOrEqualTo(date2)).toBe(true);
  });

  it('2020-01-01 00:00:00 vs 2020-01-01 00:00:00', () => {
    const date1 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0);
    const date2 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0);

    expect(date1.lessThanOrEqualTo(date2)).toBe(true);
  });

  it('2020-01-01 00:00:00.123456 vs 2020-01-01 00:00:00.123457', () => {
    const date1 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 123456);
    const date2 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 123457);

    expect(date1.lessThanOrEqualTo(date2)).toBe(true);
  });

  it('2020-01-01 00:00:00.123456 vs 2020-01-01 00:00:00.123456', () => {
    const date1 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 123456);
    const date2 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 123456);

    expect(date1.lessThanOrEqualTo(date2)).toBe(true);
  });

  it('2020-02-01 vs 2020-01-01', () => {
    const date1 = new DateTimeFormatter(2020, 2, 1);
    const date2 = new DateTimeFormatter(2020, 1, 1);

    expect(date1.lessThanOrEqualTo(date2)).toBe(false);
  });

  it('2020-01-01 00:00:01 vs 2020-01-01 00:00:00', () => {
    const date1 = new DateTimeFormatter(2020, 1, 1, 0, 0, 1);
    const date2 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0);

    expect(date1.lessThanOrEqualTo(date2)).toBe(false);
  });

  it('2020-01-01 00:00:00.123457 vs 2020-01-01 00:00:00.123456', () => {
    const date1 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 123457);
    const date2 = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, 123456);

    expect(date1.lessThanOrEqualTo(date2)).toBe(false);
  });
});
