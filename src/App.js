import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ThemeProvider } from 'styled-components';

import { AppProvider } from './contexts/AppContext';
import { SearchProvider } from './contexts/SearchContext';
import GlobalStyles from './GlobalStyles';
import DownloadApp from './pages/DownloadApp';
import Routes from './routes';

function App() {
  const { t } = useTranslation();

  const [theme] = useState({
    showPlayer: false,
  });

  useEffect(() => {
    document.title = t('page.title');
  }, []);

  const queryCache = new QueryCache();

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <SearchProvider>
            <IconContext.Provider
              value={{ style: { verticalAlign: 'middle' } }}
            >
              <GlobalStyles />
              {isMobile ? <DownloadApp /> : <Routes />}
            </IconContext.Provider>
          </SearchProvider>
        </AppProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  );
}

export default App;
