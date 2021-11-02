const GET_SCHEDULES = process.env.REACT_APP_GET_SCHEDULES_PATH;

async function getSchedules() {
    const resp = await fetch(GET_SCHEDULES);
    if (!resp.ok) throw Error("Error fetching schedules!");

    return await resp.json();
}

const SchedulesAPIGateway = {
    getSchedules
}

export default SchedulesAPIGateway
