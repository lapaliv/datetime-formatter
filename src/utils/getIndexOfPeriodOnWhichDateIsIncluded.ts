import {isNumber} from "./isNumber";

export function getIndexOfPeriodOnWhichDateIsIncluded(diffs: number, periods: Array<number> | Array<Array<number>>): number {
    let sumPeriods = 0;

    if (periods.length && Array.isArray(periods[0])) {
        periods = periods[0];
    }

    for (const day of periods as Array<number>) {
        if (isNumber(day)) {
            sumPeriods += day;
        }
    }

    let mod = diffs % sumPeriods;
    for (let index = 0; index < periods.length; index++) {
        if (isNumber(periods[index] as number)) {
            if (periods[index] > mod) {
                return index;
            } else {
                mod -= periods[index] as number;
            }
        }
    }

    throw new Error('Your periods are empty');
}
