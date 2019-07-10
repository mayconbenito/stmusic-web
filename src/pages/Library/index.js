import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  Content, FixedHeader, ContentTitle, Menu, MenuItem,
} from './styles';

import LibraryPlaylists from '../LibraryPlaylists';
import LibraryArtists from '../LibraryArtists';

function Library({ location }) {
  return (
    <Content>
      <FixedHeader>
        <ContentTitle>Biblioteca</ContentTitle>

        <Menu>
          <MenuItem
            underline={location.pathname === '/library/playlists' ? 'show' : 'false'}
            to="/library/playlists"
          >
            Suas Playlists
          </MenuItem>
          <MenuItem
            underline={location.pathname === '/library/artists' ? 'show' : 'false'}
            to="/library/artists"
          >
            Artistas que você segue
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
