import { ERROR_STATE, SUCCESS_STATE } from '../../../utils/State';
import SchedulesService from '../SchedulesService'

const SCHEDULE = {
    id: 1,
    name: 'schedule-name',
    status: 'DONE'
}

describe('Create schedule tests', () => {
    it('Successful create schedule returns schedule id', async () => {
        const gateway = {
            createSchedule: (_1, _2) => SCHEDULE
        }

        const service = SchedulesService(gateway)

        const result = await service.createSchedule('schedule-name', '<file-content>')

        expect(result.status).toBe(SUCCESS_STATE)
        expect(result.value).toBe(SCHEDULE.id)
    })

    it('Error in create schedule returns error', async () => {
        const gateway = {
            createSchedule: (_1, _2) => { throw Error() }
        }

        const service = SchedulesService(gateway)

        const result = await service.createSchedule('schedule-name', '<file-content>')

        expect(result.status).toBe(ERROR_STATE)
    })
})
