import React from 'react';
import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';

import GlobalStyles from './GlobalStyles';
import Routes from './routes';
import store from './store';

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
