import React from 'react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

import './config/i18n';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

const Root = () => (
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
