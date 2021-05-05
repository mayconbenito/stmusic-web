import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import { isLoggedIn } from './helpers/session';
import Album from './pages/Album';
import AppLayout from './pages/AppLayout';
import Artist from './pages/Artist';
import Genre from './pages/Genre';
import Home from './pages/Home';
import Library from './pages/Library';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import Search from './pages/Search';
import SignUp from './pages/SignUp';

function AppRoute(Component) {
  if (Component.auth) {
    if (!isLoggedIn()) {
      return <Redirect to="/" />;
    }
  }

  return (
    <AppLayout>
      <Route {...Component} />
    </AppLayout>
  );
}

function Routes() {
  return (
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
}

export default Routes;
