import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Provider } from 'react-redux';

import { AppProvider } from './contexts/AppContext';
import { SearchProvider } from './contexts/SearchContext';
import GlobalStyles from './GlobalStyles';
import DownloadApp from './pages/DownloadApp';
import Routes from './routes';
import store from './store';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('page.title');
  }, []);

  const queryCache = new QueryCache();

  if (isMobile) {
    return (
      <>
        <GlobalStyles />
        <DownloadApp />
      </>
    );
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Provider store={store}>
        <AppProvider>
          <SearchProvider>
            <IconContext.Provider
              value={{ style: { verticalAlign: 'middle' } }}
            >
              <GlobalStyles />
              <Routes />
            </IconContext.Provider>
          </SearchProvider>
        </AppProvider>
      </Provider>
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  );
}

export default App;
