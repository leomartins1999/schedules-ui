import {
    HashRouter as Router, Switch, Route, Redirect, useParams,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import HomePage from './home-page/HomePage';
import ScheduleListingPage from './schedule-listing-page/ScheduleListingPage'
import SchedulePage from './schedule-page/SchedulePage';
import ComparePage from './compare-page/ComparePage';

function SchedulePageWithId({ service }) {
    const { id } = useParams();

    return (
        <SchedulePage scheduleId={id} service={service} />
    );
}

function withRouting(service) {
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/schedules/:id" children={<SchedulePageWithId service={service} />} />
                <Route path="/schedules">
                    <ScheduleListingPage service={service} />
                </Route>
                <Route path="/compare">
                    <ComparePage service={service} />
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
