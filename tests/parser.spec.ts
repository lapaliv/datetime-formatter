import DateTimeFormatter from '@lapaliv/datetime-formatter';

describe('parser', () => {
    describe('d', () => {
        it('01', () => {
            const formatter = DateTimeFormatter.createFromFormat('d', '01');
            expect(formatter.getDay()).toBe(1);
        });
        it('09', () => {
            const formatter = DateTimeFormatter.createFromFormat('d', '09');
            expect(formatter.getDay()).toBe(9);
        });
        it('15', () => {
            const formatter = DateTimeFormatter.createFromFormat('d', '15');
            expect(formatter.getDay()).toBe(15);
        });
        it('31', () => {
            const formatter = DateTimeFormatter.createFromFormat('d', '31');
            expect(formatter.getDay()).toBe(31);
        });
    });

    describe('D', () => {
        for (let index = 0; index < 7; index++) {
            const shortDateName = DateTimeFormatter.globalShortDayNames[index];
            it(`2018-01-${shortDateName}-01`, () => {
                const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2018-01-${shortDateName}-01`);
                expect(formatter.getYear()).toBe(2018);
                expect(formatter.getMonth()).toBe(1);
                expect(formatter.getDay()).toBe(index + 1);
            });
        }

        it(`2018-02-${DateTimeFormatter.globalShortDayNames[3]}-05`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2018-02-${DateTimeFormatter.globalShortDayNames[3]}-05`);
            expect(formatter.getYear()).toBe(2018);
            expect(formatter.getMonth()).toBe(2);
            expect(formatter.getDay()).toBe(1);
        });

        it(`2018-02-${DateTimeFormatter.globalShortDayNames[4]}-05`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2018-02-${DateTimeFormatter.globalShortDayNames[4]}-05`);
            expect(formatter.getYear()).toBe(2018);
            expect(formatter.getMonth()).toBe(2);
            expect(formatter.getDay()).toBe(2);
        });

        it(`2018-02-${DateTimeFormatter.globalShortDayNames[5]}-05`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2018-02-${DateTimeFormatter.globalShortDayNames[5]}-05`);
            expect(formatter.getYear()).toBe(2018);
            expect(formatter.getMonth()).toBe(2);
            expect(formatter.getDay()).toBe(3);
        });

        it(`2018-02-${DateTimeFormatter.globalShortDayNames[6]}-05`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2018-02-${DateTimeFormatter.globalShortDayNames[6]}-05`);
            expect(formatter.getYear()).toBe(2018);
            expect(formatter.getMonth()).toBe(2);
            expect(formatter.getDay()).toBe(4);
        });

        it(`2018-02-${DateTimeFormatter.globalShortDayNames[0]}-06`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2018-02-${DateTimeFormatter.globalShortDayNames[0]}-06`);
            expect(formatter.getYear()).toBe(2018);
            expect(formatter.getMonth()).toBe(2);
            expect(formatter.getDay()).toBe(5);
        });

        for (let index = 0; index < 7; index++) {
            const shortDateName = DateTimeFormatter.globalShortDayNames[index];
            it(`2019-12-${shortDateName}-50`, () => {
                const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2019-12-${shortDateName}-50`);
                expect(formatter.getYear()).toBe(2019);
                expect(formatter.getMonth()).toBe(12);
                expect(formatter.getDay()).toBe(index + 9);
            });
        }

        it(`2020-06-${DateTimeFormatter.globalShortDayNames[0]}-23`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2020-06-${DateTimeFormatter.globalShortDayNames[0]}-23`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(6);
            expect(formatter.getDay()).toBe(1);
        });

        it(`2020-06-${DateTimeFormatter.globalShortDayNames[0]}-24`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2020-06-${DateTimeFormatter.globalShortDayNames[0]}-24`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(6);
            expect(formatter.getDay()).toBe(8);
        });

        it(`2020-02-${DateTimeFormatter.globalShortDayNames[4]}-09`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2020-02-${DateTimeFormatter.globalShortDayNames[4]}-09`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(2);
            expect(formatter.getDay()).toBe(28);
        });

        it(`2020-02-${DateTimeFormatter.globalShortDayNames[5]}-09`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2020-02-${DateTimeFormatter.globalShortDayNames[5]}-09`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(2);
            expect(formatter.getDay()).toBe(29);
        });

        it(`2020-02-${DateTimeFormatter.globalShortDayNames[6]}-09`, () => {
            try {
                const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2020-02-${DateTimeFormatter.globalShortDayNames[6]}-09`);
                expect(true).toBe(false);
            } catch (e) {
                expect(true).toBe(true);
            }
        });

        it(`2020-03-${DateTimeFormatter.globalShortDayNames[6]}-09`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-D-W', `2020-03-${DateTimeFormatter.globalShortDayNames[6]}-09`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(3);
            expect(formatter.getDay()).toBe(1);
        });
    });

    describe('j', () => {
        for (let index = 1; index <= 31; index++) {
            it(String(index), () => {
                const formatter = DateTimeFormatter.createFromFormat('Y-m-j', `2019-09-${index}`);
                expect(formatter.getYear()).toBe(2019);
                expect(formatter.getMonth()).toBe(9);
                expect(formatter.getDay()).toBe(index);
            });
        }
    });

    describe('l', () => {
        for (let index = 0; index < 7; index++) {
            const dateName = DateTimeFormatter.globalDayNames[index];
            it(`2020-06-${dateName}`, () => {
                const formatter = DateTimeFormatter.createFromFormat('Y-m-l', `2020-06-${dateName}`);
                expect(formatter.getYear()).toBe(2020);
                expect(formatter.getMonth()).toBe(6);
                expect(formatter.getDay()).toBe(index + 1);
            });
        }

        it(`2020-05-${DateTimeFormatter.globalDayNames[0]}`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-l', `2020-05-${DateTimeFormatter.globalDayNames[0]}`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(5);
            expect(formatter.getDay()).toBe(4);
        });

        it(`2020-05-${DateTimeFormatter.globalDayNames[1]}`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-l', `2020-05-${DateTimeFormatter.globalDayNames[1]}`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(5);
            expect(formatter.getDay()).toBe(5);
        });

        it(`2020-05-${DateTimeFormatter.globalDayNames[4]}`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-l', `2020-05-${DateTimeFormatter.globalDayNames[4]}`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(5);
            expect(formatter.getDay()).toBe(1);
        });

        it(`2020-05-${DateTimeFormatter.globalDayNames[5]}`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-l', `2020-05-${DateTimeFormatter.globalDayNames[5]}`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(5);
            expect(formatter.getDay()).toBe(2);
        });

        it(`2020-04-30 (Monday)`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-d (Т)', `2020-04-30 (Monday)`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(4);
            expect(formatter.getDay()).toBe(30);
        });
    });

    describe('N', () => {
        for (let index = 1; index <= 7; index++) {
            it(`2020-06-0${index}`, () => {
                const formatter = DateTimeFormatter.createFromFormat('Y-m-N', `2020-06-${index}`);
                expect(formatter.getYear()).toBe(2020);
                expect(formatter.getMonth()).toBe(6);
                expect(formatter.getDay()).toBe(index);
            });
        }

        it(`2020-05 (1)`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m (N)', `2020-05 (1)`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(5);
            expect(formatter.getDay()).toBe(4);
        });

        it(`2020-05 (5)`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m (N)', `2020-05 (5)`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(5);
            expect(formatter.getDay()).toBe(1);
        });

        it(`2020-06 (1)`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m (N)', `2020-06 (1)`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(6);
            expect(formatter.getDay()).toBe(1);
        });

        it(`2020-03-24 (1)`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-d (N)', `2020-03-24 (1)`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(3);
            expect(formatter.getDay()).toBe(24);
        });
    });

    describe('S', () => {
        for (let index = 1; index <= 7; index++) {
            let suffix = 'th';

            if (index === 1) {
                suffix = 'st';
            } else if (index === 2) {
                suffix = 'nd';
            } else if (index === 3) {
                suffix = 'rd';
            }

            it(`2021-02-${suffix}`, () => {
                const formatter = DateTimeFormatter.createFromFormat('Y-m-S', `2021-02-${suffix}`);
                expect(formatter.getYear()).toBe(2021);
                expect(formatter.getMonth()).toBe(2);
                expect(formatter.getDay()).toBe([1, 2, 3].includes(index) ? index : 4);
            });
        }

        for (let index = 1; index <= 7; index++) {
            let suffix = 'th';

            if (index === 1) {
                suffix = 'st';
            } else if (index === 2) {
                suffix = 'nd';
            } else if (index === 3) {
                suffix = 'rd';
            }

            it(`2020-09-${suffix}`, () => {
                const formatter = DateTimeFormatter.createFromFormat('Y-m-S', `2020-09-${suffix}`);
                expect(formatter.getYear()).toBe(2020);
                expect(formatter.getMonth()).toBe(9);
                expect(formatter.getDay()).toBe([1, 2, 3].includes(index) ? index : 4);
            });
        }

        it(`2020-10-18 (st)`, () => {
            const formatter = DateTimeFormatter.createFromFormat('Y-m-d (S)', `2020-10-18 (st)`);
            expect(formatter.getYear()).toBe(2020);
            expect(formatter.getMonth()).toBe(10);
            expect(formatter.getDay()).toBe(18);
        });
    });
});
