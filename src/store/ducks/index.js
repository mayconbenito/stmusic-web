import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import player from './player';
import browse from './browse';
import search from './search';
import login from './login';
import signUp from './signUp';
import libraryArtist from './libraryArtist';
import libraryPlaylist from './libraryPlaylist';
import playlist from './playlist';
import artist from './artist';
import genre from './genre';

import playlistModal from './playlistModal';

export default history => combineReducers({
  router: connectRouter(history),
  playlistModal,
  genre,
  artist,
  playlist,
  libraryArtist,
  libraryPlaylist,
  player,
  browse,
  search,
  login,
  signUp,
});
