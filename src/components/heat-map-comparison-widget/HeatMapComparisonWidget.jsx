import { useState } from 'react';
import Plot from 'react-plotly.js';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton'
import { renderStatefulContent } from '../../utils/State'
import { PIVOTED_METRIC_FIELD_TO_LABEL, DEFAULT_METRIC, PIVOT_TYPE_TO_LABEL, DEFAULT_PIVOT_TYPE } from '../../utils/Metrics';

function renderPlot(scores, metric, pivot) {
    return renderStatefulContent(
        scores,
        (v) => <Plot
            data={mapScoresToData(v, metric, pivot)}
            layout={{ title: 'Heatmap Comparison Chart', autosize: true }}
        />
    )
}

function mapScoresToData(scheduleScores, metric, pivot) {
    const scores = scheduleScores.map(score => score.scores[pivot])

    const columns = getHeatmapColumns(scores)
    const names = getScheduleNames(scheduleScores)
    const lines = getHeatmapLines(scores, metric, columns)

    return [{
        x: columns,
        y: names,
        z: lines,
        type: 'heatmap',
        hoverongaps: false
    }]
}

function getHeatmapColumns(scores) {
    const keys = scores
        .map(score => score.map(agg => agg.key))
        .flat()

    return [...new Set(keys)]
}

function getScheduleNames(scores) {
    return scores.map(s => s.name)
}

function getHeatmapLines(scores, metric, columns) {
    return scores.map(score => getHeatmapLine(score, metric, columns))
}

function getHeatmapLine(score, metric, columns) {
    const lineElements = []

    for (const column of columns) {
        const element = score.find(agg => agg.key === column)
        const value = element === undefined ? 0 : element[metric]
        lineElements.push(value)
    }

    return lineElements
}

function renderMetricSelector(metric, setMetric) {
    return (
        <ButtonGroup className='d-flex justify-content-center' vertical>
            {renderMetricSelectorButtons(metric, setMetric)}
        </ButtonGroup>
    )
}

function renderMetricSelectorButtons(metric, setMetric) {
    return Object
        .keys(PIVOTED_METRIC_FIELD_TO_LABEL)
        .map(key =>
            <ToggleButton
                key={key}
                type='radio'
                variant='outline-primary'
                value={key}
                checked={metric === key}
                onClick={(_) => setMetric(key)}
            > {PIVOTED_METRIC_FIELD_TO_LABEL[key]} </ToggleButton>
        );
}

function renderPivotTypeSelector(pivot, setPivot) {
    return (
        <ButtonGroup className='d-flex justify-content-center' vertical>
            {renderPivotTypeSelectorButtons(pivot, setPivot)}
        </ButtonGroup>
    )
}

function renderPivotTypeSelectorButtons(pivot, setPivot) {
    return PIVOT_TYPE_TO_LABEL
        .map(p =>
            <ToggleButton
                key={p.type}
                type='radio'
                variant='outline-secondary'
                value={p.type}
                checked={pivot === p.type}
                onClick={(_) => setPivot(p.type)}
            > {p.label} </ToggleButton>
        )
}

function HeatMapComparisonWidget({ scores }) {
    const [metric, setMetric] = useState(DEFAULT_METRIC)
    const [pivot, setPivot] = useState(DEFAULT_PIVOT_TYPE)

    return (
        <Row>
            <Col sm={10}>
                {renderPlot(scores, metric, pivot)}
            </Col>
            <Col className="text-start" sm={2}>
                <h4>Selected metric</h4>
                {renderMetricSelector(metric, setMetric)}
                <h4 className='mt-2'>Pivot type</h4>
                {renderPivotTypeSelector(pivot, setPivot)}
            </Col>
        </Row>
    )
}

export default HeatMapComparisonWidget
