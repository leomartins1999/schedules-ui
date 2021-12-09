import { ERROR_STATE, SUCCESS_STATE } from '../../../utils/State';
import SchedulesService from '../SchedulesService'

const SCHEDULES = [
    {
        id: 1,
        name: 'schedule-name',
        status: 'DONE'
    }
]


describe('Get schedules tests', () => {
    it('Successful get schedules returns schedules', async () => {
        const gateway = {
            getSchedules: () => SCHEDULES
        }

        const service = SchedulesService(gateway)

        const result = await service.getSchedules()

        expect(result.status).toBe(SUCCESS_STATE)
        expect(result.value).toBe(SCHEDULES)
    })

    it('Error in get schedules returns error', async () => {
        const gateway = {
            getSchedules: () => { throw Error() }
        }

        const service = SchedulesService(gateway)

        const result = await service.getSchedules()

        expect(result.status).toBe(ERROR_STATE)
    })
})
