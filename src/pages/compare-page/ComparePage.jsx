import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'

import { DefaultComparisonWidget } from '../../components/index'
import { LoadingState } from '../../utils/State';

async function fetchScheduleScores(service, setScores) {
  const scores = await service.getSchedulesScores()
  setScores(scores)
}

function ComparePage({ service }) {
  const [scores, setScores] = useState(LoadingState())

  useEffect(() => {
    fetchScheduleScores(service, setScores)
  }, [service])

  return (
    <div className="p-2">
      <Card>
        <Card.Header>
          <h3>Compare Schedules</h3>
        </Card.Header>
        <Card.Body>
          <DefaultComparisonWidget
            scores={scores}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default ComparePage;
