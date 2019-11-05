import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { useSelector } from 'react-redux';

import { history } from './store';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Artist from './pages/Artist';
import Playlist from './pages/Playlist';
import Genre from './pages/Genre';
import Album from './pages/Album';

// Global Components
import SideBar from './components/SideBar';
import Player from './components/Player';

import session from './services/session';

import PlaylistModal from './components/PlaylistModal';

const PrivateRoute = Component => {
  const playlistModal = useSelector(state => state.playlistModal);

  if (session()) {
    return (
      <React.Fragment>
        <SideBar history={history} />
        <Player />
        <Route {...Component} />
        {playlistModal.open && <PlaylistModal />}
      </React.Fragment>
    );
  }
  return <Redirect to="/" />;
};

const AppRoute = Component => {
  const playlistModal = useSelector(state => state.playlistModal);

  return (
    <React.Fragment>
      <SideBar history={history} />
      <Player />
      <Route {...Component} />
      {playlistModal.open && <PlaylistModal />}
    </React.Fragment>
  );
};

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <AppRoute path="/" exact component={Home} />
      <AppRoute path="/search" component={Search} />
      <PrivateRoute path="/library" component={Library} />
      <AppRoute path="/artists/:artistId" component={Artist} />
      <PrivateRoute path="/playlists/:playlistId" component={Playlist} />
      <AppRoute path="/genres/:genreId" component={Genre} />
      <AppRoute path="/albums/:albumId" component={Album} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
