import Card from 'react-bootstrap/Card'

function HomePage() {
    return (
        <div className="p-2">
            <Card>
                <Card.Body>
                    <Card.Title className="text-center"><h1>ISCTE Schedules Comparator App</h1></Card.Title>
                    <Card.Text>
                        This app can be used to compare already generated schedules and sort out which one most benefits the users.
                        <br/> It can be used for:
                        <br/> - Listing already uploaded schedules
                        <br/> - Uploading new schedules
                        <br/> - Consulting the timetable for already uploaded schedules
                        <br/> - Selecting and comparing uploaded schedules
                        <br/> - Executing a comparison selecting the metrics relevant for said comparison
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted text-center">
                    Project developed for the ADS project of the Master's Degree in Computer Engineering at ISCTE
                    <br/> © Leonardo Martins, 2021
                </Card.Footer>
            </Card>
        </div>
    );
}

export default HomePage;
