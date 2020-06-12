import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './GlobalStyles';
import DownloadApp from './pages/DownloadApp';
import Routes from './routes';

function App() {
  const player = useSelector(state => state.player);
  const { t } = useTranslation();

  const [theme, setTheme] = useState({
    showPlayer: false,
  });

  useEffect(() => {
    document.title = t('page.title');
  }, []);

  useEffect(() => {
    setTheme({
      showPlayer: player.active ? player.showPlayer : false,
    });
  }, [player.active]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        {isMobile ? <DownloadApp /> : <Routes />}
      </IconContext.Provider>
    </ThemeProvider>
  );
}

export default App;
