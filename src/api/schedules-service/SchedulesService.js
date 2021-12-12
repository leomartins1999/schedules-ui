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

    async function getSchedulesScores() {
        try {
            const schedules = await gateway.getSchedules()

            const results = await Promise.all(
                schedules
                    .filter(s => s.status === "DONE")
                    .map(s => s.id)
                    .map(id => gateway.getScheduleScores(id))
            )

            const scores = results
                .map(score => {
                    const scoreWithName = score

                    scoreWithName.name = schedules
                        .find(schedule => schedule.id === score.schedule_id)
                        .name
                    return scoreWithName
                })

            return SuccessState(scores)

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
        getScheduleScores,
        getSchedulesScores
    }
};

export default SchedulesService;
