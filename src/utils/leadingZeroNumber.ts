export function leadingZeroNumber(number: number, countChars: number = 2): string {
    return ('0'.repeat(countChars) + number.toString()).slice(countChars * -1);
}
