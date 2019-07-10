import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { useSelector } from 'react-redux';

import { history } from './store';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Artist from './pages/Artist';
import Playlist from './pages/Playlist';
import Genre from './pages/Genre';

// Global Components
import SideBar from './components/SideBar';
import Player from './components/Player';

import session from './services/session';

import PlaylistModal from './components/PlaylistModal';

const PrivateRoute = (Component) => {
  const playlistModal = useSelector(state => state.playlistModal);

  if (session()) {
    return (
      <React.Fragment>
        <SideBar />
        <Player />
        <Route {...Component} />
        { playlistModal.open && <PlaylistModal /> }
      </React.Fragment>
    );
  }
  return <Redirect to="/sign-in" />;
};

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/search" component={Search} />
      <PrivateRoute path="/library" component={Library} />
      <PrivateRoute path="/artists/:artistId" component={Artist} />
      <PrivateRoute path="/playlists/:playlistId" component={Playlist} />
      <PrivateRoute path="/genres/:genreId" component={Genre} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
