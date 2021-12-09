import { ScheduleDetails } from "../../components/index"
import { renderStatefulContent } from "../../utils/State";

export async function fetchScheduleDetails(service, scheduleId, setScheduleDetails) {
    const result = await service.getScheduleDetails(scheduleId);
    setScheduleDetails(result);
}

export function renderScheduleDetails(scheduleState) {
    return renderStatefulContent(
        scheduleState,
        (v) => <ScheduleDetails className="mb-2" schedule={v} />
    )
}
