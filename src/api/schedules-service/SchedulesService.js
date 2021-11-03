import { SuccessState, ErrorState } from "../../utils/State";

const SchedulesService = (gateway) => {
    async function getSchedules() {
        try {
            const res = await gateway.getSchedules()
            return SuccessState(res)
        } catch (err) {
            console.log(err)
            return ErrorState()
        }
    };

    async function createSchedule(name, file) {
        try {
            const res = await gateway.createSchedule(name, file)
            return SuccessState(res.id)
        } catch (err) {
            console.log(err)
            return ErrorState()
        }
    }

    return {
        getSchedules,
        createSchedule
    }
};

export default SchedulesService;
