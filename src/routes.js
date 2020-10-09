import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

// Global Components
import Player from './components/Player';
import PlaylistModal from './components/PlaylistModal';
import SideBar from './components/SideBar';
import AppContext from './contexts/AppContext';
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

const AppRoute = (Component) => {
  const appContext = useContext(AppContext);

  if (Component.auth) {
    if (!session()) {
      return <Redirect to="/" />;
    }
  }

  return (
    <>
      <SideBar />
      <Player />
      <Route {...Component} />
      {appContext.playlistModal && <PlaylistModal />}
    </>
  );
};

const Routes = () => (
  <BrowserRouter>
    <LastLocationProvider>
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
    </LastLocationProvider>
  </BrowserRouter>
);

export default Routes;
