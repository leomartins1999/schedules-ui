import { ScheduleScores } from "../../components/index"
import { renderStatefulContent, SUCCESS_STATE } from "../../utils/State"

export async function fetchScheduleScores(service, scheduleId, scheduleState, setScheduleScores) {
    if (scheduleState.status !== SUCCESS_STATE || scheduleState.value.status !== 'DONE') return;

    const result = await service.getScheduleScores(scheduleId);
    setScheduleScores(result);
}

export function renderScheduleScores(scores) {
    return renderStatefulContent(
        scores,
        (v) => <ScheduleScores scores={v} />
    )
}
