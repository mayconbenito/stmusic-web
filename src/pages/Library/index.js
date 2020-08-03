import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';

import GlobalHeader from '../../components/GlobalHeader';
import LibraryArtists from '../LibraryArtists';
import LibraryPlaylists from '../LibraryPlaylists';
import { Content, Header, ContentTitle, Menu, MenuItem } from './styles';

function Library({ location, history }) {
  const { t } = useTranslation();
  return (
    <Content>
      <GlobalHeader history={history} />

      <Header>
        <ContentTitle>{t('library.title')}</ContentTitle>

        <Menu>
          <MenuItem
            underline={
              location.pathname === '/library/playlists' ? 'show' : 'false'
            }
            to="/library/playlists"
          >
            {t('library.your_playlists')}
          </MenuItem>
          <MenuItem
            underline={
              location.pathname === '/library/artists' ? 'show' : 'false'
            }
            to="/library/artists"
          >
            {t('library.artists_you_follow')}
          </MenuItem>
        </Menu>
      </Header>

      <Switch>
        <Route path="/library/playlists" exact component={LibraryPlaylists} />
        <Route path="/library/artists" exact component={LibraryArtists} />
      </Switch>
    </Content>
  );
}

export default Library;
