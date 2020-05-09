export function convertSecondsToTime(allSeconds: number): ConvertSecondsToTime {
    const hours = Math.floor(allSeconds / 60 / 60);
    const hourSeconds = hours * 60 * 60;
    const minutes = Math.floor((allSeconds - hourSeconds) / 60);
    const minuteSeconds = minutes * 60;
    const seconds = allSeconds - hourSeconds - minuteSeconds;

    return {hours, minutes, seconds};
}

type ConvertSecondsToTime = {
    hours: number;
    minutes: number;
    seconds: number;
};
