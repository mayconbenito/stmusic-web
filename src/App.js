import React from 'react';
import { isMobile } from 'react-device-detect';
import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';

import GlobalStyles from './GlobalStyles';
import DownloadApp from './pages/DownloadApp';
import Routes from './routes';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        {isMobile ? <DownloadApp /> : <Routes />}
      </IconContext.Provider>
    </Provider>
  );
}

export default App;
