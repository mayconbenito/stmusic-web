import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import album from './album';
import artist from './artist';
import browse from './browse';
import genre from './genre';
import libraryArtist from './libraryArtist';
import libraryPlaylist from './libraryPlaylist';
import login from './login';
import player from './player';
import playlist from './playlist';
import playlistModal from './playlistModal';
import search from './search';
import signUp from './signUp';

export default history =>
  combineReducers({
    router: connectRouter(history),
    playlistModal,
    album,
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
