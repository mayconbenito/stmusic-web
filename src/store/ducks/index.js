import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import player from './player';
import browse from './browse';
import search from './search';
import signIn from './signIn';
import signUp from './signUp';
import library from './library';
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
  library,
  player,
  browse,
  search,
  signIn,
  signUp,
});
