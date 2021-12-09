import { ScheduleScores } from "../../components/index"
import { renderStatefulContent } from "../../utils/State"

export async function fetchScheduleScores(service, scheduleId, setScheduleScores) {
    const result = await service.getScheduleScores(scheduleId);
    setScheduleScores(result);
}

export function renderScheduleScores(scores) {
    return renderStatefulContent(
        scores,
        (v) => <ScheduleScores scores={v} />
    )
}
