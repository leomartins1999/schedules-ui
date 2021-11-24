import { ScheduleDetails } from "../../components/index"

const schedule = {
    id: 1,
    name: "Some Schedule Name",
    status: "DONE"
}

function SchedulePage({ scheduleId }) {
    return (
        <div className="p-2">
            <ScheduleDetails className="mb-2" schedule={schedule} />
        </div>
    );
}

export default SchedulePage;
