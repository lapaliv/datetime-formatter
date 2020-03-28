import DateTimeFormatter from '../dist';

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
            it(DateTimeFormatter.SHORT_DAYS[day - 1], () => {
                const formatter = new DateTimeFormatter(2020, 6, day);
                expect(formatter.format('D')).toBe(
                    DateTimeFormatter.SHORT_DAYS[day - 1]
                );
            });
        }

        it(`2018-06-13 23:35:47`, () => {
            const formatter = new DateTimeFormatter(2018, 6, 13);
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
            it(DateTimeFormatter.DAYS[day - 1], () => {
                const formatter = new DateTimeFormatter(2020, 6, day);
                expect(formatter.format('l')).toBe(
                    DateTimeFormatter.DAYS[day - 1]
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
                    DateTimeFormatter.MONTHS[month - 1]
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
                    DateTimeFormatter.SHORT_MONTHS[month - 1]
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
        const leapYears = [
            2428, 2432, 2436, 2440, 2444, 2448, 2452, 2456, 2460, 2464, 2468, 2472, 2476, 2480, 2484, 2488, 2492, 2496,
            2504, 2508, 2512, 2516, 2520, 2524, 2528, 2532, 2536, 2540, 2544, 2548, 2552, 2556, 2560, 2564, 2568, 2572,
            2576, 2580, 2584, 2588, 2592, 2596, 2604, 2608, 2612, 2616, 2620, 2624, 2628, 2632, 2636, 2640, 2644, 2648,
            2652, 2656, 2660, 2664, 2668, 2672, 2676, 2680, 2684, 2688, 2692, 2696, 2704, 2708, 2712, 2716, 2720, 2724,
            2728, 2732, 2736, 2740, 2744, 2748, 2752, 2756, 2760, 2764, 2768, 2772, 2776, 2780, 2784, 2788, 2792, 2796,
            2800, 2804, 2808, 2812, 2816, 2820, 2824, 2828, 2832, 2836, 2840, 2844, 2848, 2852, 2856, 2860, 2864, 2868,
            2872, 2876, 2880, 2884, 2888, 2892, 2896, 2904, 2908, 2912, 2916, 2920, 2924, 2928, 2932, 2936, 2940, 2944,
            2948, 2952, 2956, 2960, 2964, 2968, 2972, 2976, 2980, 2984, 2988, 2992, 2996,
        ];
        for (let year = 2427; year <= 3000; year++) {
            it(`${year}`, () => {
                const formatter = new DateTimeFormatter(year, 1, 1);
                expect(formatter.format('L')).toBe(leapYears.includes(year) ? '1' : '0');
            });
        }
    });

    for (let format of ['o', 'Y']) {
        describe(format, () => {
            for (let year = 1; year <= 3000; year++) {
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
        for (let year = 1; year <= 3000; year++) {
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
