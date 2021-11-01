import Container from 'react-bootstrap/Container';

import NavigationBar from './components/NavigationBar';
import PageContainer from './pages/PageContainer';

function App() {
  return (
    <div className="App">
      <Container>
        <NavigationBar />
        <PageContainer />
      </Container>
    </div>
  );
}

export default App;
