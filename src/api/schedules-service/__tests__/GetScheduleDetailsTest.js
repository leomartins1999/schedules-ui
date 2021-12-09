import { ERROR_STATE, SUCCESS_STATE } from '../../../utils/State';
import SchedulesService from '../SchedulesService'

const SCHEDULE = {
    id: 1,
    name: 'schedule-name',
    status: 'DONE'
}

describe('Get Schedule Details tests', () => {
    it('Successful get schedule details returns the schedules details', async () => {
        const gateway = {
            getScheduleDetails: (_1) => SCHEDULE
        }

        const service = SchedulesService(gateway)

        const result = await service.getScheduleDetails(SCHEDULE.id)

        expect(result.status).toBe(SUCCESS_STATE)
        expect(result.value).toBe(SCHEDULE)
    })

    it('Error in get schedule details returns an error', async () => {
        const gateway = {
            getScheduleDetails: (_1) => { throw Error() }
        }

        const service = SchedulesService(gateway)

        const result = await service.getScheduleDetails(SCHEDULE.id)

        expect(result.status).toBe(ERROR_STATE)
    })
})
