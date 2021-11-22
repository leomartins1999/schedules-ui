import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { ScheduleListItem, CreateScheduleForm } from "../../components/index";
import { LoadingState } from "../../utils/State";

async function fetchSchedules(service, setSchedulesState) {
  const result = await service.getSchedules();
  setSchedulesState(result);
}

function renderSchedules(schedulesState) {
  switch (schedulesState.status) {
    case "ERROR": return <Alert variant="danger">An error has occured loading the schedules</Alert>;
    case "SUCCESS": return schedulesState.value.map(s => <ScheduleListItem key={s.id} schedule={s} />);
    default: return <Spinner animation="border" />;
  }
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
