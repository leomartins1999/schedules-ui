import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

function getVariantForStatus(status) {
    switch (status) {
        case "IMPORTING": return "warning";
        case "CALCULATING": return "info";
        case "ERROR": return "danger";
        default: return null;
    };
}

function ScheduleListItem({ schedule }) {
    const { id, name, status } = schedule;

    const variant = getVariantForStatus(status);

    return (
        <ListGroup.Item
            className="d-flex justify-content-between align-items-center"
            href={`#schedules/${id}`}
            variant={variant}
            action
        >
            {name}
            <Badge variant="primary" pill>
                {status}
            </Badge>
        </ListGroup.Item >
    );
}

export default ScheduleListItem
