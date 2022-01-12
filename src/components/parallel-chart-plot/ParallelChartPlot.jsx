import Plot from 'react-plotly.js';

import { renderStatefulContent } from '../../utils/State'
import { getKeysForPivotedMetrics, extractScoresForPivot } from '../../utils/Metrics';

function mapScoresToData(scheduleScores, metric, pivot) {
    const scores = extractScoresForPivot(scheduleScores, pivot)

    const keys = getKeysForPivotedMetrics(scores)

    const dimensions = keys.map(k => getDimensionForKey(k, scores, metric))

    const range = getRangeForDimensions(dimensions)

    const dimensionsWithRanges = dimensions.map(d => { return { ...d, range: range } })

    const data = [{
        type: 'parcoords',
        dimensions: dimensionsWithRanges
    }]

    return data
}

function getDimensionForKey(key, scores, metric) {
    const values = scores.map(s => getMetricValue(s, key, metric))

    return {
        label: key,
        values: values
    }
}

function getRangeForDimensions(dimensions) {
    const values = dimensions
        .map(d => d.values)
        .flat()
        .map(v => parseFloat(v))
        .filter(n => !isNaN(n))

    return [
        Math.min(...values),
        Math.max(...values)
    ]
}

function getMetricValue(s, key, metric) {
    const v = s.find(s => s.key === key)

    return v === undefined ? 0 : v[metric]
}

function renderParallelChartPlot(plot, metric, pivot) {
    return renderStatefulContent(
        plot,
        (v) => <Plot
            data={mapScoresToData(v, metric, pivot)}
            layout={
                {
                    title: 'Parallel Chart Comparison Chart',
                    autosize: true,
                    width: 1000
                }
            }
        />
    )
}

export default renderParallelChartPlot
