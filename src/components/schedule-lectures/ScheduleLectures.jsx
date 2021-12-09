import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import { getDatesBetween, getTimesBetween, removeSecondsFromTimeString } from '../../utils/Dates';

function getHourPeriodForLectures(lectures) {
    const sortedTimes = lectures
        .flatMap((l) => [l.start_time, l.end_time])
        .sort();

    return {startTime: sortedTimes[0], endTime: sortedTimes.at(-1)}
}

function renderHeader(dates) {
    return dates.map((str, idx) => <th key={idx}>{str}</th>)
}

function renderRows(hours, dates, lectures) {
    const rows = [];

    for (let i = 0; i < hours.length - 1; i++) {
        const hourStart = hours[i];
        const hourEnd = hours[i + 1];
        const row = renderHourRow(hourStart, hourEnd, dates, lectures)
        rows.push(row);
    }

    return rows;
}

function renderHourRow(hourStart, hourEnd, dates, lectures) {
    return (
        <tr>
            {renderHour(hourStart, hourEnd)}
            {dates.map(d => renderSlot(hourStart, hourEnd, d, lectures))}
        </tr>
    )
}

function renderHour(hourStart, hourEnd) {
    return (
        <th>
            {removeSecondsFromTimeString(hourStart)}
            <br /> {removeSecondsFromTimeString(hourEnd)}
        </th>
    )
}

function renderSlot(hourStart, hourEnd, date, lectures) {
    const lecturesForSlot = lectures
        .filter(l => l.day === date)
        .filter(l => l.start_time < hourEnd && l.end_time > hourStart);

    if (lecturesForSlot.size === 0) return <th />
    else return (
        <th>
            {lecturesForSlot.map(l => renderLecture(l))}
        </th>
    );
}

function renderLecture(lecture) {
    return (
        <Badge className="m-1">
            {lecture.lecture}
            <br /> {lecture.room}
        </Badge>
    )
}

function ScheduleLectures({ startDate, endDate, lectures }) {
    const dates = getDatesBetween(startDate, endDate);
    const {startTime, endTime} = getHourPeriodForLectures(lectures)

    const hours = getTimesBetween(startTime, endTime);

    return (
        <Table className="text-center align-middle" bordered hover responsive>
            <thead>
                <tr>
                    <th>Hour</th>
                    {renderHeader(dates)}
                </tr>
            </thead>
            <tbody>
                {renderRows(hours, dates, lectures)}
            </tbody>
        </Table>
    )
}

export default ScheduleLectures;
