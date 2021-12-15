import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from 'react-bootstrap/Card'

import { ScheduleListItem, CreateScheduleForm } from "../../components/index";
import { LoadingState, renderStatefulContent } from "../../utils/State";

async function fetchSchedules(service, setSchedulesState) {
  setSchedulesState(LoadingState())
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
    <div className="p-2">
      <Card>
        <Card.Header>
          <h3>Schedules</h3>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {renderSchedules(schedulesState)}
          </ListGroup>
          <CreateScheduleForm
            service={service}
            onCreate={() => fetchSchedules(service, setSchedulesState)}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default ScheduleListingPage;
