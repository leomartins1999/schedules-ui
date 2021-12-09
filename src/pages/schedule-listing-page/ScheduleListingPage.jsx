import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { ScheduleListItem, CreateScheduleForm } from "../../components/index";
import { LoadingState, renderStatefulContent } from "../../utils/State";

async function fetchSchedules(service, setSchedulesState) {
  const result = await service.getSchedules();
  setSchedulesState(result);
}

function renderSchedules(schedulesState) {
  return renderStatefulContent(
    schedulesState,
    (value) => value.map(s => <ScheduleListItem key={s.id} schedule={s} />)
  );
}

function ScheduleListingPage({ service }) {
  const [schedulesState, setSchedulesState] = useState(LoadingState());

  useEffect(() => {
    fetchSchedules(service, setSchedulesState);
  }, [service]);

  return (
    <>
      <ListGroup>
        <h2>Schedules</h2>
        {renderSchedules(schedulesState)}
      </ListGroup>
      <CreateScheduleForm service={service} />
    </>
  );
}

export default ScheduleListingPage;
