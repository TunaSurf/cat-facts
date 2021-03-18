import { BrowserRouter as Router } from 'react-router-dom';

import Container from './components/Container';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
import Routes from './components/Routes';
import Modal from './components/Modal';

function App() {
  return (
    <Router>
      <Container>
        <NormalizeStyles />
        <BaseStyles />
        <Routes />
        <Modal />
      </Container>
    </Router>
  );
}

export default App;
