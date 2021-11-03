import SchedulesService from "../SchedulesService"

const SCHEDULES = [
    {
        id: 1,
        name: "schedule-name",
        status: "DONE"
    }
]

it('Successful get schedules returns schedules', async () => {
    const gateway = {
        getSchedules: () => SCHEDULES
    }

    const service = SchedulesService(gateway)

    const result = await service.getSchedules()

    expect(result.status).toBe("SUCCESS")
    expect(result.value).toBe(SCHEDULES)
})

it('Error in get schedules returns error', async () => {
    const gateway = {
        getSchedules: () => { throw Error() }
    }

    const service = SchedulesService(gateway)

    const result = await service.getSchedules()

    expect(result.status).toBe("ERROR")
})

it('Successful create schedule returns schedule id', async () => {
    const gateway = {
        createSchedule: (_1, _2) => SCHEDULES[0]
    }

    const service = SchedulesService(gateway)

    const result = await service.createSchedule()

    expect(result.status).toBe("SUCCESS")
    expect(result.value).toBe(SCHEDULES[0].id)
})

it('Error in get schedules returns error', async () => {
    const gateway = {
        createSchedule: (_1, _2) => { throw Error() }
    }

    const service = SchedulesService(gateway)

    const result = await service.createSchedule()

    expect(result.status).toBe("ERROR")
})
