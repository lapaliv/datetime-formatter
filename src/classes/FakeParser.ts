import {Parser} from "./Parser";

export default class FakeParser extends Parser {
    public year: number | null = null;
    public month: number | null = null;
    public day: number | null = null;
    public hours: number | null = null;
    public minutes: number | null = null;
    public seconds: number | null = null;
    public microseconds: number | null = null;
    public offset: number | null = null;
    public dayOfWeek: number | null = null;
    public dayOfYear: number | null = null;
    public weekOfYear: number | null = null;
    public leap: boolean | null = null;
    public am: boolean | null = null;
    public internetTime: number | null = null;
    public divideHours: number | null = null;
    public suffix: string | null = null;
    public daysInMonth: number | null = null;

    public parseSymbol(symbol: string) {
        super.parseSymbol(symbol);
    }

    public defineDay() {
        super.defineDay();
    }

    public defineTimeByInternetTime() {
        super.defineTimeByInternetTime();
    }
}
