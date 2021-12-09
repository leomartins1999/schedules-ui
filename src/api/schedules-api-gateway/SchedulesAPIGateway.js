import { readFile } from "../../utils/FileReader";

const SCHEDULES_PATH = process.env.REACT_APP_SCHEDULES_PATH;
const SCHEDULE_DETAILS_PATH = process.env.REACT_APP_SCHEDULE_PATH;
const SCHEDULE_CLASSES_PATH = process.env.REACT_APP_SCHEDULE_CLASSES_PATH;
const SCHEDULE_DATES_PATH = process.env.REACT_APP_SCHEDULE_DATES_PATH;
const SCHEDULE_LECTURES_PATH = process.env.REACT_APP_SCHEDULE_LECTURES_PATH
const SCHEDULE_SCORES_PATH = process.env.REACT_APP_SCHEDULE_SCORES_PATH

async function getSchedules() {
    const resp = await fetch(SCHEDULES_PATH);
    if (!resp.ok) throw Error("Error fetching schedules!");

    return await resp.json();
}

async function createSchedule(name, file) {
    const options = {
        method: "POST",
        body: await buildCreateScheduleBody(name, file),
        headers: buildRequestHeaders()
    }

    const resp = await fetch(SCHEDULES_PATH, options);
    if (!resp.ok) throw Error("Error creating schedule!")

    return await resp.json()
}

async function getScheduleDetails(scheduleId) {
    const url = injectURLParameters(SCHEDULE_DETAILS_PATH, { id: scheduleId })

    const resp = await fetch(url);
    if (!resp.ok) throw Error(`Error fetching schedule details for schedule ${scheduleId}!`);

    return await resp.json();
}

async function getScheduleClasses(scheduleId) {
    const url = injectURLParameters(SCHEDULE_CLASSES_PATH, { id: scheduleId })

    const resp = await fetch(url);
    if (!resp.ok) throw Error(`Error fetching schedule classes for schedule ${scheduleId}!`);

    return await resp.json();
}

async function getScheduleDates(scheduleId) {
    const url = injectURLParameters(SCHEDULE_DATES_PATH, { id: scheduleId })

    const resp = await fetch(url);
    if (!resp.ok) throw Error(`Error fetching schedule dates for schedule ${scheduleId}!`);

    return await resp.json();
}

async function getScheduleLectures(scheduleId, klass, startDate, endDate) {
    const url = injectURLParameters(
        SCHEDULE_LECTURES_PATH,
        { id: scheduleId },
        { klass: klass, start_date: startDate, end_date: endDate }
    )

    const resp = await fetch(url);
    if (!resp.ok) throw Error(`Error fetching schedule dates for schedule ${scheduleId}!`);

    return await resp.json();
}

async function getScheduleScores(scheduleId) {
    const url = injectURLParameters(SCHEDULE_SCORES_PATH, { id: scheduleId })

    const resp = await fetch(url);
    if (!resp.ok) throw Error(`Error fetching schedule dates for schedule ${scheduleId}!`);

    return await resp.json();
}

async function buildCreateScheduleBody(name, file) {
    return JSON.stringify(
        {
            name: name,
            format: file.name.split(".").at(-1).toUpperCase(),
            content: await readFile(file)
        }
    )
}

function buildRequestHeaders() {
    return {
        "Content-Type": "application/json"
    }
}

function injectURLParameters(requestUrl, pathParameters, queryParameters = null) {
    let url = requestUrl

    // path parameters
    for (const prop in pathParameters) url = url.replace(`:${prop}`, pathParameters[prop])

    // query parameters
    if (queryParameters != null) url = url + '?' + new URLSearchParams(queryParameters)

    return url
}

const SchedulesAPIGateway = {
    getSchedules,
    createSchedule,
    getScheduleDetails,
    getScheduleClasses,
    getScheduleDates,
    getScheduleLectures,
    getScheduleScores
}

export default SchedulesAPIGateway
