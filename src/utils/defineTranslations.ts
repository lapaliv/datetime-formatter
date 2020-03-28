import {Translation} from "../types/Translation";
import {DateTimeFormatter} from "../DateTimeFormatter";

export function defineTranslations(payload: Translation): {
    monthNames: string[];
    shortMonthNames: string[];
    dayNames: string[];
    shortDayNames: string[];
} {
    let result = {
        monthNames: DateTimeFormatter.globalMonthNames,
        shortMonthNames: DateTimeFormatter.globalShortMonthNames,
        dayNames: DateTimeFormatter.globalDayNames,
        shortDayNames: DateTimeFormatter.globalShortMonthNames,
    };

    if (payload.hasOwnProperty('monthNames') && Array.isArray(payload.monthNames) && payload.monthNames.length === 12) {
        result.monthNames = payload.monthNames;

        if (!payload.hasOwnProperty('shortMonthNames') || !Array.isArray(payload.shortMonthNames) || payload.shortMonthNames.length !== 12) {
            result.shortMonthNames = [];
            for (const month of payload.monthNames) {
                result.shortMonthNames.push(month.slice(0, 3));
            }
        }
    }

    if (payload.hasOwnProperty('shortMonthNames') && Array.isArray(payload.shortMonthNames) && payload.shortMonthNames.length === 12) {
        result.shortMonthNames = payload.shortMonthNames;
    }

    if (payload.hasOwnProperty('dayNames') && Array.isArray(payload.dayNames) && payload.dayNames.length === 12) {
        result.dayNames = payload.dayNames;

        if (!payload.hasOwnProperty('shortDayNames') || !Array.isArray(payload.shortDayNames) || payload.shortDayNames.length !== 12) {
            result.shortDayNames = [];
            for (const day of payload.dayNames) {
                result.shortDayNames.push(day.slice(0, 3));
            }
        }
    }

    if (payload.hasOwnProperty('shortDayNames') && Array.isArray(payload.shortDayNames) && payload.shortDayNames.length === 12) {
        result.shortDayNames = payload.shortDayNames;
    }

    return result;
}
