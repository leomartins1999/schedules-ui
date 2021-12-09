import { ErrorState, renderStatefulContent, SUCCESS_STATE, SuccessState } from "../../utils/State";
import { ScheduleSelector } from "../../components";

export async function fetchScheduleSelectorInformation(service, scheduleId, scheduleStatus, setKlass, setStartDate, setEndDate, setSelectorInformation) {
    if (scheduleStatus !== SUCCESS_STATE) return;

    const classesState = await service.getScheduleClasses(scheduleId);
    const datesState = await service.getScheduleDates(scheduleId);

    if (classesState.status === SUCCESS_STATE && datesState.status === SUCCESS_STATE) {
        const classes = classesState.value
        const dates = datesState.value

        setKlass(classes[0])
        setStartDate(dates[0])
        setEndDate(dates[0])

        setSelectorInformation(SuccessState({ classes, dates }))
    } else setSelectorInformation(ErrorState())
}

export function renderScheduleSelector(
    selectorInformation,
    klass, setKlass,
    startDate, setStartDate,
    endDate, setEndDate
) {
    return renderStatefulContent(
        selectorInformation,
        (v) => <ScheduleSelector
            classes={v.classes}
            dates={v.dates}
            klass={klass} setKlass={setKlass}
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
        />
    )
}

