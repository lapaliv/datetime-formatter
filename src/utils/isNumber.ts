export function isNumber(value: string | number) {
    return Number(value).toString() === value.toString();
}
