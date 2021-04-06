import {DateTimeFormatter} from "../../src/DateTimeFormatter";

describe('correct', () => {
  it('default', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    expect(date.getPreciseTimestamp()).toEqual(1577934245123456);
  });
  it('6', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    expect(date.getPreciseTimestamp(6)).toEqual(1577934245123456);
  });
  it('5', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    expect(date.getPreciseTimestamp(5)).toEqual(157793424512345);
  });
  it('4', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    expect(date.getPreciseTimestamp(4)).toEqual(15779342451234);
  });
  it('3', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    expect(date.getPreciseTimestamp(3)).toEqual(1577934245123);
  });
  it('2', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    expect(date.getPreciseTimestamp(2)).toEqual(157793424512);
  });
  it('1', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    expect(date.getPreciseTimestamp(1)).toEqual(15779342451);
  });
  it('0', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    expect(date.getPreciseTimestamp(0)).toEqual(1577934245);
  });
});

describe('not correct', () => {
  it('7', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    try {
      expect(date.getPreciseTimestamp(7)).toBe(false);
    } catch (e) {
      expect(true).toBe(true);
    }
  });
  it('-1', () => {
    const date = new DateTimeFormatter(2020, 1, 2, 3, 4, 5, 123456);
    try {
      expect(date.getPreciseTimestamp(-1)).toBe(false);
    } catch (e) {
      expect(true).toBe(true);
    }
  });
});
