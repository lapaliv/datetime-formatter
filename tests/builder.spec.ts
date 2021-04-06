import DateTimeFormatter from '@lapaliv/datetime-formatter';

describe('builder', () => {
    describe('d', () => {
        for (let day = 1; day <= 31; day++) {
            const result = `${day < 10 ? '0' : ''}${day}`;

            it(`2020-01-${result}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, day);
                expect(formatter.format('d')).toBe(result);
            });
        }
    });
    describe('D', () => {
        for (let day = 1; day <= 7; day++) {
            it(DateTimeFormatter.globalShortDayNames[day - 1], () => {
                const formatter = new DateTimeFormatter(2020, 6, day);
                expect(formatter.format('D')).toBe(
                    formatter.shortDayNames[day - 1]
                );
            });
        }

        it(`2018-06-13 23:35:47`, () => {
            const formatter = new DateTimeFormatter(2018, 6, 13, 23, 35, 47);
            expect(formatter.format('D')).toBe('Wed');
        });
    });
    describe('j', () => {
        for (let day = 1; day <= 31; day++) {
            it(`2020-01-${day < 10 ? '0' : ''}${day}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, day);
                expect(formatter.format('j')).toBe(`${day}`);
            });
        }
    });
    describe('l', () => {
        for (let day = 1; day <= 7; day++) {
            it(DateTimeFormatter.globalDayNames[day - 1], () => {
                const formatter = new DateTimeFormatter(2020, 6, day);
                expect(formatter.format('l')).toBe(
                    formatter.dayNames[day - 1]
                );
            });
        }
    });
    describe('N', () => {
        for (let day = 1; day <= 7; day++) {
            it(`${day}`, () => {
                const formatter = new DateTimeFormatter(2020, 6, day);
                expect(formatter.format('N')).toBe(`${day}`);
            });
        }
    });
    describe('S', () => {
        for (let day = 1; day <= 31; day++) {
            it(`${day}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, day);
                if ([1, 21, 31].includes(day)) {
                    expect(formatter.format('S')).toBe('st');
                } else if ([2, 22].includes(day)) {
                    expect(formatter.format('S')).toBe('nd');
                } else if ([3, 23].includes(day)) {
                    expect(formatter.format('S')).toBe('rd');
                } else {
                    expect(formatter.format('S')).toBe('th');
                }
            });
        }
    });
    describe('w', () => {
        for (let day = 1; day <= 7; day++) {
            it(`${day}`, () => {
                const formatter = new DateTimeFormatter(2020, 6, day);
                if (day === 7) {
                    expect(formatter.format('w')).toBe(`0`);
                } else {
                    expect(formatter.format('w')).toBe(`${day}`);
                }
            });
        }
    });
    describe('z', () => {
        for (let day = 0; day < 366; day++) {
            it(`${day}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1);
                formatter.addDays(day);
                expect(formatter.format('z')).toBe(`${day}`);
            });
        }
    });

    describe('W', () => {
        it(`2018-01-01`, () => {
            const formatter = new DateTimeFormatter(2018, 1, 1);
            expect(formatter.format('W')).toBe(`01`);
        });
        it(`2018-01-08`, () => {
            const formatter = new DateTimeFormatter(2018, 1, 8);
            expect(formatter.format('W')).toBe(`02`);
        });
        it(`2018-12-31`, () => {
            const formatter = new DateTimeFormatter(2018, 12, 31);
            expect(formatter.format('W')).toBe(`53`);
        });
        it(`2020-01-01`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 1);
            expect(formatter.format('W')).toBe(`01`);
        });
        it(`2020-01-06`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 6);
            expect(formatter.format('W')).toBe(`02`);
        });
        it(`2020-05-24`, () => {
            const formatter = new DateTimeFormatter(2020, 5, 24);
            expect(formatter.format('W')).toBe(`21`);
        });
        it(`2018-09-16`, () => {
            const formatter = new DateTimeFormatter(2018, 9, 16);
            expect(formatter.format('W')).toBe(`37`);
        });
        it(`1992-10-14`, () => {
            const formatter = new DateTimeFormatter(1992, 10, 14);
            expect(formatter.format('W')).toBe(`42`);
        });
        it(`2020-12-31`, () => {
            const formatter = new DateTimeFormatter(2020, 12, 31);
            expect(formatter.format('W')).toBe(`53`);
        });
        it(`2007-01-01`, () => {
            const formatter = new DateTimeFormatter(2007, 1, 1);
            expect(formatter.format('W')).toBe(`01`);
        });
        it(`2007-02-01`, () => {
            const formatter = new DateTimeFormatter(2007, 2, 1);
            expect(formatter.format('W')).toBe(`05`);
        });
    });

    describe('F', () => {
        for (let month = 1; month <= 12; month++) {
            it(`${month}`, () => {
                const formatter = new DateTimeFormatter(2020, month, 1);
                expect(formatter.format('F')).toBe(
                    formatter.monthNames[month - 1]
                );
            });
        }
    });

    describe('m', () => {
        for (let month = 1; month <= 12; month++) {
            it(`${month}`, () => {
                const formatter = new DateTimeFormatter(2020, month, 1);
                if (month < 10) {
                    expect(formatter.format('m')).toBe(`0${month}`);
                } else {
                    expect(formatter.format('m')).toBe(`${month}`);
                }
            });
        }
    });

    describe('M', () => {
        for (let month = 1; month <= 12; month++) {
            it(`${month}`, () => {
                const formatter = new DateTimeFormatter(2020, month, 1);
                expect(formatter.format('M')).toBe(
                    formatter.shortMonthNames[month - 1]
                );
            });
        }
    });

    describe('n', () => {
        for (let month = 1; month <= 12; month++) {
            it(`${month}`, () => {
                const formatter = new DateTimeFormatter(2020, month, 1);
                expect(formatter.format('n')).toBe(`${month}`);
            });
        }
    });

    describe('t', () => {
        for (let month = 1; month <= 12; month++) {
            it(`2020-${month < 10 ? 0 : ''}${month}-01`, () => {
                const formatter = new DateTimeFormatter(2020, month, 1);
                if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
                    expect(formatter.format('t')).toBe(`31`);
                } else if ([4, 6, 9, 11].includes(month)) {
                    expect(formatter.format('t')).toBe(`30`);
                } else if (month === 2) {
                    expect(formatter.format('t')).toBe(`29`);
                }
            });
        }

        it(`2019-02-01`, () => {
            const formatter = new DateTimeFormatter(2019, 2, 1);
            expect(formatter.format('t')).toBe(`28`);
        });
    });

    describe('L', () => {
        for (let year = 2000; year <= 3000; year++) {
            it(`${year}`, () => {
                const formatter = new DateTimeFormatter(year, 1, 1);
                expect(formatter.format('L')).toBe(formatter.isLeapYear() ? '1' : '0');
            });
        }
    });

    for (let format of ['o', 'Y']) {
        describe(format, () => {
            for (let year = 1; year <= 3000; year += Math.pow(10, String(year).length)) {
                it(`${year}`, () => {
                    const formatter = new DateTimeFormatter(year, 1, 1);
                    if (year < 10) {
                        expect(formatter.format(format)).toBe(`000${year}`);
                    } else if (year < 100) {
                        expect(formatter.format(format)).toBe(`00${year}`);
                    } else if (year < 1000) {
                        expect(formatter.format(format)).toBe(`0${year}`);
                    } else {
                        expect(formatter.format(format)).toBe(`${year}`);
                    }
                });
            }
        });
    }

    describe('y', () => {
        for (let year = 1; year <= 3000; year += Math.pow(10, String(year).length)) {
            it(`${year}`, () => {
                const formatter = new DateTimeFormatter(year, 1, 1);
                if (year < 10) {
                    expect(formatter.format('y')).toBe(`0${year}`);
                } else if (year < 100) {
                    expect(formatter.format('y')).toBe(`${year}`);
                } else {
                    expect(formatter.format('y')).toBe(`${year}`.slice(-2));
                }
            });
        }
    });

    describe('a', () => {
        for (let hour = 0; hour <= 23; hour++) {
            it(`${hour}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1, hour);
                expect(formatter.format('a')).toBe(hour < 12 ? 'am' : 'pm');
            });
        }
    });

    describe('A', () => {
        for (let hour = 0; hour <= 23; hour++) {
            it(`${hour}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1, hour);
                expect(formatter.format('A')).toBe(hour < 12 ? 'AM' : 'PM');
            });
        }
    });

    describe('B', () => {
        it(`000`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0);
            expect(formatter.format('B')).toBe('000');
        });
        it(`083`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 2, 0, 0);
            expect(formatter.format('B')).toBe('083');
        });
        it(`211`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 5, 5, 5);
            expect(formatter.format('B')).toBe('211');
        });
        it(`423`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 10, 10, 10);
            expect(formatter.format('B')).toBe('423');
        });
        it(`677`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 16, 16, 16);
            expect(formatter.format('B')).toBe('677');
        });
        it(`999`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 23, 59, 59);
            expect(formatter.format('B')).toBe('999');
        });
    });

    describe('g', () => {
        it('0', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 0);
            expect(formatter.format('g')).toBe('0');
        });
        it('3', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 3);
            expect(formatter.format('g')).toBe('3');
        });
        it('7', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 7);
            expect(formatter.format('g')).toBe('7');
        });
        it('12', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 12);
            expect(formatter.format('g')).toBe('12');
        });
        it('13', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 13);
            expect(formatter.format('g')).toBe('1');
        });
        it('14', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 14);
            expect(formatter.format('g')).toBe('2');
        });
        it('15', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 15);
            expect(formatter.format('g')).toBe('3');
        });
        it('20', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 20);
            expect(formatter.format('g')).toBe('8');
        });
        it('23', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 23);
            expect(formatter.format('g')).toBe('11');
        });
    });

    describe('G', () => {
        for (let hours = 0; hours <= 23; hours++) {
            it(`${hours}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1, hours);
                expect(formatter.format('G')).toBe(`${hours}`);
            });
        }
    });

    describe('h', () => {
        it('0', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 0);
            expect(formatter.format('h')).toBe('00');
        });
        it('3', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 3);
            expect(formatter.format('h')).toBe('03');
        });
        it('7', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 7);
            expect(formatter.format('h')).toBe('07');
        });
        it('12', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 12);
            expect(formatter.format('h')).toBe('12');
        });
        it('13', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 13);
            expect(formatter.format('h')).toBe('01');
        });
        it('14', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 14);
            expect(formatter.format('h')).toBe('02');
        });
        it('15', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 15);
            expect(formatter.format('h')).toBe('03');
        });
        it('20', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 20);
            expect(formatter.format('h')).toBe('08');
        });
        it('23', () => {
            const formatter = new DateTimeFormatter(2020, 1, 1, 23);
            expect(formatter.format('h')).toBe('11');
        });
    });

    describe('H', () => {
        for (let hours = 0; hours <= 23; hours++) {
            it(`${hours}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1, hours);
                expect(formatter.format('H')).toBe(`${hours < 10 ? 0 : ''}${hours}`);
            });
        }
    });

    describe('i', () => {
        for (let minutes = 0; minutes <= 59; minutes++) {
            it(`${minutes}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1, 0, minutes);
                expect(formatter.format('i')).toBe(`${minutes < 10 ? 0 : ''}${minutes}`);
            });
        }
    });

    describe('s', () => {
        for (let seconds = 0; seconds <= 59; seconds++) {
            it(`${seconds}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, seconds);
                expect(formatter.format('s')).toBe(`${seconds < 10 ? 0 : ''}${seconds}`);
            });
        }
    });

    describe('u', () => {
        for (let microseconds = 0; microseconds < Math.pow(10, 6); microseconds += Math.pow(10, `${microseconds}`.length) + 3) {
            it(`${microseconds}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, microseconds);
                let result = '0'.repeat(6 - `${microseconds}`.length) + microseconds;
                expect(formatter.format('u')).toBe(result);
            });
        }
    });

    describe('v', () => {
        for (let microseconds = 0; microseconds < Math.pow(10, 6); microseconds += Math.pow(10, `${microseconds}`.length) + 3) {
            it(`${microseconds}`, () => {
                const formatter = new DateTimeFormatter(2020, 1, 1, 0, 0, 0, microseconds);
                const milliseconds = formatter.getMilliseconds();
                let result = '0'.repeat(3 - `${milliseconds}`.length) + milliseconds;
                expect(formatter.format('v')).toBe(result);
            });
        }
    });

    describe('c', () => {
        it(`2020-01-02 03:04:05`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 2, 3, 4, 5);
            expect(formatter.format('c')).toBe('2020-01-02T03:04:05+00:00');
        });
        it(`2018-06-1 T23:35:47`, () => {
            const formatter = new DateTimeFormatter(2018, 6, 13, 23, 35, 47);
            expect(formatter.format('c')).toBe('2018-06-13T23:35:47+00:00');
        });
    });

    describe('r', () => {
        it(`2020-01-02 03:04:05`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 2, 3, 4, 5);
            expect(formatter.format('r')).toBe('Thu, 02 Jan 2020 03:04:05 +0000');
        });
        it(`2018-06-13 23:35:47`, () => {
            const formatter = new DateTimeFormatter(2018, 6, 13, 23, 35, 47);
            expect(formatter.format('r')).toBe('Wed, 13 Jun 2018 23:35:47 +0000');
        });
    });

    describe('U', () => {
        it(`2020-01-02 03:04:05`, () => {
            const formatter = new DateTimeFormatter(2020, 1, 2, 3, 4, 5);
            expect(formatter.format('U')).toBe('1577934245');
        });
        it(`2018-06-13 23:35:47`, () => {
            const formatter = new DateTimeFormatter(2018, 6, 13, 23, 35, 47);
            expect(formatter.format('U')).toBe('1528932947');
        });
    });
});
