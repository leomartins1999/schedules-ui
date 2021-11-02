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
