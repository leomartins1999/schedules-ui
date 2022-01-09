import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Plot from 'react-plotly.js';
import { renderStatefulContent } from '../../utils/State';
import { METRIC_FIELD_TO_LABEL } from '../../utils/Metrics'

function renderMetricsPlot(scores, selectedMetrics) {
    return renderStatefulContent(
        scores,
        v => <Plot
            data={
                v.map(formatScore).map(s => renderScore(s, selectedMetrics))
            }
            layout={{
                title: 'Selectable Comparison Chart',
                xaxis: { title: METRIC_FIELD_TO_LABEL[selectedMetrics[0]] },
                yaxis: { title: METRIC_FIELD_TO_LABEL[selectedMetrics[1]] }
            }}
        />
    )
}

function renderScore(score, selectedMetrics) {
    if (selectedMetrics.length >= 3) return renderScatterpolar(score, selectedMetrics)
    else if (selectedMetrics.length === 2) return renderScatter(score, selectedMetrics)
    else return renderBar(score, selectedMetrics)
}

function renderScatterpolar(score, selectedMetrics) {
    return {
        type: 'scatterpolar',
        name: score.name,
        r: [
            (selectedMetrics.includes("pct_overflowing_lectures")) ? score.pct_overflowing_lectures : null,
            (selectedMetrics.includes("pct_overqualified_rooms_for_lectures")) ? score.pct_overqualified_rooms_for_lectures : null,
            (selectedMetrics.includes("nr_used_rooms")) ? score.nr_used_rooms : null
        ].filter(r => r !== null),
        theta: ['% Overflowing Lectures', '% Overqualified room for lectures', 'Nr used rooms'],
        fill: 'toself'
    }
}

function renderScatter(score, selectedMetrics) {
    return {
        type: 'scatter',
        name: score.name,
        x: [score[selectedMetrics[0]]],
        y: [score[selectedMetrics[1]]]
    }
}

function renderBar(score, selectedMetrics) {
    return {
        type: 'bar',
        x: [score[selectedMetrics[0]]],
        name: score.name
    }
}

function renderMetricsSelector(selectedMetrics, setSelectedScores) {
    return Object.keys(METRIC_FIELD_TO_LABEL)
        .map((k) => <Form.Check
            key={k}
            type='checkbox'
            label={METRIC_FIELD_TO_LABEL[k]}
            checked={selectedMetrics.includes(k)}
            onChange={e => {
                setSelectedScores(
                    (e.target.checked) ? [...selectedMetrics, k] : selectedMetrics.filter(m => m !== k)
                )
            }}
        />)
}

function formatScore(score) {
    return {
        name: score.name,
        pct_overflowing_lectures: score.pct_overflowing_lectures.toFixed(4) * 100,
        pct_overqualified_rooms_for_lectures: score.pct_overqualified_rooms_for_lectures.toFixed(4) * 100,
        nr_used_rooms: score.nr_used_rooms
    }
}

function SelectableComparisonWidget({ scores }) {
    const [selectedMetrics, setSelectedMetrics] = useState(Object.keys(METRIC_FIELD_TO_LABEL))

    return (
        <Row>
            <Col sm={8}>
                {renderMetricsPlot(scores, selectedMetrics)}
            </Col>
            <Col className="text-start" sm={4}>
                <h4>Selected metrics</h4>
                {renderMetricsSelector(selectedMetrics, setSelectedMetrics)}
            </Col>
        </Row>
    )
}

export default SelectableComparisonWidget
