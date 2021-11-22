import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function NavigationBar() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>Schedule Comparator</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#schedules">Schedules</Nav.Link>
                    <Nav.Link href="#compare">Compare</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
