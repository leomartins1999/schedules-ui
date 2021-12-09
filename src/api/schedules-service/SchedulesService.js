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

    async function getScheduleDetails(scheduleId) {
        try {
            const res = await gateway.getScheduleDetails(scheduleId)
            return SuccessState(res)
        } catch (err) {
            console.log(err)
            return ErrorState()
        }
    };

    async function getScheduleClasses(scheduleId) {
        try {
            const res = await gateway.getScheduleClasses(scheduleId)
            return SuccessState(res)
        } catch (err) {
            console.log(err)
            return ErrorState()
        }
    }

    async function getScheduleDates(scheduleId) {
        try {
            const res = await gateway.getScheduleDates(scheduleId)
            return SuccessState(res)
        } catch (err) {
            console.log(err)
            return ErrorState()
        }
    }

    async function getScheduleLectures(scheduleId, klass, startDate, endDate) {
        try {
            const res = await gateway.getScheduleLectures(scheduleId, klass, startDate, endDate)
            return SuccessState(res)
        } catch (err) {
            console.log(err)
            return ErrorState()
        }
    }

    async function getScheduleScores(scheduleId) {
        try {
            const res = await gateway.getScheduleScores(scheduleId)
            return SuccessState(res)
        } catch (err) {
            console.log(err)
            return ErrorState()
        }
    }

    return {
        getSchedules,
        createSchedule,
        getScheduleDetails,
        getScheduleClasses,
        getScheduleDates,
        getScheduleLectures,
        getScheduleScores
    }
};

export default SchedulesService;
