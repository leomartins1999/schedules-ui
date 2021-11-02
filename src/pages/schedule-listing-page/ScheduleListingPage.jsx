import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import ScheduleListItem from "../../components/schedule-list-item/ScheduleListItem";
import { LoadingState } from "../../state/State";

function renderSchedules(schedulesState) {
  switch (schedulesState.status) {
    case "LOADING": return <Spinner animation="border" />;
    case "ERROR": return <Alert variant="danger">An error has occured loading the schedules</Alert>;
    case "SUCCESS": return schedulesState.value.map(s => <ScheduleListItem key={s.id} schedule={s} />);
  }
}

function ScheduleListingPage({ service }) {
  const [schedulesState, setSchedulesState] = useState(LoadingState());

  useEffect(async () => {
    const result = await service.getSchedules();
    setSchedulesState(result);
  }, []);

  return (
    <ListGroup className="pt-3 pb-3">
      <h2>Schedules</h2>
      {renderSchedules(schedulesState)}
    </ListGroup>
  );
}

export default ScheduleListingPage;
