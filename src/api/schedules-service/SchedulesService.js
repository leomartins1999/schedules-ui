import { SuccessState, ErrorState } from "../../state/State";

const SchedulesService = (gateway) => {
    async function getSchedules() {
        try {
            const res = await gateway.getSchedules()
            return SuccessState(res)
        } catch (err) {
            return ErrorState()
        }
    };

    return {
        getSchedules
    }
};

export default SchedulesService;
