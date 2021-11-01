import {
    HashRouter as Router, Switch, Route, Redirect, useParams,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import HomePage from './HomePage';
import SchedulesListingPage from './SchedulesListingPage';
import SchedulePage from './SchedulePage';
import ComparePage from './ComparePage';

function SchedulePageWithId() {
    const { id } = useParams();

    return (
        <SchedulePage scheduleId={id} />
    );
}

function withRouting() {
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/schedules/:id" children={<SchedulePageWithId />} />
                <Route path="/schedules">
                    <SchedulesListingPage />
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

function PageContainer() {
    return (
        <Container className="bg-light">
            {withRouting()}
        </Container>
    );
}

export default PageContainer;
