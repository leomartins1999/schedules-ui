import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

function ScheduleCard({ schedule }) {
    const { name, status } = schedule

    return (
        <Navbar bg="secondary" variant="dark">
            <Container>
                <Navbar.Brand>{name}</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Badge variant="primary" pill>
                        {status}
                    </Badge>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default ScheduleCard
