import React from 'react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ReactDOM from 'react-dom';

import App from './App';

import './config/i18n';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3500,
  offset: '30px',
  transition: transitions.SCALE,
};

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
