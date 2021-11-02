import Container from 'react-bootstrap/Container';

import NavigationBar from './components/navigation-bar/NavigationBar';
import PageContainer from './pages/PageContainer';

import SchedulesAPIGateway from './api/schedules-api-gateway/SchedulesAPIGateway';
import SchedulesService from './api/schedules-service/SchedulesService';

const gateway = SchedulesAPIGateway;

const service = SchedulesService(gateway);

function App() {
  return (
    <div className="App">
      <Container>
        <NavigationBar />
        <PageContainer service={service} />
      </Container>
    </div>
  );
}

export default App;
