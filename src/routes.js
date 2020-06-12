import { ConnectedRouter } from 'connected-react-router';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

// Global Components
import Player from './components/Player';
import PlaylistModal from './components/PlaylistModal';
import SideBar from './components/SideBar';
import Album from './pages/Album';
import Artist from './pages/Artist';
import Genre from './pages/Genre';
import Home from './pages/Home';
import Library from './pages/Library';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import session from './services/session';
import { history } from './store';

const AppRoute = Component => {
  const playlistModal = useSelector(state => state.playlistModal);
  const themeContext = useContext(ThemeContext);

  if (Component.auth) {
    if (!session()) {
      return <Redirect to="/" />;
    }
  }

  return (
    <React.Fragment>
      <SideBar history={history} />
      {themeContext.showPlayer && <Player />}
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
      <AppRoute path="/library" auth component={Library} />
      <AppRoute path="/artists/:artistId" component={Artist} />
      <AppRoute path="/playlists/:playlistId" auth component={Playlist} />
      <AppRoute path="/genres/:genreId" component={Genre} />
      <AppRoute path="/albums/:albumId" component={Album} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
