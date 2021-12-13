import { useState, useEffect } from 'react';

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
    <>
      <h2>Compare Page!</h2>
      <DefaultComparisonWidget
        scores={scores}
      />
    </>
  );
}

export default ComparePage;
