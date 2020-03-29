import DateTimeFormatter from 'datetime-formatter';

const uuidv4 = require('uuid').v4;

describe('formatter', () => {
    describe('constructor', () => {
        const now = new Date();
        const timestamps = [
            ['timestamp', 0, 1970, 0, 1, 0, 0, 0, 0],
            ['timestamp', 1588547699, 2020, 4, 3, 23, 14, 59, 0],
            ['timestamp', 1588547699.123, 2020, 4, 3, 23, 14, 59, 123000],
            ['timestamp', 1588547699.123456, 2020, 4, 3, 23, 14, 59, 123456],
            ['timestamp', 1588547699123, 2020, 4, 3, 23, 14, 59, 123000],
            ['timestamp', 1588547699123456, 2020, 4, 3, 23, 14, 59, 123456],
            [
                'timestamp',
                Math.floor(now.getTime() / 1000),
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate(),
                now.getUTCHours(),
                now.getUTCMinutes(),
                now.getUTCSeconds(),
                0,
            ],
            [
                'date',
                new Date(1992, 4, 2, 13, 56, 23, 123),
                1992, 4, 2, 13, 56, 23, 123000,
            ],
            [
                'date',
                new Date(2008, 11, 19, 18, 3, 59, 44),
                2008, 11, 19, 18, 3, 59, 44000,
            ],
        ];

        for (const value of timestamps) {
            it(`${value[0]} ${value[2]}-${value[3]}-${value[4]} ${value[5]}:${value[6]}:${value[8]}`, () => {
                const target = new DateTimeFormatter(value[1] as Date);
                expect(target.year).toBe(value[2]);
                expect(target.month).toBe(value[3]);
                expect(target.day).toBe(value[4]);
                expect(target.hours).toBe(value[5]);
                expect(target.minutes).toBe(value[6]);
                expect(target.seconds).toBe(value[7]);
                expect(target.microseconds).toBe(value[8]);
            });
        }

        const raws = [
            [
                1998, 1, 2, 3, 4, 5, 6,
                1998, 1, 2, 3, 4, 5, 6,
            ],
            [
                1998, 10, 12, 13, 14, 15, 16,
                1998, 10, 12, 13, 14, 15, 16,
            ],
        ];

        for (const value of raws) {
            let [year, month, day, hours, minutes, seconds, microseconds, targetYear, targetMonth, targetDay, targetHours, targetMinutes, targetSeconds, targetMicroseconds] = value;
            it(`raw ${targetYear}-${targetMonth}-${targetDay} ${targetHours}:${targetMinutes}:${targetSeconds}`, () => {
                const target = new DateTimeFormatter(year, month, day, hours, minutes, seconds, microseconds);
                expect(target.year).toBe(targetYear);
                expect(target.month).toBe(targetMonth - 1);
                expect(target.day).toBe(targetDay);
                expect(target.hours).toBe(targetHours);
                expect(target.minutes).toBe(targetMinutes);
                expect(target.seconds).toBe(targetSeconds);
                expect(target.microseconds).toBe(targetMicroseconds);
            });
        }
    });

    describe('format', () => {
        it('Y-m-d H:i:s', () => {
            const target = new DateTimeFormatter(1588547699);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-05-03 23:14:59');
        });
        it('U', () => {
            const target = new DateTimeFormatter(1588547699);
            expect(target.format('U')).toEqual('1588547699');
        });
        it('d/m/y H:i:s.u', () => {
            const target = new DateTimeFormatter(1588547699123456);
            expect(target.format('d/m/y H:i:s.u')).toEqual('03/05/20 23:14:59.123456');
        });
    });

    describe('toDateTimeString', () => {
        it('2020-05-03 23:14:59', () => {
            const target = new DateTimeFormatter(1588547699);
            expect(target.toDateTimeString()).toEqual('2020-05-03 23:14:59');
        });
        it('2008-11-09 07:03:12', () => {
            const target = new DateTimeFormatter(1226214192);
            expect(target.toDateTimeString()).toEqual('2008-11-09 07:03:12');
        });
    });

    describe('toDateString', () => {
        it('2020-05-03', () => {
            const target = new DateTimeFormatter(1588547699);
            expect(target.toDateString()).toEqual('2020-05-03');
        });
        it('2008-11-09', () => {
            const target = new DateTimeFormatter(1226214192);
            expect(target.toDateString()).toEqual('2008-11-09');
        });
    });

    describe('toTimestamp', () => {
        it('1588547699', () => {
            const target = new DateTimeFormatter(1588547699);
            expect(target.toTimestamp()).toEqual(1588547699);
        });
        it('1226214192', () => {
            const target = new DateTimeFormatter(1226214192);
            expect(target.toTimestamp()).toEqual(1226214192);
        });
    });

    describe('toDate', () => {
        it('1588547699001', () => {
            const target = new DateTimeFormatter(1588547699001);
            expect(target.toDate()).toEqual(new Date(Date.UTC(2020, 4, 3, 23, 14, 59, 1)));
        });

        it('1226214192000000', () => {
            const target = new DateTimeFormatter(1226214192000000);
            expect(target.toDate()).toEqual(new Date(Date.UTC(2008, 10, 9, 7, 3, 12, 0)));
        });
    });

    describe('isLeapYear', () => {
        const leapYears = [
            4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 104, 108, 112,
            116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 204,
            208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 256, 260, 264, 268, 272, 276, 280, 284, 288, 292,
            296, 304, 308, 312, 316, 320, 324, 328, 332, 336, 340, 344, 348, 352, 356, 360, 364, 368, 372, 376, 380, 384,
            388, 392, 396, 400, 404, 408, 412, 416, 420, 424, 428, 432, 436, 440, 444, 448, 452, 456, 460, 464, 468, 472,
            476, 480, 484, 488, 492, 496, 504, 508, 512, 516, 520, 524, 528, 532, 536, 540, 544, 548, 552, 556, 560, 564,
            568, 572, 576, 580, 584, 588, 592, 596, 604, 608, 612, 616, 620, 624, 628, 632, 636, 640, 644, 648, 652, 656,
            660, 664, 668, 672, 676, 680, 684, 688, 692, 696, 704, 708, 712, 716, 720, 724, 728, 732, 736, 740, 744, 748,
            752, 756, 760, 764, 768, 772, 776, 780, 784, 788, 792, 796, 800, 804, 808, 812, 816, 820, 824, 828, 832, 836,
            840, 844, 848, 852, 856, 860, 864, 868, 872, 876, 880, 884, 888, 892, 896, 904, 908, 912, 916, 920, 924, 928,
            932, 936, 940, 944, 948, 952, 956, 960, 964, 968, 972, 976, 980, 984, 988, 992, 996, 1004, 1008, 1012, 1016,
            1020, 1024, 1028, 1032, 1036, 1040, 1044, 1048, 1052, 1056, 1060, 1064, 1068, 1072, 1076, 1080, 1084, 1088,
            1092, 1096, 1104, 1108, 1112, 1116, 1120, 1124, 1128, 1132, 1136, 1140, 1144, 1148, 1152, 1156, 1160, 1164,
            1168, 1172, 1176, 1180, 1184, 1188, 1192, 1196, 1200, 1204, 1208, 1212, 1216, 1220, 1224, 1228, 1232, 1236,
            1240, 1244, 1248, 1252, 1256, 1260, 1264, 1268, 1272, 1276, 1280, 1284, 1288, 1292, 1296, 1304, 1308, 1312,
            1316, 1320, 1324, 1328, 1332, 1336, 1340, 1344, 1348, 1352, 1356, 1360, 1364, 1368, 1372, 1376, 1380, 1384,
            1388, 1392, 1396, 1404, 1408, 1412, 1416, 1420, 1424, 1428, 1432, 1436, 1440, 1444, 1448, 1452, 1456, 1460,
            1464, 1468, 1472, 1476, 1480, 1484, 1488, 1492, 1496, 1504, 1508, 1512, 1516, 1520, 1524, 1528, 1532, 1536,
            1540, 1544, 1548, 1552, 1556, 1560, 1564, 1568, 1572, 1576, 1580, 1584, 1588, 1592, 1596, 1600, 1604, 1608,
            1612, 1616, 1620, 1624, 1628, 1632, 1636, 1640, 1644, 1648, 1652, 1656, 1660, 1664, 1668, 1672, 1676, 1680,
            1684, 1688, 1692, 1696, 1704, 1708, 1712, 1716, 1720, 1724, 1728, 1732, 1736, 1740, 1744, 1748, 1752, 1756,
            1760, 1764, 1768, 1772, 1776, 1780, 1784, 1788, 1792, 1796, 1804, 1808, 1812, 1816, 1820, 1824, 1828, 1832,
            1836, 1840, 1844, 1848, 1852, 1856, 1860, 1864, 1868, 1872, 1876, 1880, 1884, 1888, 1892, 1896, 1904, 1908,
            1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980,
            1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048, 2052,
            2056, 2060, 2064, 2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096, 2104, 2108, 2112, 2116, 2120, 2124, 2128,
            2132, 2136, 2140, 2144, 2148, 2152, 2156, 2160, 2164, 2168, 2172, 2176, 2180, 2184, 2188, 2192, 2196, 2204,
            2208, 2212, 2216, 2220, 2224, 2228, 2232, 2236, 2240, 2244, 2248, 2252, 2256, 2260, 2264, 2268, 2272, 2276,
            2280, 2284, 2288, 2292, 2296, 2304, 2308, 2312, 2316, 2320, 2324, 2328, 2332, 2336, 2340, 2344, 2348, 2352,
            2356, 2360, 2364, 2368, 2372, 2376, 2380, 2384, 2388, 2392, 2396, 2400, 2404, 2408, 2412, 2416, 2420, 2424,
            2428, 2432, 2436, 2440, 2444, 2448, 2452, 2456, 2460, 2464, 2468, 2472, 2476, 2480, 2484, 2488, 2492, 2496,
            2504, 2508, 2512, 2516, 2520, 2524, 2528, 2532, 2536, 2540, 2544, 2548, 2552, 2556, 2560, 2564, 2568, 2572,
            2576, 2580, 2584, 2588, 2592, 2596, 2604, 2608, 2612, 2616, 2620, 2624, 2628, 2632, 2636, 2640, 2644, 2648,
            2652, 2656, 2660, 2664, 2668, 2672, 2676, 2680, 2684, 2688, 2692, 2696, 2704, 2708, 2712, 2716, 2720, 2724,
            2728, 2732, 2736, 2740, 2744, 2748, 2752, 2756, 2760, 2764, 2768, 2772, 2776, 2780, 2784, 2788, 2792, 2796,
            2800, 2804, 2808, 2812, 2816, 2820, 2824, 2828, 2832, 2836, 2840, 2844, 2848, 2852, 2856, 2860, 2864, 2868,
            2872, 2876, 2880, 2884, 2888, 2892, 2896, 2904, 2908, 2912, 2916, 2920, 2924, 2928, 2932, 2936, 2940, 2944,
            2948, 2952, 2956, 2960, 2964, 2968, 2972, 2976, 2980, 2984, 2988, 2992, 2996,
        ];

        for (let year = 1; year <= 3000; year++) {
            it(`${year}`, () => {
                const date = new Date(year, 0, 1, 0, 0, 0);
                const target = new DateTimeFormatter(date as Date);
                expect(target.isLeapYear()).toEqual(leapYears.includes(year));
            });
        }
    });

    describe('getCountDaysInMonth', () => {
        it('2019-02 (28)', () => {
            const date = new Date(2019, 1, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(28);
        });
        it('1776-02 (29)', () => {
            const date = new Date(1776, 1, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(29);
        });
        it('2020-01 (31)', () => {
            const date = new Date(2020, 0, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(31);
        });
        it('2020-03 (31)', () => {
            const date = new Date(2020, 2, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(31);
        });
        it('2020-04 (30)', () => {
            const date = new Date(2020, 3, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(30);
        });
        it('2020-05 (31)', () => {
            const date = new Date(2020, 4, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(31);
        });
        it('2020-06 (30)', () => {
            const date = new Date(2020, 5, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(30);
        });
        it('2020-07 (31)', () => {
            const date = new Date(2020, 6, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(31);
        });
        it('2020-08 (31)', () => {
            const date = new Date(2020, 7, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(31);
        });
        it('2020-09 (30)', () => {
            const date = new Date(2020, 8, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(30);
        });
        it('2020-10 (31)', () => {
            const date = new Date(2020, 9, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(31);
        });
        it('2020-11 (30)', () => {
            const date = new Date(2020, 10, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(30);
        });
        it('2020-12 (31)', () => {
            const date = new Date(2020, 11, 1);
            const target = new DateTimeFormatter(date as Date);
            expect(target.getCountDaysInMonth()).toEqual(31);
        });
    });

    describe('addSecond', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.addSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:01');
        });

        it('next minute', () => {
            const date = new Date(2020, 0, 1, 0, 0, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:01:00');
        });

        it('next hour', () => {
            const date = new Date(2020, 0, 1, 0, 59, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 01:00:00');
        });

        it('next day', () => {
            const date = new Date(2020, 0, 1, 23, 59, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-02 00:00:00');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31, 23, 59, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-01 00:00:00');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23, 59, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-01 00:00:00');
        });
    });

    describe('addSeconds', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.addSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:05');
        });

        it('next minute', () => {
            const date = new Date(2020, 0, 1, 0, 0, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:01:04');
        });

        it('next hour', () => {
            const date = new Date(2020, 0, 1, 0, 59, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 01:00:04');
        });

        it('next day', () => {
            const date = new Date(2020, 0, 1, 23, 59, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-02 00:00:04');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31, 23, 59, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-01 00:00:04');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23, 59, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-01 00:00:04');
        });
    });

    describe('subSecond', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0, 0, 1);
            const target = new DateTimeFormatter(date as Date);
            target.subSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:00');
        });

        it('prev minute', () => {
            const date = new Date(2020, 0, 1, 0, 1, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:59');
        });

        it('prev hour', () => {
            const date = new Date(2020, 0, 1, 1, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:59:59');
        });

        it('prev day', () => {
            const date = new Date(2020, 0, 2, 0, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 23:59:59');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1, 0, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-31 23:59:59');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSecond();
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-31 23:59:59');
        });
    });

    describe('subSeconds', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0, 0, 5);
            const target = new DateTimeFormatter(date as Date);
            target.subSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:00');
        });

        it('prev minute', () => {
            const date = new Date(2020, 0, 1, 0, 1, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:55');
        });

        it('prev hour', () => {
            const date = new Date(2020, 0, 1, 1, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:59:55');
        });

        it('prev day', () => {
            const date = new Date(2020, 0, 2, 0, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 23:59:55');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1, 0, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-31 23:59:55');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subSeconds(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-31 23:59:55');
        });
    });

    describe('addMinute', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.addMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:01:00');
        });

        it('next hour', () => {
            const date = new Date(2020, 0, 1, 0, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 01:00:00');
        });

        it('next day', () => {
            const date = new Date(2020, 0, 1, 23, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-02 00:00:00');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31, 23, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-01 00:00:00');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-01 00:00:00');
        });
    });

    describe('addMinutes', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.addMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:05:00');
        });

        it('next hour', () => {
            const date = new Date(2020, 0, 1, 0, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 01:04:00');
        });

        it('next day', () => {
            const date = new Date(2020, 0, 1, 23, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-02 00:04:00');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31, 23, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-01 00:04:00');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23, 59);
            const target = new DateTimeFormatter(date as Date);
            target.addMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-01 00:04:00');
        });
    });

    describe('subMinute', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0, 1);
            const target = new DateTimeFormatter(date as Date);
            target.subMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:00');
        });

        it('prev hour', () => {
            const date = new Date(2020, 0, 1, 1, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:59:00');
        });

        it('prev day', () => {
            const date = new Date(2020, 0, 2, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 23:59:00');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-31 23:59:00');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subMinute();
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-31 23:59:00');
        });
    });

    describe('subMinutes', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0, 5);
            const target = new DateTimeFormatter(date as Date);
            target.subMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:00');
        });

        it('prev hour', () => {
            const date = new Date(2020, 0, 1, 1, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:55:00');
        });

        it('prev day', () => {
            const date = new Date(2020, 0, 2, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 23:55:00');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-31 23:55:00');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subMinutes(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-31 23:55:00');
        });
    });

    describe('addHour', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0);
            const target = new DateTimeFormatter(date as Date);
            target.addHour();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 01:00:00');
        });

        it('next day', () => {
            const date = new Date(2020, 0, 1, 23);
            const target = new DateTimeFormatter(date as Date);
            target.addHour();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-02 00:00:00');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31, 23);
            const target = new DateTimeFormatter(date as Date);
            target.addHour();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-01 00:00:00');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23);
            const target = new DateTimeFormatter(date as Date);
            target.addHour();
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-01 00:00:00');
        });
    });

    describe('addHours', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 0);
            const target = new DateTimeFormatter(date as Date);
            target.addHours(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 05:00:00');
        });

        it('next day', () => {
            const date = new Date(2020, 0, 1, 23);
            const target = new DateTimeFormatter(date as Date);
            target.addHours(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-02 04:00:00');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31, 23);
            const target = new DateTimeFormatter(date as Date);
            target.addHours(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-01 04:00:00');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23);
            const target = new DateTimeFormatter(date as Date);
            target.addHours(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-01 04:00:00');
        });
    });

    describe('subHour', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 1);
            const target = new DateTimeFormatter(date as Date);
            target.subHour();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:00');
        });

        it('prev day', () => {
            const date = new Date(2020, 0, 2, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subHour();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 23:00:00');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subHour();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-31 23:00:00');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0);
            const target = new DateTimeFormatter(date as Date);
            target.subHour();
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-31 23:00:00');
        });
    });

    describe('subHours', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 5, 1, 2);
            const target = new DateTimeFormatter(date as Date);
            target.subHours(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:01:02');
        });

        it('prev day', () => {
            const date = new Date(2020, 0, 2, 0, 10, 11);
            const target = new DateTimeFormatter(date as Date);
            target.subHours(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 19:10:11');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1, 0, 25, 26);
            const target = new DateTimeFormatter(date as Date);
            target.subHours(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-31 19:25:26');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0, 48, 37);
            const target = new DateTimeFormatter(date as Date);
            target.subHours(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-31 19:48:37');
        });
    });

    describe('addDay', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 1, 2, 3);
            const target = new DateTimeFormatter(date as Date);
            target.addDay();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-02 01:02:03');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31, 12, 13, 14);
            const target = new DateTimeFormatter(date as Date);
            target.addDay();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-01 12:13:14');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23, 9, 10);
            const target = new DateTimeFormatter(date as Date);
            target.addDay();
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-01 23:09:10');
        });
    });

    describe('addDays', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 3, 26, 9);
            const target = new DateTimeFormatter(date as Date);
            target.addDays(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-06 03:26:09');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31);
            const target = new DateTimeFormatter(date as Date);
            target.addDays(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-05 00:00:00');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31);
            const target = new DateTimeFormatter(date as Date);
            target.addDays(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-05 00:00:00');
        });
    });

    describe('subDay', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 2);
            const target = new DateTimeFormatter(date as Date);
            target.subDay();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:00');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1);
            const target = new DateTimeFormatter(date as Date);
            target.subDay();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-31 00:00:00');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1);
            const target = new DateTimeFormatter(date as Date);
            target.subDay();
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-31 00:00:00');
        });
    });

    describe('subDays', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 6, 5, 1, 2);
            const target = new DateTimeFormatter(date as Date);
            target.subDays(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 05:01:02');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1, 0, 25, 26);
            const target = new DateTimeFormatter(date as Date);
            target.subDays(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-27 00:25:26');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0, 48, 37);
            const target = new DateTimeFormatter(date as Date);
            target.subDays(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-27 00:48:37');
        });
    });

    describe('addWeek', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 1, 2, 3);
            const target = new DateTimeFormatter(date as Date);
            target.addWeek();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-08 01:02:03');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31, 12, 13, 14);
            const target = new DateTimeFormatter(date as Date);
            target.addWeek();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-07 12:13:14');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23, 9, 10);
            const target = new DateTimeFormatter(date as Date);
            target.addWeek();
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-07 23:09:10');
        });
    });

    describe('addWeeks', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 3, 26, 9);
            const target = new DateTimeFormatter(date as Date);
            target.addWeeks(2);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-15 03:26:09');
        });

        it('next month', () => {
            const date = new Date(2020, 0, 31);
            const target = new DateTimeFormatter(date as Date);
            target.addWeeks(2);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-14 00:00:00');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31);
            const target = new DateTimeFormatter(date as Date);
            target.addWeeks(2);
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-14 00:00:00');
        });
    });

    describe('subWeek', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 8);
            const target = new DateTimeFormatter(date as Date);
            target.subWeek();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 00:00:00');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1);
            const target = new DateTimeFormatter(date as Date);
            target.subWeek();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-25 00:00:00');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1);
            const target = new DateTimeFormatter(date as Date);
            target.subWeek();
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-25 00:00:00');
        });
    });

    describe('subWeeks', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 15, 5, 1, 2);
            const target = new DateTimeFormatter(date as Date);
            target.subWeeks(2);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-01 05:01:02');
        });

        it('prev month', () => {
            const date = new Date(2020, 1, 1, 0, 25, 26);
            const target = new DateTimeFormatter(date as Date);
            target.subWeeks(2);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-18 00:25:26');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0, 48, 37);
            const target = new DateTimeFormatter(date as Date);
            target.subWeeks(2);
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-18 00:48:37');
        });
    });

    describe('addMonth', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 1, 2, 3);
            const target = new DateTimeFormatter(date as Date);
            target.addMonth();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-02-01 01:02:03');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31, 23, 9, 10);
            const target = new DateTimeFormatter(date as Date);
            target.addMonth();
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-31 23:09:10');
        });
    });

    describe('addMonths', () => {
        it('basic', () => {
            const date = new Date(2020, 0, 1, 3, 26, 9);
            const target = new DateTimeFormatter(date as Date);
            target.addMonths(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-06-01 03:26:09');
        });

        it('next year', () => {
            const date = new Date(2020, 11, 31);
            const target = new DateTimeFormatter(date as Date);
            target.addMonths(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2021-05-31 00:00:00');
        });
    });

    describe('subMonth', () => {
        it('basic', () => {
            const date = new Date(2020, 1, 2);
            const target = new DateTimeFormatter(date as Date);
            target.subMonth();
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-02 00:00:00');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1);
            const target = new DateTimeFormatter(date as Date);
            target.subMonth();
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-12-01 00:00:00');
        });
    });

    describe('subMonths', () => {
        it('basic', () => {
            const date = new Date(2020, 5, 6, 5, 1, 2);
            const target = new DateTimeFormatter(date as Date);
            target.subMonths(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2020-01-06 05:01:02');
        });

        it('prev year', () => {
            const date = new Date(2020, 0, 1, 0, 48, 37);
            const target = new DateTimeFormatter(date as Date);
            target.subMonths(5);
            expect(target.format('Y-m-d H:i:s')).toEqual('2019-08-01 00:48:37');
        });
    });

    it('addYear', () => {
        const date = new Date(2020, 0, 1, 1, 2, 3);
        const target = new DateTimeFormatter(date as Date);
        target.addYear();
        expect(target.format('Y-m-d H:i:s')).toEqual('2021-01-01 01:02:03');
    });

    it('addYears', () => {
        const date = new Date(2020, 0, 1, 3, 26, 9);
        const target = new DateTimeFormatter(date as Date);
        target.addYears(5);
        expect(target.format('Y-m-d H:i:s')).toEqual('2025-01-01 03:26:09');
    });

    it('subYear', () => {
        const date = new Date(2020, 1, 2);
        const target = new DateTimeFormatter(date as Date);
        target.subYear();
        expect(target.format('Y-m-d H:i:s')).toEqual('2019-02-02 00:00:00');
    });

    it('subYears', () => {
        const date = new Date(2020, 5, 6, 5, 1, 2);
        const target = new DateTimeFormatter(date as Date);
        target.subYears(5);
        expect(target.format('Y-m-d H:i:s')).toEqual('2015-06-06 05:01:02');
    });

    describe('createFromFormat', () => {
        it('2020-01-02 03:04:05', () => {
            const target = DateTimeFormatter.createFromFormat('Y-m-d H:i:s', '2020-01-02 03:04:05');
            expect(target.year).toEqual(2020);
            expect(target.month).toEqual(0);
            expect(target.day).toEqual(2);
            expect(target.hours).toEqual(3);
            expect(target.minutes).toEqual(4);
            expect(target.seconds).toEqual(5);
            expect(target.microseconds).toEqual(0);
        });

        it('02/03/20', () => {
            const target = DateTimeFormatter.createFromFormat('d/m/y', '02/03/20');
            expect(target.year).toEqual(2020);
            expect(target.month).toEqual(2);
            expect(target.day).toEqual(2);
            expect(target.hours).toEqual(0);
            expect(target.minutes).toEqual(0);
            expect(target.seconds).toEqual(0);
            expect(target.microseconds).toEqual(0);
        });
    });

    it('full setTranslations', () => {
        const formatter = new DateTimeFormatter(2018, 1, 1);
        const translations = {
            monthNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
            shortMonthNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
            dayNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
            shortDayNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
        };
        formatter.setTranslations(translations);

        expect(formatter.monthNames).toEqual(translations.monthNames);
        expect(formatter.shortMonthNames).toEqual(translations.shortMonthNames);
        expect(formatter.dayNames).toEqual(translations.dayNames);
        expect(formatter.shortDayNames).toEqual(translations.shortDayNames);

        for (let index = 0; index < 7; index++) {
            expect(formatter.clone().addDays(index).format('D')).toBe(translations.shortDayNames[index]);
        }

        for (let index = 0; index < 7; index++) {
            expect(formatter.clone().addDays(index).format('l')).toBe(translations.dayNames[index]);
        }

        for (let index = 0; index < 12; index++) {
            expect(formatter.clone().addMonths(index).format('F')).toBe(translations.monthNames[index]);
        }

        for (let index = 0; index < 12; index++) {
            expect(formatter.clone().addMonths(index).format('M')).toBe(translations.shortMonthNames[index]);
        }
    });

    it('partially setTranslations', () => {
        const formatter = new DateTimeFormatter(2018, 1, 1);
        const translations = {
            monthNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
            dayNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
        };
        formatter.setTranslations(translations);

        expect(formatter.monthNames).toEqual(translations.monthNames);
        expect(formatter.dayNames).toEqual(translations.dayNames);

        for (let index = 0; index < 7; index++) {
            expect(formatter.clone().addDays(index).format('D'))
                .toBe(translations.dayNames[index].slice(0, 3));
        }

        for (let index = 0; index < 7; index++) {
            expect(formatter.clone().addDays(index).format('l'))
                .toBe(translations.dayNames[index]);
        }

        for (let index = 0; index < 12; index++) {
            expect(formatter.clone().addMonths(index).format('F'))
                .toBe(translations.monthNames[index]);
        }

        for (let index = 0; index < 12; index++) {
            expect(formatter.clone().addMonths(index).format('M'))
                .toBe(translations.monthNames[index].slice(0, 3));
        }
    });

    it('full global setTranslations', () => {
        const translations = {
            monthNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
            shortMonthNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
            dayNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
            shortDayNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
        };
        DateTimeFormatter.setGlobalTranslations(translations);
        const formatter = new DateTimeFormatter(2018, 1, 1);

        expect(formatter.monthNames).toEqual(translations.monthNames);
        expect(formatter.shortMonthNames).toEqual(translations.shortMonthNames);
        expect(formatter.dayNames).toEqual(translations.dayNames);
        expect(formatter.shortDayNames).toEqual(translations.shortDayNames);

        for (let index = 0; index < 7; index++) {
            expect(formatter.clone().addDays(index).format('D')).toBe(translations.shortDayNames[index]);
        }

        for (let index = 0; index < 7; index++) {
            expect(formatter.clone().addDays(index).format('l')).toBe(translations.dayNames[index]);
        }

        for (let index = 0; index < 12; index++) {
            expect(formatter.clone().addMonths(index).format('F')).toBe(translations.monthNames[index]);
        }

        for (let index = 0; index < 12; index++) {
            expect(formatter.clone().addMonths(index).format('M')).toBe(translations.shortMonthNames[index]);
        }
    });

    it('partially global setTranslations', () => {
        const translations = {
            monthNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
            dayNames: [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()],
        };
        DateTimeFormatter.setGlobalTranslations(translations);
        const formatter = new DateTimeFormatter(2018, 1, 1);

        expect(formatter.monthNames).toEqual(translations.monthNames);
        expect(formatter.dayNames).toEqual(translations.dayNames);

        for (let index = 0; index < 7; index++) {
            expect(formatter.clone().addDays(index).format('D'))
                .toBe(translations.dayNames[index].slice(0, 3));
        }

        for (let index = 0; index < 7; index++) {
            expect(formatter.clone().addDays(index).format('l'))
                .toBe(translations.dayNames[index]);
        }

        for (let index = 0; index < 12; index++) {
            expect(formatter.clone().addMonths(index).format('F'))
                .toBe(translations.monthNames[index]);
        }

        for (let index = 0; index < 12; index++) {
            expect(formatter.clone().addMonths(index).format('M'))
                .toBe(translations.monthNames[index].slice(0, 3));
        }
    });

    describe('startOfWeek', () => {
        for (let day = 23; day <= 29; day++) {
            it(`2020-03-${day < 10 ? 0 : ''}${day}`, () => {
                const formatter = new DateTimeFormatter(2020, 3, day);
                formatter.startOfWeek();
                expect(formatter.getYear()).toBe(2020);
                expect(formatter.getMonth()).toBe(3);
                expect(formatter.getDay()).toBe(23);
                expect(formatter.getHours()).toBe(0);
                expect(formatter.getMinutes()).toBe(0);
                expect(formatter.getSeconds()).toBe(0);
                expect(formatter.getMicroseconds()).toBe(0);
            });
        }
    });

    describe('endOfWeek', () => {
        for (let day = 23; day <= 29; day++) {
            it(`2020-03-${day < 10 ? 0 : ''}${day}`, () => {
                const formatter = new DateTimeFormatter(2020, 3, day);
                formatter.endOfWeek();
                expect(formatter.getYear()).toBe(2020);
                expect(formatter.getMonth()).toBe(3);
                expect(formatter.getDay()).toBe(29);
                expect(formatter.getHours()).toBe(23);
                expect(formatter.getMinutes()).toBe(59);
                expect(formatter.getSeconds()).toBe(59);
                expect(formatter.getMicroseconds()).toBe(999999);
            });
        }
    });
});
