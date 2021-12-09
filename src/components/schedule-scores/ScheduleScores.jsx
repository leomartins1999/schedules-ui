import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ScoreItem({ label, value }) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {label}
            <Badge variant="primary" pill>
                {value}
            </Badge>
        </ListGroup.Item >
    )
}

function ScheduleScores({ scores }) {
    const { pct_overflowing_lectures, nr_used_rooms, pct_overqualified_rooms_for_lectures } = scores;

    return (
        <Card>
            <Card.Header>Scores</Card.Header>
            <ListGroup variant="flush">
                <ScoreItem
                    label="Percentage of overflowing lectures"
                    value={`${pct_overflowing_lectures.toFixed(4) * 100} %`}
                />
                <ScoreItem
                    label="Number of used rooms"
                    value={nr_used_rooms}
                />
                <ScoreItem
                    label="Percentage of overqualified rooms for lectures"
                    value={`${pct_overqualified_rooms_for_lectures.toFixed(4) * 100} %`}
                />
            </ListGroup>
        </Card >
    )
}

export default ScheduleScores
