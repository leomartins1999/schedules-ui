import Plot from 'react-plotly.js';
import { extractScoresForPivot, getKeysForPivotedMetrics } from '../../utils/Metrics';
import { renderStatefulContent } from '../../utils/State'

function renderPlot(scores, metric, pivot) {
    return renderStatefulContent(
        scores,
        (v) => <Plot
            data={mapScoresToData(v, metric, pivot)}
            layout={{ title: 'Heatmap Comparison Chart', autosize: true, width: 1000 }}
        />
    )
}

function mapScoresToData(scheduleScores, metric, pivot) {
    const scores = extractScoresForPivot(scheduleScores, pivot)

    const columns = getKeysForPivotedMetrics(scores)
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

function renderHeatmapPlot(plot, metric, pivot) {
    return renderPlot(plot, metric, pivot)
}

export default renderHeatmapPlot

