import React from 'react';
import ReactDOM from 'react-dom';

import { FirebaseProvider, ModalProvider } from './shared/context';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
