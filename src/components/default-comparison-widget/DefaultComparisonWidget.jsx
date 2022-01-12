import Plot from 'react-plotly.js';
import { renderStatefulContent } from '../../utils/State'

function renderPlot(scores) {
    return renderStatefulContent(
        scores,
        v => <Plot
            data={v.map(renderScore)}
            layout={{ title: 'Default Comparison Chart', width: 1000 }}
        />
    )
}

function renderScore(score) {
    return {
        type: 'scatterpolar',
        name: score.name,
        r: [score.pct_overflowing_lectures * 100, score.pct_overqualified_rooms_for_lectures * 100, score.nr_used_rooms],
        theta: ['% Overflowing Lectures', '% Overqualified room for lectures', 'Nr used rooms'],
        fill: 'toself'
    }
}

function DefaultComparisonWidget({ scores }) {
    return (
        <div className="p-2">
            {renderPlot(scores)}
        </div>
    )
}

export default DefaultComparisonWidget
