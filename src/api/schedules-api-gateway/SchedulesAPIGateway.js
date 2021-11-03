import { readFile } from "../../utils/FileReader";

const SCHEDULES_PATH = process.env.REACT_APP_SCHEDULES_PATH;

async function getSchedules() {
    const resp = await fetch(SCHEDULES_PATH);
    if (!resp.ok) throw Error("Error fetching schedules!");

    return await resp.json();
}

async function createSchedule(name, file) {
    const options = {
        method: "POST",
        body: await buildCreateScheduleBody(name, file)
    }

    const resp = await fetch(SCHEDULES_PATH, options);
    if (!resp.ok) throw Error("Error creating schedule!")

    return await resp.json()
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

const SchedulesAPIGateway = {
    getSchedules,
    createSchedule
}

export default SchedulesAPIGateway
