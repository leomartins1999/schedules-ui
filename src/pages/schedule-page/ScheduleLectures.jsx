import { ScheduleLectures } from "../../components/index"
import { LoadingState, renderStatefulContent } from "../../utils/State"

export async function fetchScheduleLectures(service, scheduleId, klass, startDate, endDate, setScheduleLectures) {
    if(klass === null || startDate === null || endDate === null) return;

    setScheduleLectures(LoadingState());
    const result = await service.getScheduleLectures(scheduleId, klass, startDate, endDate);
    setScheduleLectures(result);
}

export function renderScheduleLectures(lectures, startDate, endDate) {
    return renderStatefulContent(
        lectures,
        (v) => <ScheduleLectures
            lectures={v}
            startDate={startDate}
            endDate={endDate}
        />
    )
}
