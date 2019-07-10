import React from 'react';
import { Provider } from 'react-redux';
import { IconContext } from 'react-icons';

import store from './store';

import GlobalStyles from './GlobalStyles';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Routes />
      </IconContext.Provider>
    </Provider>
  );
}

export default App;
