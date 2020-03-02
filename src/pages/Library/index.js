import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';

import LibraryArtists from '../LibraryArtists';
import LibraryPlaylists from '../LibraryPlaylists';
import { Content, FixedHeader, ContentTitle, Menu, MenuItem } from './styles';

function Library({ location }) {
  const { t } = useTranslation();
  return (
    <Content>
      <FixedHeader>
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
      </FixedHeader>

      <Switch>
        <Route path="/library/playlists" exact component={LibraryPlaylists} />
        <Route path="/library/artists" exact component={LibraryArtists} />
      </Switch>
    </Content>
  );
}

export default Library;
