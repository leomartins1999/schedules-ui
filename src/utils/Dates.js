export function getDatesBetween(start, end) {
    const res = [];

    const currDate = new Date(start);
    const endDate = new Date(end);

    while (currDate <= endDate) {
        res.push(new Date(currDate));
        currDate.setDate(currDate.getDate() + 1);
    }

    return res
        .map(d => d.toLocaleDateString('en-CA'));
}

export function getTimesBetween(start, end) {
    const res = [];

    const currHour = new Date("1970-01-01T" + start)
    const endHour = new Date("1970-01-01T" + end)

    while (currHour <= endHour) {
        res.push(new Date(currHour));
        currHour.setMinutes(currHour.getMinutes() + 30);
    }

    const hours = res
        .map(d => d.toLocaleTimeString())
        .map(str => str.substring(0, str.length))

    return hours;
}

export function removeSecondsFromTimeString(str) {
    return str.slice(0, -3);
}
