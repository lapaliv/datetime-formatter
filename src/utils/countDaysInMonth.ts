import {isLeapYear} from "./isLeapYear";

export function countDaysInMonth(year: number, month: number): number {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
