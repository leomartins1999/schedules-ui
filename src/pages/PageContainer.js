import {
    HashRouter as Router, Switch, Route, Redirect, useParams,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import HomePage from './HomePage';
import ScheduleListingPage from './schedule-listing-page/ScheduleListingPage'
import SchedulePage from './SchedulePage';
import ComparePage from './ComparePage';

function SchedulePageWithId() {
    const { id } = useParams();

    return (
        <SchedulePage scheduleId={id} />
    );
}

function withRouting(service) {
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/schedules/:id" children={<SchedulePageWithId />} />
                <Route path="/schedules">
                    <ScheduleListingPage service={service} />
                </Route>
                <Route path="/compare">
                    <ComparePage />
                </Route>
                <Route path="/">
                    <Redirect to="/home" />
                </Route>
            </Switch>
        </Router>
    );
}

function PageContainer({ service }) {
    return (
        <Container className="bg-light">
            {withRouting(service)}
        </Container>
    );
}

export default PageContainer;
