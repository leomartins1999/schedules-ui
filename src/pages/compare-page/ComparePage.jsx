import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion';

import { DefaultComparisonWidget, SelectableComparisonWidget, HeatMapComparisonWidget } from '../../components/index'
import { LoadingState } from '../../utils/State';

async function fetchScheduleScores(service, setScores) {
  const scores = await service.getSchedulesScores()
  setScores(scores)
}

async function fetchPivotedScores(service, setPivotedScores) {
  const pivotedScores = await service.getPivotedScores()
  setPivotedScores(pivotedScores)
}

function ComparePage({ service }) {
  const [scores, setScores] = useState(LoadingState())
  const [pivotedScores, setPivotedScores] = useState(LoadingState())

  useEffect(() => {
    fetchScheduleScores(service, setScores)
  }, [service])

  useEffect(() => {
    fetchPivotedScores(service, setPivotedScores)
  }, [service])

  return (
    <div className="p-2">
      <Card>
        <Card.Header>
          <h3>Compare Schedules</h3>
        </Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Default Comparison</Accordion.Header>
              <Accordion.Body>
                <DefaultComparisonWidget scores={scores} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Customizable Comparison</Accordion.Header>
              <Accordion.Body>
                <SelectableComparisonWidget scores={scores} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Heat Map Comparison</Accordion.Header>
              <Accordion.Body>
                <HeatMapComparisonWidget scores={pivotedScores} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ComparePage;
