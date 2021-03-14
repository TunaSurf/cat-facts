import { BrowserRouter as Router } from 'react-router-dom';

import NormalizeStyles from './NormalizeStyles';
import Routes from './components/Routes';
import Modal from './components/Modal';

function App() {
  return (
    <Router>
      <NormalizeStyles />
      <Routes />
      <Modal />
    </Router>
  );
}

export default App;
